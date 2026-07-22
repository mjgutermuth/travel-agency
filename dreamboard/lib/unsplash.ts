// Client-side wrapper around Unsplash's Random Photo endpoint. Runs in the
// browser (this is a static export with no server), so each visitor's page
// load can pull a fresh, genuinely random batch per destination.

export interface UnsplashPhoto {
  url: string
  photographerName: string
  photographerUrl: string
  downloadLocation: string
}

// A photo currently on display, which may be a live Unsplash fetch (full
// attribution) or a static fallback (no attribution fields).
export interface ResolvedImage {
  url: string
  photographerName?: string
  photographerUrl?: string
  downloadLocation?: string
}

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
const UTM = "utm_source=wanderling_world&utm_medium=referral"

export const UNSPLASH_HOME_URL = `https://unsplash.com/?${UTM}`

// Returns [] (never throws) when there's no key configured, the request
// fails, or the response is malformed — callers fall back to a static photo.
export async function getRandomPhotos(query: string, count: number): Promise<UnsplashPhoto[]> {
  if (!ACCESS_KEY) return []

  try {
    const params = new URLSearchParams({
      query,
      count: String(count),
      orientation: "landscape",
    })

    const res = await fetch(`https://api.unsplash.com/photos/random?${params}`, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    })
    if (!res.ok) return []

    const data = await res.json()
    const photos = Array.isArray(data) ? data : [data]

    return photos.map((photo) => ({
      url: photo.urls?.regular,
      photographerName: photo.user?.name ?? "Unknown",
      photographerUrl: `${photo.user?.links?.html}?${UTM}`,
      downloadLocation: photo.links?.download_location,
    })).filter((p) => p.url)
  } catch {
    return []
  }
}

// Unsplash's API guidelines require pinging this when a photo is actually
// used (here: pinned to the vision board), not just browsed. Best-effort —
// a failed ping shouldn't block the user from pinning a destination.
export async function trackDownload(downloadLocation: string | undefined) {
  if (!ACCESS_KEY || !downloadLocation) return
  try {
    await fetch(downloadLocation, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    })
  } catch {
    // ignore — non-critical
  }
}

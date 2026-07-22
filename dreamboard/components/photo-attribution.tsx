import { UNSPLASH_HOME_URL, type ResolvedImage } from "@/lib/unsplash"
import { cn } from "@/lib/utils"

// Required by Unsplash's API guidelines wherever an API-sourced photo is
// displayed. Kept intentionally quiet — small, low-opacity, no attribution
// at all shown for static fallback photos (no photographer data to credit).
export function PhotoAttribution({ image, className }: { image: ResolvedImage; className?: string }) {
  if (!image.photographerName) return null

  return (
    <p className={cn("text-[10px] text-muted-foreground/50 leading-none", className)}>
      <a
        href={image.photographerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-muted-foreground hover:underline"
      >
        {image.photographerName}
      </a>
      {" · "}
      <a
        href={UNSPLASH_HOME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-muted-foreground hover:underline"
      >
        Unsplash
      </a>
    </p>
  )
}

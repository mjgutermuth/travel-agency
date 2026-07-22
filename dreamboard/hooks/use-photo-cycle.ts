"use client"

import { useEffect, useState } from "react"
import { getRandomPhotos, type ResolvedImage, type UnsplashPhoto } from "@/lib/unsplash"

// How many candidate photos to fetch per card/tile on mount. Shuffling
// cycles within this already-fetched batch rather than hitting the API
// again on every click, to limit Unsplash rate-limit usage.
const BATCH_SIZE = 4

export function usePhotoCycle(query: string, fallbackUrl: string) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    getRandomPhotos(query, BATCH_SIZE).then((result) => {
      if (cancelled || result.length === 0) return
      setPhotos(result)
      setIndex(Math.floor(Math.random() * result.length)) // randomize on load
    })

    return () => {
      cancelled = true
    }
  }, [query])

  const currentImage: ResolvedImage = photos.length > 0 ? photos[index] : { url: fallbackUrl }

  const shuffle = () => {
    if (photos.length <= 1) return
    setIndex((prev) => {
      let next = prev
      while (next === prev) next = Math.floor(Math.random() * photos.length)
      return next
    })
  }

  return { currentImage, shuffle, canShuffle: photos.length > 1 }
}

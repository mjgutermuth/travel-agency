"use client"

import { useEffect, useState } from "react"
import type { ResolvedImage } from "@/lib/unsplash"

function pickDifferentIndex(poolLength: number, current: number) {
  if (poolLength <= 1) return current
  let next = current
  while (next === current) next = Math.floor(Math.random() * poolLength)
  return next
}

// Cycles through a small set of curated static photos — no live fetching,
// no network requests. Index starts at 0 on first render (server and client
// agree, avoiding a hydration mismatch) and randomizes client-side only,
// after mount.
export function usePhotoCycle(fallbackImages: ResolvedImage[]) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * fallbackImages.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentImage = fallbackImages[index]
  const canShuffle = fallbackImages.length > 1

  const shuffle = () => {
    setIndex((prev) => pickDifferentIndex(fallbackImages.length, prev))
  }

  return { currentImage, shuffle, canShuffle }
}

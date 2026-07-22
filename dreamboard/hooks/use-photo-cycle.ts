"use client"

import { useEffect, useRef, useState } from "react"
import { getRandomPhotos, type ResolvedImage, type UnsplashPhoto } from "@/lib/unsplash"

// How many live photos to fetch from Unsplash the first time someone
// shuffles. Subsequent shuffles cycle within this batch — no live fetch
// happens until a person actually clicks shuffle, and never more than once
// per card per session, regardless of how many times they click after that.
const BATCH_SIZE = 4

function pickDifferentIndex(poolLength: number, current: number) {
  if (poolLength <= 1) return current
  let next = current
  while (next === current) next = Math.floor(Math.random() * poolLength)
  return next
}

export function usePhotoCycle(query: string, fallbackImages: ResolvedImage[]) {
  // Index 0 on first render (server and client agree — avoids a hydration
  // mismatch), then randomized client-side only, after mount.
  const [index, setIndex] = useState(0)
  // null = live batch never attempted yet; [] = attempted and came up empty
  const [liveBatch, setLiveBatch] = useState<UnsplashPhoto[] | null>(null)
  const fetchingRef = useRef(false)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * fallbackImages.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pool: ResolvedImage[] = liveBatch ? [...fallbackImages, ...liveBatch] : fallbackImages
  const currentImage = pool[index] ?? fallbackImages[0]
  const canShuffle = liveBatch === null || pool.length > 1

  const shuffle = async () => {
    if (fetchingRef.current) return

    if (liveBatch === null) {
      fetchingRef.current = true
      const result = await getRandomPhotos(query, BATCH_SIZE)
      fetchingRef.current = false
      setLiveBatch(result)
      const newPool = [...fallbackImages, ...result]
      setIndex(pickDifferentIndex(newPool.length, index))
      return
    }

    setIndex((prev) => pickDifferentIndex(pool.length, prev))
  }

  return { currentImage, shuffle, canShuffle }
}

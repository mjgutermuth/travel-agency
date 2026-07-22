"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, MapPin, Shuffle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/destinations"
import { getRandomPhotos, trackDownload, UNSPLASH_HOME_URL, type ResolvedImage, type UnsplashPhoto } from "@/lib/unsplash"

interface DestinationCardProps {
  destination: Destination
  isPinned: boolean
  onTogglePin: (destination: Destination, image: ResolvedImage) => void
}

// How many candidate photos to fetch per destination on mount. Shuffling
// cycles within this already-fetched batch rather than hitting the API
// again on every click, to stay well under Unsplash's free-tier rate limit.
const BATCH_SIZE = 4

export function DestinationCard({ destination, isPinned, onTogglePin }: DestinationCardProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    getRandomPhotos(destination.imageQuery, BATCH_SIZE).then((result) => {
      if (cancelled || result.length === 0) return
      setPhotos(result)
      setPhotoIndex(Math.floor(Math.random() * result.length)) // randomize on load
    })

    return () => {
      cancelled = true
    }
  }, [destination.imageQuery])

  const currentImage: ResolvedImage =
    photos.length > 0
      ? photos[photoIndex]
      : { url: destination.fallbackImageUrl }

  const shuffle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (photos.length <= 1) return
    setPhotoIndex((prev) => {
      let next = prev
      while (next === prev) next = Math.floor(Math.random() * photos.length)
      return next
    })
  }

  const handleTogglePin = () => {
    if (!isPinned) trackDownload(currentImage.downloadLocation)
    onTogglePin(destination, currentImage)
  }

  return (
    <Card className="group overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={currentImage.url}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        {photos.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={shuffle}
            className="absolute top-3 left-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card text-muted-foreground"
          >
            <Shuffle className="h-4 w-4" />
            <span className="sr-only">Show a different photo</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleTogglePin}
          className={`absolute top-3 right-3 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card ${
            isPinned ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Heart className={`h-5 w-5 ${isPinned ? "fill-current" : ""}`} />
          <span className="sr-only">{isPinned ? "Remove from board" : "Add to board"}</span>
        </Button>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm text-card/80">
            <MapPin className="h-3.5 w-3.5" />
            <span>{destination.country}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
        {currentImage.photographerName && (
          <p className="text-xs text-muted-foreground/70 mt-2">
            Photo by{" "}
            <a href={currentImage.photographerUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {currentImage.photographerName}
            </a>{" "}
            on{" "}
            <a href={UNSPLASH_HOME_URL} target="_blank" rel="noopener noreferrer" className="underline">
              Unsplash
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

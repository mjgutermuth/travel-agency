"use client"

import { X, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Destination } from "@/lib/destinations"
import type { UploadedImage } from "@/components/image-uploader"
import { vibes, type Vibe } from "@/lib/vibes"
import { TripSummary } from "@/components/trip-summary"

interface VisionBoardPreviewProps {
  pinnedDestinations: Destination[]
  uploadedImages: UploadedImage[]
  selectedVibes: string[]
  onRemoveDestination: (id: string) => void
  onRemoveImage: (id: string) => void
  onRemoveVibe: (id: string) => void
}

type BoardItem =
  | { type: "destination"; id: string; imageUrl: string; label: string; sublabel: string }
  | { type: "vibe"; id: string; imageUrl: string; label: string; sublabel: string }
  | { type: "upload"; id: string; imageUrl: string; label: string; sublabel: string }

const sizePattern = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
]

const categoryLabels: Record<string, string> = {
  style: "Vibe",
  activity: "Activity",
  accommodation: "Stay",
}

export function VisionBoardPreview({
  pinnedDestinations,
  uploadedImages,
  selectedVibes,
  onRemoveDestination,
  onRemoveImage,
  onRemoveVibe,
}: VisionBoardPreviewProps) {
  const isEmpty =
    pinnedDestinations.length === 0 &&
    uploadedImages.length === 0 &&
    selectedVibes.length === 0

  if (isEmpty) {
    return (
      <Card className="border-dashed border-2 bg-secondary/50 rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center py-14 text-center">
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">Your Vision Board is Empty</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Select your travel vibes, browse destinations, or upload your own inspiration images
          </p>
        </CardContent>
      </Card>
    )
  }

  const selectedVibeObjects = selectedVibes
    .map(id => vibes.find(v => v.id === id))
    .filter((v): v is Vibe => v !== undefined)

  const items: BoardItem[] = [
    ...pinnedDestinations.map(d => ({
      type: "destination" as const,
      id: d.id,
      imageUrl: d.imageUrl,
      label: d.name,
      sublabel: d.country,
    })),
    ...selectedVibeObjects.map(v => ({
      type: "vibe" as const,
      id: v.id,
      imageUrl: v.imageUrl,
      label: v.name,
      sublabel: categoryLabels[v.category] ?? v.category,
    })),
    ...uploadedImages.map(img => ({
      type: "upload" as const,
      id: img.id,
      imageUrl: img.dataUrl,
      label: img.name,
      sublabel: "My inspiration",
    })),
  ]

  const handleRemove = (item: BoardItem) => {
    if (item.type === "destination") onRemoveDestination(item.id)
    else if (item.type === "vibe") onRemoveVibe(item.id)
    else onRemoveImage(item.id)
  }

  return (
    <div className="space-y-6">
      <TripSummary selectedVibes={selectedVibes} pinnedDestinations={pinnedDestinations} />

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
        style={{ gridAutoRows: "140px", gridAutoFlow: "dense" }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.type}-${item.id}`}
            className={`group relative overflow-hidden rounded-xl shadow-md ${sizePattern[index % sizePattern.length]}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button
              onClick={() => handleRemove(item)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <X className="w-3.5 h-3.5 text-white" />
              <span className="sr-only">Remove {item.label}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

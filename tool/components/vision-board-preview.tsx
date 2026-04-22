"use client"

import Image from "next/image"
import { X, MapPin, Sparkles, Heart, Compass, Sunset, Landmark, UtensilsCrossed, Users, User,
  Palmtree, Mountain, Building2, Flower2, Music, ShoppingBag, Bird,
  Hotel, Home, Tent, Crown, Wallet, Ship, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Destination } from "@/lib/destinations"
import type { UploadedImage } from "@/components/image-uploader"
import { vibes } from "@/lib/vibes"
import { cn } from "@/lib/utils"
import { TripSummary } from "@/components/trip-summary"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass, Sunset, Heart, Landmark, UtensilsCrossed, Users, User,
  Palmtree, Mountain, Building2, Flower2, Music, ShoppingBag, Bird,
  Hotel, Home, Tent, Crown, Wallet, Ship, Dumbbell
}

interface VisionBoardPreviewProps {
  pinnedDestinations: Destination[]
  uploadedImages: UploadedImage[]
  selectedVibes: string[]
  onRemoveDestination: (id: string) => void
  onRemoveImage: (id: string) => void
  onRemoveVibe: (id: string) => void
}

export function VisionBoardPreview({
  pinnedDestinations,
  uploadedImages,
  selectedVibes,
  onRemoveDestination,
  onRemoveImage,
  onRemoveVibe
}: VisionBoardPreviewProps) {
  const isEmpty = pinnedDestinations.length === 0 && uploadedImages.length === 0 && selectedVibes.length === 0

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

  const selectedVibeObjects = selectedVibes.map(id => vibes.find(v => v.id === id)).filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Trip Summary */}
      <TripSummary 
        selectedVibes={selectedVibes} 
        pinnedDestinations={pinnedDestinations} 
      />

      {/* Selected Vibes */}
      {selectedVibeObjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedVibeObjects.map((vibe) => {
            if (!vibe) return null
            const Icon = iconMap[vibe.icon]
            return (
              <div
                key={vibe.id}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border",
                  vibe.color
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{vibe.name}</span>
                <button
                  onClick={() => onRemoveVibe(vibe.id)}
                  className="ml-1 hover:opacity-70 transition-opacity"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="sr-only">Remove {vibe.name}</span>
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Images Grid */}
      {(pinnedDestinations.length > 0 || uploadedImages.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pinnedDestinations.map((destination) => (
            <Card key={destination.id} className="group relative overflow-hidden shadow-sm rounded-xl border-0">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemoveDestination(destination.id)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove {destination.name}</span>
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-card">
                    <p className="text-sm font-medium">{destination.name}</p>
                    <div className="flex items-center gap-1 text-xs text-card/80">
                      <MapPin className="h-3 w-3" />
                      <span>{destination.country}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {uploadedImages.map((image) => (
            <Card key={image.id} className="group relative overflow-hidden shadow-sm rounded-xl border-0">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.dataUrl}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemoveImage(image.id)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent">
                    <p className="text-xs text-card/80">Uploaded inspiration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

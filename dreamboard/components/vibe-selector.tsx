"use client"

import { Check, Shuffle } from "lucide-react"
import { cn } from "@/lib/utils"
import { vibes, vibeCategories, type Vibe } from "@/lib/vibes"
import { PhotoAttribution } from "@/components/photo-attribution"
import { usePhotoCycle } from "@/hooks/use-photo-cycle"

interface VibeSelectorProps {
  selectedVibes: string[]
  onToggleVibe: (vibeId: string) => void
}

function VibeCard({ vibe, isSelected, onToggle }: {
  vibe: Vibe
  isSelected: boolean
  onToggle: () => void
}) {
  const { currentImage, shuffle, canShuffle } = usePhotoCycle(vibe.imageQuery, vibe.fallbackImages)

  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation()
    shuffle()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={vibe.name}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onToggle()
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl aspect-square w-full cursor-pointer",
        "transition-all duration-200 hover:scale-[1.03] focus:outline-none",
        isSelected
          ? "ring-4 ring-primary ring-offset-2 shadow-xl"
          : "shadow-md hover:shadow-xl"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentImage.url}
        alt={vibe.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {canShuffle && (
        <button
          type="button"
          onClick={handleShuffle}
          className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:bg-white"
        >
          <Shuffle className="w-3 h-3" />
          <span className="sr-only">Show a different photo</span>
        </button>
      )}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
          <Check className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 text-left">
        <span className="block text-white text-sm font-semibold leading-tight drop-shadow-sm">
          {vibe.name}
        </span>
        <PhotoAttribution image={currentImage} className="text-white/60 mt-0.5" />
      </div>
    </div>
  )
}

function VibeCategory({
  category,
  selectedVibes,
  onToggleVibe
}: {
  category: "style" | "activity" | "accommodation"
  selectedVibes: string[]
  onToggleVibe: (vibeId: string) => void
}) {
  const categoryVibes = vibes.filter(v => v.category === category)
  const categoryInfo = vibeCategories[category]

  const labelColors = {
    style: "text-primary",
    activity: "text-accent",
    accommodation: "text-chart-3"
  }

  return (
    <div>
      <p className={cn("text-xs font-medium tracking-widest uppercase mb-2", labelColors[category])}>
        {categoryInfo.label}
      </p>
      <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-1">
        {categoryInfo.title}
      </h3>
      <p className="text-muted-foreground mb-6">{categoryInfo.subtitle}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categoryVibes.map((vibe) => (
          <VibeCard
            key={vibe.id}
            vibe={vibe}
            isSelected={selectedVibes.includes(vibe.id)}
            onToggle={() => onToggleVibe(vibe.id)}
          />
        ))}
      </div>
    </div>
  )
}

export function VibeSelector({ selectedVibes, onToggleVibe }: VibeSelectorProps) {
  return (
    <div className="space-y-12">
      <VibeCategory
        category="style"
        selectedVibes={selectedVibes}
        onToggleVibe={onToggleVibe}
      />
      <VibeCategory
        category="activity"
        selectedVibes={selectedVibes}
        onToggleVibe={onToggleVibe}
      />
      <VibeCategory
        category="accommodation"
        selectedVibes={selectedVibes}
        onToggleVibe={onToggleVibe}
      />
    </div>
  )
}

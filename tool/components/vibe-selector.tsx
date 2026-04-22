"use client"

import {
  Compass, Sunset, Heart, Landmark, UtensilsCrossed, Users, User,
  Palmtree, Mountain, Building2, Flower2, Music, ShoppingBag, Bird,
  Hotel, Home, Tent, Crown, Wallet, Check, Ship, Dumbbell
} from "lucide-react"
import { cn } from "@/lib/utils"
import { vibes, vibeCategories, type Vibe } from "@/lib/vibes"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass, Sunset, Heart, Landmark, UtensilsCrossed, Users, User,
  Palmtree, Mountain, Building2, Flower2, Music, ShoppingBag, Bird,
  Hotel, Home, Tent, Crown, Wallet, Ship, Dumbbell
}

interface VibeSelectorProps {
  selectedVibes: string[]
  onToggleVibe: (vibeId: string) => void
}

function VibeCard({ vibe, isSelected, onToggle }: { 
  vibe: Vibe
  isSelected: boolean
  onToggle: () => void 
}) {
  const Icon = iconMap[vibe.icon]
  
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : cn("border-transparent", vibe.color)
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        isSelected ? "bg-primary text-primary-foreground" : ""
      )}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <span className={cn(
        "text-sm font-medium text-center leading-tight",
        isSelected ? "text-primary" : "text-foreground"
      )}>
        {vibe.name}
      </span>
    </button>
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

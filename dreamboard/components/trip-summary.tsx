"use client"

import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { vibes, type Vibe } from "@/lib/vibes"
import type { Destination } from "@/lib/destinations"

interface TripSummaryProps {
  selectedVibes: string[]
  pinnedDestinations: Destination[]
}

function generateSummary(selectedVibeObjects: Vibe[], destinations: Destination[]): string {
  if (selectedVibeObjects.length === 0 && destinations.length === 0) {
    return ""
  }

  const styles = selectedVibeObjects.filter(v => v.category === "style")
  const activities = selectedVibeObjects.filter(v => v.category === "activity")
  const accommodations = selectedVibeObjects.filter(v => v.category === "accommodation")

  const parts: string[] = []

  // Opening based on primary style
  if (styles.length > 0) {
    const primaryStyle = styles[0]
    const styleDescriptions: Record<string, string> = {
      adventure: "an adventure-filled",
      relaxation: "a peaceful, relaxing",
      romantic: "a romantic",
      cultural: "a culturally immersive",
      foodie: "a culinary-focused",
      family: "a fun-filled family",
      solo: "a solo discovery",
      wellness: "a rejuvenating wellness"
    }
    parts.push(`You're dreaming of ${styleDescriptions[primaryStyle.id] || "a special"} getaway`)
    
    if (styles.length > 1) {
      const otherStyles = styles.slice(1).map(s => s.name.toLowerCase())
      if (otherStyles.length === 1) {
        parts[0] += ` with a touch of ${otherStyles[0]}`
      } else {
        parts[0] += ` blending ${otherStyles.slice(0, -1).join(", ")} and ${otherStyles[otherStyles.length - 1]}`
      }
    }
  } else {
    parts.push("You're crafting your perfect trip")
  }

  // Destinations
  if (destinations.length > 0) {
    const regions = [...new Set(destinations.map(d => d.region))]
    const destNames = destinations.slice(0, 3).map(d => d.name)
    
    if (destinations.length === 1) {
      parts[0] += ` to ${destNames[0]}`
    } else if (destinations.length <= 3) {
      parts[0] += ` exploring ${destNames.slice(0, -1).join(", ")} and ${destNames[destNames.length - 1]}`
    } else {
      parts[0] += ` across ${regions.length > 1 ? "multiple regions" : regions[0]}`
    }
  }

  parts[0] += "."

  // Activities
  if (activities.length > 0) {
    const activityNames = activities.map(a => {
      const descriptions: Record<string, string> = {
        beach: "lazy beach days",
        hiking: "scenic hikes",
        city: "city exploration",
        spa: "spa treatments",
        nightlife: "vibrant nightlife",
        shopping: "shopping adventures",
        "water-sports": "water sports",
        wildlife: "wildlife encounters"
      }
      return descriptions[a.id] || a.name.toLowerCase()
    })

    if (activityNames.length === 1) {
      parts.push(`Your days will be filled with ${activityNames[0]}.`)
    } else if (activityNames.length === 2) {
      parts.push(`Expect ${activityNames[0]} and ${activityNames[1]}.`)
    } else {
      parts.push(`Your itinerary includes ${activityNames.slice(0, -1).join(", ")}, and ${activityNames[activityNames.length - 1]}.`)
    }
  }

  // Accommodation
  if (accommodations.length > 0) {
    const primaryAccom = accommodations[0]
    const accomDescriptions: Record<string, string> = {
      boutique: "a charming boutique hotel",
      "all-inclusive": "an all-inclusive resort where everything is taken care of",
      airbnb: "a cozy vacation rental",
      glamping: "a unique glamping experience under the stars",
      luxury: "a luxurious resort with all the amenities",
      budget: "comfortable yet budget-friendly stays"
    }
    parts.push(`Picture yourself at ${accomDescriptions[primaryAccom.id] || primaryAccom.name.toLowerCase()}.`)
  }

  return parts.join(" ")
}

export function TripSummary({ selectedVibes, pinnedDestinations }: TripSummaryProps) {
  const selectedVibeObjects = selectedVibes
    .map(id => vibes.find(v => v.id === id))
    .filter((v): v is Vibe => v !== undefined)

  const summary = generateSummary(selectedVibeObjects, pinnedDestinations)

  if (!summary) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20 rounded-2xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10 shrink-0">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
              Your Dream Trip
            </p>
            <p className="text-foreground leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

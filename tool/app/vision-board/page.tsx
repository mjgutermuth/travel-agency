"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DestinationCard } from "@/components/destination-card"
import { VisionBoardPreview } from "@/components/vision-board-preview"
import { ImageUploader, type UploadedImage } from "@/components/image-uploader"
import { IntakeForm, type IntakeFormData } from "@/components/intake-form"
import { VibeSelector } from "@/components/vibe-selector"
import { destinations, type Destination } from "@/lib/destinations"
import { vibes } from "@/lib/vibes"

export default function VisionBoardPage() {
  const [pinnedDestinations, setPinnedDestinations] = useState<Destination[]>([])
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const togglePin = useCallback((destination: Destination) => {
    setPinnedDestinations(prev => {
      const isPinned = prev.some(d => d.id === destination.id)
      if (isPinned) {
        return prev.filter(d => d.id !== destination.id)
      }
      return [...prev, destination]
    })
  }, [])

  const removeDestination = useCallback((id: string) => {
    setPinnedDestinations(prev => prev.filter(d => d.id !== id))
  }, [])

  const removeImage = useCallback((id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }, [])

  const toggleVibe = useCallback((vibeId: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibeId) 
        ? prev.filter(id => id !== vibeId)
        : [...prev, vibeId]
    )
  }, [])

  const handleSubmit = async (formData: IntakeFormData) => {
    setIsSubmitting(true)

    try {
      const selectedVibeNames = selectedVibes.map(id =>
        vibes.find(v => v.id === id)?.name || id
      )

      const pinnedList = pinnedDestinations.length > 0
        ? pinnedDestinations.map(d => `  • ${d.name}, ${d.country} (${d.region})`).join("\n")
        : "  None selected"

      const message = [
        "=== CLIENT INFO ===",
        `Phone: ${formData.phone || "Not provided"}`,
        "",
        "=== VISION BOARD ===",
        `Vibes: ${selectedVibeNames.length > 0 ? selectedVibeNames.join(", ") : "None selected"}`,
        `Uploaded images: ${uploadedImages.length}`,
        `Pinned destinations (${pinnedDestinations.length}):`,
        pinnedList,
        ...(formData.notes ? ["", "=== NOTES ===", formData.notes] : []),
      ].join("\n")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "4a225bc3-2f74-4246-a619-b8b53bb5e7d7",
          subject: `New Vision Board: ${formData.name} — ${pinnedDestinations.length} destination${pinnedDestinations.length !== 1 ? "s" : ""}`,
          name: formData.name,
          email: formData.email,
          message,
        }),
      })

      const result = await response.json()
      if (!result.success) throw new Error("Submission failed")

      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
      alert("There was an error submitting your vision board. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <Card className="max-w-md w-full text-center shadow-lg rounded-2xl">
          <CardContent className="pt-10 pb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl text-foreground mb-2">VISION BOARD SUBMITTED!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for sharing your travel dreams with me. I&apos;ll be in touch soon to help make your vision a reality.
            </p>
            <Button asChild>
              <a href="https://travel.melindagutermuth.com">Return Home</a>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild className="rounded-full">
            <a href="https://travel.melindagutermuth.com">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </a>
          </Button>
          <span className="font-semibold text-foreground">Create Your Vision Board</span>
          <div className="w-[88px]" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Vision Board Preview */}
        <section>
          <p className="text-xs font-medium tracking-widest text-primary uppercase mb-2">
            Your Board
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-6">MY VISION BOARD</h2>
          <VisionBoardPreview
            pinnedDestinations={pinnedDestinations}
            uploadedImages={uploadedImages}
            selectedVibes={selectedVibes}
            onRemoveDestination={removeDestination}
            onRemoveImage={removeImage}
            onRemoveVibe={toggleVibe}
          />
        </section>

        {/* Vibe Selector */}
        <section>
          <VibeSelector selectedVibes={selectedVibes} onToggleVibe={toggleVibe} />
        </section>

        {/* Upload Section */}
        <section>
          <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">
            Personal Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-6">UPLOAD YOUR INSPIRATION</h2>
          <ImageUploader images={uploadedImages} onImagesChange={setUploadedImages} />
        </section>

        {/* Destination Gallery */}
        <section>
          <p className="text-xs font-medium tracking-widest text-chart-3 uppercase mb-2">
            Browse & Pin
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">EXPLORE DESTINATIONS</h2>
          <p className="text-muted-foreground mb-8">
            Click the heart on any destination to add it to your vision board
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isPinned={pinnedDestinations.some(d => d.id === destination.id)}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        </section>

        {/* Intake Form */}
        <section>
          <Card className="shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-secondary pb-6">
              <p className="text-xs font-medium tracking-widest text-primary uppercase mb-2">
                Get In Touch
              </p>
              <CardTitle className="font-display text-3xl sm:text-4xl text-foreground">READY TO GO?</CardTitle>
              <p className="text-muted-foreground">
                Tell me about your dream trip and I&apos;ll help make it happen.
              </p>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <IntakeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

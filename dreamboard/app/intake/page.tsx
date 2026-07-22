"use client"

import Script from "next/script"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CALENDLY_URL = "https://calendly.com/wanderling/intake"

export default function IntakePage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild className="rounded-full">
            <a href="https://wanderling.world">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </a>
          </Button>
          <span className="font-semibold text-foreground">Trip Intake</span>
          <span className="font-display text-sm tracking-wide bg-gradient-to-br from-[#ff6b9d] via-[#a78bfa] to-[#4ecdc4] bg-clip-text text-transparent">
            WANDER/LING
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10 sm:py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium tracking-widest text-accent uppercase mb-2">
            Let&apos;s Talk Trip
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">Let&apos;s Plan Your Trip</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Grab a time on my calendar and I&apos;ll come prepared to talk through where you want to go, when, and with whom.
          </p>
        </div>

        <Card className="shadow-lg rounded-2xl overflow-hidden mb-6">
          <CardContent className="pt-6 pb-6 flex items-start gap-3 bg-secondary">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              A planning fee applies, scoped to the size and complexity of your trip. I&apos;ll walk you through exact pricing once we&apos;ve talked through your plans.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-secondary pb-6">
            <CardTitle className="font-display font-normal text-2xl sm:text-3xl text-foreground">Book a Call</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-4 px-2 sm:px-4">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

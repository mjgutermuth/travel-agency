import { NextResponse } from "next/server"

const WEB3FORMS_ACCESS_KEY = "4a225bc3-2f74-4246-a619-b8b53bb5e7d7"

interface SubmissionData {
  formData: {
    name: string
    email: string
    phone: string
    departureDate: string | null
    returnDate: string | null
    destinations: string
    budget: string
    notes: string
  }
  pinnedDestinations: Array<{
    name: string
    country: string
    region: string
  }>
  uploadedImagesCount: number
  selectedVibes: string[]
}

const BUDGET_LABELS: Record<string, string> = {
  "budget": "Budget ($1,000 - $3,000)",
  "moderate": "Moderate ($3,000 - $7,000)",
  "luxury": "Luxury ($7,000 - $15,000)",
  "ultra-luxury": "Ultra-Luxury ($15,000+)",
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Not specified"
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })
}

export async function POST(request: Request) {
  try {
    const data: SubmissionData = await request.json()
    const { formData, pinnedDestinations, uploadedImagesCount, selectedVibes } = data

    const destinationsList = pinnedDestinations.length > 0
      ? pinnedDestinations.map(d => `  • ${d.name}, ${d.country} (${d.region})`).join("\n")
      : "  None selected"

    const message = [
      "=== CLIENT INFO ===",
      `Phone: ${formData.phone || "Not provided"}`,
      "",
      "=== TRAVEL DETAILS ===",
      `Departure: ${formatDate(formData.departureDate)}`,
      `Return:    ${formatDate(formData.returnDate)}`,
      `Trip type: ${formData.destinations || "Not specified"}`,
      `Budget:    ${BUDGET_LABELS[formData.budget] || formData.budget || "Not specified"}`,
      "",
      "=== VISION BOARD ===",
      `Vibes: ${selectedVibes.length > 0 ? selectedVibes.join(", ") : "None selected"}`,
      `Uploaded images: ${uploadedImagesCount}`,
      `Pinned destinations (${pinnedDestinations.length}):`,
      destinationsList,
      ...(formData.notes ? ["", "=== NOTES ===", formData.notes] : []),
    ].join("\n")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Vision Board: ${formData.name} — ${pinnedDestinations.length} destination${pinnedDestinations.length !== 1 ? "s" : ""}`,
        name: formData.name,
        email: formData.email,
        message,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      console.error("Web3Forms error:", result)
      return NextResponse.json({ error: "Failed to send" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

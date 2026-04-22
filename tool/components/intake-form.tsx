"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export interface IntakeFormData {
  name: string
  email: string
  phone: string
  notes: string
}

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => Promise<void>
  isSubmitting: boolean
}

export function IntakeForm({ onSubmit, isSubmitting }: IntakeFormProps) {
  const [formData, setFormData] = useState<IntakeFormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const updateField = <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const inputClass = "rounded-xl border-border focus:border-primary"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Your Name</FieldLabel>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="jane@example.com"
              className={inputClass}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={inputClass}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="notes">Anything else?</FieldLabel>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Rough dates, group size, must-haves — anything that helps paint the picture."
            rows={3}
            className="rounded-xl border-border focus:border-primary"
          />
        </Field>
      </FieldGroup>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send My Vision Board"
        )}
      </Button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

export interface IntakeFormData {
  name: string
  email: string
  phone: string
  departureDate: Date | undefined
  returnDate: Date | undefined
  destinations: string
  budget: string
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
    departureDate: undefined,
    returnDate: undefined,
    destinations: "",
    budget: "",
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const updateField = <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const inputClassName = "rounded-xl border-border focus:border-primary"
  const buttonClassName = "rounded-lg"

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
              className={inputClassName}
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
              className={inputClassName}
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
            className={inputClassName}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Departure Date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    buttonClassName,
                    !formData.departureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.departureDate ? format(formData.departureDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                <Calendar
                  mode="single"
                  selected={formData.departureDate}
                  onSelect={(date) => updateField("departureDate", date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field>
            <FieldLabel>Return Date</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    buttonClassName,
                    !formData.returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.returnDate ? format(formData.returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                <Calendar
                  mode="single"
                  selected={formData.returnDate}
                  onSelect={(date) => updateField("returnDate", date)}
                  disabled={(date) => date < (formData.departureDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="destinations">Type of Trip</FieldLabel>
          <Select value={formData.destinations} onValueChange={(value) => updateField("destinations", value)}>
            <SelectTrigger id="destinations" className={buttonClassName}>
              <SelectValue placeholder="-- Select one --" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="cruise">Cruise</SelectItem>
              <SelectItem value="city">City Adventure</SelectItem>
              <SelectItem value="beach">Beach & Resorts</SelectItem>
              <SelectItem value="theme-parks">Theme Parks</SelectItem>
              <SelectItem value="europe">Central Europe</SelectItem>
              <SelectItem value="group">Group & Family Trip</SelectItem>
              <SelectItem value="other">Something Else</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="budget">Budget Range</FieldLabel>
          <Select value={formData.budget} onValueChange={(value) => updateField("budget", value)}>
            <SelectTrigger id="budget" className={buttonClassName}>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="budget">Budget ($1,000 - $3,000)</SelectItem>
              <SelectItem value="moderate">Moderate ($3,000 - $7,000)</SelectItem>
              <SelectItem value="luxury">Luxury ($7,000 - $15,000)</SelectItem>
              <SelectItem value="ultra-luxury">Ultra-Luxury ($15,000+)</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="notes">Tell Me More</FieldLabel>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Where have you always wanted to go? Any rough dates or budget? Dream big..."
            rows={4}
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
          "Send It"
        )}
      </Button>
    </form>
  )
}

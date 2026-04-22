"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export interface UploadedImage {
  id: string
  dataUrl: string
  name: string
}

interface ImageUploaderProps {
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
}

export function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        const newImage: UploadedImage = {
          id: crypto.randomUUID(),
          dataUrl,
          name: file.name
        }
        onImagesChange([...images, newImage])
      }
      reader.readAsDataURL(file)
    })
  }, [images, onImagesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeImage = useCallback((id: string) => {
    onImagesChange(images.filter(img => img.id !== id))
  }, [images, onImagesChange])

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center transition-colors
          ${isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-accent/20">
            <Upload className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">Upload your inspiration</p>
            <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="group relative overflow-hidden rounded-xl border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.dataUrl}
                    alt={image.name}
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
          <ImageIcon className="h-4 w-4" />
          <span>No inspiration images uploaded yet</span>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Monitor, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Button } from './ui/button'

const screenshots = [
  {
    src: '/lainux-cyber-theme/desktop.png',
    alt: 'Lainux Cyber Desktop Screenshot',
    title: 'Complete Desktop Theme',
    description: 'Full KDE Plasma 6 desktop with cyberpunk aesthetics'
  }
]

export function LainuxCyberScreenshots() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openModal = (index: number) => setSelectedImage(index)
  const closeModal = () => setSelectedImage(null)
  const nextImage = () => setSelectedImage(prev => prev !== null ? (prev + 1) % screenshots.length : 0)
  const prevImage = () => setSelectedImage(prev => prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : 0)

  return (
    <section id="screenshots" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center justify-center gap-3">
              <Monitor className="h-8 w-8 text-primary" />
              Screenshots
            </h2>
            <p className="text-base text-muted-foreground">
              See the Lainux Cyber theme in action
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <p className="text-white font-semibold">Click to enlarge</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <h3 className="text-lg font-bold mb-1">{screenshot.title}</h3>
                  <p className="text-sm text-muted-foreground">{screenshot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-5xl max-h-[90vh] w-full mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative aspect-video">
              <Image
                src={screenshots[selectedImage].src}
                alt={screenshots[selectedImage].alt}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2">{screenshots[selectedImage].title}</h3>
              <p className="text-white/80">{screenshots[selectedImage].description}</p>
            </div>

            {screenshots.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
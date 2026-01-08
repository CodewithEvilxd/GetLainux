'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, X, ChevronLeft, ChevronRight, Download, Wallpaper } from 'lucide-react'
import { Button } from './ui/button'

const wallpapers = [
  { src: '/lainux-cyber-theme/lainux-default.jpg', name: 'Default', description: 'Classic cyberpunk scene' },
  { src: '/lainux-cyber-theme/lainux-cipher.jpg', name: 'Cipher', description: 'Encrypted data visualization' },
  { src: '/lainux-cyber-theme/lainux-dreamscape.png', name: 'Dreamscape', description: 'Surreal digital landscape' },
  { src: '/lainux-cyber-theme/lainux-drowned.png', name: 'Drowned', description: 'Submerged cyberpunk city' },
  { src: '/lainux-cyber-theme/lainux-fisherman.png', name: 'Fisherman', description: 'Fishing in digital waters' },
  { src: '/lainux-cyber-theme/lainux-fracture.png', name: 'Fracture', description: 'Fractured reality' },
  { src: '/lainux-cyber-theme/lainux-frozen.png', name: 'Frozen', description: 'Frozen digital wasteland' },
  { src: '/lainux-cyber-theme/lainux-glass.png', name: 'Glass', description: 'Transparent data structures' },
  { src: '/lainux-cyber-theme/lainux-hex.jpg', name: 'Hex', description: 'Hexadecimal patterns' },
  { src: '/lainux-cyber-theme/lainux-hummingbird.jpg', name: 'Hummingbird', description: 'Nature meets cyberpunk' },
  { src: '/lainux-cyber-theme/lainux-portal.jpg', name: 'Portal', description: 'Digital portal gateway' },
  { src: '/lainux-cyber-theme/lainux-rain.png', name: 'Rain', description: 'Rain-soaked cyberpunk streets' },
  { src: '/lainux-cyber-theme/lainux-shrine.jpg', name: 'Shrine', description: 'Digital shrine' },
  { src: '/lainux-cyber-theme/lainux-skull.png', name: 'Skull', description: 'Cyberpunk skull motif' },
  { src: '/lainux-cyber-theme/lainux-vinyl.png', name: 'Vinyl', description: 'Retro-futuristic vinyl' },
  { src: '/lainux-cyber-theme/lainux-zerog.png', name: 'Zero-G', description: 'Zero gravity environment' },
  { src: '/lainux-cyber-theme/lainux-bonsai.png', name: 'Bonsai', description: 'Miniature cyberpunk tree' },
  { src: '/lainux-cyber-theme/lainux-brain.png', name: 'Brain', description: 'Circuit brain visualization' },
  { src: '/lainux-cyber-theme/lainux-circuit.jpg', name: 'Circuit', description: 'Glowing circuit patterns' },
  { src: '/lainux-cyber-theme/lainux-city.jpg', name: 'City', description: 'Neon-lit cyberpunk metropolis' },
  { src: '/lainux-cyber-theme/lainux-code.jpg', name: 'Code', description: 'Falling code matrix' },
  { src: '/lainux-cyber-theme/lainux-grid.jpg', name: 'Grid', description: 'Geometric cyberpunk grid' },
  { src: '/lainux-cyber-theme/lainux-matrix.jpg', name: 'Matrix', description: 'Digital matrix landscape' },
  { src: '/lainux-cyber-theme/lainux-nature.jpg', name: 'Nature', description: 'Cyberpunk nature fusion' },
  { src: '/lainux-cyber-theme/lainux-neon.jpg', name: 'Neon', description: 'Bright neon cyberpunk scene' },
  { src: '/lainux-cyber-theme/lainux-storm.jpg', name: 'Storm', description: 'Thunderstorm in cyberpunk world' },
  { src: '/lainux-cyber-theme/lainux-tunnel.jpg', name: 'Tunnel', description: 'Neon tunnel perspective' }
]

export function LainuxCyberWallpapers() {
  const [selectedWallpaper, setSelectedWallpaper] = useState<number | null>(null)

  const openModal = (index: number) => setSelectedWallpaper(index)
  const closeModal = () => setSelectedWallpaper(null)
  const nextWallpaper = () => setSelectedWallpaper(prev => prev !== null ? (prev + 1) % wallpapers.length : 0)
  const prevWallpaper = () => setSelectedWallpaper(prev => prev !== null ? (prev - 1 + wallpapers.length) % wallpapers.length : 0)

  return (
    <section id="wallpapers" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center justify-center gap-3">
              <Wallpaper className="h-8 w-8 text-primary" />
              Wallpapers
            </h2>
            <p className="text-base text-muted-foreground">
              26 custom wallpapers included with the theme
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wallpapers.map((wallpaper, index) => (
              <div
                key={index}
                className="group relative aspect-video overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => openModal(index)}
              >
                <Image
                  src={wallpaper.src}
                  alt={wallpaper.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold text-sm">{wallpaper.name}</h3>
                    <p className="text-xs text-white/80">{wallpaper.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedWallpaper !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative aspect-video">
              <Image
                src={wallpapers[selectedWallpaper].src}
                alt={wallpapers[selectedWallpaper].name}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white mb-1">{wallpapers[selectedWallpaper].name}</h3>
              <p className="text-white/80 mb-4">{wallpapers[selectedWallpaper].description}</p>
              <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a href={wallpapers[selectedWallpaper].src} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Wallpaper
                </a>
              </Button>
            </div>

            {wallpapers.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevWallpaper}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextWallpaper}
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
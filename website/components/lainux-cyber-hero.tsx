'use client'

import { useState, useEffect } from 'react'
import { Palette, Download, Github, Code, Sparkles, Monitor, Zap, Terminal, Image as ImageIcon, Cpu, Wifi, Battery, HardDrive, Layers, Eye, Database, Code2, Activity, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import ShuffleText from './shuffle-text'
import LightRays from './light-rays'

export function LainuxCyberHero() {
  const [logoError, setLogoError] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: Layers, text: "Complete KDE Plasma 6 Theme" },
    { icon: Eye, text: "OLED Optimized (#050505)" },
    { icon: Database, text: "Auto Hardware Detection" },
    { icon: Code2, text: "Terminal Themes (Konsole, Kitty, Ghostty)" },
    { icon: Activity, text: "Conky System Monitor" },
    { icon: ImageIcon, text: "17 Custom Wallpapers" },
    { icon: Palette, text: "Cyan-Dominant Palette" },
    { icon: Shield, text: "Cohesive Boot-to-Desktop" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center py-12 sm:py-16 relative overflow-hidden">
      <LightRays />
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-transparent group">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 flex items-center justify-center overflow-hidden">
                {!logoError ? (
                  <Image
                    src="/logo3.png"
                    alt="Lainux Cyber Theme Logo"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <Palette className="h-14 w-14 sm:h-18 sm:w-18 md:h-22 md:w-22 lg:h-26 lg:w-26 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight font-heading">
              <ShuffleText text="Lainux" className="text-foreground" />
              <ShuffleText text=" Cyber" className="text-primary" />
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
              KDE Plasma 6 Cyberpunk Theme
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              Complete cyberpunk-themed desktop experience for KDE Plasma 6. Cyan-dominant palette optimized for OLED displays with cohesive theming from boot splash to desktop environment.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">Auto Hardware Detection</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">17 Wallpapers</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">Terminal Themes</span>
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">System Monitor</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
              <Link href="https://github.com/codewithevilxd/lainux-cyber-theme" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-8 py-3 text-lg">
              <Link href="#install">
                <Download className="mr-2 h-5 w-5" />
                Quick Install
              </Link>
            </Button>
          </div>

          {/* Animated Features */}
          <div className="pt-12 max-w-3xl mx-auto">
            <div className="relative h-20 flex items-center justify-center">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isActive = index === currentFeature
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">{feature.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary">26</div>
              <p className="text-sm text-muted-foreground">Wallpapers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary">6</div>
              <p className="text-sm text-muted-foreground">Terminals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary">8</div>
              <p className="text-sm text-muted-foreground">Components</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-primary">∞</div>
              <p className="text-sm text-muted-foreground">Possibilities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


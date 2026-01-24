'use client'

import React, { useState, useEffect } from 'react'
import { Terminal, Download, Github, Search, Play, Youtube, Zap, Download as DownloadIcon, List, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Button } from './ui/button'
import ShuffleText from './shuffle-text'
import LightRays from './light-rays'

export function VortexCliHero() {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: Search, text: "Interactive Video Browser" },
    { icon: Play, text: "Live Streaming Support" },
    { icon: DownloadIcon, text: "Download Manager" },
    { icon: List, text: "Playlist Management" },
    { icon: Star, text: "Favorites System" },
    { icon: ImageIcon, text: "Rich Previews" },
    { icon: Zap, text: "Extension System" },
    { icon: Youtube, text: "Multi-Site Support" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section id="home" className="min-h-[100vh] flex items-start justify-center pt-2 pb-8 sm:pt-4 sm:pb-12 relative overflow-hidden">
      <LightRays raysOrigin="top-center" raysColor="#3b82f6" raysSpeed={0.5} />
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-4">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-border bg-muted/50 backdrop-blur-sm text-xs sm:text-sm font-bold text-muted-foreground">
            <ShuffleText
              text="v0.4.5"
              tag="span"
              duration={0.65}
              shuffleTimes={2}
              stagger={0.05}
              animationMode="evenodd"
              loop={true}
              loopDelay={3}
              triggerOnHover={true}
              className="font-mono"
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            />
          </div>

          {/* Logo */}
          <div className="flex justify-center -mb-24">
            <div className="relative bg-transparent group">
              <Image
                src="/logo5.png"
                alt="Vortex CLI Logo"
                width={256}
                height={256}
                className="h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 bg-transparent group-hover:scale-105 transition-transform duration-300"
                style={{ background: 'transparent', backgroundColor: 'transparent' }}
                priority
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1 -mt-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight font-heading">
              <span className="text-foreground">Vortex</span>
              <span className="text-primary">CLI</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Lightning-Fast YouTube Browser for Terminal
            </p>
          </div>

          {/* Cycling Features */}
          <div className="flex justify-center items-center gap-3 py-2">
            <div className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
              {React.createElement(features[currentFeature].icon, {
                className: "h-6 w-6 text-primary"
              })}
              <span className="text-base font-semibold text-primary">
                {features[currentFeature].text}
              </span>
            </div>
          </div>

          {/* One-liner */}
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            A powerful, lightning-fast YouTube browser for your terminal. Browse, stream, and download YouTube content without leaving your command line with beautiful previews and fuzzy search.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#install">
                <Terminal className="mr-2 h-4 w-4" />
                Install
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://github.com/codewithevilxd/vortex-cli" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span>Bash</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span>Fuzzy Search</span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <span>Stream & Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-primary" />
              <span>YouTube</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
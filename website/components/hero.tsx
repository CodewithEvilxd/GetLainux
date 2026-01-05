'use client'

import { Github, Server, Zap, Shield, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { InteractiveText } from './interactive-text'
import ShuffleText from './shuffle-text'

const handleDirectDownload = (e: React.MouseEvent<HTMLAnchorElement>, url: string, filename: string) => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const stats = [
  { icon: Server, label: 'Arch Linux' },
  { icon: Zap, label: 'Fast' },
  { icon: Shield, label: 'Minimal' },
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:pt-4">
      <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-0 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-border bg-muted/50 backdrop-blur-sm text-xs sm:text-sm font-bold text-muted-foreground font-pixel mt-0 mb-0">
            <ShuffleText
              text="v0.1 Beta"
              tag="span"
              duration={0.65}
              shuffleTimes={2}
              stagger={0.05}
              animationMode="evenodd"
              loop={true}
              loopDelay={2}
              triggerOnHover={true}
              className="font-pixel"
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            />
          </div>

          {/* Logo */}
          <div className="flex justify-center mt-1 sm:mt-2 mb-0">
            <div className="relative bg-transparent">
              <Image
                src="/logo.png"
                alt="GetLainux Logo"
                width={160}
                height={160}
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 bg-transparent"
                style={{ background: 'transparent', backgroundColor: 'transparent' }}
                priority
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-1.5 mt-2 sm:mt-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] font-heading px-2">
              <InteractiveText text="GetLainux" className="text-foreground" />
            </h1>
          </div>

          <p className="text-base sm:text-xl md:text-2xl font-semibold text-foreground max-w-3xl mx-auto leading-relaxed mt-3 sm:mt-4 px-4">
            Minimal Linux distribution built on Arch. Custom kernel, zero bloat, full control. For developers who understand their system.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center mt-4 sm:mt-5 px-4">
            <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
              <Link href="#installation">
                Get Started
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="https://github.com/CodewithEvilxd/GetLainux" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">View on GitHub</span>
                <span className="sm:hidden">GitHub</span>
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-5 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base font-bold text-foreground">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

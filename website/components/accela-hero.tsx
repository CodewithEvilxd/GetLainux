'use client'

import { useState } from 'react'
import { Zap, Code, Cpu, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { InteractiveText } from './interactive-text'

const stats = [
  { icon: Cpu, label: 'C & Assembly' },
  { icon: Code, label: 'Protocol Language' },
  { icon: Zap, label: 'High Performance' },
]

export function NexusHero() {
  const [logoError, setLogoError] = useState(false)

  return (
    <section id="home" className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20 md:pt-4">
      <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-0 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-2 sm:space-y-3">
          {/* Back to Projects */}
          <div className="flex justify-start mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mt-1 sm:mt-2 mb-0">
            <div className="relative bg-transparent">
              <Image
                src={logoError ? "/logo.png" : "/nexus-logo.png"}
                alt="Nexus Logo"
                width={160}
                height={160}
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 bg-transparent"
                style={{ background: 'transparent', backgroundColor: 'transparent' }}
                priority
                onError={() => setLogoError(true)}
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-1.5 mt-2 sm:mt-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] font-heading px-2">
              <InteractiveText text="Nexus" className="text-foreground" />
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] font-heading px-2">
              <InteractiveText text="Engine" className="text-purple-500" />
            </h2>
          </div>

          <p className="text-base sm:text-xl md:text-2xl font-semibold text-foreground max-w-2xl mx-auto leading-tight mt-3 sm:mt-4 px-4">
            High-performance system execution engine written in C and Assembly. Bridge between the kernel and Protocol programming language.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center mt-4 sm:mt-5 px-4">
            <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
              <a href="https://github.com/codewithevilxd/Nexus" target="_blank" rel="noopener noreferrer">
                <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                View on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#installation">
                Get Started
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-5 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-base font-bold text-foreground">
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


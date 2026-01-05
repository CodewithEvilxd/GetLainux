'use client'

import { useState } from 'react'
import { Terminal, Download, Github, Code } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export function ApexLinuxHero() {
  const [logoError, setLogoError] = useState(false)

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center py-12 sm:py-16">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative bg-transparent">
              <Image
                src={logoError ? "/logo.png" : "/apexlinux-logo.png"}
                alt="ApexLinux Logo"
                width={160}
                height={160}
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 bg-transparent"
                style={{ background: 'transparent', backgroundColor: 'transparent' }}
                priority
                onError={() => setLogoError(true)}
              />
            </div>
          </div>

          {/* Minimal Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight font-heading">
              <span className="text-foreground">Apex</span>
              <span className="text-primary">Linux</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              QML-based shell for Linux
            </p>
          </div>

          {/* One-liner */}
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Minimal, customizable shell built with Quickshell. Control your desktop with QML.
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
              <a href="https://github.com/codewithevilxd/ApexLinux" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              <span>QML</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span>Quickshell</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-primary" />
              <span>Modular</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

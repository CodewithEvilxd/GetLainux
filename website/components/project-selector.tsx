'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Server, Cpu, Terminal, Palette } from 'lucide-react'
import { Button } from './ui/button'

function ProjectLogo({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [imgSrc, setImgSrc] = useState(src)
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={96}
      height={96}
      className={className}
      style={style}
      onError={() => setImgSrc("/logo.png")}
    />
  )
}

const projects = [
  {
    id: 'apexlinux',
    name: 'ApexLinux',
    title: 'Minimal Linux Shell',
    description: 'A highly optimized, customizable QML-based shell for Linux. Designed for performance and aesthetic control.',
    icon: Terminal,
    href: '/apexlinux',
    features: ['QML Based', 'Highly Customizable', 'Lightweight', 'IPC Commands', 'Modular Design'],
    logo: '/apexlinux-logo.png',
    status: 'Active',
    handle: 'apexlinux',
    details: [
      'QML-based UI for modern aesthetics',
      'Modular architecture for easy customization',
      'IPC for seamless interaction with system services',
      'Optimized for minimal resource usage',
      'Extensive theming capabilities'
    ]
  },
  {
    id: 'getlainux',
    name: 'GetLainux',
    title: 'Linux Distribution',
    description: 'Minimal Linux distribution built on Arch. Custom installer, optimized kernel, zero bloat. Start with bare minimum, build exactly what you need. For developers who understand their system.',
    icon: Server,
    href: '/getlainux',
    features: ['Arch Linux Based', 'Custom Installer', 'Custom Kernel Optimization', 'Minimal & Fast', 'Full Control', 'C Utilities'],
    logo: '/logo.png',
    status: 'Active',
    handle: 'getlainux',
    details: [
      'Custom C-based installer with TUI',
      'Works on Arch, Ubuntu, Debian, Kali, Fedora',
      'Pre-configured minimal base system',
      'Custom kernel optimization',
      'Core package management'
    ]
  },
  {
    id: 'nexus',
    name: 'Nexus Engine',
    title: 'System Execution Engine',
    description: 'High-performance system execution engine with Protocol language. Bridge between kernel and system automation. Low-level control with high-level abstraction.',
    icon: Cpu,
    href: '/nexus',
    features: ['C & Assembly', 'Protocol Language', 'System Automation', 'Kernel Bridge'],
    logo: '/nexus-logo.png',
    status: 'Active',
    handle: 'nexus',
    details: [
      'Protocol language for system automation',
      'C and Assembly for performance',
      'Direct kernel interaction',
      'System execution engine',
      'Automation bridge'
    ]
  },
  {
    id: 'lainux-cyber-theme',
    name: 'Lainux Cyber',
    title: 'KDE Plasma Theme',
    description: 'Complete KDE Plasma 6 desktop theme with cyberpunk aesthetics. Cyan-dominant palette optimized for OLED displays with cohesive theming from boot to desktop.',
    icon: Palette,
    href: '/lainux-cyber-theme',
    features: ['KDE Plasma 6', 'OLED Optimized', 'Cyberpunk Aesthetic', 'Complete Theming', 'Auto Hardware Detection'],
    logo: '/logo3.png',
    status: 'Active',
    handle: 'lainux-cyber-theme',
    details: [
      'Complete desktop theme for KDE Plasma 6',
      'Cyan/magenta/yellow cyberpunk color palette',
      'OLED optimized near-black backgrounds',
      'Cohesive boot splash → login → desktop theming',
      'Auto-detected hardware sensors for Conky'
    ]
  }
]

interface ProfileCardProps {
  project: typeof projects[0]
}

function ProfileCard({ project }: ProfileCardProps) {
  const Icon = project.icon

  return (
    <Link href={project.href} className="group block h-full">
      <div className="relative h-full bg-card border border-border rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg cursor-pointer flex flex-col">
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative flex-shrink-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border border-primary/20 bg-muted">
                <ProjectLogo
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  className="w-full h-full object-cover bg-transparent"
                  style={{ background: 'transparent', backgroundColor: 'transparent' }}
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-base sm:text-lg md:text-xl font-black font-heading group-hover:text-primary transition-colors tracking-tight">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 rounded">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs font-bold text-green-500 font-game">{project.status}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-0.5 font-sans">
                {project.title}
              </p>
              <p className="text-xs font-medium text-muted-foreground/70 font-mono">
                @{project.handle}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm font-medium text-foreground/85 leading-relaxed mb-3 sm:mb-4 font-sans break-words">
            {project.description}
          </p>

          {/* Details List */}
          {project.details && (
            <div className="mb-3 sm:mb-4 space-y-1.5 bg-muted/20 border border-border/50 rounded-md p-2.5 sm:p-3 max-h-32 sm:max-h-40 overflow-y-auto">
              {project.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs font-medium text-foreground/75">
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  <span className="font-sans">{detail}</span>
                </div>
              ))}
            </div>
          )}

          {/* Features Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
            {project.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-semibold bg-primary/5 border border-primary/20 rounded text-foreground/85 hover:bg-primary/10 hover:border-primary/30 transition-colors font-game break-words"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <Button
            size="lg"
            className="w-full font-semibold border hover:bg-primary hover:text-primary-foreground transition-all text-xs sm:text-sm mt-auto"
            variant="outline"
          >
            Explore {project.name}
            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

export function ProjectSelector() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-0 pb-8 sm:pb-12" suppressHydrationWarning>
      {/* OPEN SOURCE Badge - Right below navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-2 pb-1 relative z-10 flex justify-end">
        <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm border border-border/70 rounded-lg text-xs font-semibold text-foreground/75 font-mono tracking-wider shadow-sm hover:from-muted/70 hover:to-muted/50 hover:border-primary/50 hover:text-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <span className="w-2 h-2 rounded-full bg-primary/60 border border-primary/30"></span>
          OPEN SOURCE
        </span>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10 w-full flex-1 flex flex-col">
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0 border-b border-border/50 pb-4 sm:pb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] font-heading mb-2 sm:mb-3 px-2">
            <span className="text-foreground">GetLainux</span>
            <span className="text-primary"> Ecosystem</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground/85 max-w-2xl mx-auto mb-1 sm:mb-2 font-sans px-4">
            Open-source Linux projects by CodeWithEvilXD (Nishant Gaurav) for system-level development
          </p>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground max-w-xl mx-auto font-sans px-4">
            ApexLinux, GetLainux, Nexus Engine, Lainux Cyber Theme - Choose a project to explore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto w-full overflow-x-hidden">
          {projects.map((project) => (
            <ProfileCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-border/50 flex-shrink-0">
          <p className="text-xs sm:text-sm font-medium text-foreground/75 font-sans px-4">
            All projects are part of the GetLainux ecosystem
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4">
            <p className="text-xs font-medium text-muted-foreground font-mono">
              Developed by <a href="https://nishantdev.space" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Nishant Gaurav</a> (<span className="font-semibold text-foreground/80">codewithevilxd</span>)
            </p>
            <span className="hidden sm:block text-muted-foreground/50">•</span>
            <p className="text-xs font-medium text-muted-foreground font-mono">
              Open Source • GPL-3.0
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Terminal, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
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
    id: 'getlainux',
    name: 'GetLainux',
    title: 'Linux Distribution',
    description: 'A minimal Linux distribution built on Arch Linux. For developers who want control, not convenience.',
    icon: Terminal,
    color: 'from-blue-500 to-cyan-500',
    href: '/getlainux',
    features: ['Arch Linux Based', 'Minimal & Fast', 'Full Control'],
    logo: '/logo.png',
    status: 'Active',
    handle: 'getlainux'
  },
  {
    id: 'nexus',
    name: 'Nexus Engine',
    title: 'System Execution Engine',
    description: 'High-performance system execution engine with Protocol language. Bridge between kernel and system automation.',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    href: '/nexus',
    features: ['C & Assembly', 'Protocol Language', 'System Automation'],
    logo: '/nexus-logo.png',
    status: 'Active',
    handle: 'nexus'
  }
]

interface ProfileCardProps {
  project: typeof projects[0]
  enableTilt?: boolean
}

function ProfileCard({ project, enableTilt = true }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const Icon = project.icon

  return (
    <Link href={project.href} className="group block h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full bg-card border-2 border-border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary/50 overflow-hidden cursor-pointer"
        style={{
          transform: enableTilt
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : 'scale(1.02)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Avatar/Logo Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ProjectLogo
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  className="w-full h-full object-cover bg-transparent"
                  style={{ background: 'transparent', backgroundColor: 'transparent' }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>

          {/* Name and Title */}
          <div className="mb-3">
            <h3 className="text-2xl sm:text-3xl font-black font-heading mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-muted-foreground mb-2">
              {project.title}
            </p>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground/80">
              @{project.handle}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-green-500">{project.status}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base font-medium text-foreground/80 leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-xs sm:text-sm font-bold bg-muted/50 border border-border rounded-lg text-foreground/80 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <Button
            size="lg"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-bold border-2"
            variant="outline"
          >
            Explore {project.name}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
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
    return null
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 w-full">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight font-heading mb-4">
            Choose Your Project
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground max-w-2xl mx-auto">
            Select a project to explore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProfileCard
              key={project.id}
              project={project}
              enableTilt={true}
            />
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base font-medium text-muted-foreground">
            Both projects are part of the GetLainux ecosystem
          </p>
        </div>
      </div>
    </section>
  )
}

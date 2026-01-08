'use client'

import { useState } from 'react'
import { Github, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from './ui/button'

export function Footer() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)
  const isNexusPage = pathname === '/nexus'
  const isGetLainuxPage = pathname === '/getlainux'
  const isApexLinuxPage = pathname === '/apexlinux'
  const isLainuxCyberPage = pathname === '/lainux-cyber-theme'
  const isHomePage = pathname === '/'

  // Determine which project we're showing
  const projectName = isNexusPage ? 'Nexus' : isApexLinuxPage ? 'ApexLinux' : isLainuxCyberPage ? 'Lainux Cyber' : 'GetLainux'
  const projectLogo = isNexusPage
    ? (logoError ? "/logo.png" : "/nexus-logo.png")
    : isApexLinuxPage
    ? "/apexlinux-logo.png"
    : isLainuxCyberPage
    ? "/logo3.png"
    : "/logo.png"
  const projectDescription = isNexusPage
    ? 'High-performance system execution engine. Bridge between kernel and Protocol language.'
    : isApexLinuxPage
    ? 'Minimal, customizable QML-based shell for Linux. Control your desktop with QML.'
    : isLainuxCyberPage
    ? 'Complete KDE Plasma 6 desktop theme with cyberpunk aesthetics. Cyan-dominant palette optimized for OLED displays.'
    : 'Minimal Linux distro built on Arch. For developers who want control, not convenience.'
  const githubUrl = isNexusPage
    ? "https://github.com/codewithevilxd/Nexus"
    : isApexLinuxPage
    ? "https://github.com/codewithevilxd/ApexLinux"
    : isLainuxCyberPage
    ? "https://github.com/codewithevilxd/lainux-cyber-theme"
    : "https://github.com/CodewithEvilxd/GetLainux"

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`relative bg-transparent ${isLainuxCyberPage ? 'h-8 w-8' : 'h-6 w-6'}`}>
                <Image
                  src={projectLogo}
                  alt={`${projectName} Logo`}
                  width={isLainuxCyberPage ? 32 : 24}
                  height={isLainuxCyberPage ? 32 : 24}
                  className={`${isLainuxCyberPage ? 'h-8 w-8' : 'h-6 w-6'} bg-transparent`}
                  style={{ background: 'transparent', backgroundColor: 'transparent' }}
                  onError={() => {
                    if (isNexusPage) setLogoError(true)
                  }}
                />
              </div>
              <span className="font-bold text-lg font-heading">{projectName}</span>
            </div>
            <p className="text-base font-medium text-foreground">
              {projectDescription}
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2 text-base">Quick Links</h3>
            <ul className="space-y-1.5 text-base">
              <li>
                <Link href="#installation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="#usage" className="text-muted-foreground hover:text-foreground transition-colors">
                  Usage Guide
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
             <h3 className="font-bold mb-2 text-base">Connect</h3>
             <div className="space-y-2">
               <Button variant="ghost" size="sm" asChild className="justify-start">
                 <a
                   href="https://nishantdev.space"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="font-semibold"
                 >
                   <Globe className="mr-2 h-4 w-4" />
                   Portfolio
                 </a>
               </Button>
               <Button variant="ghost" size="sm" asChild className="justify-start">
                 <a
                   href={githubUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <Github className="mr-2 h-4 w-4" />
                   GitHub
                 </a>
               </Button>
             </div>
           </div>
        </div>

        <div className="pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-base font-semibold text-foreground">
            Developed by <span className="font-bold">Nishant Gaurav</span> (<span className="font-mono">CodeWithEvilXD</span>)
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm font-medium text-muted-foreground">GPL-3.0 License</p>
            <p className="text-xs font-medium text-muted-foreground/70">
              GetLainux • ApexLinux • Nexus Engine • Lainux Cyber Theme
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

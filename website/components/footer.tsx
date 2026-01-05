'use client'

import { useState } from 'react'
import { Github } from 'lucide-react'
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
  const isHomePage = pathname === '/'

  // Determine which project we're showing
  const projectName = isNexusPage ? 'Nexus' : isApexLinuxPage ? 'ApexLinux' : 'GetLainux'
  const projectLogo = isNexusPage 
    ? (logoError ? "/logo.png" : "/nexus-logo.png")
    : isApexLinuxPage
    ? "/apexlinux-logo.png"
    : "/logo.png"
  const projectDescription = isNexusPage 
    ? 'High-performance system execution engine. Bridge between kernel and Protocol language.'
    : isApexLinuxPage
    ? 'Minimal, customizable QML-based shell for Linux. Control your desktop with QML.'
    : 'Minimal Linux distro built on Arch. For developers who want control, not convenience.'
  const githubUrl = isNexusPage 
    ? "https://github.com/codewithevilxd/Nexus"
    : isApexLinuxPage
    ? "https://github.com/codewithevilxd/ApexLinux"
    : "https://github.com/CodewithEvilxd/GetLainux"

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 relative bg-transparent">
                <Image
                  src={projectLogo}
                  alt={`${projectName} Logo`}
                  width={24}
                  height={24}
                  className="h-6 w-6 bg-transparent"
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

        <div className="pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-base font-semibold text-foreground">
            Developed by <span className="font-bold">Nishant Gaurav</span>
          </p>
          <p className="text-sm font-medium text-muted-foreground">GPL-3.0 License</p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Github, Home } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  external?: boolean
}

const getlainuxNavItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#overview', label: 'Overview' },
  { href: '#installation', label: 'Installation' },
  { href: '#usage', label: 'Usage' },
  { href: '#features', label: 'Features' },
  { href: '#terminal', label: 'Terminal' },
  { href: '#test', label: 'Test' },
  { href: '#docs', label: 'Docs' },
]

const apexlinuxNavItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#overview', label: 'Overview' },
  { href: '#install', label: 'Install' },
  { href: '#usage', label: 'Usage' },
  { href: '#features', label: 'Features' },
  { href: '/apexlinux/commands', label: 'Commands', external: true },
  { href: '#docs', label: 'Docs' },
]

const nexusNavItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#installation', label: 'Installation' },
  { href: '#docs', label: 'Docs' },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  const isGetLainuxPage = pathname === '/getlainux'
  const isApexLinuxPage = pathname === '/apexlinux'
  const isNexusPage = pathname === '/nexus'

  const navItems = isGetLainuxPage ? getlainuxNavItems : isApexLinuxPage ? apexlinuxNavItems : isNexusPage ? nexusNavItems : []
  const showNavItems = !isHomePage && navItems.length > 0

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm'
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 group">
            <div className="h-8 w-8 sm:h-10 sm:w-10 relative bg-transparent">
              <Image
                src={
                  isNexusPage 
                    ? (logoError ? "/logo.png" : "/nexus-logo.png")
                    : isApexLinuxPage
                    ? "/apexlinux-logo.png"
                    : "/logo.png"
                }
                alt={isNexusPage ? "Nexus Logo" : isApexLinuxPage ? "ApexLinux Logo" : "GetLainux Logo"}
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10 group-hover:scale-110 transition-transform bg-transparent"
                style={{ background: 'transparent', backgroundColor: 'transparent' }}
                priority
                onError={() => {
                  if (isNexusPage) setLogoError(true)
                }}
              />
            </div>
            <span className="text-xl sm:text-2xl font-black font-heading">
              {isHomePage ? 'GetLainux Ecosystem' : isNexusPage ? 'Nexus' : isApexLinuxPage ? 'ApexLinux' : 'GetLainux'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {showNavItems && (
            <div className="hidden lg:flex items-center space-x-1">
              {isHomePage && (
                <Link
                  href="/"
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  <Home className="h-4 w-4 inline mr-1" />
                  Projects
                </Link>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex h-9 w-9"
            >
              <a
                href={isNexusPage ? "https://github.com/CodewithEvilxd/Nexus" : isApexLinuxPage ? "https://github.com/codewithevilxd/ApexLinux" : "https://github.com/CodewithEvilxd/GetLainux"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && showNavItems && (
          <div className="lg:hidden border-t py-3 sm:py-4 space-y-1 animate-slide-down">
            {isHomePage && (
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Projects</span>
              </Link>
            )}
            {navItems.map((item) => (
              item.external ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
            <a
              href={isNexusPage ? "https://github.com/codewithevilxd/Nexus" : isApexLinuxPage ? "https://github.com/codewithevilxd/ApexLinux" : "https://github.com/codewithevilxd/GetLainux"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

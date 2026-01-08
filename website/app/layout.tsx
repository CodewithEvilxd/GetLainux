import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TargetCursor } from '@/components/target-cursor'
import LightRays from '@/components/light-rays'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
  weight: '400',
})

const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'GetLainux - Linux Ecosystem by Nishant Gaurav (CodeWithEvilXD)',
  description: 'Discover open-source Linux projects by Nishant Gaurav (CodeWithEvilXD): ApexLinux QML shell, GetLainux Arch Linux distro, Nexus Engine, Lainux Cyber KDE theme. Portfolio: nishantdev.space',
  keywords: ['GetLainux', 'Linux', 'Arch Linux', 'CodeWithEvilXD', 'Nishant Gaurav', 'nishantdev.space', 'ApexLinux', 'Nexus Engine', 'Lainux Cyber', 'Linux Distribution', 'QML Shell', 'KDE Plasma Theme', 'Open Source', 'System Programming', 'Portfolio'],
  authors: [{ name: 'Nishant Gaurav', url: 'https://github.com/codewithevilxd' }],
  creator: 'CodeWithEvilXD',
  publisher: 'Nishant Gaurav',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.getlainux.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GetLainux - Linux Ecosystem by Nishant Gaurav (CodeWithEvilXD)',
    description: 'Open-source Linux projects by Nishant Gaurav (CodeWithEvilXD): ApexLinux QML shell, GetLainux Arch Linux distro, Nexus Engine, Lainux Cyber KDE theme. Visit portfolio: nishantdev.space',
    url: 'https://www.getlainux.in',
    siteName: 'GetLainux',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'GetLainux - Linux Ecosystem by Nishant Gaurav',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetLainux - Linux Ecosystem by Nishant Gaurav',
    description: 'Open-source Linux projects by Nishant Gaurav (CodeWithEvilXD): ApexLinux, GetLainux, Nexus Engine, Lainux Cyber theme. Portfolio: nishantdev.space',
    images: ['/logo.png'],
    creator: '@codewithevilxd',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  other: {
    'script[type="application/ld+json"]': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GetLainux",
      "description": "Open-source Linux ecosystem by CodeWithEvilXD (Nishant Gaurav)",
      "url": "https://www.getlainux.in",
      "author": {
        "@type": "Person",
        "name": "Nishant Gaurav",
        "alternateName": "CodeWithEvilXD",
        "url": "https://nishantdev.space",
        "sameAs": [
          "https://github.com/codewithevilxd",
          "https://nishantdev.space",
          "https://www.getlainux.in"
        ],
        "jobTitle": "Software Developer",
        "knowsAbout": ["Linux", "System Programming", "QML", "Arch Linux", "Open Source Development"]
      },
      "publisher": {
        "@type": "Person",
        "name": "Nishant Gaurav"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.getlainux.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": [
        {
          "@type": "SoftwareApplication",
          "name": "ApexLinux",
          "description": "Minimal QML-based Linux shell",
          "url": "https://www.getlainux.in/apexlinux"
        },
        {
          "@type": "SoftwareApplication",
          "name": "GetLainux",
          "description": "Custom Arch Linux distribution",
          "url": "https://www.getlainux.in/getlainux"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Nexus Engine",
          "description": "System execution engine",
          "url": "https://www.getlainux.in/nexus"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Lainux Cyber Theme",
          "description": "KDE Plasma cyberpunk theme",
          "url": "https://www.getlainux.in/lainux-cyber-theme"
        }
      ]
    })
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} ${vt323.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TargetCursor />
          <LightRays
            raysOrigin="top-center"
            raysColor="#3b82f6"
            raysSpeed={1.5}
            lightSpread={0.7}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.15}
            fadeDistance={1.5}
          />
          <div className="flex min-h-screen flex-col relative bg-white dark:bg-black text-gray-800 dark:text-gray-200 overflow-hidden">
            {/* Zigzag Lightning - Light Pattern (only visible in light theme) */}
            <div
              className="absolute inset-0 z-0 pointer-events-none dark:hidden"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
                  repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
                  repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
                  repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
                `,
              }}
            />
            {/* Vercel Grid - Dark Theme Background */}
            <div
              className="absolute inset-0 z-0 opacity-30 hidden dark:block"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


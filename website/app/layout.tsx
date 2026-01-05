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
  title: 'GetLainux - Documentation',
  description: 'A highly specialized, command-line-centric Linux distribution built on Arch Linux',
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


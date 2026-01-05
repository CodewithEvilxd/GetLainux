'use client'

import { Terminal, Settings, Palette, Zap, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function ApexLinuxOverview() {
  return (
    <section id="overview" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* What is it */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">What is ApexLinux?</h2>
            <div className="space-y-3 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                <strong>ApexLinux</strong> is a QML-based shell configuration for Quickshell. It provides a minimal, customizable desktop environment with panels, launchers, and system controls.
              </p>
              <p>
                Built entirely in QML, you can modify every aspect of the shell by editing QML files. No complex configuration languages—just QML.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/apexlinux/docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    See Full Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Terminal className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">App Launcher</h3>
                <p className="text-sm text-muted-foreground">Quick access to applications with search</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Settings Panel</h3>
                <p className="text-sm text-muted-foreground">Configure shell, wallpaper, and themes</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Wallpaper Manager</h3>
                <p className="text-sm text-muted-foreground">Set wallpapers with color extraction</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">IPC Commands</h3>
                <p className="text-sm text-muted-foreground">Control shell via terminal commands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

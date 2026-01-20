'use client'

import { Shuffle, Palette, Terminal, Settings, Zap, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function FlavourSwitchOverview() {
  return (
    <section id="overview" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* What is it */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">What is FlavourSwitch?</h2>
            <div className="space-y-3 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                <strong>FlavourSwitch</strong> is a powerful, lightweight CLI tool that revolutionizes how you manage multiple QuickShell configurations (flavours). Built for Hyprland users who love customizing their desktop experience, it provides instant theme switching with intelligent keybind management and a beautiful interactive panel.
              </p>
              <p>
                Switch between QuickShell themes in milliseconds, manage unlimited custom themes, and enjoy automatic keybind conflict resolution. All with a self-healing configuration system that detects and fixes issues automatically.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="#docs">
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
            <h2 className="text-3xl sm:text-4xl font-black font-heading">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Shuffle className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Instant Switching</h3>
                <p className="text-sm text-muted-foreground">Switch between themes in milliseconds</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Palette className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Theme Management</h3>
                <p className="text-sm text-muted-foreground">Support for unlimited custom themes</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Terminal className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Interactive Panel</h3>
                <p className="text-sm text-muted-foreground">Beautiful GUI panel for theme selection</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Keybind Management</h3>
                <p className="text-sm text-muted-foreground">Intelligent conflict resolution</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Auto-Fix System</h3>
                <p className="text-sm text-muted-foreground">Self-healing configuration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
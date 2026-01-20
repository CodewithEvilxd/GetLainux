'use client'

import { Shuffle, Palette, Terminal, Settings, Zap, Shield, Code, Cpu, Layers } from 'lucide-react'

export function FlavourSwitchFeatures() {
  return (
    <section id="features" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">
              Advanced Features
            </h2>
            <p className="text-base text-muted-foreground">
              Powerful features that make FlavourSwitch stand out
            </p>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg space-y-4">
              <Shuffle className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Instant Switching</h3>
              <p className="text-muted-foreground">
                Switch between QuickShell themes in milliseconds with zero downtime.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Palette className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Unlimited Themes</h3>
              <p className="text-muted-foreground">
                Support for unlimited custom themes and flavours with easy management.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Terminal className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Interactive Panel</h3>
              <p className="text-muted-foreground">
                Beautiful GUI panel for theme selection with live previews.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Settings className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Smart Keybind Management</h3>
              <p className="text-muted-foreground">
                Automatic conflict resolution and intelligent keybind switching.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Zap className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Auto-Fix System</h3>
              <p className="text-muted-foreground">
                Self-healing configuration that detects and fixes issues automatically.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Type Safe</h3>
              <p className="text-muted-foreground">
                Written in Go with comprehensive error handling and type safety.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Code className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Shell Completions</h3>
              <p className="text-muted-foreground">
                Full bash, zsh, and fish completion support for faster workflow.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Cpu className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Minimal resource usage with instant response times.
              </p>
            </div>
            <div className="p-6 border rounded-lg space-y-4">
              <Layers className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">QML Interface</h3>
              <p className="text-muted-foreground">
                Beautiful QML-based panel with smooth animations and theme previews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
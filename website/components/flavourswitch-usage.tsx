'use client'

import { Terminal, Keyboard, Command, FileText, Settings, Info } from 'lucide-react'

export function FlavourSwitchUsage() {
  return (
    <section id="usage" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Command className="h-8 w-8 text-primary" />
              Usage Guide
            </h2>
            <p className="text-base text-muted-foreground">
              Complete guide on how to use FlavourSwitch theme manager
            </p>
          </div>

          {/* Basic Commands */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              Basic Commands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Cycle to next theme</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Switch to specific theme</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch apply {"<theme>"}
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Show all themes</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch list
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Show active theme</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch current
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Open theme panel</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch panel
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Reload keybinds</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch reload
                </code>
              </div>
            </div>
          </div>

          {/* Advanced Usage */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Advanced Usage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Force setup (overwrite config)</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch exp-setup --force
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Switch only keybinds</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch switch-keybinds {"<theme>"}
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">List themes with status</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch list --status
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Apply current theme again</p>
                <code className="text-xs font-mono text-muted-foreground">
                  flavourswitch apply --current
                </code>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Configuration
            </h3>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Config File Location</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded mb-2">
                  ~/.config/flavourswitch/config.json
                </code>
                <p className="text-sm text-muted-foreground">
                  Edit this JSON file to customize theme settings and keybinds.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">Pro Tips:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use the interactive panel for easy theme selection</li>
                  <li>• Keybinds are automatically managed to avoid conflicts</li>
                  <li>• Configuration auto-reloads on changes</li>
                  <li>• Supports unlimited custom themes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
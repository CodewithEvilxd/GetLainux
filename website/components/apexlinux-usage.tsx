'use client'

import { Terminal, Keyboard, Command, FileText, Folder, Code, Settings, Info } from 'lucide-react'
import Link from 'next/link'

export function ApexLinuxUsage() {
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
              Complete guide on how to use ApexLinux shell
            </p>
          </div>

          {/* Getting Started */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              Getting Started
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">1. Install Quickshell</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded">
                  sudo pacman -S quickshell
                </code>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">2. Clone ApexLinux Config</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded">
                  git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
                  cp -r /tmp/apexlinux-temp/apexlinux/* ~/.config/quickshell/evilxd/
                  rm -rf /tmp/apexlinux-temp
                </code>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">3. Start Shell</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded">
                  qs -c evilxd
                </code>
              </div>
            </div>
          </div>

          {/* IPC Commands */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Command className="h-6 w-6 text-primary" />
              IPC Commands
            </h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-foreground mb-3">
                Control the shell from terminal using IPC commands. Format:
              </p>
              <code className="block text-xs font-mono bg-background p-2 rounded mb-3">
                qs -c evilxd ipc call &lt;target&gt; &lt;function&gt;
              </code>
              <Link 
                href="/apexlinux/commands"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View all commands →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Open Launcher</p>
                <code className="text-xs font-mono text-muted-foreground">
                  qs -c evilxd ipc call launcher toggle
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Open Settings</p>
                <code className="text-xs font-mono text-muted-foreground">
                  qs -c evilxd ipc call settings toggle
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Lock Screen</p>
                <code className="text-xs font-mono text-muted-foreground">
                  qs -c evilxd ipc call lock lock
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Power Menu</p>
                <code className="text-xs font-mono text-muted-foreground">
                  qs -c evilxd ipc call powermenu toggle
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
                  ~/.config/evilxd/config.json
                </code>
                <p className="text-sm text-muted-foreground">
                  Edit this JSON file to customize shell settings. Changes are applied automatically.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Available Settings</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <code className="text-xs bg-muted px-1 rounded">fontFamily</code> - Font family for shell</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">fontSize</code> - Font size</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">wallpaperDirectory</code> - Wallpaper folder path</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">barPosition</code> - Bar position (top/bottom)</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">floatingBar</code> - Enable floating bar</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">colors</code> - Color scheme object</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">disableLockBlur</code> - Disable lock screen blur</li>
                  <li>• <code className="text-xs bg-muted px-1 rounded">lockScreenMusicMode</code> - Music mode on lock</li>
                </ul>
              </div>
            </div>
          </div>

          {/* File Structure */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Folder className="h-6 w-6 text-primary" />
              File Structure
            </h3>
            <div className="p-4 border rounded-lg space-y-2">
              <code className="block text-xs font-mono">
                ~/.config/quickshell/evilxd/<br/>
                ├── Core/           # Core components (Config, Colors, IPC)<br/>
                ├── Modules/       # Shell modules (Bar, Launcher, Lock, etc.)<br/>
                │   ├── Bar/       # Top/bottom bar<br/>
                │   ├── Launcher/  # App launcher<br/>
                │   ├── Lock/      # Lock screen<br/>
                │   ├── Panels/    # Side panels<br/>
                │   └── Settings/  # Settings window<br/>
                ├── Services/      # System services<br/>
                ├── Assets/        # Images, icons<br/>
                └── apexlinux.qml  # Main entry point
              </code>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              Customization
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Editing QML Files</p>
                <p className="text-muted-foreground mb-2">
                  All shell components are QML files. Edit them directly to customize:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Panel layouts and sizes</li>
                  <li>• Colors and themes</li>
                  <li>• Animations and transitions</li>
                  <li>• Widget positions</li>
                  <li>• Behavior and interactions</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Reloading Changes</p>
                <p className="text-muted-foreground mb-2">
                  After editing QML files, reload the shell:
                </p>
                <code className="block text-xs font-mono bg-muted p-2 rounded">
                  qs -c evilxd ipc call powermenu toggle  # Then select "Reload"
                </code>
                <p className="text-muted-foreground mt-2 text-xs">
                  Or restart Quickshell: <code className="bg-muted px-1 rounded">pkill qs && qs -c evilxd &</code>
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
                  <li>• Use keyboard shortcuts for faster access (check settings)</li>
                  <li>• Side panel auto-hides unless locked</li>
                  <li>• Wallpaper colors are extracted automatically</li>
                  <li>• All panels support IPC control for scripting</li>
                  <li>• Settings panel has live preview of changes</li>
                  <li>• Lock screen supports multiple view modes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

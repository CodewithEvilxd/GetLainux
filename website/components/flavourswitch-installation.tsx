'use client'

import { Terminal, Copy, Check, Info } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {title && (
        <div className="text-sm font-semibold mb-2 text-foreground">{title}</div>
      )}
      <div className="relative bg-muted rounded-lg p-4 border">
        <pre className="text-sm font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}

export function FlavourSwitchInstallation() {
  return (
    <section id="install" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Installation
            </h2>
            <p className="text-base text-muted-foreground">Install FlavourSwitch theme manager</p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Prerequisites</h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-foreground mb-2">You need Go and CMake installed:</p>
              <CodeBlock code="sudo pacman -S go cmake" title="Arch Linux" />
              <CodeBlock code="sudo apt install golang cmake" title="Ubuntu/Debian" />
              <CodeBlock code="sudo dnf install golang cmake" title="Fedora" />
            </div>
          </div>

          {/* Automated Setup */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Automated Setup (Recommended)</h3>
            <CodeBlock
              code={`git clone https://github.com/CodewithEvilxd/flavourswitch.git
cd flavourswitch
chmod +x setup.sh
./setup.sh`}
              title="Clone and install automatically"
            />
            <p className="text-sm text-muted-foreground">
              The setup script will automatically install FlavourSwitch and offer to install popular QuickShell themes like Caelestia, Noctalia, DMS, and Illogical Impulse.
            </p>
          </div>

          {/* Manual Installation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Manual Installation</h3>

            {/* CMake Build */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Option 1: CMake Build</h4>
              <CodeBlock
                code={`mkdir build && cd build
cmake .. && make
sudo make install
flavourswitch exp-setup`}
                title="Build and install with CMake"
              />
            </div>

            {/* Go Build */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Option 2: Go Build</h4>
              <CodeBlock
                code={`go build -o flavourswitch .
sudo cp flavourswitch /usr/local/bin/
sudo cp man/flavourswitch.1 /usr/local/share/man/man1/
# Install completions
sudo cp completions/flavourswitch.bash /usr/share/bash-completion/completions/
sudo cp completions/flavourswitch.zsh /usr/share/zsh/site-functions/
sudo cp completions/flavourswitch.fish /usr/share/fish/vendor_completions.d/
# Install QML interface
sudo mkdir -p /etc/xdg/quickshell/flavourswitch
sudo cp -r quickshell/* /etc/xdg/quickshell/flavourswitch/`}
                title="Build and install with Go"
              />
            </div>

            {/* AUR */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Option 3: AUR Package (Arch Linux)</h4>
              <CodeBlock
                code={`yay -S flavourswitch-git
# or
paru -S flavourswitch-git`}
                title="Install from AUR"
              />
            </div>
          </div>

          {/* Post-Installation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Post-Installation Setup</h3>
            <CodeBlock
              code="flavourswitch exp-setup"
              title="Run initial setup"
            />
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-foreground">Note:</p>
                  <p className="text-muted-foreground">
                    This creates configuration directories and integrates with Hyprland.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
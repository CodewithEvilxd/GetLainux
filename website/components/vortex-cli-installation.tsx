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

export function VortexCliInstallation() {
  return (
    <section id="install" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Installation
            </h2>
            <p className="text-base text-muted-foreground">Install Vortex CLI YouTube browser</p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Prerequisites</h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-foreground mb-2">Required dependencies:</p>
              <CodeBlock code="bash jq curl yt-dlp fzf mpv ffmpeg" title="Required" />
              <p className="text-sm text-foreground mb-2 mt-4">Optional dependencies:</p>
              <CodeBlock code="gum rofi chafa icat kitty wezterm" title="Optional" />
            </div>
          </div>

          {/* Quick Install */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Install (Cross-platform)</h3>
            <CodeBlock
              code={`# One-liner install
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o ~/.local/bin/vortex-cli && chmod +x ~/.local/bin/vortex-cli

# Verify installation
vortex-cli --version`}
              title="Download and install"
            />
          </div>

          {/* Linux Distributions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Linux Distributions</h3>

            {/* Arch Linux */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Arch Linux (AUR)</h4>
              <CodeBlock
                code={`# Using yay
yay -S vortex-cli-git

# Using paru
paru -S vortex-cli-git`}
                title="Install from AUR"
              />
            </div>

            {/* NixOS */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">NixOS / Home Manager</h4>
              <CodeBlock
                code={`# Imperative install
nix profile install github:codewithevilxd/vortex-cli

# Declarative (add to flake.nix)
{
  inputs.vortex-cli.url = "github:codewithevilxd/vortex-cli";
  # ... rest of your flake
}`}
                title="Install with Nix"
              />
            </div>

            {/* Ubuntu/Debian */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Ubuntu/Debian</h4>
              <CodeBlock
                code={`# Install dependencies
sudo apt update
sudo apt install jq curl yt-dlp fzf mpv ffmpeg

# Install Vortex CLI
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o /usr/local/bin/vortex-cli
chmod +x /usr/local/bin/vortex-cli`}
                title="Install on Ubuntu/Debian"
              />
            </div>
          </div>

          {/* macOS */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">macOS</h3>
            <CodeBlock
              code={`# Using Homebrew
brew install jq yt-dlp fzf mpv ffmpeg
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o /usr/local/bin/vortex-cli
chmod +x /usr/local/bin/vortex-cli`}
              title="Install on macOS"
            />
          </div>

          {/* Android */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Android (Termux)</h3>
            <CodeBlock
              code={`pkg install jq curl python yt-dlp fzf mpv ffmpeg
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o $PREFIX/bin/vortex-cli
chmod +x $PREFIX/bin/vortex-cli`}
              title="Install on Termux"
            />
          </div>

          {/* Post-Installation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Start</h3>
            <CodeBlock
              code={`# Launch the main interface
vortex-cli

# Search for videos
vortex-cli -S "your search query"

# Edit configuration
vortex-cli -e

# Get help
vortex-cli --help`}
              title="Basic usage"
            />
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-foreground">Note:</p>
                  <p className="text-muted-foreground">
                    Configuration is stored in <code>~/.config/vortex-cli/</code>. Run <code>vortex-cli -e</code> to edit settings.
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
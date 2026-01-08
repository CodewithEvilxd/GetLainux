'use client'

import { Terminal, Copy, Check, Info, Download, Package, Settings, Server, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false)

  // Clean code: remove common leading indentation and normalize
  const cleanCode = (() => {
    const lines = code.split('\n')
    // Find minimum indentation (excluding empty lines)
    const nonEmptyLines = lines.filter(line => line.trim().length > 0)
    if (nonEmptyLines.length === 0) return code.trim()
    
    const minIndent = Math.min(...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    }))
    
    // Remove common indentation and trim trailing spaces
    return lines
      .map(line => line.slice(minIndent).trimEnd())
      .join('\n')
      .trim()
  })()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      {title && (
        <div className="text-sm font-semibold mb-2 text-foreground">{title}</div>
      )}
      <div className="relative bg-muted rounded-lg p-4 border">
        <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
          <code className="block">{cleanCode}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
          aria-label="Copy code"
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

export function LainuxCyberInstallation() {
  return (
    <section id="install" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Installation
            </h2>
            <p className="text-base text-muted-foreground">Install Lainux Cyber theme for KDE Plasma 6</p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Prerequisites</h3>
            <div className="p-4 bg-muted/50 rounded-lg border space-y-3">
              <p className="text-sm text-foreground font-semibold">Supported distros:</p>
              <p className="text-xs text-muted-foreground">
                Arch/Manjaro/Endeavour/Garuda · Fedora/Nobara/Ultramarine · Debian/Ubuntu/Pop!_OS/Kali/Linux Mint/Zorin/Elementary · openSUSE
              </p>
              <p className="text-sm text-foreground font-semibold">Required Packages:</p>
              <CodeBlock 
                code={`# Arch / Manjaro / Endeavour / Garuda
sudo pacman -S plasma conky papirus-icon-theme curl wget

# Fedora / Nobara / Ultramarine
sudo dnf install plasma-desktop conky papirus-icon-theme curl wget

# Debian / Ubuntu / Pop!_OS / Kali / Linux Mint / Zorin / Elementary
sudo apt install plasma-desktop conky papirus-icon-theme curl wget

# openSUSE
sudo zypper install plasma5-desktop conky papirus-icon-theme curl wget`}
                title="Install dependencies"
              />
              <p className="text-sm text-foreground font-semibold mt-4">Required Fonts:</p>
              <CodeBlock 
                code={`# Arch / Manjaro / Endeavour / Garuda
sudo pacman -S ttf-jetbrains-mono ttf-cascadia-code-nerd inter-font

# Fedora / Nobara / Ultramarine
sudo dnf install jetbrains-mono-fonts cascadia-code-nf-fonts rsms-inter-fonts

# Debian / Ubuntu / Pop!_OS / Kali / Linux Mint / Zorin / Elementary
sudo apt install fonts-jetbrains-mono fonts-inter
# Note: Cascadia Code NF must be installed from Nerd Fonts releases

# openSUSE
sudo zypper install jetbrains-mono-fonts inter-fonts
# Nerd Fonts: manually install Cascadia Code NF`}
                title="Install fonts"
              />
            </div>
          </div>

          {/* Quick Install */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Install</h3>
            <p className="text-sm text-muted-foreground">
              Clone and run the installer script. It will automatically detect your hardware and install all theme components.
            </p>
            <CodeBlock 
              code={`git clone https://github.com/codewithevilxd/lainux-cyber-theme.git
cd lainux-cyber-theme
./install.sh`}
              title="Install theme"
            />
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="text-foreground font-semibold">What the installer does:</p>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>Detects your Linux distribution</li>
                    <li>Verifies dependencies</li>
                    <li>Auto-detects hardware sensors (CPU, GPU, network)</li>
                    <li>Installs all theme components</li>
                    <li>Downloads Bibata-Modern-Ice cursor</li>
                    <li>Applies theme to Plasma</li>
                    <li>Configures icon folder colors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SDDM Theme */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">SDDM Login Theme (Manual)</h3>
            <p className="text-sm text-muted-foreground">
              SDDM themes require root privileges. After running install.sh, manually install the login theme:
            </p>
            <CodeBlock 
              code={`sudo cp -r sddm/LainuxCyber /usr/share/sddm/themes/
sudo mkdir -p /etc/sddm.conf.d
sudo tee /etc/sddm.conf.d/theme.conf << 'EOF'
[Theme]
Current=LainuxCyber
EOF`}
              title="Install SDDM theme"
            />
            <p className="text-xs text-muted-foreground">
              Or use: <strong>System Settings</strong> → <strong>Colors & Themes</strong> → <strong>Login Screen (SDDM)</strong>
            </p>
          </div>

          {/* Plymouth Theme */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Plymouth Boot Splash (Optional)</h3>
            <p className="text-sm text-muted-foreground">
              Plymouth displays before SDDM during boot. Requires root and initramfs rebuild.
            </p>
            <CodeBlock 
              code={`# Fedora
sudo cp -r plymouth/Lainux /usr/share/plymouth/themes/LainuxCyber
sudo plymouth-set-default-theme -R LainuxCyber

# Arch Linux
sudo cp -r plymouth/Lainux /usr/share/plymouth/themes/LainuxCyber
sudo plymouth-set-default-theme LainuxCyber
sudo mkinitcpio -P

# Debian/Ubuntu
sudo cp -r plymouth/Lainux /usr/share/plymouth/themes/LainuxCyber
sudo plymouth-set-default-theme LainuxCyber
sudo update-initramfs -u`}
              title="Install Plymouth theme"
            />
          </div>

          {/* Uninstall */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Uninstallation</h3>
            <CodeBlock 
              code="./uninstall.sh"
              title="Remove theme"
            />
            <p className="text-xs text-muted-foreground">
              Note: SDDM theme requires manual removal with sudo. See README for details.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


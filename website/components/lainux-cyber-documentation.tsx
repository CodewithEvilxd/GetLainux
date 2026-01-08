'use client'

import { FileText, Github, Book, Code, ExternalLink, AlertTriangle, Settings, Monitor, Cpu, Layers, Eye, Database, Code2, Activity, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { CodeBlock } from './code-block'

const docs = [
  {
    icon: Github,
    title: 'GitHub Repository',
    description: 'View source code, report issues, and contribute',
    href: 'https://github.com/codewithevilxd/lainux-cyber-theme',
    external: true
  },
  {
    icon: Book,
    title: 'README',
    description: 'Complete documentation and usage guide',
    href: 'https://github.com/codewithevilxd/lainux-cyber-theme/blob/main/README.md',
    external: true
  },
  {
    icon: Code,
    title: 'Installation Script',
    description: 'View the installation script source',
    href: 'https://github.com/codewithevilxd/lainux-cyber-theme/blob/main/install.sh',
    external: true
  },
  {
    icon: FileText,
    title: 'Uninstall Script',
    description: 'View the uninstallation script',
    href: 'https://github.com/codewithevilxd/lainux-cyber-theme/blob/main/uninstall.sh',
    external: true
  }
]

export function LainuxCyberDocumentation() {
  return (
    <section id="docs" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Documentation
            </h2>
            <p className="text-base text-muted-foreground">
              Resources and links for Lainux Cyber theme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docs.map((doc, idx) => {
              const Icon = doc.icon
              return (
                <Link
                  key={idx}
                  href={doc.href}
                  target={doc.external ? '_blank' : undefined}
                  rel={doc.external ? 'noopener noreferrer' : undefined}
                  className="group"
                >
                  <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold font-heading group-hover:text-primary transition-colors">
                            {doc.title}
                          </h3>
                          {doc.external && (
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="p-6 bg-muted/50 rounded-lg border border-border">
            <h3 className="text-lg font-bold mb-4">Color Palette</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Inspired by cyberpunk aesthetics with OLED optimization. All colors are carefully chosen for optimal contrast and power efficiency on modern displays.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-[#050505] border border-border flex items-center justify-center">
                  <span className="text-white text-xs font-mono">OLED Optimized</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-mono font-semibold">#050505</p>
                  <p className="text-xs text-muted-foreground">RGB(5, 5, 5)</p>
                  <p className="text-xs font-medium">Deep Background</p>
                  <p className="text-xs text-muted-foreground">Near-black for OLED efficiency</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-[#0ABDC6] border border-border flex items-center justify-center">
                  <span className="text-white text-xs font-mono">Primary</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-mono font-semibold">#0ABDC6</p>
                  <p className="text-xs text-muted-foreground">RGB(10, 189, 198)</p>
                  <p className="text-xs font-medium">Primary Cyan</p>
                  <p className="text-xs text-muted-foreground">Main accent color</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-[#EA00D9] border border-border flex items-center justify-center">
                  <span className="text-white text-xs font-mono">Secondary</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-mono font-semibold">#EA00D9</p>
                  <p className="text-xs text-muted-foreground">RGB(234, 0, 217)</p>
                  <p className="text-xs font-medium">Magenta Accent</p>
                  <p className="text-xs text-muted-foreground">Alternative accent</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-[#F3E600] border border-border flex items-center justify-center">
                  <span className="text-black text-xs font-mono">Warning</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-mono font-semibold">#F3E600</p>
                  <p className="text-xs text-muted-foreground">RGB(243, 230, 0)</p>
                  <p className="text-xs font-medium">Warning Yellow</p>
                  <p className="text-xs text-muted-foreground">Alerts and warnings</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-2">Additional Colors</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#0A0E14] border border-border"></div>
                  <span>Window BG (#0A0E14)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#1C2632] border border-border"></div>
                  <span>Elevated (#1C2632)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#E0E8F0] border border-border"></div>
                  <span>Primary Text (#E0E8F0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#636d83] border border-border"></div>
                  <span>Secondary Text (#636d83)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              Troubleshooting
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary" />
                  Theme not applying
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Clear Plasma cache and restart if theme changes don't appear:
                </p>
                <CodeBlock code={`rm -rf ~/.cache/plasma* ~/.cache/ksvg*
kquitapp6 plasmashell && kstart plasmashell`} />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  Conky not starting
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Check for errors and verify sensors:
                </p>
                <CodeBlock code={`conky -c ~/.config/conky/lainux.conf
ls /sys/class/hwmon/*/name`} />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  HiDPI Display Configuration
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {"For high-DPI displays (>150 DPI), configure SDDM:"}
                </p>
                <CodeBlock code={`sudo mkdir -p /etc/sddm.conf.d
sudo tee /etc/sddm.conf.d/hidpi.conf << 'EOF'
[General]
GreeterEnvironment=QT_SCREEN_SCALE_FACTORS=2,QT_FONT_DPI=192

[Wayland]
EnableHiDPI=true

[X11]
ServerArguments=-dpi 192
EOF`} />
                <p className="text-xs text-muted-foreground mt-2">
                  Adjust DPI values based on your display resolution.
                </p>
              </div>
            </div>
          </div>

          {/* File Locations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">File Locations</h3>
            <p className="text-sm text-muted-foreground">
              After installation, theme files are stored in:
            </p>
            <CodeBlock code={`~/.local/share/color-schemes/LainuxCyber.colors
~/.local/share/plasma/desktoptheme/LainuxCyber/
~/.local/share/plasma/look-and-feel/com.github.codewithevilxd.lainux-cyber.splash/
~/.local/share/konsole/LainuxCyber.*
~/.themes/LainuxCyber/
~/.config/conky/lainux.conf
~/.config/autostart/conky-lainux.desktop
~/.local/share/icons/Bibata-Modern-Ice/
~/.config/kitty/kitty.conf
~/.config/ghostty/config`} />
          </div>

          {/* Conky Hardware Sensors */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary" />
              Conky Hardware Sensors
            </h3>
            <p className="text-sm text-muted-foreground">
              The installer auto-detects sensors by scanning <code>/sys/class/hwmon/*/name</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Supported Sensors</h4>
                <ul className="text-sm space-y-1">
                  <li><strong>CPU:</strong> k10temp, coretemp, zenpower</li>
                  <li><strong>GPU:</strong> amdgpu, nvidia, nouveau</li>
                  <li><strong>Network:</strong> First wireless (wl*) or ethernet (en*, eth*)</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Re-run Detection</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  After hardware changes:
                </p>
                <CodeBlock code="./install.sh" />
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button asChild variant="outline">
              <Link href="https://github.com/codewithevilxd/lainux-cyber-theme" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Full Documentation on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


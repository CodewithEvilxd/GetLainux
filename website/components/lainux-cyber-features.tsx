'use client'

import { Palette, Monitor, Sparkles, Zap, Cpu, Wifi, Battery, HardDrive, Terminal, Image as ImageIcon, Lock, Settings, Droplet, Moon, Layers, Shield, Database, Activity, Eye, Code2, Server, Globe } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Complete KDE Plasma 6 Theme',
    description: 'Comprehensive desktop theming from boot splash to desktop environment',
    details: [
      'KDE Color Scheme with cyberpunk palette (#0ABDC6, #EA00D9, #F3E600)',
      'Plasma Desktop Theme with custom SVG widgets and panels',
      'Animated splash screen with skull icon loading animation',
      'GTK 3/4 theme for native application consistency',
      'SDDM login theme with matching aesthetics',
      'Plymouth boot splash for pre-login experience'
    ]
  },
  {
    icon: Eye,
    title: 'OLED Optimized (#050505)',
    description: 'Near-black backgrounds optimized for OLED displays to reduce power consumption and eye strain',
    details: [
      'Deep black backgrounds (#050505) instead of pure black',
      'Cyan-dominant primary color (#0ABDC6) for optimal OLED efficiency',
      'Magenta secondary accents (#EA00D9) for visual hierarchy',
      'Yellow warning colors (#F3E600) for alerts and notifications',
      'Reduced power consumption on OLED panels',
      'High contrast ratios for excellent readability'
    ]
  },
  {
    icon: Database,
    title: 'Intelligent Hardware Detection',
    description: 'Auto-detects hardware sensors by scanning /sys/class/hwmon/*/name for accurate monitoring',
    details: [
      'CPU sensors: k10temp, coretemp, zenpower, acpitz, thinkpad',
      'GPU sensors: amdgpu, nvidia, nouveau, i915, xe (Intel)',
      'Network interfaces: prioritizes wireless (wl*) over ethernet (en*/eth*)',
      'Battery detection for laptop systems',
      'Hardware model name extraction for display',
      'VM detection with graceful fallback (disables temperature monitoring)'
    ]
  },
  {
    icon: Code2,
    title: 'Terminal Ecosystem',
    description: 'Complete terminal theming for Konsole, Kitty, and Ghostty with consistent cyberpunk aesthetics',
    details: [
      'Konsole: color scheme + profile with cyberpunk palette',
      'Kitty: full configuration with fonts, colors, and window settings',
      'Ghostty: terminal configuration matching the theme',
      'Nerd Font integration for icons and symbols',
      'Consistent color palette across all terminal applications',
      'Optimized for both light and dark terminal usage'
    ]
  },
  {
    icon: Activity,
    title: 'Conky System Monitor',
    description: 'Beautiful, lightweight system monitor with real-time hardware statistics',
    details: [
      'CPU usage, temperature, and frequency monitoring',
      'GPU utilization, temperature, and memory usage',
      'RAM and swap usage with visual graphs',
      'Network upload/download speeds and totals',
      'Battery status with time remaining (laptops)',
      'Top processes by CPU and memory usage',
      'Disk I/O statistics and storage usage'
    ]
  },
  {
    icon: ImageIcon,
    title: '26 Custom Wallpapers + Cursor',
    description: 'Extensive wallpaper collection and professional cursor theme for complete desktop experience',
    details: [
      '26 unique cyberpunk-themed wallpapers (PNG/JPG formats)',
      'Bibata-Modern-Ice cursor theme with 24px size',
      'Automatic wallpaper application during installation',
      'Papirus-Dark icon theme with cyan folder colors',
      'Cursor theme configuration for all desktop environments',
      'High-resolution wallpapers optimized for modern displays'
    ]
  }
]

export function LainuxCyberFeatures() {
  return (
    <section id="features" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              Features
            </h2>
            <p className="text-base text-muted-foreground">
              Everything you need for a complete cyberpunk desktop experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <ul className="space-y-1.5 mt-3">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                            <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


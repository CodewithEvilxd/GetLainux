'use client'

import { Terminal, Code, Zap, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const components = [
  {
    icon: Terminal,
    title: 'Custom Installer',
    description: 'C-based installer with ncurses TUI. Works on Arch, Ubuntu, Debian, Kali, Fedora. Builds and installs GetLainux automatically.',
  },
  {
    icon: Code,
    title: 'Core Package',
    description: 'Essential system components packaged as Arch Linux package (.pkg.tar.zst). Includes system configs, branding, and core utilities.',
  },
  {
    icon: Zap,
    title: 'Custom Kernel',
    description: 'Optimized Linux kernel compiled specifically for GetLainux. Stripped unnecessary modules, tuned for performance.',
  },
  {
    icon: Shield,
    title: 'Minimal Base',
    description: 'Arch Linux base with only essential packages. No desktop environment by default. You choose what to install.',
  },
]

const roadmap = [
  { status: 'done', text: 'Core installer with TUI interface' },
  { status: 'done', text: 'Package management system' },
  { status: 'done', text: 'Multi-distro build support' },
  { status: 'progress', text: 'Custom kernel optimization' },
  { status: 'done', text: 'getlainux-coreutils (C utilities)' },
  { status: 'pending', text: 'ISO generation pipeline' },
  { status: 'pending', text: 'Documentation and guides' },
]

const advantages = [
  {
    title: 'vs Other Minimal Distros',
    points: [
      'Custom installer - no manual Arch setup',
      'Pre-configured base system',
      'Automated package management',
      'Multi-distro build support',
    ],
  },
  {
    title: 'vs Full Desktop Distros',
    points: [
      'No bloat - install only what you need',
      'Faster boot times',
      'Lower resource usage',
      'Full control over system',
    ],
  },
]

export function Overview() {
  return (
    <section id="overview" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* What is GetLainux */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 font-heading text-center">
            What is GetLainux?
          </h2>
          <div className="space-y-4 text-base sm:text-lg font-medium text-foreground/90 leading-relaxed">
            <p>
              GetLainux is a minimal Linux distribution built on Arch Linux. It's designed for developers, system administrators, and anyone who wants complete control over their operating system.
            </p>
            <p>
              Unlike traditional distributions that come with pre-installed software, GetLainux starts with a bare minimum base. You decide what to install, when to install it, and how to configure it.
            </p>
          </div>
        </div>

        {/* Components */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 font-heading text-center">
            What's Inside?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {components.map((component, index) => (
              <Card key={index} className="border">
                <CardHeader>
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-3">
                    <component.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{component.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm font-medium leading-relaxed">
                    {component.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 font-heading text-center">
            How It Works
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Build Installer</h4>
                  <p className="text-sm font-medium text-foreground/80">Clone repo, install dependencies, run build script. Works on Arch, Ubuntu, Debian, Kali, Fedora.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Run Installer</h4>
                  <p className="text-sm font-medium text-foreground/80">Launch installer with sudo. Choose VM or hardware install. Select disk and configure system.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">System Installed</h4>
                  <p className="text-sm font-medium text-foreground/80">GetLainux base system installed. Core package configured. Boot into minimal Arch-based system.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Customize</h4>
                  <p className="text-sm font-medium text-foreground/80">Install only what you need. Configure services. Build your system exactly how you want it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 font-heading text-center">
            Future Roadmap
          </h3>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-3">
              {roadmap.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-lg">
                  {item.status === 'done' && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                  {item.status === 'progress' && (
                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin flex-shrink-0" />
                  )}
                  {item.status === 'pending' && (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${
                    item.status === 'done' ? 'text-foreground/60 line-through' :
                    item.status === 'progress' ? 'text-primary font-bold' :
                    'text-foreground/80'
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advantages */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8 font-heading text-center">
            Why GetLainux?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {advantage.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-foreground/80">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


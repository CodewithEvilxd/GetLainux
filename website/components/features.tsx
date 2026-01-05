'use client'

import { Gauge, Shield, Sliders, Puzzle, Terminal, Code, Cpu } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const features = [
  {
    icon: Gauge,
    title: 'Fast',
    description: 'Custom kernel tuned for speed. No unnecessary services running in the background.',
  },
  {
    icon: Cpu,
    title: 'Custom Kernel Optimization',
    description: 'Advanced kernel tuning and optimization. Stripped unnecessary modules, optimized scheduler, and performance-focused configurations.',
  },
  {
    icon: Shield,
    title: 'Minimal Surface',
    description: 'Less code means fewer bugs. You know exactly what\'s running on your system.',
  },
  {
    icon: Sliders,
    title: 'You Control It',
    description: 'Every setting, every service, every package. Nothing happens without you knowing.',
  },
  {
    icon: Puzzle,
    title: 'Add What You Need',
    description: 'Start minimal. Install only what you actually use. No forced bloat.',
  },
  {
    icon: Terminal,
    title: 'CLI First',
    description: 'Built for the terminal. If you live in vim and tmux, this is for you.',
  },
  {
    icon: Code,
    title: 'C Utilities',
    description: 'Core tools written in C. Fast, efficient, and transparent.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-8 sm:py-12 border-t bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 font-heading">
            Features
          </h2>
          <p className="text-base sm:text-lg font-semibold text-foreground px-4">Why GetLainux?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border">
              <CardHeader>
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-medium leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

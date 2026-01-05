'use client'

import { Zap, Shield, Layers, Network, Code, Cpu } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const features = [
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Powered by C and inline x86_64 Assembly for near-native execution speed.',
  },
  {
    icon: Shield,
    title: 'Built-in Security',
    description: 'Primitives for network monitoring, encryption, and sandboxing.',
  },
  {
    icon: Layers,
    title: 'Layer-Based',
    description: 'Organized in "Layers" rather than linear blocks, reflecting the structure of the Wired.',
  },
  {
    icon: Network,
    title: 'Protocol Language',
    description: 'Declarative system language (.p) for deep automation and cybersecurity orchestrations.',
  },
  {
    icon: Code,
    title: 'Pure C Core',
    description: 'ISO C11 with inline Assembly optimizations for maximum efficiency.',
  },
  {
    icon: Cpu,
    title: 'Bytecode VM',
    description: 'Layered interpreter architecture with virtual machine execution.',
  },
]

export function NexusFeatures() {
  return (
    <section id="features" className="py-8 sm:py-12 border-t bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 font-heading">
            Features
          </h2>
          <p className="text-base sm:text-lg font-semibold text-foreground px-4">Why Nexus?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="border">
              <CardHeader>
                <div className="w-10 h-10 rounded bg-purple-500/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-purple-500" />
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


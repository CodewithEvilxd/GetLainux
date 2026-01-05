'use client'

import { Monitor, Box, Info, CheckCircle, Keyboard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const features = [
  {
    icon: Monitor,
    title: 'Install on Hardware',
    description: 'Install directly on your machine',
    warning: 'WARNING: This will wipe everything on the selected disk!',
  },
  {
    icon: Box,
    title: 'Install on VM',
    description: 'Test it in a virtual machine first',
    info: 'Try this first if you\'re not sure',
  },
  {
    icon: Info,
    title: 'Hardware Info',
    description: 'See what hardware you\'re working with',
  },
  {
    icon: CheckCircle,
    title: 'System Check',
    description: 'Check if your system can run GetLainux',
  },
]

const shortcuts = [
  { keys: ['↑', '↓'], label: 'Navigate menu' },
  { keys: ['Enter'], label: 'Select option' },
  { keys: ['q'], label: 'Quit/Exit' },
  { keys: ['b'], label: 'Go back' },
  { keys: ['l'], label: 'Toggle language' },
]

const ArrowUp = () => <span className="text-sm">↑</span>
const ArrowDown = () => <span className="text-sm">↓</span>

export function Usage() {
  return (
    <section id="usage" className="py-8 sm:py-12 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Keyboard className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
            Usage Guide
          </h2>
          <p className="text-base sm:text-lg font-semibold text-foreground px-4">How to use the installer</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border">
              <CardHeader>
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-base font-medium">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {feature.warning && (
                  <div className="flex items-start gap-2 p-3 bg-muted border border-border rounded">
                    <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base font-semibold text-foreground">{feature.warning}</span>
                  </div>
                )}
                {feature.info && (
                  <div className="flex items-start gap-2 p-3 bg-muted border border-border rounded">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base font-semibold text-foreground">{feature.info}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto border">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Keyboard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Keyboard Shortcuts
            </CardTitle>
            <CardDescription className="text-sm sm:text-base font-medium">Keyboard shortcuts for the installer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded bg-muted">
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd
                        key={i}
                        className="px-2.5 py-1 bg-background border border-border rounded text-xs font-game min-w-[32px] text-center"
                      >
                        {key === '↑' ? <ArrowUp /> : key === '↓' ? <ArrowDown /> : key}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-base font-semibold text-foreground">{shortcut.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

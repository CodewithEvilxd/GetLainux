'use client'

import { Terminal, Copy, Check } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

const exampleCommands = [
  { cmd: 'qs -c evilxd ipc call launcher toggle', desc: 'Open app launcher' },
  { cmd: 'qs -c evilxd ipc call settings toggle', desc: 'Open settings' },
  { cmd: 'qs -c evilxd ipc call powermenu toggle', desc: 'Show power menu' },
  { cmd: 'qs -c evilxd ipc call lock lock', desc: 'Lock screen' },
]

export function ApexLinuxTerminalEnv() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="terminal" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Commands
            </h2>
            <p className="text-base text-muted-foreground">Try these IPC commands</p>
          </div>

          <div className="space-y-3">
            {exampleCommands.map((item, idx) => (
              <div key={idx} className="p-4 border rounded-lg group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <code className="block text-sm font-mono text-foreground">{item.cmd}</code>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(item.cmd, idx)}
                  >
                    {copiedIndex === idx ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

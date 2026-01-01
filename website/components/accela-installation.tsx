'use client'

import { Download, Code, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState } from 'react'

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="p-3 sm:p-4 md:p-5 bg-muted rounded-lg border-2 overflow-x-auto">
        <code className="text-xs sm:text-sm md:text-base font-mono font-semibold text-foreground leading-relaxed whitespace-pre-wrap break-words">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ) : (
          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        )}
      </Button>
    </div>
  )
}

export function NexusInstallation() {
  return (
    <section id="installation" className="py-8 sm:py-12 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Download className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-500" />
            Installation
          </h2>
          <p className="text-lg sm:text-xl font-bold text-foreground px-4">Get Nexus running</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
          <Card className="border-2 border-purple-500/30 bg-purple-500/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-2xl font-black font-heading">Download Project</CardTitle>
              </div>
              <CardDescription className="text-base font-semibold">
                Clone the Nexus repository from GitHub
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-base font-bold mb-2">Clone Repository</p>
                <CodeBlock code={`git clone https://github.com/codewithevilxd/Nexus.git
cd Nexus`} />
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-purple-500 flex items-center justify-center text-white font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-black font-heading mb-2">Build Nexus</CardTitle>
                  <CardDescription className="text-base font-medium">Compile the engine from source</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`make
sudo make install`} />
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-purple-500 flex items-center justify-center text-white font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-black font-heading mb-2">Run Protocol Scripts</CardTitle>
                  <CardDescription className="text-base font-medium">Execute Protocol (.p) files</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`nexus run yourscript.p`} />
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500/20 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-2xl font-black font-heading">Protocol Syntax Example</CardTitle>
              </div>
              <CardDescription className="text-base font-semibold">
                Example Protocol script for system automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={`/* Layer 01: System Initialization */
layer.root {
    use std.net
    use std.nexus

    let connectivity = "wired"

    /* Automated Security Protocol */
    listen net.eth0 {
        match (packet.origin == "unknown") {
            nexus.firewall.drop(packet.ip)
            log.trace("Intrusion suppressed.")
        }
    }

    print("Success: Node synchronized with the Wired.")
}`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}


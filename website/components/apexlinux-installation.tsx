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

export function ApexLinuxInstallation() {
  return (
    <section id="install" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Installation
            </h2>
            <p className="text-base text-muted-foreground">Install ApexLinux shell configuration</p>
          </div>

          {/* Prerequisites */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Prerequisites</h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-sm text-foreground mb-2">You need Quickshell installed:</p>
              <CodeBlock code="sudo pacman -S quickshell" />
            </div>
          </div>

          {/* User Install */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">User Install</h3>
            <p className="text-sm text-muted-foreground">
              Install for current user only. Config location: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">~/.config/quickshell/evilxd</code>
            </p>
            <CodeBlock 
              code={`git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
cp -r /tmp/apexlinux-temp/apexlinux/* ~/.config/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp`}
              title="Clone and install"
            />
          </div>

          {/* System Install */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">System-wide Install</h3>
            <p className="text-sm text-muted-foreground">
              Install for all users. Config location: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">/etc/xdg/quickshell/evilxd</code>
            </p>
            <CodeBlock 
              code={`git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
sudo cp -r /tmp/apexlinux-temp/apexlinux/* /etc/xdg/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp`}
              title="Clone and install (system-wide)"
            />
          </div>

          {/* Run Shell */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Run Shell</h3>
            <CodeBlock 
              code="qs -c evilxd -f apexlinux.qml"
              title="Start ApexLinux shell"
            />
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-foreground">Note:</p>
                  <p className="text-muted-foreground">
                    Make sure Quickshell is running. The shell will load from <code className="px-1.5 py-0.5 bg-muted rounded text-xs">evilxd</code> directory.
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

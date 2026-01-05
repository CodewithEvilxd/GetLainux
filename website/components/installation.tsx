'use client'

import { Download, Copy, Check, Info, AlertTriangle, Terminal, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { useState } from 'react'

const steps = [
  {
    number: 1,
    title: 'Install Dependencies',
    description: 'Get the packages you need for your distro',
    tabs: [
      {
        name: 'Arch Linux',
        code: 'sudo pacman -S gcc ncurses curl openssl arch-install-scripts',
      },
      {
        name: 'Ubuntu/Debian',
        code: 'sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev',
      },
      {
        name: 'Kali Linux',
        code: 'sudo apt-get update && sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev',
      },
      {
        name: 'Fedora',
        code: 'sudo dnf install gcc ncurses-devel curl-devel openssl-devel',
      },
    ],
  },
  {
    number: 2,
    title: 'Build Installer',
    description: 'Compile it with the build script',
    code: `chmod +x build.sh
./build.sh`,
    info: "Type 'y' when it asks",
  },
  {
    number: 3,
    title: 'Run Installer',
    description: 'Start the installer (needs sudo)',
    code: 'sudo ./bin/installer.lain',
    warning: 'Needs root access to work with disks',
  },
]

const packageUrl = 'https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst'
const packageName = 'getlainux-core-0.1-1-x86_64.pkg.tar.zst'

const handleDirectDownload = (e: React.MouseEvent<HTMLAnchorElement>, url: string, filename: string) => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function CommandDownload() {
  const [command, setCommand] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState('')

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value)
  }

  const handleExecute = async () => {
    const trimmedCommand = command.trim().toLowerCase()
    
    // Check if command contains curl or wget
    if (trimmedCommand.includes('curl') || trimmedCommand.includes('wget')) {
      setIsDownloading(true)
      setError('')
      
      try {
        // For browsers, trigger download directly
        // This works on all platforms (Linux, Windows, Mac, Android, iOS)
        const link = document.createElement('a')
        link.href = packageUrl
        link.download = packageName
        link.rel = 'noopener noreferrer'
        
        // Add to DOM, click, then remove
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Verify download started (works on all modern browsers)
        setTimeout(() => {
          setIsDownloading(false)
          setCommand('')
        }, 1500)
      } catch (err) {
        setError('Download failed. Try clicking the download button instead.')
        setIsDownloading(false)
      }
    } else if (trimmedCommand.trim()) {
      // If command doesn't contain curl/wget, show error
      setError('Command must contain "curl" or "wget"')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute()
    }
  }

  const exampleCommands = [
    `curl -O ${packageUrl}`,
    `wget ${packageUrl}`,
    `curl -L ${packageUrl} -o ${packageName}`,
  ]

  return (
    <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-muted/50 border-2 border-primary/20 rounded-lg">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <Terminal className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary flex-shrink-0" />
        <h3 className="text-lg sm:text-xl font-black font-heading text-foreground">Download via Command</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-background border-2 border-primary/30 rounded-lg shadow-sm">
        <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 hidden sm:block" />
        <input
          type="text"
          value={command}
          onChange={handleCommandChange}
          onKeyPress={handleKeyPress}
          placeholder="Type command: curl -O [url] or wget [url]"
          className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base md:text-lg font-mono font-bold text-foreground placeholder:text-muted-foreground/60 min-w-0"
        />
        <Button
          onClick={handleExecute}
          disabled={!command.trim() || isDownloading}
          size="lg"
          className="flex-shrink-0 font-semibold w-full sm:w-auto"
        >
          {isDownloading ? (
            <>
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <span className="hidden sm:inline">Downloading...</span>
              <span className="sm:hidden">Downloading</span>
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Execute
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base font-bold font-heading text-foreground">Example commands:</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          {exampleCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => setCommand(cmd)}
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-mono font-bold bg-background hover:bg-primary/10 rounded-lg border-2 border-border hover:border-primary/50 transition-all text-foreground hover:text-primary cursor-pointer shadow-sm hover:shadow-md break-all text-left"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="flex items-start gap-3 p-3 bg-destructive/10 border-2 border-destructive/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-destructive">{error}</p>
        </div>
      )}
      <div className="flex items-start gap-3 p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm font-bold text-foreground space-y-1">
          <p>Type a curl or wget command and hit Enter to download</p>
          <p className="text-xs font-medium text-muted-foreground">Works on all platforms: Linux, Windows, Mac, Android, iOS</p>
        </div>
      </div>
    </div>
  )
}

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

export function Installation() {
  return (
    <section id="installation" className="py-8 sm:py-12 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Download className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
            Installation
          </h2>
          <p className="text-lg sm:text-xl font-bold text-foreground px-4">Get it running in a few commands</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {/* Download Project Card */}
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Download className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-black font-heading">Download Project</CardTitle>
              </div>
              <CardDescription className="text-base font-semibold">
                Grab the code from GitHub. Clone it or download the ZIP.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-base font-bold mb-2">Option 1: Clone Repository (Recommended)</p>
                  <div className="bg-muted p-4 rounded-lg border-2">
                    <code className="block text-base font-mono font-bold text-foreground">git clone https://github.com/CodewithEvilxd/GetLainux.git</code>
                    <code className="block text-base font-mono font-bold text-foreground mt-2">cd GetLainux</code>
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold mb-2">Option 2: Download ZIP</p>
                  <Button asChild size="lg" className="w-full">
                    <a 
                      href="https://github.com/CodewithEvilxd/GetLainux/archive/refs/heads/main.zip"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download ZIP from GitHub
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-background border-2 border-border rounded-lg">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground space-y-1">
                  <p className="font-bold">After downloading:</p>
                  <ol className="list-decimal list-inside space-y-1 font-semibold text-muted-foreground">
                    <li>Extract ZIP (if downloaded) or navigate to cloned directory</li>
                    <li>Make build script executable: <code className="px-2 py-1 bg-muted rounded text-sm font-mono">chmod +x build.sh</code></li>
                    <li>Run build script: <code className="px-2 py-1 bg-muted rounded text-sm font-mono">./build.sh</code></li>
                    <li>Type 'y' when prompted to confirm build</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Download Core Package Card */}
          <Card className="border-2 border-primary/20 bg-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl font-black font-heading">Download Core Package</CardTitle>
              </div>
              <CardDescription className="text-base font-semibold">
                Need the core package? Download it here for offline installs or manual setup.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDirectDownload(e as any, packageUrl, packageName)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Core Package (v0.1)</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-2"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(packageUrl, '_blank', 'noopener,noreferrer')
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download from GitHub</span>
                </Button>
              </div>
              <div className="flex justify-center pt-2">
                <Button asChild variant="ghost" size="sm">
                  <a 
                    href="https://github.com/CodewithEvilxd/GetLainux/tree/main/core-package"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Package Source
                  </a>
                </Button>
              </div>

              {/* Command Input for Direct Download */}
              <CommandDownload />

              <div className="flex items-start gap-3 p-4 bg-background border-2 border-border rounded-lg">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-base text-foreground space-y-2">
                  <p className="font-bold"><span className="text-muted-foreground">Package:</span> <span className="font-mono font-bold">getlainux-core-0.1-1-x86_64.pkg.tar.zst</span></p>
                  <p className="font-bold"><span className="text-muted-foreground">Install:</span> <code className="px-3 py-1.5 bg-muted rounded-lg text-base font-mono font-bold text-foreground">sudo pacman -U getlainux-core-0.1-1-x86_64.pkg.tar.zst</code></p>
                  <p className="text-base mt-2 font-medium text-muted-foreground">The installer will grab this automatically if it's not already on your system.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {steps.map((step) => (
            <Card key={step.number} className="border">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-black font-heading mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-base font-medium">{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {step.tabs ? (
                  <Tabs defaultValue={step.tabs[0].name} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
                      {step.tabs.map((tab) => (
                        <TabsTrigger key={tab.name} value={tab.name} className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                          <span className="truncate">{tab.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {step.tabs.map((tab) => (
                      <TabsContent key={tab.name} value={tab.name} className="mt-4">
                        <CodeBlock code={tab.code} />
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : (
                  <CodeBlock code={step.code || ''} />
                )}

                {step.info && (
                  <div className="flex items-start gap-3 p-4 bg-muted border-2 border-border rounded-lg">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base font-semibold text-foreground">{step.info}</span>
                  </div>
                )}

                {step.warning && (
                  <div className="flex items-start gap-3 p-4 bg-muted border-2 border-border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base font-semibold text-foreground">{step.warning}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

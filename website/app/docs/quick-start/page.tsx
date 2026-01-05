import { Metadata } from 'next'
import { ArrowLeft, Terminal, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Quick Start Guide - GetLainux',
  description: 'Get started with GetLainux in 5 minutes',
}

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Terminal className="h-10 w-10 text-primary" />
            Quick Start Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Get GetLainux up and running in 5 minutes
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Step 0: Download Project</CardTitle>
              <CardDescription>Clone or download GetLainux from GitHub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">Clone Repository (Recommended):</p>
                <code className="block text-sm font-mono">git clone https://github.com/CodewithEvilxd/GetLainux.git</code>
                <code className="block text-sm font-mono mt-2">cd GetLainux</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">Or Download ZIP:</p>
                <p className="text-sm text-muted-foreground">Visit <a href="https://github.com/CodewithEvilxd/GetLainux" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a> and click "Code" → "Download ZIP", then extract it.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Step 1: Install Dependencies</CardTitle>
              <CardDescription>Install required packages for your Linux distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">Arch Linux:</p>
                <code className="block text-sm font-mono">sudo pacman -S gcc ncurses curl openssl arch-install-scripts</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">Ubuntu/Debian:</p>
                <code className="block text-sm font-mono">sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev</code>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-semibold mb-2">Fedora:</p>
                <code className="block text-sm font-mono">sudo dnf install gcc ncurses-devel curl-devel openssl-devel</code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Step 2: Build Installer</CardTitle>
              <CardDescription>Compile the installer using the build script</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <code className="block text-sm font-mono">chmod +x build.sh</code>
                <code className="block text-sm mt-2 font-mono">./build.sh</code>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-500 dark:text-blue-400">
                  Type 'y' when prompted to confirm build
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Step 3: Run Installer</CardTitle>
              <CardDescription>Execute the installer with root privileges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <code className="block text-sm font-mono">sudo ./bin/installer.lain</code>
              </div>
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-yellow-500 dark:text-yellow-400">
                  Root access required for disk operations
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Select "Install on Virtual Machine" for safe testing</li>
                <li>Or "Install on Hardware" for real installation (⚠️ will erase data!)</li>
                <li>Follow the on-screen instructions</li>
                <li>Check the complete usage guide for detailed information</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


import { Metadata } from 'next'
import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Complete Usage Guide - GetLainux',
  description: 'Complete usage guide for GetLainux',
}

export default function UsagePage() {
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
            <BookOpen className="h-10 w-10 text-primary" />
            Complete Usage Guide
          </h1>
          <p className="text-xl text-muted-foreground">
            Detailed instructions for using GetLainux installer
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Installation Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Install on Hardware</h3>
                <p className="text-muted-foreground mb-2">
                  Install GetLainux directly on your physical machine. This option will erase all data on the selected disk.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                  <p className="text-sm text-yellow-500 dark:text-yellow-400 font-semibold">
                    ⚠️ WARNING: This will permanently delete all data on the selected disk!
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-xl font-semibold mb-2">Install on Virtual Machine</h3>
                <p className="text-muted-foreground mb-2">
                  Test installation safely in a virtual machine. Recommended for first-time users and testing.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-3">
                  <p className="text-sm text-green-500 dark:text-green-400">
                    ✓ Safe for testing - no risk to your main system
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <kbd className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-mono">↑ ↓</kbd>
                  <span>Navigate menu</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <kbd className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-mono">Enter</kbd>
                  <span>Select option</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <kbd className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-mono">q</kbd>
                  <span>Quit/Exit</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <kbd className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-mono">b</kbd>
                  <span>Go back</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <kbd className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-mono">l</kbd>
                  <span>Toggle language</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">System Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li><strong className="text-foreground">RAM:</strong> Minimum 1GB (4GB recommended)</li>
                <li><strong className="text-foreground">CPU:</strong> Dual-core or better</li>
                <li><strong className="text-foreground">Disk Space:</strong> 20GB+ for installation, 2GB in /tmp for building</li>
                <li><strong className="text-foreground">Internet:</strong> Required for downloading packages</li>
                <li><strong className="text-foreground">OS:</strong> Linux (Arch, Ubuntu, Fedora, etc.)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Build fails with "ncurses not found"</h4>
                <p className="text-muted-foreground text-sm">
                  Install ncurses development package: <code className="bg-muted px-2 py-1 rounded">sudo pacman -S ncurses</code>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Permission denied</h4>
                <p className="text-muted-foreground text-sm">
                  Make sure to run with sudo: <code className="bg-muted px-2 py-1 rounded">sudo ./bin/installer.lain</code>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Network check fails</h4>
                <p className="text-muted-foreground text-sm">
                  Check internet connection and start network service: <code className="bg-muted px-2 py-1 rounded">sudo systemctl start NetworkManager</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


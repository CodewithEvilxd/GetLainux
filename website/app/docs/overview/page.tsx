import { Metadata } from 'next'
import { ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Project Overview - GetLainux',
  description: 'Learn about GetLainux project',
}

export default function OverviewPage() {
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
            <Info className="h-10 w-10 text-primary" />
            Project Overview
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn about GetLainux philosophy and architecture
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">About GetLainux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                GetLainux is a highly specialized, command-line-centric Linux distribution meticulously engineered from the robust foundation of Arch Linux. 
                Developed with a focus on extreme performance, absolute control, and uncompromising security.
              </p>
              <p className="text-muted-foreground">
                The project is designed for expert users, system developers, and low-level programming enthusiasts who demand precision, efficiency, and full transparency.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Core Philosophy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Extreme Performance:</strong>
                    <p className="text-muted-foreground text-sm">Highly optimized custom kernel with minimal overhead</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Determinism:</strong>
                    <p className="text-muted-foreground text-sm">Unparalleled control over system behavior and resource allocation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Security by Design:</strong>
                    <p className="text-muted-foreground text-sm">Minimal attack surface with transparent system processes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Extensibility:</strong>
                    <p className="text-muted-foreground text-sm">Modular architecture for flexible expansion without bloat</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Languages</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• C/C++ for system components</li>
                    <li>• Go for installer UI</li>
                    <li>• Bash for automation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Base System</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Arch Linux core</li>
                    <li>• Custom Linux kernel</li>
                    <li>• systemd init system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/50">
            <CardHeader>
              <CardTitle className="text-2xl">License</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                GetLainux is distributed under the <strong className="text-foreground">GNU General Public License v3.0</strong>.
                See the LICENSE file for more details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


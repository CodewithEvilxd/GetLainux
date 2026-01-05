import { Metadata } from 'next'
import { BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Documentation - GetLainux',
  description: 'Complete documentation for GetLainux',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Documentation</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground text-xl mb-8">
            Complete guides and documentation for GetLainux installation and usage.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
              <h2 className="text-2xl font-semibold mb-2">Quick Start</h2>
              <p className="text-muted-foreground mb-4">
                Get started with GetLainux in 5 minutes. Perfect for first-time users.
              </p>
              <Link href="/docs/quick-start">
                <Button>Read Quick Start Guide →</Button>
              </Link>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-muted/30 rounded-r-lg">
              <h2 className="text-2xl font-semibold mb-2">Complete Usage Guide</h2>
              <p className="text-muted-foreground mb-4">
                Detailed step-by-step instructions for installation, configuration, and usage.
              </p>
              <Link href="/docs/usage">
                <Button variant="outline">Read Complete Guide →</Button>
              </Link>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-4 bg-muted/30 rounded-r-lg">
              <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
              <p className="text-muted-foreground mb-4">
                Learn about GetLainux philosophy, architecture, and features.
              </p>
              <Link href="/docs/overview">
                <Button variant="outline">Read Overview →</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


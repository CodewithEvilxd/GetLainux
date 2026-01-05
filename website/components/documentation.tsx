'use client'

import { BookOpen, Zap, FileText, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const docs = [
  {
    icon: Zap,
    title: 'Quick Start Guide',
    description: 'Quick setup guide. Get it running in 5 minutes. Copy, paste, done.',
    href: '/docs/quick-start',
  },
  {
    icon: BookOpen,
    title: 'Complete Usage Guide',
    description: 'Full guide covering installation, config, and usage. Troubleshooting tips included.',
    href: '/docs/usage',
  },
  {
    icon: FileText,
    title: 'Project Overview',
    description: 'Project overview, architecture, and how to contribute. See how GetLainux works under the hood.',
    href: '/docs/overview',
  },
]

export function Documentation() {
  return (
    <section id="docs" className="py-8 sm:py-12 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
            Documentation
          </h2>
          <p className="text-base sm:text-lg font-semibold text-foreground px-4">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto mb-6 sm:mb-8">
          {docs.map((doc, index) => (
            <Link key={index} href={doc.href}>
              <Card className="h-full border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-3">
                    <doc.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base font-medium mb-4 leading-relaxed">
                    {doc.description}
                  </CardDescription>
                  <Button variant="ghost" className="w-full">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto border">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Additional Resources</CardTitle>
            <CardDescription className="text-sm sm:text-base font-medium">More resources and links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <a
                href="https://github.com/CodewithEvilxd/GetLainux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded border border-border hover:border-primary/50 hover:bg-muted transition-colors"
              >
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-bold text-base">GitHub Repository</div>
                  <div className="text-sm font-medium text-muted-foreground">View source code and issues</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#installation"
                className="flex items-center gap-3 p-3 rounded border border-border hover:border-primary/50 hover:bg-muted transition-colors"
              >
                <Zap className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="font-bold text-base">Installation Guide</div>
                  <div className="text-sm font-medium text-muted-foreground">Step-by-step installation</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

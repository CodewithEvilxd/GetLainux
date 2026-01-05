'use client'

import { BookOpen, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

const docs = [
  {
    title: 'GitHub Repository',
    desc: 'View source code, issues, and contributions',
    href: 'https://github.com/codewithevilxd/ApexLinux',
    external: true,
  },
  {
    title: 'Installation Guide',
    desc: 'Step-by-step installation instructions',
    href: '#install',
    external: false,
  },
  {
    title: 'Usage Guide',
    desc: 'IPC commands and configuration',
    href: '#usage',
    external: false,
  },
]

export function ApexLinuxDocumentation() {
  return (
    <section id="docs" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Documentation
            </h2>
            <p className="text-base text-muted-foreground">Resources and guides</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.map((doc, idx) => (
              doc.external ? (
                <a
                  key={idx}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors space-y-2 group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{doc.title}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary ml-auto" />
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.desc}</p>
                </a>
              ) : (
                <Link
                  key={idx}
                  href={doc.href}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors space-y-2"
                >
                  <h3 className="font-bold">{doc.title}</h3>
                  <p className="text-sm text-muted-foreground">{doc.desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

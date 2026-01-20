'use client'

import { BookOpen, ExternalLink, Github, FileText, Bug, MessageCircle, Package } from 'lucide-react'
import Link from 'next/link'

export function FlavourSwitchDocumentation() {
  return (
    <section id="docs" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              Documentation
            </h2>
            <p className="text-base text-muted-foreground">
              Complete documentation and resources for FlavourSwitch
            </p>
          </div>

          {/* Documentation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="https://github.com/CodewithEvilxd/flavourswitch"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Github className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    GitHub Repository
                  </h3>
                  <p className="text-muted-foreground">
                    Source code, issues, and development updates
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <span>View on GitHub</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            <div className="p-6 border rounded-lg">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    README
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive installation and usage guide
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Available in the GitHub repository
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://github.com/CodewithEvilxd/flavourswitch/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border rounded-lg hover:border-primary/50 transition-colors text-sm"
              >
                <BookOpen className="h-4 w-4 inline mr-2" /> Full Documentation
              </a>
              <a
                href="https://github.com/CodewithEvilxd/flavourswitch/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border rounded-lg hover:border-primary/50 transition-colors text-sm"
              >
                <Bug className="h-4 w-4 inline mr-2" /> Report Issues
              </a>
              <a
                href="https://github.com/CodewithEvilxd/flavourswitch/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border rounded-lg hover:border-primary/50 transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4 inline mr-2" /> Discussions
              </a>
              <a
                href="https://github.com/CodewithEvilxd/flavourswitch/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border rounded-lg hover:border-primary/50 transition-colors text-sm"
              >
                <Package className="h-4 w-4 inline mr-2" /> Releases
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
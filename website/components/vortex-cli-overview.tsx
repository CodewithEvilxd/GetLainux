'use client'

import { Search, Play, Download, List, Star, Image, Settings, Zap, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function VortexCliOverview() {
  return (
    <section id="overview" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* What is it */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">What is Vortex CLI?</h2>
            <div className="space-y-3 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                <strong>Vortex CLI</strong> is a modern, feature-rich terminal-based YouTube browser that brings the power of YouTube to your command line. Built with performance and user experience in mind, it provides seamless access to YouTube's vast content library without leaving your terminal.
              </p>
              <p>
                Navigate YouTube with fuzzy search, stream live videos, download content, manage playlists, and enjoy rich previews with thumbnail images. Fully extensible with custom extensions and highly configurable to match your workflow.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="#docs">
                    <BookOpen className="mr-2 h-4 w-4" />
                    See Full Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Search className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Interactive Browser</h3>
                <p className="text-sm text-muted-foreground">Navigate YouTube with fuzzy search</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Play className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Live Streaming</h3>
                <p className="text-sm text-muted-foreground">Watch live streams in terminal</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Download className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Download Manager</h3>
                <p className="text-sm text-muted-foreground">Download videos and playlists</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <List className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Playlist Support</h3>
                <p className="text-sm text-muted-foreground">Create and manage playlists</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Star className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Favorites</h3>
                <p className="text-sm text-muted-foreground">Bookmark channels and videos</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Image className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Rich Previews</h3>
                <p className="text-sm text-muted-foreground">Thumbnail previews in terminal</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Highly Configurable</h3>
                <p className="text-sm text-muted-foreground">Customize everything to your liking</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Extension System</h3>
                <p className="text-sm text-muted-foreground">Build custom functionality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
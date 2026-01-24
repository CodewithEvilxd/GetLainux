'use client'

import { Search, Play, Download, List, Star, Image, Settings, Zap, Shield, Code, Cpu, Layers, History, Globe, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Interactive Video Browser',
    description: 'Navigate YouTube with fuzzy search and intuitive keyboard controls',
    details: [
      'Fuzzy search with fzf for instant video discovery',
      'Keyboard shortcuts for efficient navigation',
      'Real-time search results with video metadata',
      'Channel browsing and subscription management',
      'Trending videos and recommended content'
    ]
  },
  {
    icon: Play,
    title: 'Live Streaming Support',
    description: 'Watch live streams directly in your terminal with full playback control',
    details: [
      'Real-time live stream playback with mpv',
      'Stream quality selection and adaptive bitrate',
      'Live chat integration (terminal compatible)',
      'Background streaming with process management',
      'Multi-platform live streaming support'
    ]
  },
  {
    icon: Download,
    title: 'Advanced Download Manager',
    description: 'Download videos, playlists, and audio with yt-dlp integration',
    details: [
      'Batch download with playlist support',
      'Multiple format options (MP4, WebM, MP3, etc.)',
      'Quality selection (1080p, 4K, audio-only)',
      'Resume interrupted downloads',
      'Custom output directory and naming patterns'
    ]
  },
  {
    icon: List,
    title: 'Smart Playlist Management',
    description: 'Create and manage custom playlists with full YouTube integration',
    details: [
      'Import existing YouTube playlists',
      'Create custom local playlists',
      'Playlist search and filtering',
      'Shuffle and repeat playback modes',
      'Export playlists to various formats'
    ]
  },
  {
    icon: Star,
    title: 'Favorites & Bookmarks',
    description: 'Bookmark channels and videos for quick access and organization',
    details: [
      'Save favorite channels and videos',
      'Organize bookmarks with custom categories',
      'Quick access to bookmarked content',
      'Import/export bookmark collections',
      'Sync bookmarks across devices'
    ]
  },
  {
    icon: Image,
    title: 'Rich Visual Previews',
    description: 'Thumbnail previews with chafa/icat support for visual browsing',
    details: [
      'High-quality thumbnail display in terminal',
      'Multiple image renderer support (chafa, icat, kitty)',
      'Preview window integration with fuzzy finder',
      'Video duration and view count overlays',
      'Channel avatar and subscriber information'
    ]
  },
  {
    icon: Zap,
    title: 'Powerful Search Filters',
    description: 'Filter by duration, quality, upload date with advanced search syntax',
    details: [
      'Search filters: :live, :today, :week, :hd, :4k, :short',
      'Sorting options: :views, :rating, :newest',
      'Duration filtering (under 4 minutes, etc.)',
      'Quality-based filtering and sorting',
      'Date range and upload time filters'
    ]
  },
  {
    icon: Code,
    title: 'Extensible Architecture',
    description: 'Build custom functionality with bash scripts and modular extensions',
    details: [
      'Plugin system for custom commands',
      'Bash script extensions in ~/.config/vortex-cli/extensions/',
      'API for third-party integrations',
      'Custom search providers and sources',
      'Modular design for easy customization'
    ]
  },
  {
    icon: Globe,
    title: 'Universal Media Support',
    description: 'Beyond YouTube - works with Vimeo, Twitch, and all yt-dlp supported sites',
    details: [
      'Vimeo, Twitch, Dailymotion support',
      'Over 1000 supported video platforms',
      'Universal media downloader capabilities',
      'Cross-platform video source compatibility',
      'International content and language support'
    ]
  },
  {
    icon: Settings,
    title: 'Comprehensive Configuration',
    description: 'Fine-tune every aspect with extensive configuration options',
    details: [
      'Player selection (mpv, vlc, custom)',
      'Video quality and format preferences',
      'Browser cookie integration for authentication',
      'Custom keybindings and shortcuts',
      'Theme and UI customization options'
    ]
  },
  {
    icon: History,
    title: 'Smart History Tracking',
    description: 'Keep track of watched videos with configurable history management',
    details: [
      'Automatic watch history recording',
      'Configurable history size limits',
      'Search through watch history',
      'Recently watched recommendations',
      'History export and backup features'
    ]
  },
  {
    icon: Shield,
    title: 'Privacy & Performance',
    description: 'Optimized for speed with privacy-conscious design principles',
    details: [
      'Minimal resource usage and fast startup',
      'No telemetry or data collection',
      'Local caching for improved performance',
      'Privacy-focused cookie handling',
      'Efficient memory management'
    ]
  }
]

export function VortexCliFeatures() {
  return (
    <section id="features" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              Advanced Features
            </h2>
            <p className="text-base text-muted-foreground">
              Powerful features that make Vortex CLI a complete YouTube browsing solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                      <ul className="space-y-1.5 mt-3">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                            <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
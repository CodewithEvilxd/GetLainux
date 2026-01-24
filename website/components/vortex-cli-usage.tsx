'use client'

import { Terminal, Keyboard, Command, FileText, Settings, Info, Search, Filter } from 'lucide-react'

export function VortexCliUsage() {
  return (
    <section id="usage" className="py-12 sm:py-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Command className="h-8 w-8 text-primary" />
              Usage Guide
            </h2>
            <p className="text-base text-muted-foreground">
              Complete guide on how to use Vortex CLI YouTube browser
            </p>
          </div>

          {/* Basic Commands */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              Basic Commands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Launch main interface</p>
                <code className="text-xs font-mono text-muted-foreground">
                  vortex-cli
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Search for videos</p>
                <code className="text-xs font-mono text-muted-foreground">
                  vortex-cli -S "search query"
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Edit configuration</p>
                <code className="text-xs font-mono text-muted-foreground">
                  vortex-cli -e
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Show help</p>
                <code className="text-xs font-mono text-muted-foreground">
                  vortex-cli --help
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Show version</p>
                <code className="text-xs font-mono text-muted-foreground">
                  vortex-cli --version
                </code>
              </div>
            </div>
          </div>

          {/* Search Filters */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="h-6 w-6 text-primary" />
              Search Filters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Live streams only</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :live gaming
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Uploaded today</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :today news
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">This week</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :week tutorials
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">HD quality</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :hd movies
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">4K quality</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :4k nature
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">Short videos (under 4 min)</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :short comedy
                </code>
              </div>
            </div>
          </div>

          {/* Sorting Options */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Sorting Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">By view count</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :views
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">By rating</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :rating
                </code>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-semibold text-sm mb-1">By upload date</p>
                <code className="text-xs font-mono text-muted-foreground">
                  :newest
                </code>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Configuration
            </h3>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Config File Location</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded mb-2">
                  ~/.config/vortex-cli/vortex-cli.conf
                </code>
                <p className="text-sm text-muted-foreground">
                  Edit this INI file to customize player settings, UI preferences, download directory, and more.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-semibold mb-2">Custom Playlists</p>
                <code className="block text-xs font-mono bg-muted p-2 rounded mb-2">
                  ~/.config/vortex-cli/custom_playlists.json
                </code>
                <p className="text-sm text-muted-foreground">
                  Create custom playlists by adding YouTube playlist URLs and watch URLs.
                </p>
              </div>
            </div>
          </div>

          {/* Extensions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Extensions
            </h3>
            <div className="p-4 border rounded-lg">
              <p className="font-semibold mb-2">Extension Directory</p>
              <code className="block text-xs font-mono bg-muted p-2 rounded mb-2">
                ~/.config/vortex-cli/extensions/
              </code>
              <p className="text-sm text-muted-foreground">
                Place custom bash scripts here to extend Vortex CLI functionality. Extensions are automatically loaded.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">Pro Tips:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use fuzzy search to quickly find videos and channels</li>
                  <li>• Enable previews for thumbnail images in supported terminals</li>
                  <li>• Configure your preferred browser for cookie-based authentication</li>
                  <li>• Create custom extensions for specialized workflows</li>
                  <li>• Use search filters and sorting to refine results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
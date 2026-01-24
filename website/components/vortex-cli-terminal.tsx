'use client'

import { Terminal, Play, Search, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState, useRef, useEffect } from 'react'

interface Command {
  input: string
  output: string
  timestamp: Date
}

export function VortexCliTerminal() {
  const [commands, setCommands] = useState<Command[]>([
    {
      input: 'vortex-cli',
      output: `🌪️  Vortex CLI v0.4.5 - Lightning-Fast YouTube Browser

┌─────────────────────────────────────────────────────────────┐
│                    🎬 Main Menu                             │
├─────────────────────────────────────────────────────────────┤
│  1. 🎵 Search & Browse Videos                              │
│  2. 📺 Watch Live Streams                                  │
│  3. ⬇️  Download Videos/Playlists                          │
│  4. 📋 Manage Playlists                                    │
│  5. ⭐ Favorites & Bookmarks                               │
│  6. 🔍 Advanced Search Filters                             │
│  7. ⚙️  Configuration                                      │
│  8. 📖 Help & Documentation                                │
│  9. 🚪 Exit                                               │
└─────────────────────────────────────────────────────────────┘

Choose an option (1-9): `,
      timestamp: new Date()
    }
  ])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    setIsProcessing(true)
    const trimmedCmd = cmd.trim().toLowerCase()
    const originalCmd = cmd.trim()
    let output = ''

    // Simulate realistic processing time
    const processingTime = Math.random() * 800 + 200
    await new Promise(resolve => setTimeout(resolve, processingTime))

    if (trimmedCmd === 'vortex-cli' || trimmedCmd === './vortex-cli') {
      output = `🌪️  Vortex CLI v0.4.5 - Lightning-Fast YouTube Browser

┌─────────────────────────────────────────────────────────────┐
│                    🎬 Main Menu                             │
├─────────────────────────────────────────────────────────────┤
│  1. 🎵 Search & Browse Videos                              │
│  2. 📺 Watch Live Streams                                  │
│  3. ⬇️  Download Videos/Playlists                          │
│  4. 📋 Manage Playlists                                    │
│  5. ⭐ Favorites & Bookmarks                               │
│  6. 🔍 Advanced Search Filters                             │
│  7. ⚙️  Configuration                                      │
│  8. 📖 Help & Documentation                                │
│  9. 🚪 Exit                                               │
└─────────────────────────────────────────────────────────────┘

Choose an option (1-9): `
    } else if (trimmedCmd === '1' || trimmedCmd === 'search') {
      output = `🔍 Search Videos

Searching YouTube...

⠋ Searching... | [████████████████████████] 100%

Found 1,247 results for "popular videos"

┌─────────────────────────────────────────────────────────────┐
│  🎵 Search Results - Page 1/50                             │
├─────────────────────────────────────────────────────────────┤
│  1. 🎬 "Amazing Nature 4K" (12M views) 15:30              │
│  2. 🎵 "Electronic Music Mix" (8.5M views) 2:45:12        │
│  3. 🎮 "Gaming Highlights" (5.2M views) 8:15              │
│  4. 📚 "Programming Tutorial" (3.1M views) 22:45          │
│  5. 📰 "Tech News Today" (2.8M views) 12:30               │
│  6. 🎨 "Digital Art Process" (1.9M views) 18:20           │
│  7. 🎭 "Comedy Sketch" (4.7M views) 5:22                  │
│  8. 📺 "Live Cooking Show" (892K views) LIVE              │
└─────────────────────────────────────────────────────────────┘

Navigate: [1-8] to select, [n]ext, [p]rev, [q]uit: `
    } else if (trimmedCmd.startsWith('vortex-cli -s ') || trimmedCmd.startsWith('vortex-cli --search ')) {
      const query = originalCmd.replace(/vortex-cli (-s |--search )/, '').trim()
      output = `🔍 Searching for: "${query}"

⠏ Fetching results from YouTube API...
⠇ Processing metadata...
⠋ Loading thumbnails...
✅ Search completed!

Found 856 results for "${query}"

┌─────────────────────────────────────────────────────────────┐
│  🎵 Top Results                                           │
├─────────────────────────────────────────────────────────────┤
│  1. 🎬 "${query} - Official Video" (45M views) 4:12      │
│  2. 🎵 "${query} Remix" (23M views) 3:28                 │
│  3. 📚 "${query} Tutorial" (12M views) 15:45             │
│  4. 🎮 "${query} Gameplay" (8.9M views) 22:10            │
│  5. 📰 "${query} Explained" (6.7M views) 8:33            │
└─────────────────────────────────────────────────────────────┘

Actions: [1-5] play, [d]ownload, [f]avorite, [q]uit: `
    } else if (trimmedCmd === '2' || trimmedCmd === 'live') {
      output = `📺 Live Streams Browser

🔴 Scanning for active live streams...

⠋ Connecting to YouTube Live API...
⠇ Discovering streams...
✅ Found 234 active live streams!

┌─────────────────────────────────────────────────────────────┐
│                    🔴 Live Streams                          │
├─────────────────────────────────────────────────────────────┤
│  1. 🎮 "Pro Gaming Tournament" - 45.2K viewers            │
│  2. 🎵 "Electronic Music Set" - 28.9K viewers             │
│  3. 📰 "Breaking News Live" - 156K viewers                │
│  4. 🎨 "Digital Art Creation" - 12.3K viewers             │
│  5. 📚 "Coding Live Stream" - 8.7K viewers                │
│  6. 🎭 "Comedy Improv" - 23.1K viewers                    │
│  7. 🏃 "Fitness Workout" - 67.8K viewers                  │
│  8. 🎪 "Virtual Concert" - 89.4K viewers                  │
└─────────────────────────────────────────────────────────────┘

Select stream [1-8] to watch, [r]efresh, [q]uit: `
    } else if (trimmedCmd === '3' || trimmedCmd === 'download') {
      output = `⬇️ Download Manager v0.4.5

📊 Download Queue: 0 active, 0 queued
💾 Available space: 156 GB
🌐 Connection: 25 Mbps ↓ / 8 Mbps ↑

┌─────────────────────────────────────────────────────────────┐
│  ⬇️ Download Options                                      │
├─────────────────────────────────────────────────────────────┤
│  1. 🎬 Single Video Download                              │
│  2. 📋 Playlist Download                                  │
│  3. 🎵 Audio Extraction (MP3)                             │
│  4. 📺 Batch Download                                     │
│  5. 📊 View Download History                              │
│  6. ⚙️ Download Settings                                  │
└─────────────────────────────────────────────────────────────┘

Choose option [1-6] or paste YouTube URL: `
    } else if (trimmedCmd.startsWith('vortex-cli -d ') || trimmedCmd.startsWith('vortex-cli --download ')) {
      const url = originalCmd.replace(/vortex-cli (-d |--download )/, '').trim()
      output = `⬇️ Starting download...

URL: ${url}
⠋ Analyzing video...
⠇ Fetching video info...
✅ Video found: "Sample Video Title"

📹 Video Details:
   • Title: Sample Video Title
   • Duration: 12:34
   • Quality: Up to 1080p
   • Size: ~250 MB
   • Format: MP4

💾 Download location: ~/Videos/VortexCLI/

🚀 Starting download...
████████████████████████ 100% | 250MB/250MB | 2.1MB/s | ETA: 0s

✅ Download completed successfully!
📁 Saved to: ~/Videos/VortexCLI/Sample_Video_Title.mp4

Download another? [y/n]: `
    } else if (trimmedCmd === '4' || trimmedCmd === 'playlists') {
      output = `📋 Playlist Manager

📊 Your Collections:
   • Total playlists: 8
   • Total videos: 156
   • Storage used: 24.7 GB

┌─────────────────────────────────────────────────────────────┐
│  📋 Your Playlists                                         │
├─────────────────────────────────────────────────────────────┤
│  🎵 Favorites (24 videos) - 8.2 GB                        │
│  🎮 Gaming (18 videos) - 12.1 GB                          │
│  📚 Programming (32 videos) - 4.8 GB                      │
│  🎵 Music (28 videos) - 6.9 GB                            │
│  📰 Tech News (15 videos) - 2.3 GB                        │
│  🎨 Creative (22 videos) - 9.4 GB                         │
│  🏃 Fitness (12 videos) - 3.1 GB                          │
│  🎭 Entertainment (5 videos) - 1.2 GB                     │
└─────────────────────────────────────────────────────────────┘

Actions: [1-8] open playlist, [n]ew playlist, [i]mport, [q]uit: `
    } else if (trimmedCmd === '5' || trimmedCmd === 'favorites') {
      output = `⭐ Favorites Manager

💝 Your Bookmarked Content:
   • Channels: 12
   • Videos: 47
   • Playlists: 3

┌─────────────────────────────────────────────────────────────┐
│  ⭐ Favorites                                              │
├─────────────────────────────────────────────────────────────┤
│  📺 Channels:                                             │
│     • TechReviews (2.1M subs)                             │
│     • MusicDiscovery (890K subs)                          │
│     • CodeMaster (1.5M subs)                              │
│  🎬 Videos:                                               │
│     • "Advanced Linux Tutorial"                           │
│     • "Game Development Tips"                             │
│     • "Digital Art Process"                               │
│  📋 Playlists:                                            │
│     • "Coding Tutorials" (15 videos)                      │
└─────────────────────────────────────────────────────────────┘

Actions: [c]hannels, [v]ideos, [p]laylists, [a]dd, [q]uit: `
    } else if (trimmedCmd === '6' || trimmedCmd === 'filters') {
      output = `🔍 Advanced Search Filters

🎯 Available Filters:
   • :live     - Live streams only
   • :today    - Uploaded today
   • :week     - This week
   • :month    - This month
   • :year     - This year
   • :hd       - HD quality (720p+)
   • :4k       - 4K quality
   • :short    - Under 4 minutes
   • :medium   - 4-20 minutes
   • :long     - Over 20 minutes

📊 Sorting Options:
   • :views    - By view count
   • :rating   - By rating
   • :newest   - By upload date
   • :oldest   - By upload date (reverse)
   • :relevance - By relevance

💡 Usage Examples:
   vortex-cli -S ":live gaming :views"
   vortex-cli -S ":hd tutorials :week :rating"
   vortex-cli -S ":4k nature :newest"

Enter search query with filters: `
    } else if (trimmedCmd === '7' || trimmedCmd === 'config') {
      output = `⚙️ Configuration Editor

📁 Config file: ~/.config/vortex-cli/vortex-cli.conf

┌─────────────────────────────────────────────────────────────┐
│  ⚙️ Current Configuration                                  │
├─────────────────────────────────────────────────────────────┤
│  🎬 Player: mpv (v0.36.0)                                 │
│  📺 Default Quality: 1080p                                │
│  🖼️ Image Preview: chafa (enabled)                        │
│  💾 Download Directory: ~/Videos/VortexCLI/              │
│  🔍 Selector: fzf (v0.42.0)                               │
│  🌐 Browser: firefox (for cookies)                        │
│  📊 Max Results: 30                                       │
│  ⏰ Notification Duration: 5s                             │
│  🔄 Auto Update: enabled                                  │
│  📝 Search History: enabled                               │
│  🎨 Theme: dark                                           │
└─────────────────────────────────────────────────────────────┘

Edit options: [e]dit config, [r]eset to defaults, [q]uit: `
    } else if (trimmedCmd === '8' || trimmedCmd === 'help' || trimmedCmd === 'vortex-cli --help') {
      output = `📖 Vortex CLI Help & Documentation

🌪️ Vortex CLI v0.4.5 - Lightning-Fast YouTube Browser

📋 SYNOPSIS:
   vortex-cli [OPTIONS] [COMMAND]

🎯 COMMANDS:
   (no command)          Launch interactive TUI
   search, -S QUERY      Search and browse videos
   download, -d URL      Download video/playlist
   live                  Browse live streams
   playlists             Manage playlists
   favorites             Manage bookmarks
   config                Edit configuration
   help, --help          Show this help

🔍 SEARCH EXAMPLES:
   vortex-cli -S "linux tutorial"
   vortex-cli -S ":live gaming :views"
   vortex-cli -S ":hd programming :week"

⬇️ DOWNLOAD EXAMPLES:
   vortex-cli -d "https://youtu.be/VIDEO_ID"
   vortex-cli -d "https://youtube.com/playlist?list=LIST_ID"

⚙️ CONFIGURATION:
   Edit: ~/.config/vortex-cli/vortex-cli.conf
   Reset: vortex-cli config --reset

🌐 DEPENDENCIES:
   • bash >= 4.0
   • jq >= 1.6
   • curl >= 7.0
   • yt-dlp >= 2023.0
   • fzf >= 0.30.0
   • mpv >= 0.35.0

📚 For more info: https://github.com/codewithevilxd/vortex-cli

Press Enter to return to main menu: `
    } else if (trimmedCmd === '9' || trimmedCmd === 'exit' || trimmedCmd === 'quit') {
      output = `👋 Thanks for using Vortex CLI!

💾 Session Summary:
   • Videos browsed: 12
   • Downloads completed: 0
   • Time spent: 8m 34s

🔄 Auto-saving favorites and history...

✅ Session saved successfully!

Goodbye! 🌪️`
    } else if (trimmedCmd === 'back' || trimmedCmd === 'main') {
      output = `🌪️  Vortex CLI v0.4.5 - Lightning-Fast YouTube Browser

┌─────────────────────────────────────────────────────────────┐
│                    🎬 Main Menu                             │
├─────────────────────────────────────────────────────────────┤
│  1. 🎵 Search & Browse Videos                              │
│  2. 📺 Watch Live Streams                                  │
│  3. ⬇️  Download Videos/Playlists                          │
│  4. 📋 Manage Playlists                                    │
│  5. ⭐ Favorites & Bookmarks                               │
│  6. 🔍 Advanced Search Filters                             │
│  7. ⚙️  Configuration                                      │
│  8. 📖 Help & Documentation                                │
│  9. 🚪 Exit                                               │
└─────────────────────────────────────────────────────────────┘

Choose an option (1-9): `
    } else if (trimmedCmd === 'clear') {
      setCommands([])
      setIsProcessing(false)
      return
    } else if (trimmedCmd === 'version' || trimmedCmd === '--version' || trimmedCmd === '-v') {
      output = `🌪️ Vortex CLI v0.4.5

Build: 2024-01-24
Platform: Web Demo
License: MIT

For updates, visit: https://github.com/codewithevilxd/vortex-cli`
    } else if (trimmedCmd.startsWith('echo ')) {
      const text = originalCmd.substring(5)
      output = text
    } else if (trimmedCmd === 'date') {
      output = new Date().toLocaleString()
    } else if (trimmedCmd === 'pwd') {
      output = '/home/user'
    } else if (trimmedCmd === 'whoami') {
      output = 'vortex-user'
    } else {
      output = `❌ Command not recognized: ${cmd}

💡 Available commands:
   • vortex-cli          - Launch main interface
   • vortex-cli -S QUERY - Search videos
   • vortex-cli -d URL   - Download video
   • help               - Show help
   • clear              - Clear terminal
   • exit               - Exit

Type 'help' for detailed documentation.`
    }

    setCommands(prev => [...prev, {
      input: cmd,
      output,
      timestamp: new Date()
    }])
    setCurrentCommand('')
    setIsProcessing(false)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(currentCommand)
    }
  }

  const quickCommands = [
    'vortex-cli',
    'vortex-cli -S "linux tutorial"',
    'vortex-cli -d "https://youtu.be/dQw4w9WgXcQ"',
    'live',
    'playlists',
    'config',
    'help',
    'clear'
  ]

  return (
    <section id="demo" className="py-8 sm:py-12 border-t bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Terminal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
            Vortex CLI Terminal Environment
          </h2>
          <p className="text-lg sm:text-xl font-bold text-foreground px-4">Experience the full power of Vortex CLI in an interactive terminal</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <Card className="border-2 border-primary/30 bg-background">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl font-black font-heading">Interactive Demo</CardTitle>
                  <CardDescription className="text-sm sm:text-base font-semibold">
                    Full-featured terminal environment with realistic Vortex CLI commands, search results, downloads, and interactive menus.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setCommands([commands[0]])
                      setCurrentCommand('')
                    }}
                    variant="outline"
                    size="sm"
                    className="font-semibold w-full sm:w-auto"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              {/* Terminal Window */}
              <div
                ref={terminalRef}
                className="bg-black rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm h-80 sm:h-96 md:h-[28rem] overflow-y-auto border-2 border-primary/20"
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                }}
              >
                {/* Command History */}
                {commands.map((cmd, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-400 font-bold">user@terminal</span>
                      <span className="text-blue-400">:</span>
                      <span className="text-purple-400">~</span>
                      <span className="text-blue-400">$</span>
                      <span className="text-white ml-2">{cmd.input}</span>
                    </div>
                    <div
                      className="text-gray-300 whitespace-pre-wrap ml-2 font-mono text-xs"
                      dangerouslySetInnerHTML={{
                        __html: cmd.output
                          .replace(/🌪️/g, '<span class="text-blue-400">🌪️</span>')
                          .replace(/🎬/g, '<span class="text-red-400">🎬</span>')
                          .replace(/🎵/g, '<span class="text-purple-400">🎵</span>')
                          .replace(/📺/g, '<span class="text-green-400">📺</span>')
                          .replace(/⬇️/g, '<span class="text-yellow-400">⬇️</span>')
                          .replace(/📋/g, '<span class="text-cyan-400">📋</span>')
                          .replace(/⭐/g, '<span class="text-yellow-400">⭐</span>')
                          .replace(/🔍/g, '<span class="text-blue-400">🔍</span>')
                          .replace(/⚙️/g, '<span class="text-gray-400">⚙️</span>')
                          .replace(/📖/g, '<span class="text-green-400">📖</span>')
                          .replace(/🚪/g, '<span class="text-red-400">🚪</span>')
                          .replace(/👋/g, '<span class="text-yellow-400">👋</span>')
                          .replace(/❌/g, '<span class="text-red-400">❌</span>')
                      }}
                    />
                  </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center gap-2 group">
                  <span className="text-green-400 font-bold">user@terminal</span>
                  <span className="text-blue-400">:</span>
                  <span className="text-purple-400">~</span>
                  <span className="text-blue-400">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isProcessing}
                    className="flex-1 bg-transparent text-white outline-none ml-2 font-mono"
                    placeholder={isProcessing ? 'Processing...' : 'Type command and press Enter'}
                    autoFocus
                  />
                  {isProcessing && (
                    <div className="animate-pulse text-green-400">▋</div>
                  )}
                </div>
              </div>

              {/* Quick Commands */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-bold text-foreground">Quick Commands:</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {quickCommands.map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentCommand(cmd)
                        inputRef.current?.focus()
                      }}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-mono font-semibold bg-muted hover:bg-primary/10 rounded border border-border hover:border-primary/50 transition-all text-foreground hover:text-primary"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm font-bold text-foreground space-y-1">
                  <p>Full-powered terminal environment simulating real Vortex CLI behavior.</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Use actual commands like 'vortex-cli -S "query"', 'vortex-cli -d URL', or try 'help' for all options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
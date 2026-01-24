'use client'

import { Terminal, Play, Search, Download, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState, useRef, useEffect } from 'react'

interface Command {
  input: string
  output: string
  timestamp: Date
}

export function VortexCliTerminal() {
  // Custom styles for sliders
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      appearance: none;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background: hsl(var(--primary));
      cursor: pointer;
      border: 2px solid hsl(var(--background));
      box-shadow: 0 0 2px rgba(0,0,0,0.3);
    }
    .slider::-moz-range-thumb {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background: hsl(var(--primary));
      cursor: pointer;
      border: 2px solid hsl(var(--background));
      box-shadow: 0 0 2px rgba(0,0,0,0.3);
    }
  `
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
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [currentSongData, setCurrentSongData] = useState<any>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [playlist, setPlaylist] = useState<any[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState(-1)
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  // Get the appropriate API URL based on environment
  const getApiUrl = () => {
    // Use the deployed proxy server for streaming (search uses direct API)
    if (typeof window !== 'undefined') {
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return 'https://jiosaavn-proxy-evilxd.vercel.app' // ← Replace with your deployed proxy URL
      }
    }
    return 'http://localhost:3001'
  }

  // Get search API URL (direct Vercel API)
  const getSearchApiUrl = () => {
    return 'https://my-coral-six.vercel.app'
  }

  const playSongById = async (songId: string, songTitle: string, index: number = -1) => {
    try {
      console.log('Starting playback for:', songTitle)
      setCurrentSong(songTitle)
      setIsPlaying(true)
      setShowPlayer(true)
      if (index >= 0) {
        setCurrentSongIndex(index)
      }

      const apiUrl = getApiUrl()
      // Get song details for metadata
      const detailsResponse = await fetch(`${apiUrl}/api/songs/${songId}`)
      const detailsData = await detailsResponse.json()

      if (detailsData.success && detailsData.data?.length > 0) {
        const songDetails = detailsData.data[0]
        setCurrentSongData(songDetails)

        // Use the API streaming endpoint
        if (audioRef.current) {
          const streamUrl = `${apiUrl}/api/stream/${songId}`
          console.log('Stream URL:', streamUrl)
          audioRef.current.src = streamUrl
          audioRef.current.volume = volume / 100

          try {
            await audioRef.current.play()
            console.log('Playback initiated successfully')
          } catch (playError) {
            console.error('Play failed:', playError)
            setIsPlaying(false)
          }
        }
      } else {
        console.error('No song details found')
        setIsPlaying(false)
      }
    } catch (error) {
      console.error('Playback error:', error)
      setIsPlaying(false)
    }
  }

  const playSong = async (songName: string) => {
    try {
      console.log('Starting playback for:', songName)
      setCurrentSong(songName)
      setIsPlaying(true)
      setShowPlayer(true)

      // First, search for the song using API
      console.log('Searching for song...')
      const searchApiUrl = getSearchApiUrl()
      const searchResponse = await fetch(`${searchApiUrl}/api/search?query=${encodeURIComponent(songName)}&limit=20`)
      const searchData = await searchResponse.json()
      console.log('Search response:', searchData)

      if (searchData.success && searchData.data?.songs?.results?.length > 0) {
        const song = searchData.data.songs.results[0] // Get first song result
        const songId = song.id
        console.log('Found song ID:', songId)

        // Set up playlist with all songs from search
        const playlistSongs = searchData.data.songs.results.slice(0, 15).map((s: any) => ({
          id: s.id,
          title: s.title,
          artist: s.primaryArtists || s.singers
        }))
        setPlaylist(playlistSongs)
        setCurrentSongIndex(0)
        setIsShuffleMode(true) // Enable shuffle by default for variety

        await playSongById(songId, song.title)
      } else {
        console.error('No song found in search results')
        setIsPlaying(false)
      }
    } catch (error) {
      console.error('Playback error:', error)
      setIsPlaying(false)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - playerPosition.x,
      y: e.clientY - playerPosition.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPlayerPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  const pauseSong = () => {
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const resumeSong = () => {
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const playNextSong = async () => {
    if (playlist.length > 0 && currentSongIndex >= 0) {
      // ADVANCED: Spotify-like intelligent recommendation system
      // Always check if we need to expand playlist with smart recommendations
      if (playlist.length < 40) {
        try {
          console.log('🎵 Advanced Music Discovery: Expanding playlist...')
          const currentSong = playlist[currentSongIndex] || playlist[0]
          const currentLanguage = currentSong.language || 'hindi'

          // Extract mood/genre from song title (advanced NLP-like detection)
          const titleLower = currentSong.title.toLowerCase()
          const artistLower = currentSong.artist.toLowerCase()

          // Detect mood/genre from title keywords
          let detectedMood = 'general'
          if (titleLower.includes('love') || titleLower.includes('romantic') || titleLower.includes('pyaar') || titleLower.includes('ishq')) {
            detectedMood = 'romantic'
          } else if (titleLower.includes('party') || titleLower.includes('dance') || titleLower.includes('dj') || titleLower.includes('remix')) {
            detectedMood = 'party'
          } else if (titleLower.includes('sad') || titleLower.includes('dard') || titleLower.includes('alone') || titleLower.includes('broken')) {
            detectedMood = 'sad'
          } else if (titleLower.includes('motivat') || titleLower.includes('inspire') || titleLower.includes('workout') || titleLower.includes('gym')) {
            detectedMood = 'motivational'
          } else if (titleLower.includes('classical') || titleLower.includes('ghazal') || titleLower.includes('sufi')) {
            detectedMood = 'classical'
          }

          // STRATEGY 1: Genre/Mood-based recommendations (70% weight)
          const moodStrategies: any = {
            romantic: {
              hindi: ['hindi romantic songs', 'bollywood love songs', 'hindi melody', 'romantic hindi hits', 'pyaar ke geet'],
              punjabi: ['punjabi romantic songs', 'punjabi love songs', 'romantic punjabi hits'],
              english: ['romantic english songs', 'love songs english', 'romantic pop hits', 'ballads english']
            },
            party: {
              hindi: ['hindi party songs', 'bollywood dance hits', 'hindi dj remix', 'party songs bollywood', 'dance numbers hindi'],
              punjabi: ['punjabi party songs', 'punjabi bhangra', 'dance punjabi hits', 'punjabi club songs'],
              english: ['english party songs', 'dance pop hits', 'club music english', 'edm hits']
            },
            sad: {
              hindi: ['hindi sad songs', 'bollywood sad melody', 'dard bhari songs', 'emotional hindi songs'],
              punjabi: ['punjabi sad songs', 'emotional punjabi', 'punjabi breakup songs'],
              english: ['sad english songs', 'emotional ballads', 'heartbreak songs english']
            },
            motivational: {
              hindi: ['motivational hindi songs', 'inspiring bollywood', 'workout hindi songs', 'uplifting hindi'],
              punjabi: ['motivational punjabi songs', 'inspiring punjabi', 'workout punjabi'],
              english: ['motivational english songs', 'inspiring pop', 'workout music', 'uplifting songs']
            },
            classical: {
              hindi: ['classical hindi songs', 'ghazals', 'sufi songs', 'old hindi classics'],
              punjabi: ['classical punjabi songs', 'punjabi folk'],
              english: ['classical english songs', 'acoustic english', 'indie english']
            },
            general: {
              hindi: ['trending hindi songs', 'bollywood hits', 'top hindi songs', 'new hindi songs', 'popular bollywood'],
              punjabi: ['trending punjabi songs', 'punjabi hits', 'top punjabi songs', 'new punjabi'],
              english: ['trending english songs', 'pop hits', 'top english songs', 'new pop songs']
            }
          }

          // STRATEGY 2: Similar artists (20% weight)
          const artistStrategies = [
            `${currentSong.artist} similar artists`,
            `like ${currentSong.artist}`,
            `${currentSong.artist} fans also like`
          ]

          // STRATEGY 3: Year/Era-based (10% weight)
          const eraStrategies = [
            `${currentLanguage} 90s songs`,
            `${currentLanguage} 2000s hits`,
            `${currentLanguage} 2010s songs`,
            `classic ${currentLanguage} songs`,
            `retro ${currentLanguage} hits`
          ]

          let newSongs: any[] = []
          const targetSongs = 15

          // Get mood-based recommendations (70%)
          const moodQueries = moodStrategies[detectedMood]?.[currentLanguage] || moodStrategies.general[currentLanguage] || []
          for (let i = 0; i < 10 && newSongs.length < Math.floor(targetSongs * 0.7); i++) {
            const randomQuery = moodQueries[Math.floor(Math.random() * moodQueries.length)]
            console.log(`🎭 Mood-based (${detectedMood}/${currentLanguage}): ${randomQuery}`)

            const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(randomQuery)}&limit=8`)
            const searchData = await searchResponse.json()

            if (searchData.success && searchData.data?.songs?.results?.length > 0) {
              const batchSongs = searchData.data.songs.results
                .filter((song: any) => !playlist.some((p: any) => p.id === song.id))
                .filter((song: any) => song.language === currentLanguage || !song.language)
                .filter((song: any) => {
                  // Avoid same artist repetition (max 2 songs per artist in playlist)
                  const artistCount = playlist.filter(p => p.artist === (song.primaryArtists || song.singers)).length
                  return artistCount < 2
                })
                .slice(0, 2)
                .map((song: any) => ({
                  id: song.id,
                  title: song.title,
                  artist: song.primaryArtists || song.singers,
                  language: song.language,
                  recommendationType: 'mood',
                  mood: detectedMood
                }))

              newSongs = [...newSongs, ...batchSongs]
            }
          }

          // Get artist-based recommendations (20%)
          for (let i = 0; i < 3 && newSongs.length < Math.floor(targetSongs * 0.9); i++) {
            const randomQuery = artistStrategies[Math.floor(Math.random() * artistStrategies.length)]
            console.log(`👤 Artist-based: ${randomQuery}`)

            const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(randomQuery)}&limit=5`)
            const searchData = await searchResponse.json()

            if (searchData.success && searchData.data?.songs?.results?.length > 0) {
              const batchSongs = searchData.data.songs.results
                .filter((song: any) => !playlist.some((p: any) => p.id === song.id))
                .filter((song: any) => song.language === currentLanguage || !song.language)
                .filter((song: any) => {
                  const artistCount = playlist.filter(p => p.artist === (song.primaryArtists || song.singers)).length
                  return artistCount < 2
                })
                .slice(0, 1)
                .map((song: any) => ({
                  id: song.id,
                  title: song.title,
                  artist: song.primaryArtists || song.singers,
                  language: song.language,
                  recommendationType: 'artist-similar'
                }))

              newSongs = [...newSongs, ...batchSongs]
            }
          }

          // Get era-based recommendations (10%)
          for (let i = 0; i < 2 && newSongs.length < targetSongs; i++) {
            const randomQuery = eraStrategies[Math.floor(Math.random() * eraStrategies.length)]
            console.log(`🕰️ Era-based: ${randomQuery}`)

            const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(randomQuery)}&limit=5`)
            const searchData = await searchResponse.json()

            if (searchData.success && searchData.data?.songs?.results?.length > 0) {
              const batchSongs = searchData.data.songs.results
                .filter((song: any) => !playlist.some((p: any) => p.id === song.id))
                .filter((song: any) => song.language === currentLanguage || !song.language)
                .filter((song: any) => {
                  const artistCount = playlist.filter(p => p.artist === (song.primaryArtists || song.singers)).length
                  return artistCount < 2
                })
                .slice(0, 1)
                .map((song: any) => ({
                  id: song.id,
                  title: song.title,
                  artist: song.primaryArtists || song.singers,
                  language: song.language,
                  recommendationType: 'era-based'
                }))

              newSongs = [...newSongs, ...batchSongs]
            }
          }

          // Advanced deduplication and diversity check
          const uniqueSongs = newSongs.filter((song, index, self) =>
            index === self.findIndex(s => s.id === song.id)
          ).slice(0, 15)

          if (uniqueSongs.length > 0) {
            setPlaylist(prev => [...prev, ...uniqueSongs])
            console.log(`✅ Added ${uniqueSongs.length} diverse songs (Mood: ${detectedMood}, Lang: ${currentLanguage}). Total: ${playlist.length + uniqueSongs.length}`)
          }
        } catch (error) {
          console.error('Error expanding playlist:', error)
        }
      }

      let nextIndex

      if (isShuffleMode) {
        // ADVANCED SHUFFLE: Weighted randomization to avoid artist repetition
        const recentlyPlayed = playlist.slice(Math.max(0, currentSongIndex - 3), currentSongIndex + 1)
        const recentArtists = recentlyPlayed.map(s => s.artist)

        // Filter out recently played artists for better variety
        const diverseIndices = Array.from({length: playlist.length}, (_, i) => i)
          .filter(i => i !== currentSongIndex)
          .filter(i => !recentArtists.includes(playlist[i]?.artist))

        if (diverseIndices.length > 0) {
          nextIndex = diverseIndices[Math.floor(Math.random() * diverseIndices.length)]
        } else {
          // Fallback to any song except current
          const availableIndices = Array.from({length: playlist.length}, (_, i) => i)
            .filter(i => i !== currentSongIndex)
          nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
        }
      } else {
        nextIndex = currentSongIndex + 1
      }

      // Play next song
      if (nextIndex < playlist.length) {
        const nextSong = playlist[nextIndex]
        console.log(`▶️ Playing next: ${nextSong.title} by ${nextSong.artist} (${nextIndex + 1}/${playlist.length})`)
        playSongById(nextSong.id, nextSong.title, nextIndex)
      } else {
        // Loop back to beginning if we've reached the end
        const nextSong = playlist[0]
        console.log(`🔄 Looping back to: ${nextSong.title} by ${nextSong.artist}`)
        playSongById(nextSong.id, nextSong.title, 0)
      }
    } else {
      setIsPlaying(false)
    }
  }

  const playPreviousSong = () => {
    if (playlist.length > 0 && currentSongIndex >= 0) {
      const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1
      const prevSong = playlist[prevIndex]
      playSongById(prevSong.id, prevSong.title, prevIndex)
    }
  }

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    setIsProcessing(true)
    const trimmedCmd = cmd.trim().toLowerCase()
    const originalCmd = cmd.trim()
    let output = ''

    // Simulate realistic processing time - removed for debugging
    // const processingTime = Math.random() * 800 + 200
    // await new Promise(resolve => setTimeout(resolve, processingTime))

    // Handle number selection for search results
    if (searchResults.length > 0 && /^\d+$/.test(trimmedCmd)) {
      const selectedIndex = parseInt(trimmedCmd) - 1
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        const selectedSong = searchResults[selectedIndex]
        output = `🎵 Playing selection #${trimmedCmd}: ${selectedSong.title}

⏳ Loading song...`
        // Set up playlist and expand it immediately for variety
        setPlaylist(searchResults)

        // Immediately expand playlist with language-aware recommendations
        setTimeout(async () => {
          try {
            const selectedSong = searchResults[selectedIndex]
            const selectedLanguage = selectedSong.language || 'hindi'

            // Language-aware initial expansion with artist diversity
            const languageSpecificInitial = {
              hindi: [
                // General searches first (more variety)
                `hindi romantic songs`,
                `bollywood hits`,
                `hindi pop songs`,
                `old hindi songs`,
                `trending hindi`,
                `hindi party songs`,
                `hindi wedding songs`,
                // Artist-specific (less emphasis)
                `${selectedSong.artist} hindi songs`,
                `${selectedSong.artist} other hindi songs`
              ],
              punjabi: [
                // General searches first
                `punjabi romantic songs`,
                `punjabi bhangra`,
                `trending punjabi`,
                `punjabi party songs`,
                // Artist-specific less prominent
                `${selectedSong.artist} punjabi songs`,
                `${selectedSong.artist} other punjabi songs`
              ],
              english: [
                // General searches first
                `english romantic songs`,
                `english pop songs`,
                `trending english`,
                `english party songs`,
                `english indie songs`,
                // Artist-specific less prominent
                `${selectedSong.artist} english songs`,
                `${selectedSong.artist} other english songs`
              ]
            }

            const initialStrategies = languageSpecificInitial[selectedLanguage as keyof typeof languageSpecificInitial] || [
              `${selectedSong.artist} songs`,
              `romantic songs`,
              `trending music`,
              `popular songs`
            ]

            let expandedSongs: any[] = []

            // Get language-appropriate songs for initial expansion
            for (let i = 0; i < 6 && expandedSongs.length < 15; i++) {
              const randomQuery = initialStrategies[Math.floor(Math.random() * initialStrategies.length)]
              console.log(`Initial expansion (${selectedLanguage}): ${randomQuery}`)

              const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(randomQuery)}&limit=5`)
              const searchData = await searchResponse.json()

              if (searchData.success && searchData.data?.songs?.results?.length > 0) {
                const batchSongs = searchData.data.songs.results
                  .filter((song: any) => !searchResults.some((p: any) => p.id === song.id))
                  .filter((song: any) => song.language === selectedLanguage || !song.language)
                  .slice(0, 3) // 3 from each batch
                  .map((song: any) => ({
                    id: song.id,
                    title: song.title,
                    artist: song.primaryArtists || song.singers,
                    language: song.language
                  }))

                expandedSongs = [...expandedSongs, ...batchSongs]
              }
            }

            // Remove duplicates
            const uniqueExpandedSongs = expandedSongs.filter((song, index, self) =>
              index === self.findIndex(s => s.id === song.id)
            ).slice(0, 15) // Up to 15 additional songs

            if (uniqueExpandedSongs.length > 0) {
              setPlaylist(prev => [...prev, ...uniqueExpandedSongs])
              console.log(`Expanded initial playlist with ${uniqueExpandedSongs.length} ${selectedLanguage} recommendations`)
            }
          } catch (error) {
            console.error('Error expanding initial playlist:', error)
          }
        }, 1000) // Small delay to not interfere with initial playback

        playSongById(selectedSong.id, selectedSong.title, selectedIndex)
        setSearchResults([]) // Clear results after selection
      } else {
        output = `❌ Invalid selection. Please choose a number between 1-${searchResults.length}`
      }
    }
    // Handle direct play command - now shows search results first
    else if (trimmedCmd.startsWith('play')) {
      const query = originalCmd.replace(/^play\s*/, '').trim()
      if (!query) {
        output = `❌ Please specify a song to play. Usage: play "song name"`
      } else {
        // Show search results first, just like music command
        try {
          output = `🔍 Searching Evilxd for: "${query}"

⡿ Finding songs...
⣟ Loading results...
⣯ Processing data...`

          // Fetch real search results from API
          const searchResponse = await fetch(`${getApiUrl()}/api/search?query=${encodeURIComponent(query)}&limit=20`)
          const searchData = await searchResponse.json()

          if (searchData.success && searchData.data?.songs?.results?.length > 0) {
            const songs = searchData.data.songs.results.slice(0, 15) // Get first 15 results

            let resultsDisplay = `✅ Search completed!

┌─────────────────────────────────────────────────────────────┐
│  🎵 Evilxd Search Results - ${query}                    │
├─────────────────────────────────────────────────────────────┤`

            const realSearchResults = songs.map((song: any, index: number) => {
              const title = song.title || 'Unknown Title'
              const artist = song.primaryArtists || song.singers || 'Unknown Artist'
              const duration = song.duration || '3:30' // Default duration if not available
              return {
                id: song.id,
                title: title,
                artist: artist,
                duration: duration,
                quality: '320kbps'
              }
            })

            realSearchResults.forEach((song: any, index: number) => {
              const num = (index + 1).toString().padStart(2, ' ')
              const title = song.title.length > 35 ? song.title.substring(0, 32) + '...' : song.title
              const artist = song.artist.length > 20 ? song.artist.substring(0, 17) + '...' : song.artist
              resultsDisplay += `\n│  ${num}. ${title} - ${artist} (${song.duration}) │`
            })

            resultsDisplay += `\n└─────────────────────────────────────────────────────────────┘

📊 Found ${songs.length} results | 🎼 Lyrics available | ❤️ Add to favorites

🎯 Type a number (1-${songs.length}) to play, or search again with: play "new query"`

            output = resultsDisplay

            // Store real search results for number selection
            setSearchResults(realSearchResults)
          } else {
            output = `❌ No songs found for "${query}"

💡 Try different keywords or check your spelling`
            setSearchResults([])
          }
        } catch (error) {
          console.error('Search error:', error)
          output = `❌ Search failed. Please check if the proxy server is running.

🔧 Make sure to run: npm run proxy

💡 Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          setSearchResults([])
        }
      }
    }
    // Handle music search command
    else if (trimmedCmd.startsWith('music') || trimmedCmd.startsWith('song') || trimmedCmd.startsWith('vortex-cli -p ')) {
      const query = originalCmd.replace(/^(music|song|vortex-cli -p)\s*/, '').trim()

      if (!query) {
        output = `🎵 Evilxd Music Player - Integrated with Vortex CLI

🎧 Features:
   • Search millions of songs
   • High-quality streaming (320kbps)
   • Lyrics support
   • Playlist management
   • Offline downloads

Usage:
   music [song name]     - Search and play
   play [song name]      - Direct play
   lyrics                - Show current lyrics
   queue                 - Show playlist

Example: music "Shape of You"

${currentSong ? `🎵 **NOW PLAYING:** ${currentSong} ${isPlaying ? '(Playing)' : '(Paused)'}` : '🎵 No song currently playing'}

🚀 **Audio streaming is now enabled!**
   ✅ Proxy server running on port 3001
   🎵 Ready to stream Evilxd music
   🔊 Try: music "Shape of You"

Enter song to search: `
      } else {
        // Real Evilxd API search
        try {
          output = `🔍 Searching Evilxd for: "${query}"

⡿ Finding songs...
⣟ Loading results...
⣯ Processing data...`

          // Fetch real search results from API
          const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(query)}&limit=20`)
          const searchData = await searchResponse.json()

          if (searchData.success && searchData.data) {
            // Collect all types of results
            const allResults: any[] = []

            // Add songs
            if (searchData.data.songs?.results) {
              searchData.data.songs.results.forEach((song: any) => {
                allResults.push({
                  id: song.id,
                  title: song.title || 'Unknown Title',
                  artist: song.primaryArtists || song.singers || 'Unknown Artist',
                  type: 'song',
                  duration: song.duration || '3:30',
                  quality: '320kbps',
                  album: song.album,
                  language: song.language
                })
              })
            }

            // Add albums
            if (searchData.data.albums?.results) {
              searchData.data.albums.results.forEach((album: any) => {
                allResults.push({
                  id: album.id,
                  title: album.title || 'Unknown Album',
                  artist: album.artist || 'Unknown Artist',
                  type: 'album',
                  year: album.year,
                  language: album.language,
                  songCount: album.songIds ? album.songIds.split(',').length : 'N/A'
                })
              })
            }

            // Add artists
            if (searchData.data.artists?.results) {
              searchData.data.artists.results.forEach((artist: any) => {
                allResults.push({
                  id: artist.id,
                  title: artist.title || 'Unknown Artist',
                  type: 'artist',
                  description: artist.description || 'Artist'
                })
              })
            }

            // Add playlists
            if (searchData.data.playlists?.results) {
              searchData.data.playlists.results.forEach((playlist: any) => {
                allResults.push({
                  id: playlist.id,
                  title: playlist.title || 'Unknown Playlist',
                  type: 'playlist',
                  language: playlist.language,
                  description: playlist.description || 'Playlist'
                })
              })
            }

            // Limit to 15 results total
            const displayResults = allResults.slice(0, 15)

            let resultsDisplay = `✅ Search completed!

┌─────────────────────────────────────────────────────────────┐
│  🎵 Evilxd Search Results - ${query}                    │
├─────────────────────────────────────────────────────────────┤`

            displayResults.forEach((item: any, index: number) => {
              const num = (index + 1).toString().padStart(2, ' ')
              let displayText = ''

              if (item.type === 'song') {
                const title = item.title.length > 30 ? item.title.substring(0, 27) + '...' : item.title
                const artist = item.artist.length > 15 ? item.artist.substring(0, 12) + '...' : item.artist
                displayText = `${title} - ${artist} (${item.duration}) 🎵`
              } else if (item.type === 'album') {
                const title = item.title.length > 25 ? item.title.substring(0, 22) + '...' : item.title
                const artist = item.artist.length > 15 ? item.artist.substring(0, 12) + '...' : item.artist
                displayText = `${title} - ${artist} (${item.year}) 💿`
              } else if (item.type === 'artist') {
                const title = item.title.length > 35 ? item.title.substring(0, 32) + '...' : item.title
                displayText = `${title} (${item.description}) 🎤`
              } else if (item.type === 'playlist') {
                const title = item.title.length > 30 ? item.title.substring(0, 27) + '...' : item.title
                displayText = `${title} (${item.language}) 📋`
              }

              resultsDisplay += `\n│  ${num}. ${displayText} │`
            })

            resultsDisplay += `\n└─────────────────────────────────────────────────────────────┘

📊 Found ${allResults.length} total results | 🎵 Songs: ${searchData.data.songs?.results?.length || 0} | 💿 Albums: ${searchData.data.albums?.results?.length || 0} | 🎤 Artists: ${searchData.data.artists?.results?.length || 0} | 📋 Playlists: ${searchData.data.playlists?.results?.length || 0}

🎯 Type a number (1-${displayResults.length}) to play/select, or search again with: music "new query"`

            output = resultsDisplay

            // Store results for number selection (only songs can be played)
            const playableResults = displayResults.filter((item: any) => item.type === 'song')
            setSearchResults(playableResults)
          } else {
            output = `❌ No songs found for "${query}"

💡 Try different keywords or check your spelling`
            setSearchResults([])
          }
        } catch (error) {
          console.error('Search error:', error)
          output = `❌ Search failed. Please check if the proxy server is running.

🔧 Make sure to run: npm run proxy

💡 Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          setSearchResults([])
        }
      }
    } else if (trimmedCmd === 'lyrics' || trimmedCmd === 'lyric') {
      output = `📝 Evilxd Lyrics - Integrated View

🎵 "Shape of You" - Ed Sheeran

[Verse 1]
The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow

[Pre-Chorus]
And you come over and start up a conversation with just me
And trust me I'll give it a chance now
Take my hand, stop, put Van The Man on the jukebox
And then we start to dance

[Chorus]
Come on, be my baby, come on
Come on, be my baby, come on
I've been watching you for ages
Come on, be my baby, come on

⏱️  1:45 / 4:23 [████████████████████████] 40%
🔊 Volume: 75% | Source: Evilxd API

[space] pause | [l] toggle lyrics | [q] quit player: `
    } else if (trimmedCmd === 'queue' || trimmedCmd === 'playlist') {
      output = `📋 Evilxd Queue Manager

🎵 Current Playlist: "My Evilxd Mix"
📊 25 songs | 1:42:33 total | Quality: 320kbps

┌─────────────────────────────────────────────────────────────┐
│  ▶️ Now Playing: "Shape of You" - Ed Sheeran              │
├─────────────────────────────────────────────────────────────┤
│  ⏯️ "Blinding Lights" - The Weeknd (3:20)                │
│  ⏯️ "Levitating" - Dua Lipa (3:23)                       │
│  ⏯️ "Good 4 U" - Olivia Rodrigo (2:58)                  │
│  ⏯️ "Stay" - The Kid Laroi & Justin Bieber (2:21)       │
│  ⏯️ "Peaches" - Justin Bieber ft. Daniel Caesar (3:18)   │
│  ⏯️ "Drivers License" - Olivia Rodrigo (4:02)            │
│  ⏯️ "Montero" - Lil Nas X (2:30)                         │
└─────────────────────────────────────────────────────────────┘

🎶 Playback: 🔄 Repeat All | 🔀 Shuffle: ON | 📱 Auto-sync: ON
📡 Stream Quality: 320kbps | Source: Evilxd API

Controls: [n] next, [p] previous, [s] shuffle, [r] repeat: `
    } else if (trimmedCmd === 'evilxd' || trimmedCmd === 'evilxd') {
      output = `🎵 Evilxd API Status - Connected via Vortex CLI
┌─────────────────────────────────────────────────────────────┐
│  🌐 API Status: Online                                     │
├─────────────────────────────────────────────────────────────┤
│  📊 Songs Available: 50M+                                  │
│  🎚️ Quality Options: 96kbps, 160kbps, 320kbps            │
│  📝 Lyrics Support: Available                              │
│  📱 Cross-Platform: Web, Mobile, Desktop                  │
│  🌍 Languages: Hindi, English, Regional                   │
│  💾 Offline Downloads: Supported                           │
└─────────────────────────────────────────────────────────────┘

🎧 Recent Activity:
   • Searched: "Shape of You"
   • Played: 12 songs this session
   • Downloaded: 0 songs
   • Added to favorites: 3 songs

Commands:
   music [query]     - Search and play songs
   lyrics           - Show current song lyrics
   queue            - Show playback queue
   evilxd status     - API connection status

Evilxd integration active! 🎶`
    }

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
    } else if (trimmedCmd === 'shuffle' || trimmedCmd === 'toggle shuffle') {
      setIsShuffleMode(!isShuffleMode)
      output = `🔀 Shuffle mode ${!isShuffleMode ? 'ENABLED' : 'DISABLED'}

🎵 Next songs will ${!isShuffleMode ? 'play randomly' : 'play sequentially'}
📊 Current playlist: ${playlist.length} songs
🎶 Shuffle: ${!isShuffleMode ? 'ON' : 'OFF'}`
    } else if (trimmedCmd === 'playlist' || trimmedCmd === 'queue' || trimmedCmd === 'songs') {
      if (playlist.length === 0) {
        output = `📋 No playlist active

🎵 Search for music first with: music "song name"`
      } else {
        let playlistDisplay = `📋 Current Playlist (${playlist.length} songs)
🔀 Shuffle: ${isShuffleMode ? 'ON' : 'OFF'}

┌─────────────────────────────────────────────────────────────┐
│  🎵 Playlist                                              │
├─────────────────────────────────────────────────────────────┤`

        playlist.forEach((song: any, index: number) => {
          const marker = index === currentSongIndex ? '▶️' : '  '
          const num = (index + 1).toString().padStart(2, ' ')
          const title = song.title.length > 25 ? song.title.substring(0, 22) + '...' : song.title
          const artist = song.artist.length > 20 ? song.artist.substring(0, 17) + '...' : song.artist
          playlistDisplay += `\n│ ${marker} ${num}. ${title} - ${artist} │`
        })

        playlistDisplay += `\n└─────────────────────────────────────────────────────────────┘

🎯 Currently playing: ${currentSongIndex >= 0 ? playlist[currentSongIndex]?.title : 'None'}
🎼 Use next/previous buttons or type 'shuffle' to toggle random mode`
        output = playlistDisplay
      }
    } else if (trimmedCmd === 'whoami') {
      output = 'vortex-user'
    } else if (trimmedCmd === 'tutorial' || trimmedCmd === 'guide' || trimmedCmd === 'step' || trimmedCmd === 'steps') {
      output = `📚 Vortex CLI + Evilxd Tutorial - Step by Step Guide

🎯 **STEP 1: Launch Vortex CLI**
   Type: \`vortex-cli\`
   Result: Shows main menu with 9 options

🎯 **STEP 2: Search YouTube Videos**
   Type: \`vortex-cli -S "linux tutorial"\`
   Or: \`1\` (then enter search query)
   Result: Shows video search results with thumbnails

🎯 **STEP 3: Try Music Streaming**
   Type: \`music "Shape of You"\`
   Result: Searches Evilxd and shows song results

🎯 **STEP 4: Play Music**
   Type: \`play "Blinding Lights"\`
   Result: Shows music player interface with progress bar

🎯 **STEP 5: View Lyrics**
   Type: \`lyrics\`
   Result: Displays current song lyrics with sync

🎯 **STEP 6: Check Music Queue**
   Type: \`queue\`
   Result: Shows playlist with current song and upcoming tracks

🎯 **STEP 7: Watch Live Streams**
   Type: \`live\` or \`2\`
   Result: Shows active live streams with viewer counts

🎯 **STEP 8: Download Content**
   Type: \`vortex-cli -d "https://youtu.be/VIDEO_ID"\`
   Result: Simulates download with progress bar

🎯 **STEP 9: Get Help**
   Type: \`help\`
   Result: Shows all available commands and options

🎯 **STEP 10: Clear Screen**
   Type: \`clear\`
   Result: Clears terminal and starts fresh

💡 **Quick Commands (Click buttons below):**
   • vortex-cli - Launch main interface
   • music "Shape of You" - Search music
   • lyrics - Show lyrics
   • queue - View playlist

🚀 **Pro Tips:**
   • Use arrow keys or click quick command buttons
   • Try different search queries
   • Explore both YouTube and music features
   • Type 'help' anytime for assistance

Ready to explore? Try: \`vortex-cli\` 🎉`
    } else if (trimmedCmd.length > 2 && (trimmedCmd.includes(' ') || trimmedCmd.split(' ').length > 1 || /^[a-zA-Z\s]+$/.test(trimmedCmd))) {
      // Treat as direct song search if it looks like a song name
      const query = originalCmd.trim()
      if (!query) {
        output = `❌ Please specify a song to search for.`
      } else {
        // Real Evilxd API search
        try {
          output = `🔍 Searching Evilxd for: "${query}"

⡿ Finding songs...
⣟ Loading results...
⣯ Processing data...`

          // Fetch real search results from API
          const searchResponse = await fetch(`${getSearchApiUrl()}/api/search?query=${encodeURIComponent(query)}&limit=20`)
          const searchData = await searchResponse.json()

          if (searchData.success && searchData.data) {
            // Collect all types of results
            const allResults: any[] = []
            let resultIndex = 0

            // Add songs
            if (searchData.data.songs?.results) {
              searchData.data.songs.results.forEach((song: any) => {
                allResults.push({
                  id: song.id,
                  title: song.title || 'Unknown Title',
                  artist: song.primaryArtists || song.singers || 'Unknown Artist',
                  type: 'song',
                  duration: song.duration || '3:30',
                  quality: '320kbps',
                  album: song.album,
                  language: song.language
                })
              })
            }

            // Add albums
            if (searchData.data.albums?.results) {
              searchData.data.albums.results.forEach((album: any) => {
                allResults.push({
                  id: album.id,
                  title: album.title || 'Unknown Album',
                  artist: album.artist || 'Unknown Artist',
                  type: 'album',
                  year: album.year,
                  language: album.language,
                  songCount: album.songIds ? album.songIds.split(',').length : 'N/A'
                })
              })
            }

            // Add artists
            if (searchData.data.artists?.results) {
              searchData.data.artists.results.forEach((artist: any) => {
                allResults.push({
                  id: artist.id,
                  title: artist.title || 'Unknown Artist',
                  type: 'artist',
                  description: artist.description || 'Artist'
                })
              })
            }

            // Add playlists
            if (searchData.data.playlists?.results) {
              searchData.data.playlists.results.forEach((playlist: any) => {
                allResults.push({
                  id: playlist.id,
                  title: playlist.title || 'Unknown Playlist',
                  type: 'playlist',
                  language: playlist.language,
                  description: playlist.description || 'Playlist'
                })
              })
            }

            // Limit to 15 results total
            const displayResults = allResults.slice(0, 15)

            let resultsDisplay = `✅ Search completed!

┌─────────────────────────────────────────────────────────────┐
│  🎵 Evilxd Search Results - ${query}                    │
├─────────────────────────────────────────────────────────────┤`

            displayResults.forEach((item: any, index: number) => {
              const num = (index + 1).toString().padStart(2, ' ')
              let displayText = ''

              if (item.type === 'song') {
                const title = item.title.length > 30 ? item.title.substring(0, 27) + '...' : item.title
                const artist = item.artist.length > 15 ? item.artist.substring(0, 12) + '...' : item.artist
                displayText = `${title} - ${artist} (${item.duration}) 🎵`
              } else if (item.type === 'album') {
                const title = item.title.length > 25 ? item.title.substring(0, 22) + '...' : item.title
                const artist = item.artist.length > 15 ? item.artist.substring(0, 12) + '...' : item.artist
                displayText = `${title} - ${artist} (${item.year}) 💿`
              } else if (item.type === 'artist') {
                const title = item.title.length > 35 ? item.title.substring(0, 32) + '...' : item.title
                displayText = `${title} (${item.description}) 🎤`
              } else if (item.type === 'playlist') {
                const title = item.title.length > 30 ? item.title.substring(0, 27) + '...' : item.title
                displayText = `${title} (${item.language}) 📋`
              }

              resultsDisplay += `\n│  ${num}. ${displayText} │`
            })

            resultsDisplay += `\n└─────────────────────────────────────────────────────────────┘

📊 Found ${allResults.length} total results | 🎵 Songs: ${searchData.data.songs?.results?.length || 0} | 💿 Albums: ${searchData.data.albums?.results?.length || 0} | 🎤 Artists: ${searchData.data.artists?.results?.length || 0} | 📋 Playlists: ${searchData.data.playlists?.results?.length || 0}

🎯 Type a number (1-${displayResults.length}) to play/select, or search again with: music "new query"`

            output = resultsDisplay

            // Store results for number selection (only songs can be played)
            const playableResults = displayResults.filter((item: any) => item.type === 'song')
            setSearchResults(playableResults)
          } else {
            output = `❌ No songs found for "${query}"

💡 Try different keywords or check your spelling`
            setSearchResults([])
          }
        } catch (error) {
          console.error('Search error:', error)
          output = `❌ Search failed. Please check if the proxy server is running.

🔧 Make sure to run: npm run proxy

💡 Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          setSearchResults([])
        }
      }
    } else {
      output = `❌ Command not recognized: ${cmd}

💡 Available commands:
   • vortex-cli          - Launch main interface
   • vortex-cli -S QUERY - Search YouTube videos
   • music "song"        - Search Evilxd music
   • play "song"         - Play music (demo mode)
   • shuffle            - Toggle shuffle/random mode
   • playlist           - Show current playlist
   • lyrics             - Show current lyrics
   • queue              - Show music queue
   • tutorial           - Step-by-step usage guide
   • help               - Show help
   • clear              - Clear terminal
   • exit               - Exit

💡 **NEW:** You can now type song names directly! Try: "Shape of You"
🔀 **Shuffle Mode:** Type 'shuffle' to toggle random playback

Type 'help' for a full list of commands and usage tips.`
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
    'music "Shape of You"',
    'play "Blinding Lights"',
    'lyrics',
    'queue',
    'tutorial',
    'live',
    'playlists',
    'config',
    'help',
    'clear'
  ]

  return (
    <section id="demo" className="py-8 sm:py-12 border-t bg-muted/20">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Terminal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
            Vortex CLI + Evilxd Music Player
          </h2>
          <p className="text-lg sm:text-xl font-bold text-foreground px-4">Experience YouTube browsing + Evilxd music streaming in one powerful terminal interface</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <Card className="border-2 border-primary/30 bg-background">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl font-black font-heading">Interactive Demo</CardTitle>
                  <CardDescription className="text-sm sm:text-base font-semibold">
                    Complete terminal experience with Vortex CLI YouTube features + Evilxd music streaming integration. Search, play, and manage music with realistic API responses.
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
                {commands.filter(cmd => cmd).map((cmd, index) => (
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
                  <p>Ultimate terminal experience combining Vortex CLI YouTube features with Evilxd music streaming.</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Try YouTube commands like 'vortex-cli -S "query"' or music commands like 'music "Shape of You"', 'lyrics', 'queue'.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


      {/* Hidden audio element for music playback */}
      <audio
        ref={audioRef}
        onEnded={playNextSong}
        onError={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />

      {/* Floating Music Player Window */}
      {showPlayer && currentSongData && (
        <div
          className={`fixed z-50 ${isMinimized ? 'w-80 h-20' : 'w-96 h-80'} bg-background/95 backdrop-blur-md border-2 border-primary/30 rounded-lg shadow-2xl overflow-hidden`}
          style={{
            left: `${playerPosition.x}px`,
            top: `${playerPosition.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Header - Draggable */}
          <div
            className="bg-primary/10 px-3 py-2 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Evilxd Player</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Minimize/Maximize */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l5-5 5 5z" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
                    </svg>
                  )}
                </button>
                {/* Close */}
                <button
                  onClick={() => setShowPlayer(false)}
                  className="p-1 text-muted-foreground hover:text-red-400 transition-colors"
                  title="Close Player"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0">
            <div className="p-4 h-full flex flex-col justify-between">
              {isMinimized ? (
                /* Minimized View */
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground truncate text-sm">
                      {currentSongData.name}
                    </h4>
                    <p className="text-muted-foreground text-xs truncate">
                      {currentSongData.artists?.primary?.[0]?.name || 'Unknown Artist'}
                    </p>
                  </div>
                  <button
                    onClick={togglePlayPause}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  >
                    {isPlaying ? (
                      <div className="h-4 w-4 flex items-center justify-center">
                        <div className="w-0.5 h-3 bg-current mr-0.5"></div>
                        <div className="w-0.5 h-3 bg-current"></div>
                      </div>
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </button>
                </div>
              ) : (
                /* Full View - Compact Layout */
                <div className="flex flex-col h-full">
                  {/* Top Section: Album Art + Song Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {currentSongData.image?.[0]?.url ? (
                        <img
                          src={currentSongData.image[0].url}
                          alt={currentSongData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Terminal className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm truncate mb-1">
                        {currentSongData.name}
                      </h4>
                      <p className="text-muted-foreground text-xs truncate mb-1">
                        {currentSongData.artists?.primary?.[0]?.name || 'Unknown Artist'}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">
                        {currentSongData.album?.name || 'Unknown Album'}
                      </p>
                    </div>
                  </div>

                  {/* Middle Section: Progress + Controls */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div
                        className="w-full bg-muted rounded-full h-2 cursor-pointer mb-2"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const clickX = e.clientX - rect.left
                          const percentage = clickX / rect.width
                          const newTime = percentage * duration
                          handleSeek(newTime)
                        }}
                      >
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center gap-3">
                      {/* Shuffle Toggle */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsShuffleMode(!isShuffleMode)}
                          className={`p-2 rounded-full border transition-colors ${
                            isShuffleMode
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50'
                          }`}
                          title={isShuffleMode ? "Disable Shuffle" : "Enable Shuffle"}
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3m0 0l4-4m-4 4l4 4" />
                          </svg>
                        </button>
                        <span className="text-xs text-muted-foreground">
                          {isShuffleMode ? 'Shuffle: ON' : 'Shuffle: OFF'}
                        </span>
                      </div>

                      {/* Playback Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={playPreviousSong}
                          className="p-3 bg-muted/50 hover:bg-muted text-foreground hover:text-primary transition-colors rounded-full border border-border hover:border-primary/50 shadow-sm"
                          disabled={playlist.length === 0}
                        >
                          <SkipBack className="h-5 w-5" />
                        </button>

                        <button
                          onClick={togglePlayPause}
                          className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg border-2 border-primary hover:border-primary/80"
                        >
                          {isPlaying ? (
                            <div className="h-6 w-6 flex items-center justify-center">
                              <div className="w-1 h-4 bg-current mr-1"></div>
                              <div className="w-1 h-4 bg-current"></div>
                            </div>
                          ) : (
                            <Play className="h-6 w-6 ml-0.5" />
                        )}
                        </button>

                        <button
                          onClick={playNextSong}
                          className="p-3 bg-muted/50 hover:bg-muted text-foreground hover:text-primary transition-colors rounded-full border border-border hover:border-primary/50 shadow-sm"
                          disabled={playlist.length === 0}
                        >
                          <SkipForward className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Volume + Quality */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 flex-1">
                      <Volume2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-xs text-muted-foreground w-8 flex-shrink-0">{volume}%</span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded ml-2 flex-shrink-0">
                      320kbps
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

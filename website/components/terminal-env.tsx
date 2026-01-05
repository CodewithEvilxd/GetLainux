'use client'

import { Terminal, Download, Play, RotateCcw, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState, useRef, useEffect } from 'react'

interface Command {
  input: string
  output: string
  timestamp: Date
}

export function TerminalEnv() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [currentDir, setCurrentDir] = useState('~/getlainux')
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const packageUrl = 'https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst'
  const packageName = 'getlainux-core-0.1-1-x86_64.pkg.tar.zst'

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    setIsProcessing(true)
    const trimmedCmd = cmd.trim().toLowerCase()
    const originalCmd = cmd.trim()
    let output = ''

    // Real command execution with delay
    await new Promise(resolve => setTimeout(resolve, 200))

    if (trimmedCmd.startsWith('curl') || trimmedCmd.startsWith('wget')) {
      // Real download command
      if (trimmedCmd.includes(packageUrl) || trimmedCmd.includes('getlainux-core') || trimmedCmd.includes('core-package')) {
        output = `\x1b[32mDownloading ${packageName}...\x1b[0m\n`
        
        // Try to actually fetch and check file
        try {
          const startTime = Date.now()
          const response = await fetch(packageUrl, { method: 'HEAD', mode: 'no-cors' })
          const endTime = Date.now()
          
          output += `\x1b[33m  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\x1b[0m\n`
          output += `\x1b[33m                                 Dload  Upload   Total   Spent    Left  Speed\x11b[0m\n`
          output += `\x1b[32m100  2560k  100  2560k    0     0   1250k      0  0:00:02  0:00:02 --:--:--  1250k\x1b[0m\n`
          output += `\x1b[32mDownload complete: ${packageName}\x1b[0m\n`
          output += `File saved to: ${currentDir}/${packageName} (2.5 MB)`
          
          // Trigger actual download
          const link = document.createElement('a')
          link.href = packageUrl
          link.download = packageName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error) {
          output += `\x1b[31mError: Failed to download. File may not exist on GitHub.\x1b[0m\n`
          output += `\x1b[33mNote: Build the package and upload to GitHub first.\x1b[0m`
        }
      } else if (trimmedCmd.includes('curl') && !trimmedCmd.includes('http')) {
        output = `\x1b[31mcurl: no URL specified\x1b[0m\n`
        output += `\x1b[33mUsage: curl -O [url] or curl -L [url] -o [filename]\x1b[0m\n`
        output += `Example: curl -O ${packageUrl}`
      } else if (trimmedCmd.includes('wget') && !trimmedCmd.includes('http')) {
        output = `\x1b[31mwget: missing URL\x1b[0m\n`
        output += `\x1b[33mUsage: wget [url]\x1b[0m\n`
        output += `Example: wget ${packageUrl}`
      } else {
        // Try to download any URL
        const urlMatch = originalCmd.match(/https?:\/\/[^\s]+/)
        if (urlMatch) {
          const url = urlMatch[0]
          output = `\x1b[32mDownloading from ${url}...\x1b[0m\n`
          
          try {
            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            output += `\x1b[32mDownload initiated\x1b[0m`
          } catch {
            output += `\x1b[31mDownload failed\x1b[0m`
          }
        } else {
          output = `\x1b[31mInvalid URL in command\x1b[0m`
        }
      }
    } else if (trimmedCmd === 'ls' || trimmedCmd === 'ls -la' || trimmedCmd === 'ls -l' || trimmedCmd.startsWith('ls ')) {
      const isLong = trimmedCmd.includes('-l') || trimmedCmd.includes('-la')
      if (isLong) {
        output = `total 48K\n`
        output += `drwxr-xr-x  2 user user 4.0K Jan 15 10:30 .\n`
        output += `drwxr-xr-x  5 user user 4.0K Jan 15 10:25 ..\n`
        output += `-rw-r--r--  1 user user  2.5M Jan 15 10:30 \x1b[32m${packageName}\x1b[0m\n`
        output += `-rwxr-xr-x  1 user user  1.2K Jan 15 10:25 \x1b[36mbuild.sh\x1b[0m\n`
        output += `-rw-r--r--  1 user user  856B Jan 15 10:25 README.md\n`
        output += `drwxr-xr-x  2 user user 4.0K Jan 15 10:20 \x1b[34mbin\x1b[0m\n`
        output += `drwxr-xr-x  3 user user 4.0K Jan 15 10:18 \x1b[34msrc\x1b[0m`
      } else {
        output = `\x1b[32m${packageName}\x1b[0m  \x1b[36mbuild.sh\x1b[0m  README.md  \x1b[34mbin\x1b[0m  \x1b[34msrc\x1b[0m`
      }
    } else if (trimmedCmd.startsWith('cd ')) {
      const dir = cmd.substring(3).trim()
      if (dir === '..' || dir === '../') {
        setCurrentDir('~')
        output = `Changed directory to ~`
      } else if (dir.startsWith('~/') || dir === '~') {
        setCurrentDir(dir.replace('~', '~/getlainux'))
        output = `Changed directory to ${currentDir}`
      } else {
        setCurrentDir(`${currentDir}/${dir}`)
        output = `Changed directory to ${currentDir}`
      }
    } else if (trimmedCmd === 'pwd') {
      output = currentDir
    } else if (trimmedCmd === 'whoami') {
      output = 'getlainux-user'
    } else if (trimmedCmd === 'uname -a' || trimmedCmd === 'uname') {
      output = `Linux getlainux 6.1.0-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`
    } else if (trimmedCmd === 'cat /etc/os-release' || trimmedCmd === 'cat /etc/getlainux-release') {
      output = `NAME="GetLainux"\n`
      output += `VERSION="0.1"\n`
      output += `ID=getlainux\n`
      output += `PRETTY_NAME="GetLainux 0.1"\n`
      output += `ANSI_COLOR="0;36"`
    } else if (trimmedCmd.startsWith('cat ')) {
      const file = originalCmd.substring(4).trim()
      if (file.includes('README') || file === 'README.md') {
        output = `# GetLainux\n\n`
        output += `A minimal Linux distribution built on Arch Linux.\n\n`
        output += `## Quick Start\n\n`
        output += `1. Install dependencies\n`
        output += `2. Build installer: ./build.sh\n`
        output += `3. Run: sudo ./bin/installer.lain`
      } else if (file.includes('build.sh')) {
        output = `#!/bin/bash\n\n`
        output += `set -e\n\n`
        output += `BINARY="installer.lain"\n`
        output += `SRC_DIR="src/installer"\n\n`
        output += `# Build commands...`
      } else {
        output = `cat: ${file}: No such file or directory`
      }
    } else if (trimmedCmd === 'date') {
      output = new Date().toLocaleString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        timeZoneName: 'short'
      })
    } else if (trimmedCmd === 'echo' || trimmedCmd.startsWith('echo ')) {
      const text = originalCmd.substring(5).trim()
      output = text || ''
    } else if (trimmedCmd === 'history') {
      output = commands.slice(-10).map((c, i) => `${commands.length - 10 + i + 1}  ${c.input}`).join('\n')
    } else if (trimmedCmd.startsWith('mkdir ')) {
      const dir = originalCmd.substring(6).trim()
      output = `Directory created: ${dir}`
    } else if (trimmedCmd.startsWith('touch ')) {
      const file = originalCmd.substring(6).trim()
      output = `File created: ${file}`
    } else if (trimmedCmd.startsWith('rm ') || trimmedCmd.startsWith('rm -rf ')) {
      const target = originalCmd.replace(/^rm\s+(-rf\s+)?/, '').trim()
      output = `Removed: ${target}`
    } else if (trimmedCmd === 'df -h') {
      output = `Filesystem      Size  Used Avail Use% Mounted on\n`
      output += `/dev/sda1        20G  5.2G   14G  28% /\n`
      output += `tmpfs           2.0G     0  2.0G   0% /dev/shm\n`
      output += `/dev/sda2       100G   45G   50G  48% /home`
    } else if (trimmedCmd === 'free -h') {
      output = `               total        used        free      shared  buff/cache   available\n`
      output += `Mem:           4.0Gi       1.2Gi       2.1Gi       128Mi       756Mi       2.5Gi\n`
      output += `Swap:          2.0Gi          0B       2.0Gi`
    } else if (trimmedCmd === 'ps aux' || trimmedCmd.startsWith('ps ')) {
      output = `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n`
      output += `root         1  0.0  0.1  12345  1234 ?        Ss   10:00   0:01 /sbin/init\n`
      output += `root       456  0.1  0.5  23456  5678 ?        S    10:01   0:05 systemd\n`
      output += `user       789  0.2  1.2  34567  8901 pts/0    S+   10:05   0:10 bash`
    } else if (trimmedCmd.startsWith('sudo pacman -u ') || trimmedCmd.startsWith('sudo pacman -u') || trimmedCmd.includes('pacman -u')) {
      output = `\x1b[33m:: Synchronizing package databases...\x1b[0m\n`
      output += `\x1b[33mloading packages...\x1b[0m\n`
      output += `\x1b[33mresolving dependencies...\x1b[0m\n`
      output += `\x1b[33mlooking for conflicting packages...\x1b[0m\n\n`
      output += `\x1b[1mPackages (1) \x1b[32m${packageName}\x1b[0m\n\n`
      output += `\x1b[1mTotal Download Size:    \x1b[33m2.5 MiB\x1b[0m\n`
      output += `\x1b[1mTotal Installed Size:   \x1b[33m5.2 MiB\x1b[0m\n\n`
      output += `\x1b[1m:: Proceed with installation? [Y/n] \x1b[32my\x1b[0m\n`
      output += `\x1b[33m:: Retrieving packages...\x1b[0m\n`
      output += ` \x1b[32m${packageName}\x1b[0m                   2.5 MiB  1.2MB/s  00:02 [\x1b[32m################################\x1b[0m] 100%\n`
      output += `\x1b[33m(1/1) checking keys in keyring                     [################################] 100%\x1b[0m\n`
      output += `\x1b[33m(1/1) checking package integrity                  [################################] 100%\x1b[0m\n`
      output += `\x1b[33m(1/1) loading package files                       [################################] 100%\x1b[0m\n`
      output += `\x1b[33m(1/1) checking for file conflicts                 [################################] 100%\x1b[0m\n`
      output += `\x1b[33m(1/1) checking available disk space               [################################] 100%\x1b[0m\n`
      output += `\x1b[32m(1/1) installing getlainux-core                  [################################] 100%\x1b[0m\n`
      output += `\x1b[33m:: Running post-transaction hooks...\x1b[0m\n`
      output += `\x1b[32m:: Package installed successfully!\x1b[0m`
    } else if (trimmedCmd === 'help' || trimmedCmd === '--help' || trimmedCmd === '-h') {
      output = `\x1b[1mAvailable commands:\x1b[0m\n\n`
      output += `\x1b[32mDownload:\x1b[0m\n`
      output += `  curl -O [url]          Download file using curl\n`
      output += `  wget [url]             Download file using wget\n\n`
      output += `\x1b[32mFile Operations:\x1b[0m\n`
      output += `  ls, ls -la             List directory contents\n`
      output += `  cd [dir]               Change directory\n`
      output += `  pwd                    Print working directory\n`
      output += `  cat [file]             Display file contents\n`
      output += `  mkdir [dir]            Create directory\n`
      output += `  touch [file]           Create file\n`
      output += `  rm [file]              Remove file\n\n`
      output += `\x1b[32mSystem Info:\x1b[0m\n`
      output += `  whoami                 Print current user\n`
      output += `  uname -a               System information\n`
      output += `  cat /etc/os-release    OS information\n`
      output += `  date                   Show date and time\n`
      output += `  df -h                  Disk usage\n`
      output += `  free -h                Memory usage\n`
      output += `  ps aux                 Running processes\n\n`
      output += `\x1b[32mPackage Management:\x1b[0m\n`
      output += `  sudo pacman -U [pkg]   Install package\n\n`
      output += `\x1b[32mOther:\x1b[0m\n`
      output += `  echo [text]            Print text\n`
      output += `  history                Command history\n`
      output += `  clear                  Clear terminal\n`
      output += `  help                   Show this help`
    } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setCommands([])
      setIsProcessing(false)
      return
    } else {
      output = `Command not found: ${cmd}\n`
      output += `Type 'help' for available commands`
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

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const clearTerminal = () => {
    setCommands([])
    setCurrentCommand('')
  }

  const quickCommands = [
    `curl -O ${packageUrl}`,
    `wget ${packageUrl}`,
    'ls -la',
    'pwd',
    'sudo pacman -U getlainux-core-0.1-1-x86_64.pkg.tar.zst',
  ]

  return (
    <section id="terminal" className="py-8 sm:py-12 border-t bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 font-heading">
            <Terminal className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
            Terminal Environment
          </h2>
          <p className="text-lg sm:text-xl font-bold text-foreground px-4">Test commands like you're on Linux</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <Card className="border-2 border-primary/30 bg-background">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl font-black font-heading">Interactive Terminal</CardTitle>
                  <CardDescription className="text-sm sm:text-base font-semibold">
                    Type commands and see results. Works like a real Linux terminal.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={clearTerminal}
                    variant="outline"
                    size="sm"
                    className="font-semibold w-full sm:w-auto"
                  >
                    <RotateCcw className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              {/* Terminal Window */}
              <div
                ref={terminalRef}
                className="bg-black rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm h-64 sm:h-80 md:h-96 overflow-y-auto border-2 border-primary/20"
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                }}
              >
                {/* Welcome Message */}
                {commands.length === 0 && (
                  <div className="text-green-400 mb-4">
                    <div className="font-bold">GetLainux Terminal v0.1</div>
                    <div className="text-gray-400 mt-2">
                      Type commands to test. Try: <span className="text-green-300">curl -O [url]</span>, <span className="text-green-300">ls</span>, <span className="text-green-300">pwd</span>
                    </div>
                    <div className="text-gray-400 mt-1">
                      Type <span className="text-green-300">help</span> for available commands
                    </div>
                  </div>
                )}

                {/* Command History */}
                {commands.map((cmd, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 font-bold">getlainux-user@getlainux</span>
                      <span className="text-purple-400">:</span>
                      <span className="text-green-400 font-bold">{currentDir}</span>
                      <span className="text-purple-400">$</span>
                      <span className="text-white ml-2">{cmd.input}</span>
                      <button
                        onClick={() => handleCopy(cmd.input, index)}
                        className="ml-auto opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-3.5 w-3.5 text-green-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400 hover:text-white" />
                        )}
                      </button>
                    </div>
                    <div 
                      className="text-gray-300 whitespace-pre-wrap ml-2 font-mono"
                      dangerouslySetInnerHTML={{ 
                        __html: cmd.output
                          .replace(/\x1b\[32m/g, '<span class="text-green-400">')
                          .replace(/\x1b\[33m/g, '<span class="text-yellow-400">')
                          .replace(/\x1b\[31m/g, '<span class="text-red-400">')
                          .replace(/\x1b\[34m/g, '<span class="text-blue-400">')
                          .replace(/\x1b\[36m/g, '<span class="text-cyan-400">')
                          .replace(/\x1b\[1m/g, '<span class="font-bold">')
                          .replace(/\x1b\[0m/g, '</span>')
                          .replace(/\x1b\[m/g, '</span>')
                      }}
                    />
                  </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center gap-2 group">
                  <span className="text-blue-400 font-bold">getlainux-user@getlainux</span>
                  <span className="text-purple-400">:</span>
                  <span className="text-green-400 font-bold">{currentDir}</span>
                  <span className="text-purple-400">$</span>
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
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-mono font-semibold bg-muted hover:bg-primary/10 rounded border border-border hover:border-primary/50 transition-all text-foreground hover:text-primary break-all"
                    >
                      {cmd.length > 40 ? `${cmd.substring(0, 40)}...` : cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 p-3 sm:p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm font-bold text-foreground space-y-1">
                  <p>This is a simulated terminal. Commands work like on real Linux systems.</p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Download commands will actually download the file. Other commands show simulated output.
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


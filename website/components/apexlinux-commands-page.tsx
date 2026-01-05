'use client'

import { Terminal, Copy, Check, Search, Info, Command } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import Link from 'next/link'

const commandCategories = [
  {
    name: 'Launcher',
    icon: 'Launcher',
    desc: 'Application launcher commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call launcher toggle',
        desc: 'Open or close the application launcher',
        example: 'Press Super key or run this command to open launcher',
      },
    ],
  },
  {
    name: 'Clipboard',
    icon: 'Clipboard',
    desc: 'Clipboard manager commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call clipboard toggle',
        desc: 'Open or close clipboard history manager',
        example: 'View and select from clipboard history',
      },
      {
        cmd: 'qs -c evilxd ipc call cliphistService update',
        desc: 'Refresh clipboard history',
        example: 'Update clipboard list after copying new items',
      },
    ],
  },
  {
    name: 'Side Panel',
    icon: 'Panel',
    desc: 'Control side panel (notifications and controls)',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call sidePanel open',
        desc: 'Open the side panel',
        example: 'Show notifications and control panel',
      },
      {
        cmd: 'qs -c evilxd ipc call sidePanel close',
        desc: 'Close the side panel',
        example: 'Hide side panel',
      },
      {
        cmd: 'qs -c evilxd ipc call sidePanel toggle',
        desc: 'Toggle side panel open/close',
        example: 'Switch between open and closed states',
      },
      {
        cmd: 'qs -c evilxd ipc call sidePanel lock',
        desc: 'Lock side panel open',
        example: 'Keep panel open even when not hovering',
      },
      {
        cmd: 'qs -c evilxd ipc call sidePanel unlock',
        desc: 'Unlock side panel',
        example: 'Allow panel to auto-hide on mouse leave',
      },
      {
        cmd: 'qs -c evilxd ipc call sidePanel toggleLock',
        desc: 'Toggle lock state of side panel',
        example: 'Switch between locked and unlocked',
      },
    ],
  },
  {
    name: 'Wallpaper Panel',
    icon: 'Wallpaper',
    desc: 'Wallpaper management commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call wallpaperpanel toggle',
        desc: 'Open or close wallpaper selection panel',
        example: 'Browse and set wallpapers from your collection',
      },
      {
        cmd: 'qs -c evilxd ipc call wallpaper set <path>',
        desc: 'Set wallpaper from file path',
        example: 'qs -c evilxd ipc call wallpaper set ~/Pictures/wallpaper.jpg',
      },
    ],
  },
  {
    name: 'Power Menu',
    icon: 'Power',
    desc: 'System power and session commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call powermenu toggle',
        desc: 'Open or close power menu',
        example: 'Access lock, suspend, reboot, shutdown options',
      },
    ],
  },
  {
    name: 'Info Panel',
    icon: 'Info',
    desc: 'System information panel',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call infopanel toggle',
        desc: 'Open or close information panel',
        example: 'View system stats, calendar, weather, music info',
      },
    ],
  },
  {
    name: 'Settings',
    icon: 'Settings',
    desc: 'Shell settings window',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call settings toggle',
        desc: 'Open or close settings window',
        example: 'Configure shell, wallpaper, bar, lock screen, and more',
      },
    ],
  },
  {
    name: 'Lock Screen',
    icon: 'Lock',
    desc: 'Screen lock commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call lock lock',
        desc: 'Lock the screen',
        example: 'Immediately lock your screen with password protection',
      },
    ],
  },
  {
    name: 'Workspace Manager',
    icon: 'Workspace',
    desc: 'Workspace management commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call workspaceManager toggle',
        desc: 'Open or close workspace manager',
        example: 'Visual workspace switching interface',
      },
    ],
  },
  {
    name: 'Window Switcher',
    icon: 'Window',
    desc: 'Window switching commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call windowSwitcher toggle',
        desc: 'Open or close window switcher',
        example: 'Switch between open windows quickly',
      },
    ],
  },
  {
    name: 'Quick Actions',
    icon: 'Actions',
    desc: 'Quick action commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call quickActions toggle',
        desc: 'Open or close quick actions panel',
        example: 'Access common system actions',
      },
    ],
  },
  {
    name: 'System Monitor',
    icon: 'Monitor',
    desc: 'System monitoring commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call systemMonitor toggle',
        desc: 'Open or close system monitor',
        example: 'View real-time system resources',
      },
    ],
  },
  {
    name: 'Notification Center',
    icon: 'Notifications',
    desc: 'Notification management commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call notificationCenter toggle',
        desc: 'Open or close notification center',
        example: 'View all notifications in one place',
      },
    ],
  },
  {
    name: 'Media Controls',
    icon: 'Media',
    desc: 'Media player control commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call mediaControls toggle',
        desc: 'Open or close media controls',
        example: 'Control music and media playback',
      },
    ],
  },
  {
    name: 'Network Manager',
    icon: 'Network',
    desc: 'Network management commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call networkManager toggle',
        desc: 'Open or close network manager',
        example: 'Manage WiFi and network connections',
      },
    ],
  },
  {
    name: 'Color Picker',
    icon: 'Color',
    desc: 'Color picker commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call colorPicker toggle',
        desc: 'Open or close color picker',
        example: 'Pick colors from screen',
      },
    ],
  },
  {
    name: 'Calculator',
    icon: 'Calculator',
    desc: 'Calculator commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call calculator toggle',
        desc: 'Open or close calculator',
        example: 'Quick calculations',
      },
    ],
  },
  {
    name: 'File Manager',
    icon: 'File',
    desc: 'File manager commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call fileManager toggle',
        desc: 'Open or close file manager',
        example: 'Browse and open files',
      },
    ],
  },
  {
    name: 'Weather Widget',
    icon: 'Weather',
    desc: 'Weather widget commands',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call weatherWidget toggle',
        desc: 'Open or close weather widget',
        example: 'View current weather information',
      },
    ],
  },
  {
    name: 'Security Monitor',
    icon: 'Security',
    desc: 'Real-time security monitoring',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call securityMonitor toggle',
        desc: 'Open or close security monitor',
        example: 'Monitor suspicious processes and network connections',
      },
    ],
  },
  {
    name: 'Port Scanner',
    icon: 'Port',
    desc: 'Network port scanning',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call portScanner toggle',
        desc: 'Open or close port scanner',
        example: 'Scan ports on target host',
      },
    ],
  },
  {
    name: 'Process Monitor',
    icon: 'Process',
    desc: 'Process monitoring and management',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call processMonitor toggle',
        desc: 'Open or close process monitor',
        example: 'Monitor and kill suspicious processes',
      },
    ],
  },
  {
    name: 'Firewall Manager',
    icon: 'Firewall',
    desc: 'Firewall rule management',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call firewallManager toggle',
        desc: 'Open or close firewall manager',
        example: 'Manage iptables rules',
      },
    ],
  },
  {
    name: 'Log Analyzer',
    icon: 'Log',
    desc: 'System log analysis',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call logAnalyzer toggle',
        desc: 'Open or close log analyzer',
        example: 'Analyze security events in system logs',
      },
    ],
  },
  {
    name: 'System Integrity Checker',
    icon: 'Integrity',
    desc: 'File integrity monitoring',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call systemIntegrityChecker toggle',
        desc: 'Open or close integrity checker',
        example: 'Check file integrity and detect changes',
      },
    ],
  },
  {
    name: 'VPN Manager',
    icon: 'VPN',
    desc: 'VPN connection management',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call vpnManager toggle',
        desc: 'Open or close VPN manager',
        example: 'Manage VPN connections',
      },
    ],
  },
  {
    name: 'Encryption Manager',
    icon: 'Encryption',
    desc: 'File encryption and decryption',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call encryptionManager toggle',
        desc: 'Open or close encryption manager',
        example: 'Encrypt and decrypt files with AES-256',
      },
    ],
  },
  {
    name: 'Password Checker',
    icon: 'Password',
    desc: 'Password strength analysis',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call passwordChecker toggle',
        desc: 'Open or close password checker',
        example: 'Check password strength and security',
      },
    ],
  },
  {
    name: 'Network Sniffer',
    icon: 'Sniffer',
    desc: 'Packet capture and analysis',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call networkSniffer toggle',
        desc: 'Open or close network sniffer',
        example: 'Capture and analyze network packets',
      },
    ],
  },
  {
    name: 'System Hardening',
    icon: 'Hardening',
    desc: 'Security configuration checker',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call systemHardening toggle',
        desc: 'Open or close system hardening',
        example: 'Check and harden system security',
      },
    ],
  },
  {
    name: 'Intrusion Detection',
    icon: 'Intrusion',
    desc: 'Intrusion detection system',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call intrusionDetection toggle',
        desc: 'Open or close intrusion detection',
        example: 'Monitor for intrusion attempts',
      },
    ],
  },
  {
    name: 'Keylogger Detector',
    icon: 'Keylogger',
    desc: 'Keylogger detection and removal',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call keyloggerDetector toggle',
        desc: 'Open or close keylogger detector',
        example: 'Scan and detect hidden keyloggers',
      },
    ],
  },
  {
    name: 'DNS Security',
    icon: 'DNS',
    desc: 'DNS monitoring and security',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call dnsSecurity toggle',
        desc: 'Open or close DNS security monitor',
        example: 'Monitor DNS queries and detect leaks',
      },
    ],
  },
  {
    name: 'Secure File Shredder',
    icon: 'Shredder',
    desc: 'Secure file deletion',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call secureFileShredder toggle',
        desc: 'Open or close file shredder',
        example: 'Securely delete files with multiple overwrites',
      },
    ],
  },
  {
    name: 'Threat Intelligence',
    icon: 'Threat',
    desc: 'Threat intelligence lookup',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call threatIntelligence toggle',
        desc: 'Open or close threat intelligence',
        example: 'Check IP and domain reputation',
      },
    ],
  },
  {
    name: 'Auto VPN Connector',
    icon: 'VPN',
    desc: 'Automatic VPN connection for dangerous websites',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call autoVPNConnector toggle',
        desc: 'Open or close auto VPN connector',
        example: 'Automatically connect VPN when visiting dangerous sites',
      },
    ],
  },
  {
    name: 'Website Security Scanner',
    icon: 'Scanner',
    desc: 'Website malware and threat scanning',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call websiteSecurityScanner toggle',
        desc: 'Open or close website security scanner',
        example: 'Scan websites for malware and threats',
      },
    ],
  },
  {
    name: 'Malware Detector',
    icon: 'Malware',
    desc: 'System malware detection and removal',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call malwareDetector toggle',
        desc: 'Open or close malware detector',
        example: 'Scan and remove malware from system',
      },
    ],
  },
  {
    name: 'Developer & Hacker Tools',
    icon: 'Code',
    desc: 'Advanced security research and development tools',
    commands: [
      {
        cmd: 'qs -c evilxd ipc call codeInjectionDetector toggle',
        desc: 'Open or close code injection detector',
        example: 'Monitor for SQL injection, XSS, and command injection attempts',
      },
      {
        cmd: 'qs -c evilxd ipc call reverseEngineeringTools toggle',
        desc: 'Open or close reverse engineering tools',
        example: 'Binary analysis, hex editor, and disassembly tools',
      },
      {
        cmd: 'qs -c evilxd ipc call networkPacketManipulator toggle',
        desc: 'Open or close network packet manipulator',
        example: 'Live packet editing, crafting, and protocol fuzzing',
      },
      {
        cmd: 'qs -c evilxd ipc call memoryForensics toggle',
        desc: 'Open or close memory forensics module',
        example: 'Process memory dump analysis and heap inspection',
      },
      {
        cmd: 'qs -c evilxd ipc call cryptographicToolkit toggle',
        desc: 'Open or close cryptographic toolkit',
        example: 'Hash generation, encryption, and key management',
      },
      {
        cmd: 'qs -c evilxd ipc call exploitDevelopmentFramework toggle',
        desc: 'Open or close exploit development framework',
        example: 'Buffer overflow testing, shellcode generation, payload encoding',
      },
      {
        cmd: 'qs -c evilxd ipc call steganographyTools toggle',
        desc: 'Open or close steganography tools',
        example: 'Hide and extract data from images and files',
      },
      {
        cmd: 'qs -c evilxd ipc call osintCollector toggle',
        desc: 'Open or close OSINT collector',
        example: 'IP geolocation, domain info, and intelligence gathering',
      },
      {
        cmd: 'qs -c evilxd ipc call vulnerabilityScanner toggle',
        desc: 'Open or close vulnerability scanner',
        example: 'Port scanning, service detection, and CVE lookup',
      },
      {
        cmd: 'qs -c evilxd ipc call trafficInterceptor toggle',
        desc: 'Open or close traffic interceptor',
        example: 'MITM proxy, SSL/TLS inspection, and traffic analysis',
      },
      {
        cmd: 'qs -c evilxd ipc call binaryExploitationTools toggle',
        desc: 'Open or close binary exploitation tools',
        example: 'Format string testing, heap overflow detection, ROP chains',
      },
      {
        cmd: 'qs -c evilxd ipc call webAppSecurityTester toggle',
        desc: 'Open or close web application security tester',
        example: 'SQL injection scanner, XSS finder, CSRF analyzer',
      },
      {
        cmd: 'qs -c evilxd ipc call systemCallMonitor toggle',
        desc: 'Open or close system call monitor',
        example: 'Real-time syscall tracing and API call logging',
      },
      {
        cmd: 'qs -c evilxd ipc call encryptedCommunication toggle',
        desc: 'Open or close encrypted communication channel',
        example: 'P2P encrypted messaging and secure file transfer',
      },
      {
        cmd: 'qs -c evilxd ipc call advancedLogging toggle',
        desc: 'Open or close advanced logging and forensics',
        example: 'Event correlation, timeline analysis, and anomaly detection',
      },
      {
        cmd: 'qs -c evilxd ipc call hardwareSecurityModule toggle',
        desc: 'Open or close hardware security module',
        example: 'USB, Bluetooth, and WiFi device monitoring',
      },
      {
        cmd: 'qs -c evilxd ipc call codeObfuscationTools toggle',
        desc: 'Open or close code obfuscation tools',
        example: 'Source code obfuscation and binary packing',
      },
      {
        cmd: 'qs -c evilxd ipc call penetrationTestingSuite toggle',
        desc: 'Open or close penetration testing suite',
        example: 'Automated exploit launcher and post-exploitation tools',
      },
      {
        cmd: 'qs -c evilxd ipc call blockchainAnalyzer toggle',
        desc: 'Open or close blockchain analyzer',
        example: 'Cryptocurrency transaction tracking and wallet validation',
      },
      {
        cmd: 'qs -c evilxd ipc call aiThreatDetection toggle',
        desc: 'Open or close AI-powered threat detection',
        example: 'Machine learning-based anomaly detection and behavioral analysis',
      },
    ],
  },
]

export function ApexLinuxCommands() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const handleCopy = async (text: string, index: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const filteredCategories = commandCategories.map(cat => ({
    ...cat,
    commands: cat.commands.filter(cmd => 
      cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.commands.length > 0)

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/apexlinux" className="text-muted-foreground hover:text-foreground">
              ← Back to ApexLinux
            </Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black font-heading flex items-center gap-3">
              <Command className="h-10 w-10 text-primary" />
              IPC Commands
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete reference for all ApexLinux shell commands
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold text-foreground">Command Format:</p>
              <code className="block text-xs font-mono bg-muted p-2 rounded mt-1">
                qs -c evilxd ipc call &lt;target&gt; &lt;function&gt;
              </code>
              <p className="text-muted-foreground mt-2">
                All commands require Quickshell to be running with ApexLinux config loaded.
              </p>
            </div>
          </div>
        </div>

        {/* Commands by Category */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{category.desc}</p>
              </div>

              <div className="space-y-3">
                {category.commands.map((command, cmdIdx) => {
                  const uniqueId = `${catIdx}-${cmdIdx}`
                  return (
                    <div key={cmdIdx} className="p-4 border rounded-lg group hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 space-y-2">
                          <code className="block text-sm font-mono text-foreground bg-muted p-2 rounded">
                            {command.cmd}
                          </code>
                          <p className="text-sm text-muted-foreground">{command.desc}</p>
                          {command.example && (
                            <div className="text-xs text-muted-foreground/80 italic">
                              Example: {command.example}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          onClick={() => handleCopy(command.cmd, uniqueId)}
                        >
                          {copiedIndex === uniqueId ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Quick Reference
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold mb-2">Most Used:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <code className="text-xs">launcher toggle</code> - Open app launcher</li>
                <li>• <code className="text-xs">settings toggle</code> - Open settings</li>
                <li>• <code className="text-xs">lock lock</code> - Lock screen</li>
                <li>• <code className="text-xs">powermenu toggle</code> - Power menu</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Tips:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use keyboard shortcuts in shell for faster access</li>
                <li>• Commands work instantly without restart</li>
                <li>• Check settings panel for keyboard bindings</li>
                <li>• All panels can be toggled via IPC</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


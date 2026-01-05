'use client'

import { Code, Palette, Settings, Zap, Lock, Search, Bell, Monitor, Image as ImageIcon, BarChart3, Wifi, Bluetooth, Volume2, Battery, Calendar, Music, Cloud, Power, PanelLeft, Info, Grid3x3, LayoutGrid, Rocket, Activity, MessageSquare, Play, Network, Droplet, Calculator, FolderOpen, CloudRain, Shield, Scan, Terminal, ShieldCheck, FileText, CheckCircle, Key, Eye, AlertTriangle, Search as SearchIcon, Trash2, Globe, Wifi as WifiIcon, Bug, AlertCircle, Code2, Binary, Package, Database, Lock as LockIcon, FileCode, Network as NetworkIcon, Cpu, Brain, HardDrive, Wrench, TestTube, Coins, Sparkles } from 'lucide-react'
import { useState } from 'react'

const modules = [
  {
    icon: Search,
    title: 'App Launcher',
    desc: 'Fast application launcher with search functionality',
    details: [
      'Search applications by name',
      'Keyboard navigation support',
      'Recent apps tracking',
      'Customizable appearance',
      'Quick access via Super key or IPC command',
    ],
  },
  {
    icon: PanelLeft,
    title: 'Side Panel',
    desc: 'Notifications and system controls in one panel',
    details: [
      'Notification center with history',
      'Volume and brightness controls',
      'WiFi and Bluetooth toggles',
      'System tray integration',
      'Auto-hide on mouse leave',
      'Lockable panel state',
    ],
  },
  {
    icon: ImageIcon,
    title: 'Wallpaper Manager',
    desc: 'Advanced wallpaper management with color extraction',
    details: [
      'Browse wallpapers from directory',
      'Automatic color scheme generation',
      'Preview thumbnails',
      'Multi-screen support',
      'Wallpaper previews',
      'Color palette extraction using matugen',
    ],
  },
  {
    icon: Lock,
    title: 'Lock Screen',
    desc: 'Customizable lock screen with multiple views',
    details: [
      'Password authentication via PAM',
      'Multiple lock screen cards: Clock, Music, Weather, System Info',
      'Blur effects and animations',
      'Music mode for media controls',
      'Custom background support',
      'System stats display',
      'Quote cards',
      'Notification previews',
    ],
  },
  {
    icon: Settings,
    title: 'Settings Panel',
    desc: 'Comprehensive settings interface',
    details: [
      'General settings: Font, wallpaper directory',
      'Bar configuration: Position, floating mode',
      'Interface customization',
      'Lock screen settings',
      'Background management',
      'Service configuration',
      'About page with system info',
    ],
  },
  {
    icon: Power,
    title: 'Power Menu',
    desc: 'System power and session management',
    details: [
      'Lock screen option',
      'Suspend system',
      'Reload shell',
      'Reboot system',
      'Power off',
      'Log out user',
      'Keyboard shortcuts for each action',
    ],
  },
  {
    icon: Info,
    title: 'Info Panel',
    desc: 'System information and widgets',
    details: [
      'Home view with quick stats',
      'Music player controls',
      'Weather information',
      'System monitoring',
      'Calendar view',
      'Multiple tabs for different info',
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'System notification management',
    details: [
      'Toast notifications',
      'Notification history',
      'Notification center',
      'Dismiss and clear options',
      'App-specific grouping',
    ],
  },
  {
    icon: Monitor,
    title: 'Top Bar',
    desc: 'System bar with widgets and indicators',
    details: [
      'Clock widget',
      'Workspace indicators',
      'System tray',
      'Media player controls',
      'System indicators (battery, network)',
      'Arch logo widget',
      'Customizable position (top/bottom)',
      'Floating bar option',
    ],
  },
  {
    icon: Code,
    title: 'IPC System',
    desc: 'Inter-process communication for shell control',
    details: [
      'Control shell from terminal',
      'Toggle panels and windows',
      'Set wallpapers programmatically',
      'Lock screen via command',
      'All features accessible via IPC',
      'Script-friendly interface',
    ],
  },
  {
    icon: Grid3x3,
    title: 'Workspace Manager',
    desc: 'Visual workspace switching and management',
    details: [
      'Switch between 9 workspaces',
      'Visual workspace grid display',
      'Move windows between workspaces',
      'Current workspace highlighting',
      'Keyboard and mouse navigation',
      'Hyprland integration',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Window Switcher',
    desc: 'Fast window switching with preview',
    details: [
      'List all open windows',
      'Window title and class display',
      'Quick focus switching',
      'Keyboard navigation support',
      'Hyprland window management',
      'Visual window selection',
    ],
  },
  {
    icon: Rocket,
    title: 'Quick Actions',
    desc: 'Rapid access to common system actions',
    details: [
      'Screenshot tools (area and full screen)',
      'Color picker integration',
      'Quick app launchers',
      'File manager access',
      'Terminal launcher',
      'Browser launcher',
      'Code editor launcher',
      'Customizable action list',
    ],
  },
  {
    icon: Activity,
    title: 'System Monitor',
    desc: 'Real-time system resource monitoring',
    details: [
      'CPU usage tracking',
      'Memory usage display',
      'Disk usage monitoring',
      'Battery status',
      'Real-time updates',
      'Side panel integration',
      'Resource visualization',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Notification Center',
    desc: 'Centralized notification management',
    details: [
      'All notifications in one place',
      'Notification history',
      'Clear all functionality',
      'App grouping',
      'Notification details',
      'Dismiss individual notifications',
      'Persistent notification storage',
    ],
  },
  {
    icon: Play,
    title: 'Media Controls',
    desc: 'Advanced media player controls',
    details: [
      'MPRIS integration',
      'Play/pause controls',
      'Next/previous track',
      'Now playing display',
      'Artist and title information',
      'Floating control panel',
      'Multiple player support',
    ],
  },
  {
    icon: Network,
    title: 'Network Manager',
    desc: 'WiFi and network management',
    details: [
      'WiFi connection status',
      'Available networks list',
      'Signal strength display',
      'Network connection controls',
      'Network switching',
      'Connection history',
    ],
  },
  {
    icon: Droplet,
    title: 'Color Picker',
    desc: 'Screen color extraction tool',
    details: [
      'Pick colors from screen',
      'Hex color code display',
      'Automatic clipboard copy',
      'Hyprpicker integration',
      'Visual color preview',
      'Quick access panel',
    ],
  },
  {
    icon: Calculator,
    title: 'Calculator',
    desc: 'Built-in calculator widget',
    details: [
      'Basic arithmetic operations',
      'Scientific calculations',
      'Floating panel design',
      'Keyboard input support',
      'History tracking',
      'Quick calculations',
    ],
  },
  {
    icon: FolderOpen,
    title: 'File Manager',
    desc: 'Integrated file browser',
    details: [
      'Directory navigation',
      'File and folder listing',
      'Quick file opening',
      'Path display',
      'Directory browsing',
      'File type indicators',
    ],
  },
  {
    icon: CloudRain,
    title: 'Weather Widget',
    desc: 'Weather information display',
    details: [
      'Current temperature',
      'Weather conditions',
      'Location display',
      'Weather service integration',
      'Quick weather access',
      'Floating widget design',
    ],
  },
  {
    icon: Shield,
    title: 'Security Monitor',
    desc: 'Real-time security threat detection',
    details: [
      'Suspicious process detection',
      'High CPU/Memory usage alerts',
      'Network connection monitoring',
      'Open port detection',
      'Security alert system',
      'Threat level indicators',
      'Process anomaly detection',
    ],
  },
  {
    icon: Scan,
    title: 'Port Scanner',
    desc: 'Network port scanning and service detection',
    details: [
      'Port range scanning',
      'Service detection on ports',
      'Open/closed port status',
      'Host discovery',
      'Service version detection',
      'Custom port ranges',
      'Nmap integration',
    ],
  },
  {
    icon: Terminal,
    title: 'Process Monitor & Killer',
    desc: 'Advanced process monitoring and management',
    details: [
      'Real-time process monitoring',
      'Resource usage tracking',
      'Kill suspicious processes',
      'Process priority management',
      'Hidden process detection',
      'Process tree visualization',
      'Process injection detection',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Firewall Manager',
    desc: 'iptables/nftables rule management',
    details: [
      'Rule creation and deletion',
      'Chain management',
      'Port blocking/unblocking',
      'IP whitelist/blacklist',
      'Traffic filtering rules',
      'Logging enabled rules',
      'Visual rule editor',
    ],
  },
  {
    icon: FileText,
    title: 'Log Analyzer',
    desc: 'System log parsing and security event detection',
    details: [
      'System log parsing',
      'Security event detection',
      'Failed login attempts',
      'Unauthorized access attempts',
      'Error pattern detection',
      'Log filtering and search',
      'Real-time log monitoring',
    ],
  },
  {
    icon: CheckCircle,
    title: 'System Integrity Checker',
    desc: 'File integrity monitoring and verification',
    details: [
      'File integrity monitoring',
      'Hash verification (MD5/SHA256)',
      'Unauthorized file change detection',
      'System file monitoring',
      'Configuration file tracking',
      'Critical file protection alerts',
      'Baseline comparison',
    ],
  },
  {
    icon: Key,
    title: 'VPN Manager',
    desc: 'VPN connection management and monitoring',
    details: [
      'VPN connection management',
      'Multiple VPN profiles',
      'Kill switch functionality',
      'Connection status monitoring',
      'Server selection',
      'Auto-connect on startup',
      'DNS leak protection',
    ],
  },
  {
    icon: Lock,
    title: 'Encryption Manager',
    desc: 'File encryption and decryption with AES-256',
    details: [
      'File encryption/decryption',
      'AES-256 encryption',
      'Password-protected files',
      'Encrypted file browser',
      'Key management',
      'Secure file deletion',
      'Encrypted clipboard',
    ],
  },
  {
    icon: Shield,
    title: 'Password Strength Checker',
    desc: 'Password complexity analysis and security',
    details: [
      'Password complexity analysis',
      'Breach database checking',
      'Password generator',
      'Secure password storage',
      'Password history',
      'Strength meter',
      'Common password detection',
    ],
  },
  {
    icon: Eye,
    title: 'Network Sniffer',
    desc: 'Packet capture and protocol analysis',
    details: [
      'Packet capture and analysis',
      'Protocol dissection',
      'Header inspection',
      'Payload analysis',
      'Filter by IP/port/protocol',
      'Export captured packets',
      'Real-time packet display',
    ],
  },
  {
    icon: Settings,
    title: 'System Hardening',
    desc: 'Security configuration checker and recommendations',
    details: [
      'Security configuration checker',
      'Unnecessary service detection',
      'Permission audit',
      'User privilege review',
      'Security best practices validator',
      'Configuration recommendations',
      'Auto-hardening suggestions',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Intrusion Detection System',
    desc: 'Anomaly detection and attack pattern recognition',
    details: [
      'Anomaly detection',
      'Pattern matching',
      'Signature-based detection',
      'Real-time alerting',
      'Attack pattern recognition',
      'False positive filtering',
      'Alert severity levels',
    ],
  },
  {
    icon: SearchIcon,
    title: 'Keylogger Detector',
    desc: 'Hidden keylogger detection and removal',
    details: [
      'Hidden keylogger detection',
      'Process monitoring for input capture',
      'Suspicious keyboard hooks',
      'Input device monitoring',
      'Protection alerts',
      'Process termination',
      'System scan for keyloggers',
    ],
  },
  {
    icon: Globe,
    title: 'DNS Security',
    desc: 'DNS query monitoring and leak detection',
    details: [
      'DNS query monitoring',
      'DNS leak detection',
      'Malicious domain blocking',
      'DNS over HTTPS (DoH)',
      'Custom DNS servers',
      'Query logging',
      'Response time analysis',
    ],
  },
  {
    icon: Trash2,
    title: 'Secure File Shredder',
    desc: 'Secure file deletion with multiple overwrites',
    details: [
      'Multiple overwrite passes',
      'Secure deletion algorithms',
      'File wiping verification',
      'Directory recursive deletion',
      'Free space wiping',
      'Deletion confirmation',
      'Audit trail',
    ],
  },
  {
    icon: Shield,
    title: 'Threat Intelligence',
    desc: 'IP and domain reputation checking',
    details: [
      'IP reputation checking',
      'Malware hash lookup',
      'Domain reputation',
      'Threat feed integration',
      'IOC (Indicators of Compromise) checking',
      'Real-time threat updates',
      'Threat database queries',
    ],
  },
  {
    icon: WifiIcon,
    title: 'Auto VPN Connector',
    desc: 'Automatic VPN connection for dangerous websites',
    details: [
      'Auto-detect dangerous websites',
      'Multiple VPN support (Tor, Onion, WireGuard, OpenVPN)',
      'Automatic VPN connection',
      'Darkweb domain detection',
      'Malicious site blocking',
      'VPN profile management',
      'Real-time website monitoring',
      'One-click VPN connection',
    ],
  },
  {
    icon: Scan,
    title: 'Website Security Scanner',
    desc: 'Real-time website malware and threat detection',
    details: [
      'URL scanning and analysis',
      'Malware indicator detection',
      'Threat level assessment',
      'Darkweb domain detection',
      'Suspicious TLD detection',
      'URL shortener detection',
      'Real-time threat warnings',
      'Threat score calculation',
      'Automatic VPN suggestion',
    ],
  },
  {
    icon: Bug,
    title: 'Malware Detector',
    desc: 'System-wide malware detection and removal',
    details: [
      'Real-time malware scanning',
      'Multiple malware type detection',
      'Automatic threat identification',
      'Malware removal tool',
      'System file scanning',
      'Download folder monitoring',
      'Cache directory scanning',
      'Threat severity classification',
      'One-click malware removal',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Security Warning System',
    desc: 'Advanced popup warnings for security threats',
    details: [
      'Website threat warnings',
      'Malware detection popups',
      'VPN connection alerts',
      'Threat level indicators',
      'Auto-hide warnings',
      'Block/Allow options',
      'Quick VPN connection',
      'Threat details display',
      'Multiple warning types',
    ],
  },
  {
    icon: Code2,
    title: 'Code Injection Detector',
    desc: 'Real-time monitoring of suspicious code patterns',
    details: [
      'SQL injection detection',
      'XSS pattern detection',
      'Command injection alerts',
      'Script execution monitoring',
      'Pattern matching engine',
      'Real-time log analysis',
    ],
  },
  {
    icon: Binary,
    title: 'Reverse Engineering Tools',
    desc: 'Binary analysis and disassembly tools',
    details: [
      'Binary file analysis',
      'Hex editor integration',
      'Assembly code viewer',
      'Function disassembler',
      'File type detection',
      'Metadata extraction',
    ],
  },
  {
    icon: NetworkIcon,
    title: 'Network Packet Manipulator',
    desc: 'Live packet editing and crafting',
    details: [
      'Packet capture and editing',
      'Custom packet crafting',
      'Protocol fuzzing tools',
      'Traffic replay capabilities',
      'Real-time packet analysis',
      'Network protocol testing',
    ],
  },
  {
    icon: HardDrive,
    title: 'Memory Forensics',
    desc: 'Process memory dump analyzer',
    details: [
      'Memory dump analysis',
      'Heap inspection tools',
      'Memory pattern scanner',
      'RAM content viewer',
      'Process memory monitoring',
      'Memory leak detection',
    ],
  },
  {
    icon: LockIcon,
    title: 'Cryptographic Toolkit',
    desc: 'Hash generation and encryption utilities',
    details: [
      'Multiple hash algorithms (MD5, SHA-256, SHA-512)',
      'Encryption/decryption tools',
      'Key pair generator',
      'Digital signature verifier',
      'Password hashing',
      'Secure key management',
    ],
  },
  {
    icon: FileCode,
    title: 'Exploit Development Framework',
    desc: 'Buffer overflow and shellcode tools',
    details: [
      'Buffer overflow tester',
      'ROP chain builder',
      'Shellcode generator',
      'Payload encoder/decoder',
      'Exploit template generator',
      'Vulnerability testing',
    ],
  },
  {
    icon: ImageIcon,
    title: 'Steganography Tools',
    desc: 'Hide and extract data from files',
    details: [
      'Image steganography',
      'Text steganography',
      'Audio file analysis',
      'Metadata extractor',
      'Hidden data detection',
      'File integrity checking',
    ],
  },
  {
    icon: SearchIcon,
    title: 'OSINT Collector',
    desc: 'Open source intelligence gathering',
    details: [
      'IP geolocation lookup',
      'Domain information gatherer',
      'Email address validator',
      'Social media profile finder',
      'Whois lookup',
      'Network reconnaissance',
    ],
  },
  {
    icon: Bug,
    title: 'Vulnerability Scanner',
    desc: 'Port and service vulnerability detection',
    details: [
      'Port vulnerability checker',
      'Service version detector',
      'CVE database lookup',
      'Exploit availability checker',
      'Network scanning',
      'Security assessment',
    ],
  },
  {
    icon: Network,
    title: 'Traffic Interceptor & Analyzer',
    desc: 'MITM proxy and traffic analysis',
    details: [
      'MITM proxy integration',
      'SSL/TLS certificate inspector',
      'HTTP/HTTPS traffic logger',
      'Request/response modifier',
      'Traffic interception',
      'Protocol analysis',
    ],
  },
  {
    icon: Cpu,
    title: 'Binary Exploitation Tools',
    desc: 'Format string and heap overflow testing',
    details: [
      'Format string vulnerability tester',
      'Heap overflow detector',
      'Return-to-libc calculator',
      'GOT/PLT overwrite helper',
      'Binary analysis',
      'Exploit development',
    ],
  },
  {
    icon: Globe,
    title: 'Web Application Security Tester',
    desc: 'SQL injection and XSS scanner',
    details: [
      'SQL injection scanner',
      'XSS vulnerability finder',
      'CSRF token analyzer',
      'Authentication bypass tester',
      'Web security assessment',
      'Vulnerability reporting',
    ],
  },
  {
    icon: Activity,
    title: 'System Call Monitor',
    desc: 'Real-time syscall tracing and monitoring',
    details: [
      'Real-time syscall tracer',
      'Function hook detector',
      'API call logger',
      'Suspicious behavior analyzer',
      'Process monitoring',
      'System call analysis',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted Communication Channel',
    desc: 'P2P encrypted messaging and file transfer',
    details: [
      'P2P encrypted messaging',
      'Secure file transfer',
      'End-to-end encryption',
      'Key exchange protocol',
      'Secure communication',
      'Privacy protection',
    ],
  },
  {
    icon: FileText,
    title: 'Advanced Logging & Forensics',
    desc: 'System event correlation and timeline analysis',
    details: [
      'System event correlation',
      'Timeline analyzer',
      'Log pattern matcher',
      'Anomaly detection engine',
      'Forensic analysis',
      'Event reconstruction',
    ],
  },
  {
    icon: WifiIcon,
    title: 'Hardware Security Module',
    desc: 'USB, Bluetooth, and WiFi device monitoring',
    details: [
      'USB device monitor',
      'Bluetooth device scanner',
      'WiFi network analyzer',
      'Hardware fingerprinting',
      'Device security check',
      'Peripheral monitoring',
    ],
  },
  {
    icon: Code,
    title: 'Code Obfuscation Tools',
    desc: 'Source code obfuscation and binary packing',
    details: [
      'Source code obfuscator',
      'Binary packer/unpacker',
      'String encryption',
      'Control flow flattener',
      'Code protection',
      'Anti-reverse engineering',
    ],
  },
  {
    icon: TestTube,
    title: 'Penetration Testing Suite',
    desc: 'Automated exploit launcher and post-exploitation tools',
    details: [
      'Automated exploit launcher',
      'Post-exploitation toolkit',
      'Privilege escalation helper',
      'Persistence mechanism installer',
      'Network penetration testing',
      'Security assessment',
    ],
  },
  {
    icon: Coins,
    title: 'Blockchain Analyzer',
    desc: 'Cryptocurrency transaction tracker and wallet validator',
    details: [
      'Cryptocurrency transaction tracker',
      'Wallet address validator',
      'Smart contract analyzer',
      'Blockchain explorer integration',
      'Transaction analysis',
      'Blockchain forensics',
    ],
  },
  {
    icon: Brain,
    title: 'AI-Powered Threat Detection',
    desc: 'Machine learning-based anomaly detection',
    details: [
      'Machine learning-based anomaly detection',
      'Behavioral analysis engine',
      'Predictive threat modeling',
      'Automated response system',
      'Pattern recognition',
      'Intelligent threat detection',
    ],
  },
]

const services = [
  {
    icon: BarChart3,
    title: 'System Monitoring',
    services: ['CPU usage', 'Memory usage', 'Disk usage', 'Battery status', 'Network stats'],
  },
  {
    icon: Music,
    title: 'Media Services',
    services: ['MPRIS integration', 'Media player controls', 'Now playing info', 'Playback controls'],
  },
  {
    icon: Wifi,
    title: 'Network Services',
    services: ['WiFi management', 'Network status', 'Connection controls'],
  },
  {
    icon: Bluetooth,
    title: 'Bluetooth Services',
    services: ['Bluetooth device management', 'Connection status', 'Device controls'],
  },
  {
    icon: Volume2,
    title: 'Audio Services',
    services: ['Volume control', 'Audio device management', 'Mute/unmute'],
  },
  {
    icon: Battery,
    title: 'Power Services',
    services: ['Battery monitoring', 'Charging status', 'Power level'],
  },
  {
    icon: Calendar,
    title: 'Time Services',
    services: ['System time', 'Date information', 'Timezone support'],
  },
  {
    icon: Cloud,
    title: 'Weather Services',
    services: ['Weather data', 'Location-based info', 'Forecast display'],
  },
]

export function ApexLinuxFeatures() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  return (
    <section id="features" className="py-12 sm:py-16 border-t bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading">Features</h2>
            <p className="text-base text-muted-foreground">
              Complete overview of ApexLinux shell capabilities
            </p>
          </div>

          {/* Modules */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Modules</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map((module, idx) => {
                const isExpanded = expandedModule === idx
                return (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg space-y-3 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setExpandedModule(isExpanded ? null : idx)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <module.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">{module.desc}</p>
                        </div>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="pt-2 border-t space-y-2">
                        <p className="text-xs font-semibold text-foreground">Features:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {module.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">System Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, idx) => (
                <div key={idx} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <service.icon className="h-5 w-5 text-primary" />
                    <h4 className="font-bold">{service.title}</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {service.services.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Summary */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Customization:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Full QML-based - edit any component</li>
                  <li>• JSON configuration for settings</li>
                  <li>• Color scheme customization</li>
                  <li>• Font and appearance control</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Integration:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• MPRIS for media control</li>
                  <li>• System tray support</li>
                  <li>• Wayland layer shell</li>
                  <li>• PAM authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

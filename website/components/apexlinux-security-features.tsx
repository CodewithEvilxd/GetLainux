'use client'

import { Shield, Wifi, Scan, Bug, AlertCircle, Lock, Key, Eye, Code2, Binary, Network, HardDrive, FileCode, Image as ImageIcon, Search as SearchIcon, TestTube, Cpu, Globe, Activity, ShieldCheck, FileText, Wifi as WifiIcon, Code, Coins, Brain } from 'lucide-react'
import { useState } from 'react'

const securityFeatures = [
  {
    icon: Wifi,
    title: 'Auto VPN Connector',
    desc: 'Automatic VPN connection for dangerous websites',
    details: [
      'Automatically detects dangerous websites (darkweb, .onion, malicious sites)',
      'Multiple VPN support: Tor, Onion, WireGuard, OpenVPN, NordVPN, ProtonVPN',
      'Auto-connects VPN when dangerous site detected',
      'Real-time website monitoring',
      'VPN profile management',
      'One-click VPN connection',
      'VPN status monitoring',
      'Kill switch functionality',
    ],
    howItWorks: [
      'Monitors all website visits',
      'Checks URL against dangerous domain list',
      'If dangerous site detected, automatically connects VPN',
      'Shows security warning popup',
      'User can block site or continue with VPN',
    ],
  },
  {
    icon: Scan,
    title: 'Website Security Scanner',
    desc: 'Real-time website malware and threat detection',
    details: [
      'URL scanning and analysis',
      'Malware indicator detection',
      'Threat level assessment (Safe, Low, Medium, High, Critical)',
      'Darkweb domain detection (.onion, .i2p)',
      'Suspicious TLD detection',
      'URL shortener detection',
      'Threat score calculation (0-100)',
      'Real-time threat warnings',
      'Automatic VPN suggestion',
    ],
    howItWorks: [
      'Enter website URL to scan',
      'System analyzes URL for threats',
      'Checks for malware keywords, suspicious domains, darkweb indicators',
      'Calculates threat score',
      'Shows threat level and detected issues',
      'Displays warning popup for high-risk sites',
    ],
  },
  {
    icon: Bug,
    title: 'Malware Detector',
    desc: 'System-wide malware detection and removal',
    details: [
      'Real-time malware scanning',
      'Scans /tmp, /var/tmp, Downloads, Cache directories',
      'Detects: keylogger, trojan, backdoor, rootkit, spyware, ransomware, adware',
      'Automatic threat identification',
      'One-click malware removal',
      'Threat severity classification',
      'System file scanning',
      'Download folder monitoring',
    ],
    howItWorks: [
      'Click "Scan System" to start scan',
      'System scans common malware locations',
      'Checks file names for malware signatures',
      'Lists all detected threats',
      'User can remove individual threats',
      'Shows threat type and severity',
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
      'Auto-hide after 10 seconds',
      'Block/Allow/Use VPN options',
      'Quick VPN connection button',
      'Threat details display',
      'Multiple warning types (website, malware, VPN, threat)',
    ],
    howItWorks: [
      'Automatically shows popup when threat detected',
      'Displays threat type and details',
      'User can Block site, Allow, or Use VPN',
      'Auto-hides after 10 seconds if no action',
      'Integrates with all security modules',
    ],
  },
]

export function ApexLinuxSecurityFeatures() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  return (
    <section id="security-features" className="py-12 sm:py-16 border-t bg-destructive/5">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Advanced Security Features
            </h2>
            <p className="text-base text-muted-foreground">
              Automatic protection against dangerous websites, malware, and threats
            </p>
          </div>

          <div className="space-y-6">
            {securityFeatures.map((feature, idx) => {
              const isExpanded = expandedFeature === idx
              return (
                <div
                  key={idx}
                  className="p-6 border-2 rounded-lg space-y-4 cursor-pointer hover:border-primary/50 transition-colors bg-background"
                  onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-4 border-t space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Features:</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">How It Works:</p>
                        <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                          {feature.howItWorks.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Automatic Protection
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                All security features work automatically in the background. When you visit a dangerous website or download malware, the system will:
              </p>
              <ul className="space-y-1 list-disc list-inside ml-2">
                <li>Detect the threat immediately</li>
                <li>Show security warning popup</li>
                <li>Automatically connect VPN if enabled</li>
                <li>Block malicious content</li>
                <li>Scan for malware in real-time</li>
              </ul>
            </div>
          </div>

          {/* Developer/Hacker Tools Section */}
          <div className="space-y-2 mt-12">
            <h2 className="text-3xl sm:text-4xl font-black font-heading flex items-center gap-3">
              <Code2 className="h-8 w-8 text-primary" />
              Developer & Hacker Tools
            </h2>
            <p className="text-base text-muted-foreground">
              Advanced tools for security research, penetration testing, and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              { icon: Code2, title: 'Code Injection Detector', desc: 'Real-time monitoring of suspicious code patterns' },
              { icon: Binary, title: 'Reverse Engineering Tools', desc: 'Binary analysis and disassembly tools' },
              { icon: Network, title: 'Network Packet Manipulator', desc: 'Live packet editing and crafting' },
              { icon: HardDrive, title: 'Memory Forensics', desc: 'Process memory dump analyzer' },
              { icon: Lock, title: 'Cryptographic Toolkit', desc: 'Hash generation and encryption utilities' },
              { icon: FileCode, title: 'Exploit Development Framework', desc: 'Buffer overflow and shellcode tools' },
              { icon: ImageIcon, title: 'Steganography Tools', desc: 'Hide and extract data from files' },
              { icon: SearchIcon, title: 'OSINT Collector', desc: 'Open source intelligence gathering' },
              { icon: Bug, title: 'Vulnerability Scanner', desc: 'Port and service vulnerability detection' },
              { icon: Network, title: 'Traffic Interceptor', desc: 'MITM proxy and traffic analysis' },
              { icon: Cpu, title: 'Binary Exploitation Tools', desc: 'Format string and heap overflow testing' },
              { icon: Globe, title: 'Web App Security Tester', desc: 'SQL injection and XSS scanner' },
              { icon: Activity, title: 'System Call Monitor', desc: 'Real-time syscall tracing and monitoring' },
              { icon: ShieldCheck, title: 'Encrypted Communication', desc: 'P2P encrypted messaging and file transfer' },
              { icon: FileText, title: 'Advanced Logging', desc: 'System event correlation and timeline analysis' },
              { icon: WifiIcon, title: 'Hardware Security Module', desc: 'USB, Bluetooth, and WiFi device monitoring' },
              { icon: Code, title: 'Code Obfuscation Tools', desc: 'Source code obfuscation and binary packing' },
              { icon: TestTube, title: 'Penetration Testing Suite', desc: 'Automated exploit launcher and post-exploitation tools' },
              { icon: Coins, title: 'Blockchain Analyzer', desc: 'Cryptocurrency transaction tracker and wallet validator' },
              { icon: Brain, title: 'AI Threat Detection', desc: 'Machine learning-based anomaly detection' },
            ].map((tool, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:border-primary/50 transition-colors bg-background">
                <div className="flex items-start gap-3">
                  <tool.icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base mb-1">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


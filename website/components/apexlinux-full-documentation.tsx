'use client'

import { BookOpen, Code, Settings, Shield, Zap, Terminal, Layers, FileCode, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function ApexLinuxFullDocumentation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/20 py-8">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            <Link href="/apexlinux" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
              ← Back to ApexLinux
            </Link>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black font-heading flex items-center gap-3">
                <BookOpen className="h-10 w-10 text-primary" />
                ApexLinux Complete Documentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive guide to ApexLinux QML shell configuration, architecture, and features
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12">
        <div className="space-y-16">
          {/* What is ApexLinux */}
          <section id="what-is" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Code className="h-8 w-8 text-primary" />
                What is ApexLinux?
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                <strong>ApexLinux</strong> is a QML-based shell configuration for Quickshell, providing a minimal, customizable desktop environment with panels, launchers, and system controls. Unlike traditional shell configurations that require learning complex configuration languages or dealing with cryptic config files, ApexLinux is built entirely in QML (Qt Modeling Language), allowing you to modify every aspect of the shell by editing QML files.
              </p>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-bold">Key Philosophy</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>QML-First Approach:</strong> Everything is QML. No complex configuration languages—just QML.</li>
                  <li><strong>Full Customization:</strong> Modify every aspect by editing QML files directly.</li>
                  <li><strong>Modular Architecture:</strong> Each component is a separate module, making it easy to extend or replace.</li>
                  <li><strong>Minimal Resource Usage:</strong> Optimized for performance with minimal system overhead.</li>
                  <li><strong>Modern Design:</strong> Beautiful, modern UI with smooth animations and transitions.</li>
                </ul>
              </div>

              {/* Desktop Screenshot */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20">
                <img
                  src="/apexlinux-desktop.png"
                  alt="ApexLinux Desktop Screenshot showing shell interface with panels, launcher, system indicators, top bar with clock and workspace switcher"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Layers className="h-8 w-8 text-primary" />
                Architecture & Structure
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                ApexLinux follows a modular architecture where each component is a separate QML module. The architecture is organized hierarchically with <code className="bg-muted px-1 rounded">apexlinux.qml</code> as the entry point, which orchestrates all components through a well-defined structure.
              </p>

              {/* Architecture Diagram */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20 mb-6">
                <img
                  src="/apexlinux-architecture.png"
                  alt="ApexLinux Architecture Diagram showing apexlinux.qml as entry point, with Core, Modules, Services, and Assets components connected with arrows showing dependencies and data flow"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">Architecture Overview</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg">apexlinux.qml (Entry Point)</h4>
                    <p className="text-muted-foreground">The main entry point that initializes and coordinates all components. It imports and manages the lifecycle of Core, Modules, Services, and Assets.</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg">Core/</h4>
                    <p className="text-muted-foreground">Core functionality including configuration management, color schemes, IPC handling, and global state management. Provides foundational services to all other components.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                      <li><code className="bg-muted px-1 rounded">Config.qml</code> - Configuration management</li>
                      <li><code className="bg-muted px-1 rounded">Colors.qml</code> - Color scheme management</li>
                      <li><code className="bg-muted px-1 rounded">GlobalState.qml</code> - Global application state</li>
                      <li><code className="bg-muted px-1 rounded">Ipc.qml</code> - Inter-process communication</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg">Modules/</h4>
                    <p className="text-muted-foreground">All shell modules including panels, launchers, security features, and system controls. Modules depend on Core for configuration and state, and may interact with Services for data.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                      <li><code className="bg-muted px-1 rounded">Bar/</code> - Top/bottom bar with widgets</li>
                      <li><code className="bg-muted px-1 rounded">Launcher/</code> - Application launcher</li>
                      <li><code className="bg-muted px-1 rounded">Lock/</code> - Lock screen</li>
                      <li><code className="bg-muted px-1 rounded">SecurityMonitor/</code> - Security monitoring</li>
                      <li><code className="bg-muted px-1 rounded">AutoVPNConnector/</code> - Auto VPN features</li>
                      <li>And 30+ more modules...</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg">Services/</h4>
                    <p className="text-muted-foreground">System services that provide data and functionality to modules. Services can feed data back to Modules and may depend on Assets for resources.</p>
                    <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-muted-foreground">
                      <li><code className="bg-muted px-1 rounded">WallpaperService.qml</code> - Wallpaper management</li>
                      <li><code className="bg-muted px-1 rounded">MprisService.qml</code> - Media player integration</li>
                      <li><code className="bg-muted px-1 rounded">NetworkService.qml</code> - Network status</li>
                      <li>And 15+ more services...</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg">Assets/</h4>
                    <p className="text-muted-foreground">Static resources including images, icons, and other media files. Assets are referenced by Core, Modules, and Services for visual elements.</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
                  <h4 className="font-bold text-lg mb-2">Component Dependencies</h4>
                  <p className="text-sm text-muted-foreground">
                    The architecture follows a clear dependency flow: <strong>apexlinux.qml</strong> → <strong>Core</strong> → <strong>Modules</strong> → <strong>Services</strong> → <strong>Assets</strong>, with bidirectional feedback loops allowing Services to update Modules, and Assets to be referenced by Core. This modular design ensures easy customization and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* QML-Based Configuration */}
          <section id="qml-config" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <FileCode className="h-8 w-8 text-primary" />
                QML-Based Configuration
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                ApexLinux uses QML (Qt Modeling Language) for all configuration and UI. QML is a declarative language that makes it easy to create fluid, animated user interfaces. Since everything is QML, you can modify any aspect of the shell by editing QML files.
              </p>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">Why QML?</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Declarative Syntax:</strong> Describe what you want, not how to achieve it.</li>
                  <li><strong>Easy Customization:</strong> Change colors, layouts, and behavior by editing QML properties.</li>
                  <li><strong>Visual Development:</strong> See changes immediately without complex build processes.</li>
                  <li><strong>Type Safety:</strong> QML provides type checking and property validation.</li>
                  <li><strong>Modern UI:</strong> Built-in support for animations, transitions, and modern UI patterns.</li>
                </ul>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Example: Customizing Colors</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Core/Colors.qml
QtObject {
    property color bg: "#1E202B"
    property color fg: "#D9E0EE"
    property color accent: "#8AD7EB"
    property color surface: "#2A2D3A"
    property color border: "#3A3D4A"
    property color muted: "#6B7280"
}`}</code>
                </pre>
                <p className="mt-4 text-sm text-muted-foreground">
                  Simply edit the color values in <code className="bg-muted px-1 rounded">Core/Colors.qml</code> to change the entire shell theme. The screenshot below shows the QML code editor with syntax highlighting and a color picker tool, making it easy to visualize and modify color properties.
                </p>
              </div>

              {/* QML Code Editor Screenshot */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20">
                <img
                  src="/apexlinux-qml-editor.png"
                  alt="QML Code Editor Screenshot showing ApexLinux configuration file with syntax highlighting, color picker tool visible on the right side, dark theme editor interface demonstrating how easy it is to modify colors and properties in QML files"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Editing QML Files</h3>
                <p className="text-muted-foreground mb-4">
                  As shown in the screenshot above, editing ApexLinux is straightforward:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li><strong>Syntax Highlighting:</strong> QML code is automatically highlighted for better readability</li>
                  <li><strong>Color Picker:</strong> Built-in color picker tools help you select and preview colors directly</li>
                  <li><strong>Live Preview:</strong> Changes to QML files are reflected immediately in the running shell</li>
                  <li><strong>No Compilation:</strong> QML is interpreted, so you can edit and see results instantly</li>
                  <li><strong>Type Safety:</strong> QML provides property validation and error checking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security Features */}
          <section id="security" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Advanced Security Features
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                ApexLinux includes 30+ advanced security modules designed to protect your system from threats, monitor network activity, and provide real-time security alerts. The screenshot below shows the Security Monitor panel in action, displaying threat alerts, VPN connection status, and website scanner results.
              </p>

              {/* Security Features Screenshot */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20 mb-6">
                <img
                  src="/apexlinux-security.png"
                  alt="ApexLinux Security Features screenshot showing Security Monitor panel with threat alerts (red/yellow indicators), VPN connection status with threat level gauge, and website scanner results with security status indicators. Modern, clean interface with professional security dashboard look"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Auto VPN Connector</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Automatically detects dangerous websites (darkweb, .onion domains, malicious sites) and connects VPN automatically to protect your privacy.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Real-time website monitoring</li>
                    <li>Multiple VPN support (Tor, WireGuard, OpenVPN)</li>
                    <li>Automatic threat detection</li>
                    <li>One-click VPN connection</li>
                  </ul>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Website Security Scanner</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scans websites for malware indicators, suspicious domains, and threat levels before you visit them.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>URL threat analysis</li>
                    <li>Threat score calculation</li>
                    <li>Darkweb domain detection</li>
                    <li>Real-time warnings</li>
                  </ul>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Malware Detector</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    System-wide malware scanning with automatic detection and removal capabilities.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Real-time system scanning</li>
                    <li>Multiple malware type detection</li>
                    <li>Automatic threat removal</li>
                    <li>Threat severity classification</li>
                  </ul>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Security Warning System</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced popup warnings for security threats with Block/Allow/Use VPN options.
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Automatic threat warnings</li>
                    <li>Multiple warning types</li>
                    <li>Quick action buttons</li>
                    <li>Auto-hide functionality</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Security Dashboard Overview</h3>
                <p className="text-muted-foreground mb-4">
                  The security dashboard provides a comprehensive view of your system's security status:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li><strong>Threat Alerts:</strong> Real-time notifications with color-coded indicators (red for critical, yellow for warnings, green for safe)</li>
                  <li><strong>VPN Status:</strong> Connection status, private IP address, and visual threat level gauge</li>
                  <li><strong>Website Scanner:</strong> Real-time website analysis with safety ratings and phishing detection</li>
                  <li><strong>Terminal Integration:</strong> Security logs and alerts displayed directly in the terminal</li>
                </ul>
              </div>
            </div>
          </section>

          {/* IPC Commands */}
          <section id="ipc" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Terminal className="h-8 w-8 text-primary" />
                IPC Commands & Automation
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                ApexLinux provides IPC (Inter-Process Communication) commands that allow you to control the shell from the command line or scripts. This enables automation and integration with other tools. The screenshot below demonstrates IPC commands being executed in the terminal, showing command output and shell responses.
              </p>

              {/* Terminal IPC Commands Screenshot */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20 mb-6">
                <img
                  src="/apexlinux-terminal.png"
                  alt="Terminal screenshot showing IPC commands being executed in ApexLinux. Commands like 'qs -c evilxd ipc call securityMonitor toggle' with their outputs visible. Clean terminal interface with syntax highlighting, dark terminal theme, professional terminal aesthetic showing multiple IPC commands and responses"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Command Format</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`qs -c evilxd ipc call <target> <function>`}</code>
                </pre>
                <p className="mt-4 text-sm text-muted-foreground">
                  Where <code className="bg-muted px-1 rounded">evilxd</code> is the configuration directory name. As shown in the screenshot above, commands are executed directly in the terminal with immediate feedback and syntax highlighting.
                </p>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">Common Commands</h3>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold">Launcher</h4>
                    <pre className="bg-muted p-2 rounded mt-2 text-sm">
                      <code>qs -c evilxd ipc call launcher toggle</code>
                    </pre>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold">Security Features</h4>
                    <pre className="bg-muted p-2 rounded mt-2 text-sm">
                      <code>qs -c evilxd ipc call securityMonitor toggle
qs -c evilxd ipc call autoVPNConnector toggle
qs -c evilxd ipc call malwareDetector toggle</code>
                    </pre>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold">System Controls</h4>
                    <pre className="bg-muted p-2 rounded mt-2 text-sm">
                      <code>qs -c evilxd ipc call lock lock
qs -c evilxd ipc call powermenu toggle
qs -c evilxd ipc call settings toggle</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Using IPC Commands</h3>
                <p className="text-muted-foreground mb-4">
                  As demonstrated in the terminal screenshot above, IPC commands provide a powerful way to control ApexLinux:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li><strong>Real-time Control:</strong> Toggle modules, panels, and features instantly from the command line</li>
                  <li><strong>Scripting Support:</strong> Integrate ApexLinux controls into shell scripts and automation workflows</li>
                  <li><strong>Syntax Highlighting:</strong> Terminal output is color-coded for better readability</li>
                  <li><strong>Immediate Feedback:</strong> Commands provide instant responses and status updates</li>
                  <li><strong>Error Handling:</strong> Clear error messages help troubleshoot issues quickly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Customization Guide */}
          <section id="customization" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary" />
                Customization Guide
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                Customizing ApexLinux is straightforward—just edit QML files. The side-by-side comparison below demonstrates how easy it is to transform the entire shell theme by simply changing color properties in QML files.
              </p>

              {/* Customization Comparison */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/20 mb-6">
                <img
                  src="/apexlinux-customization.png"
                  alt="Before/After comparison showing ApexLinux customization. Left side: default theme with blue accents on top bar, left panel, and bottom bar. Right side: customized theme with purple accents and modified layout. Side-by-side comparison showing visual difference clearly. Modern desktop screenshots demonstrating theme customization capabilities"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Customization Examples</h3>
                <p className="text-muted-foreground mb-4">
                  As shown in the comparison above, ApexLinux allows you to completely transform the visual appearance while maintaining all functionality:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Default Theme (Left)</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Blue accent colors</li>
                      <li>Standard layout</li>
                      <li>Default icon highlights</li>
                      <li>Classic dark theme</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Customized Theme (Right)</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Purple accent colors</li>
                      <li>Modified color scheme</li>
                      <li>Custom icon highlights</li>
                      <li>Personalized appearance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Changing Colors</h3>
                  <p className="mb-4 text-muted-foreground">
                    Edit <code className="bg-muted px-1 rounded">Core/Colors.qml</code> to change the color scheme. The comparison screenshot shows how changing accent colors affects the entire shell:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`// Default (Blue)
property color accent: "#8AD7EB"

// Customized (Purple)
property color accent: "#A78BFA"`}</code>
                  </pre>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Modifying Bar</h3>
                  <p className="mb-4 text-muted-foreground">
                    Edit <code className="bg-muted px-1 rounded">Modules/Bar/Bar.qml</code> to change bar appearance, position, or widgets. All changes are reflected immediately.
                  </p>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Adding Custom Modules</h3>
                  <p className="mb-4 text-muted-foreground">
                    Create a new QML file in <code className="bg-muted px-1 rounded">Modules/</code> and register it in <code className="bg-muted px-1 rounded">Modules/Overlays/Overlays.qml</code>. The modular architecture makes it easy to extend functionality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* File Structure */}
          <section id="structure" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Layers className="h-8 w-8 text-primary" />
                File Structure
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>{`~/.config/quickshell/evilxd/
├── Core/                    # Core components
│   ├── Config.qml          # Configuration management
│   ├── Colors.qml          # Color schemes
│   ├── GlobalState.qml     # Global state
│   └── Ipc.qml            # IPC handling
├── Modules/                # Shell modules
│   ├── Bar/               # Top/bottom bar
│   ├── Launcher/          # App launcher
│   ├── Lock/              # Lock screen
│   ├── SecurityMonitor/   # Security features
│   ├── AutoVPNConnector/  # VPN features
│   └── ...                # 30+ more modules
├── Services/              # System services
│   ├── WallpaperService.qml
│   ├── MprisService.qml
│   └── ...                # 15+ more services
├── Assets/                # Images, icons
├── Scripts/               # Utility scripts
└── apexlinux.qml         # Main entry point`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                Installation
              </h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">Prerequisites</h3>
                <p>Install Quickshell first:</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>sudo pacman -S quickshell</code>
                </pre>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">User Install</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
cp -r /tmp/apexlinux-temp/apexlinux/* ~/.config/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp
qs -c evilxd -f apexlinux.qml`}</code>
                </pre>
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold">System-wide Install</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
sudo cp -r /tmp/apexlinux-temp/apexlinux/* /etc/xdg/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp
qs -c evilxd -f apexlinux.qml`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading">Conclusion</h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                ApexLinux provides a powerful, customizable shell environment built entirely in QML. With 30+ security features, modular architecture, and easy customization, it's perfect for users who want full control over their desktop environment.
              </p>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Get Started</h3>
                <p className="text-muted-foreground mb-4">
                  Ready to try ApexLinux? Follow the installation guide above or visit the GitHub repository for more information.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/codewithevilxd/ApexLinux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View on GitHub
                  </a>
                  <Link
                    href="/apexlinux"
                    className="px-4 py-2 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    Back to Overview
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


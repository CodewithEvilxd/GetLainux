import QtQuick
import Quickshell
import Quickshell.Io
import qs.Core
import qs.Modules.Clipboard
import qs.Modules.Launcher
import qs.Modules.Notifications
import qs.Modules.Panels
import qs.Modules.WorkspaceManager
import qs.Modules.WindowSwitcher
import qs.Modules.QuickActions
import qs.Modules.SystemMonitor
import qs.Modules.NotificationCenter
import qs.Modules.MediaControls
import qs.Modules.NetworkManager
import qs.Modules.ColorPicker
import qs.Modules.Calculator
import qs.Modules.FileManager
import qs.Modules.WeatherWidget
import qs.Modules.SecurityMonitor
import qs.Modules.PortScanner
import qs.Modules.ProcessMonitor
import qs.Modules.FirewallManager
import qs.Modules.LogAnalyzer
import qs.Modules.SystemIntegrityChecker
import qs.Modules.VPNManager
import qs.Modules.EncryptionManager
import qs.Modules.PasswordChecker
import qs.Modules.NetworkSniffer
import qs.Modules.SystemHardening
import qs.Modules.IntrusionDetection
import qs.Modules.KeyloggerDetector
import qs.Modules.DNSSecurity
import qs.Modules.SecureFileShredder
import qs.Modules.ThreatIntelligence
import qs.Modules.AutoVPNConnector
import qs.Modules.WebsiteSecurityScanner
import qs.Modules.MalwareDetector
import qs.Modules.SecurityWarningSystem
import qs.Modules.CodeInjectionDetector
import qs.Modules.ReverseEngineeringTools
import qs.Modules.NetworkPacketManipulator
import qs.Modules.MemoryForensics
import qs.Modules.CryptographicToolkit
import qs.Modules.ExploitDevelopmentFramework
import qs.Modules.SteganographyTools
import qs.Modules.OSINTCollector
import qs.Modules.VulnerabilityScanner
import qs.Modules.TrafficInterceptor
import qs.Modules.BinaryExploitationTools
import qs.Modules.WebAppSecurityTester
import qs.Modules.SystemCallMonitor
import qs.Modules.EncryptedCommunication
import qs.Modules.AdvancedLogging
import qs.Modules.HardwareSecurityModule
import qs.Modules.CodeObfuscationTools
import qs.Modules.PenetrationTestingSuite
import qs.Modules.BlockchainAnalyzer
import qs.Modules.AIThreatDetection
import qs.Services

Item {
    id: root

    required property Context context

    NotificationManager {
        id: notifManager
    }

    NotificationToast {
        id: toast

        manager: notifManager
        colors: root.context.colors
    }

    SidePanel {
        id: sidePanel

        globalState: root.context.appState
        notifManager: notifManager
        colors: root.context.colors
        toastHovered: toast.hovered || false
        volumeService: root.context.volume
        bluetoothService: root.context.bluetooth
    }

    WallpaperPanel {
        id: wallpaperPanel

        globalState: root.context.appState
    }

    PowerMenu {
        id: powerMenu

        isOpen: root.context.appState.powerMenuOpen
        globalState: root.context.appState
        colors: root.context.colors
    }

    InfoPanel {
        id: infoPanel

        globalState: root.context.appState
    }

    AppLauncher {
        id: launcher

        colors: root.context.colors
        globalState: root.context.appState
    }

    Clipboard {
        id: clipboard

        globalState: root.context.appState
        colors: root.context.colors
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleLauncher();
        }

        target: "launcher"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleClipboard();
        }

        target: "clipboard"
    }

    IpcHandler {
        function open() {
            sidePanel.show();
        }

        function close() {
            sidePanel.hide();
        }

        function toggle() {
            if (sidePanel.forcedOpen)
                sidePanel.hide();
            else
                sidePanel.show();
        }

        function lock() {
            sidePanel.hoverLocked = true;
        }

        function unlock() {
            sidePanel.hoverLocked = false;
        }

        function toggleLock() {
            sidePanel.hoverLocked = !sidePanel.hoverLocked;
        }

        target: "sidePanel"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWallpaperPanel();
        }

        target: "wallpaperpanel"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.togglePowerMenu();
        }

        target: "powermenu"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleInfoPanel();
        }

        target: "infopanel"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSettings();
        }

        target: "settings"
    }

    IpcHandler {
        function update() {
            clipboard.refresh();
        }

        target: "cliphistService"
    }

    IpcHandler {
        function set(path: string) {
            WallpaperService.changeWallpaper(path, undefined);
        }

        target: "wallpaper"
    }

    WorkspaceManager {
        id: workspaceManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.workspaceManagerOpen
    }

    WindowSwitcher {
        id: windowSwitcher

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.windowSwitcherOpen
    }

    QuickActions {
        id: quickActions

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.quickActionsOpen
    }

    SystemMonitor {
        id: systemMonitor

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.systemMonitorOpen
    }

    NotificationCenter {
        id: notificationCenter

        globalState: root.context.appState
        notifManager: notifManager
        colors: root.context.colors
        isOpen: root.context.appState.notificationCenterOpen
    }

    MediaControls {
        id: mediaControls

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.mediaControlsOpen
    }

    NetworkManager {
        id: networkManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.networkManagerOpen
    }

    ColorPicker {
        id: colorPicker

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.colorPickerOpen
    }

    Calculator {
        id: calculator

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.calculatorOpen
    }

    FileManager {
        id: fileManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.fileManagerOpen
    }

    WeatherWidget {
        id: weatherWidget

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.weatherWidgetOpen
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWorkspaceManager();
        }

        target: "workspaceManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWindowSwitcher();
        }

        target: "windowSwitcher"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleQuickActions();
        }

        target: "quickActions"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSystemMonitor();
        }

        target: "systemMonitor"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleNotificationCenter();
        }

        target: "notificationCenter"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleMediaControls();
        }

        target: "mediaControls"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleNetworkManager();
        }

        target: "networkManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleColorPicker();
        }

        target: "colorPicker"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleCalculator();
        }

        target: "calculator"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleFileManager();
        }

        target: "fileManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWeatherWidget();
        }

        target: "weatherWidget"
    }

    SecurityMonitor {
        id: securityMonitor

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.securityMonitorOpen
    }

    PortScanner {
        id: portScanner

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.portScannerOpen
    }

    ProcessMonitor {
        id: processMonitorSec

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.processMonitorOpen
    }

    FirewallManager {
        id: firewallManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.firewallManagerOpen
    }

    LogAnalyzer {
        id: logAnalyzer

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.logAnalyzerOpen
    }

    SystemIntegrityChecker {
        id: systemIntegrityChecker

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.systemIntegrityCheckerOpen
    }

    VPNManager {
        id: vpnManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.vpnManagerOpen
    }

    EncryptionManager {
        id: encryptionManager

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.encryptionManagerOpen
    }

    PasswordChecker {
        id: passwordChecker

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.passwordCheckerOpen
    }

    NetworkSniffer {
        id: networkSniffer

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.networkSnifferOpen
    }

    SystemHardening {
        id: systemHardening

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.systemHardeningOpen
    }

    IntrusionDetection {
        id: intrusionDetection

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.intrusionDetectionOpen
    }

    KeyloggerDetector {
        id: keyloggerDetector

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.keyloggerDetectorOpen
    }

    DNSSecurity {
        id: dnsSecurity

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.dnsSecurityOpen
    }

    SecureFileShredder {
        id: secureFileShredder

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.secureFileShredderOpen
    }

    ThreatIntelligence {
        id: threatIntelligence

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.threatIntelligenceOpen
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSecurityMonitor();
        }

        target: "securityMonitor"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.togglePortScanner();
        }

        target: "portScanner"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleProcessMonitor();
        }

        target: "processMonitor"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleFirewallManager();
        }

        target: "firewallManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleLogAnalyzer();
        }

        target: "logAnalyzer"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSystemIntegrityChecker();
        }

        target: "systemIntegrityChecker"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleVPNManager();
        }

        target: "vpnManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleEncryptionManager();
        }

        target: "encryptionManager"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.togglePasswordChecker();
        }

        target: "passwordChecker"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleNetworkSniffer();
        }

        target: "networkSniffer"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSystemHardening();
        }

        target: "systemHardening"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleIntrusionDetection();
        }

        target: "intrusionDetection"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleKeyloggerDetector();
        }

        target: "keyloggerDetector"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleDNSSecurity();
        }

        target: "dnsSecurity"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSecureFileShredder();
        }

        target: "secureFileShredder"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleThreatIntelligence();
        }

        target: "threatIntelligence"
    }

    AutoVPNConnector {
        id: autoVPNConnector

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.autoVPNConnectorOpen
    }

    WebsiteSecurityScanner {
        id: websiteSecurityScanner

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.websiteSecurityScannerOpen
    }

    MalwareDetector {
        id: malwareDetector

        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.malwareDetectorOpen
    }

    SecurityWarningSystem {
        id: securityWarningSystem

        colors: root.context.colors
    }

    Connections {
        target: root.context.appState

        function onWebsiteVisited(url) {
            autoVPNConnector.checkWebsite(url)
            websiteSecurityScanner.scanWebsite(url)
        }

        function onMalwareDetected(path, type) {
            securityWarningSystem.showMalwareWarning(path, type)
        }
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleAutoVPNConnector();
        }

        target: "autoVPNConnector"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWebsiteSecurityScanner();
        }

        target: "websiteSecurityScanner"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleMalwareDetector();
        }

        target: "malwareDetector"
    }

    CodeInjectionDetector {
        id: codeInjectionDetector
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.codeInjectionDetectorOpen
    }

    ReverseEngineeringTools {
        id: reverseEngineeringTools
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.reverseEngineeringToolsOpen
    }

    NetworkPacketManipulator {
        id: networkPacketManipulator
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.networkPacketManipulatorOpen
    }

    MemoryForensics {
        id: memoryForensics
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.memoryForensicsOpen
    }

    CryptographicToolkit {
        id: cryptographicToolkit
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.cryptographicToolkitOpen
    }

    ExploitDevelopmentFramework {
        id: exploitDevelopmentFramework
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.exploitDevelopmentFrameworkOpen
    }

    SteganographyTools {
        id: steganographyTools
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.steganographyToolsOpen
    }

    OSINTCollector {
        id: osintCollector
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.osintCollectorOpen
    }

    VulnerabilityScanner {
        id: vulnerabilityScanner
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.vulnerabilityScannerOpen
    }

    TrafficInterceptor {
        id: trafficInterceptor
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.trafficInterceptorOpen
    }

    BinaryExploitationTools {
        id: binaryExploitationTools
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.binaryExploitationToolsOpen
    }

    WebAppSecurityTester {
        id: webAppSecurityTester
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.webAppSecurityTesterOpen
    }

    SystemCallMonitor {
        id: systemCallMonitor
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.systemCallMonitorOpen
    }

    EncryptedCommunication {
        id: encryptedCommunication
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.encryptedCommunicationOpen
    }

    AdvancedLogging {
        id: advancedLogging
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.advancedLoggingOpen
    }

    HardwareSecurityModule {
        id: hardwareSecurityModule
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.hardwareSecurityModuleOpen
    }

    CodeObfuscationTools {
        id: codeObfuscationTools
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.codeObfuscationToolsOpen
    }

    PenetrationTestingSuite {
        id: penetrationTestingSuite
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.penetrationTestingSuiteOpen
    }

    BlockchainAnalyzer {
        id: blockchainAnalyzer
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.blockchainAnalyzerOpen
    }

    AIThreatDetection {
        id: aiThreatDetection
        globalState: root.context.appState
        colors: root.context.colors
        isOpen: root.context.appState.aiThreatDetectionOpen
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleCodeInjectionDetector();
        }
        target: "codeInjectionDetector"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleReverseEngineeringTools();
        }
        target: "reverseEngineeringTools"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleNetworkPacketManipulator();
        }
        target: "networkPacketManipulator"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleMemoryForensics();
        }
        target: "memoryForensics"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleCryptographicToolkit();
        }
        target: "cryptographicToolkit"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleExploitDevelopmentFramework();
        }
        target: "exploitDevelopmentFramework"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSteganographyTools();
        }
        target: "steganographyTools"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleOSINTCollector();
        }
        target: "osintCollector"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleVulnerabilityScanner();
        }
        target: "vulnerabilityScanner"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleTrafficInterceptor();
        }
        target: "trafficInterceptor"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleBinaryExploitationTools();
        }
        target: "binaryExploitationTools"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleWebAppSecurityTester();
        }
        target: "webAppSecurityTester"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleSystemCallMonitor();
        }
        target: "systemCallMonitor"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleEncryptedCommunication();
        }
        target: "encryptedCommunication"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleAdvancedLogging();
        }
        target: "advancedLogging"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleHardwareSecurityModule();
        }
        target: "hardwareSecurityModule"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleCodeObfuscationTools();
        }
        target: "codeObfuscationTools"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.togglePenetrationTestingSuite();
        }
        target: "penetrationTestingSuite"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleBlockchainAnalyzer();
        }
        target: "blockchainAnalyzer"
    }

    IpcHandler {
        function toggle() {
            root.context.appState.toggleAIThreatDetection();
        }
        target: "aiThreatDetection"
    }

}

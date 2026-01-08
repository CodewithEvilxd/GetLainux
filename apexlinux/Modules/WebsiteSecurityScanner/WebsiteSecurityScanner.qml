import QtQuick
import Quickshell
import Quickshell.Wayland
import Quickshell.Io
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property string scanUrl: ""
    property var scanResults: {}
    property bool scanning: false
    property var malwareIndicators: [
        "malware", "virus", "trojan", "ransomware", "spyware", "adware",
        "phishing", "scam", "fraud", "suspicious", "dangerous", "malicious"
    ]
    property var threatLevels: {
        "safe": { color: "#44ff44", text: "SAFE" },
        "low": { color: "#ffaa00", text: "LOW RISK" },
        "medium": { color: "#ff8800", text: "MEDIUM RISK" },
        "high": { color: "#ff4444", text: "HIGH RISK" },
        "critical": { color: "#ff0000", text: "CRITICAL THREAT" }
    }

    function scanWebsite(url) {
        if (!url || url === "") return
        
        root.scanning = true
        root.scanResults = {}
        
        var domain = url.toLowerCase()
        var threatScore = 0
        var threats = []
        
        // Check for malware indicators
        for (var i = 0; i < root.malwareIndicators.length; i++) {
            if (domain.includes(root.malwareIndicators[i])) {
                threatScore += 20
                threats.push("Contains malware-related keywords")
            }
        }
        
        // Check for darkweb domains
        if (domain.includes(".onion") || domain.includes(".i2p")) {
            threatScore += 30
            threats.push("Darkweb domain detected")
        }
        
        // Check for suspicious TLDs
        var suspiciousTLDs = [".tk", ".ml", ".ga", ".cf", ".gq"]
        for (var j = 0; j < suspiciousTLDs.length; j++) {
            if (domain.endsWith(suspiciousTLDs[j])) {
                threatScore += 15
                threats.push("Suspicious TLD detected")
            }
        }
        
        // Check URL structure
        if (domain.includes("bit.ly") || domain.includes("tinyurl") || domain.includes("short.link")) {
            threatScore += 10
            threats.push("URL shortener detected")
        }
        
        // Determine threat level
        var threatLevel = "safe"
        if (threatScore >= 70) threatLevel = "critical"
        else if (threatScore >= 50) threatLevel = "high"
        else if (threatScore >= 30) threatLevel = "medium"
        else if (threatScore >= 10) threatLevel = "low"
        
        root.scanResults = {
            url: url,
            threatLevel: threatLevel,
            threatScore: threatScore,
            threats: threats,
            timestamp: new Date().toLocaleString()
        }
        
        root.scanning = false
        
        // Show warning if high threat
        if (threatLevel === "high" || threatLevel === "critical") {
            root.showThreatWarning()
        }
    }

    function showThreatWarning() {
        threatWarning.show(root.scanResults.url, root.scanResults.threatLevel, root.scanResults.threats)
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "website-security-scanner"
    WlrLayershell.exclusiveZone: -1

    anchors {
        bottom: true
        horizontalCenter: true
    }

    Rectangle {
        anchors.fill: parent
        color: colors.surface
        radius: 15
        border.width: 1
        border.color: colors.border

        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Text {
                text: "Website Security Scanner"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Row {
                spacing: 10
                width: parent.width

                Rectangle {
                    width: parent.width - 100
                    height: 30
                    radius: 5
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 5
                        text: root.scanUrl
                        font.pixelSize: 12
                        color: colors.fg
                        placeholderText: "Enter website URL"
                        onTextChanged: root.scanUrl = text
                    }
                }

                Rectangle {
                    width: 80
                    height: 30
                    radius: 5
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: root.scanning ? "Scanning..." : "Scan"
                        font.pixelSize: 12
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        enabled: !root.scanning
                        onClicked: root.scanWebsite(root.scanUrl)
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 80
                radius: 10
                color: root.scanResults.threatLevel 
                    ? Qt.rgba(
                        root.threatLevels[root.scanResults.threatLevel].color === "#44ff44" ? 0 : 1,
                        root.threatLevels[root.scanResults.threatLevel].color === "#44ff44" ? 1 : 0,
                        0, 0.2
                    )
                    : "transparent"
                visible: root.scanResults.threatLevel

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.scanResults.threatLevel 
                            ? root.threatLevels[root.scanResults.threatLevel].text
                            : "No scan results"
                        font.pixelSize: 18
                        font.bold: true
                        color: root.scanResults.threatLevel 
                            ? root.threatLevels[root.scanResults.threatLevel].color
                            : colors.fg
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Threat Score: " + (root.scanResults.threatScore || 0) + "/100"
                        font.pixelSize: 12
                        color: colors.muted
                    }
                }
            }

            Text {
                text: "Detected Threats"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
                visible: root.scanResults.threats && root.scanResults.threats.length > 0
            }

            ListView {
                width: parent.width
                height: 200
                model: root.scanResults.threats || []
                visible: root.scanResults.threats && root.scanResults.threats.length > 0

                delegate: Rectangle {
                    width: parent.width
                    height: 40
                    radius: 6
                    color: Qt.rgba(1, 0, 0, 0.1)
                    border.width: 1
                    border.color: "#ff4444"

                    Text {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        text: modelData
                        font.pixelSize: 12
                        color: "#ff4444"
                    }
                }
            }
        }
    }

    ThreatWarningWindow {
        id: threatWarning
    }
}

Component {
    id: threatWarning

    PanelWindow {
        id: threatRoot

        property string threatUrl: ""
        property string threatLevel: ""
        property var threatList: []

        function show(url, level, threats) {
            threatRoot.threatUrl = url
            threatRoot.threatLevel = level
            threatRoot.threatList = threats
            threatRoot.visible = true
        }

        color: "transparent"
        visible: false
        implicitWidth: Screen.width
        implicitHeight: Screen.height
        WlrLayershell.layer: WlrLayer.Overlay
        WlrLayershell.namespace: "threat-warning"
        WlrLayershell.exclusiveZone: -1

        Rectangle {
            anchors.fill: parent
            color: Qt.rgba(0, 0, 0, 0.9)

            Rectangle {
                anchors.centerIn: parent
                width: 600
                height: 400
                radius: 15
                color: colors.surface
                border.width: 4
                border.color: threatRoot.threatLevel === "critical" ? "#ff0000" : "#ff4444"

                Column {
                    anchors.fill: parent
                    anchors.margins: 30
                    spacing: 20

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "MALWARE THREAT DETECTED"
                        font.pixelSize: 24
                        font.bold: true
                        color: "#ff4444"
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "This website has been flagged as potentially dangerous!"
                        font.pixelSize: 14
                        color: colors.fg
                        width: parent.width
                        wrapMode: Text.WordWrap
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "URL: " + threatRoot.threatUrl
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.muted
                        width: parent.width
                        elide: Text.ElideMiddle
                    }

                    Column {
                        width: parent.width
                        spacing: 10

                        Text {
                            text: "Threats Found:"
                            font.pixelSize: 14
                            font.bold: true
                            color: colors.fg
                        }

                        ListView {
                            width: parent.width
                            height: 100
                            model: threatRoot.threatList

                            delegate: Text {
                                text: "• " + modelData
                                font.pixelSize: 12
                                color: "#ff4444"
                            }
                        }
                    }

                    Row {
                        anchors.horizontalCenter: parent.horizontalCenter
                        spacing: 15

                        Rectangle {
                            width: 150
                            height: 45
                            radius: 8
                            color: "#ff4444"

                            Text {
                                anchors.centerIn: parent
                                text: "BLOCK SITE"
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffffff"
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: {
                                    threatRoot.visible = false
                                }
                            }
                        }

                        Rectangle {
                            width: 150
                            height: 45
                            radius: 8
                            color: "#ffaa00"

                            Text {
                                anchors.centerIn: parent
                                text: "USE VPN"
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffffff"
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: {
                                    // Auto connect VPN
                                    threatRoot.visible = false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


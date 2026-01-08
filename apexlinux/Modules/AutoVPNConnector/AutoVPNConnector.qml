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
    property bool autoVPNEnabled: true
    property string currentVPN: "tor"
    property var vpnProfiles: [
        { name: "Tor", command: "sudo systemctl start tor", type: "onion" },
        { name: "Onion", command: "sudo systemctl start tor", type: "onion" },
        { name: "WireGuard", command: "sudo wg-quick up wg0", type: "wireguard" },
        { name: "OpenVPN", command: "sudo openvpn --config /etc/openvpn/client.ovpn", type: "openvpn" },
        { name: "NordVPN", command: "nordvpn connect", type: "commercial" },
        { name: "ProtonVPN", command: "protonvpn connect", type: "commercial" }
    ]
    property var dangerousDomains: [
        ".onion", ".i2p", "darkweb", "tor", "hidden", "illegal", "malware", "phishing"
    ]
    property var blockedDomains: []
    property bool vpnConnected: false

    Process {
        id: vpnStatusCheck
        command: ["ip", "addr", "show", "tun0"]
        running: root.autoVPNEnabled
        interval: 2000

        onFinished: {
            root.vpnConnected = exitCode === 0
        }
    }

    function checkWebsite(url) {
        var domain = url.toLowerCase()
        var isDangerous = false
        
        for (var i = 0; i < root.dangerousDomains.length; i++) {
            if (domain.includes(root.dangerousDomains[i])) {
                isDangerous = true
                break
            }
        }
        
        if (isDangerous && !root.vpnConnected && root.autoVPNEnabled) {
            root.connectVPN()
            root.showWarning(url, "Dangerous website detected. VPN connecting...")
        }
        
        return isDangerous
    }

    function connectVPN() {
        var profile = root.vpnProfiles.find(p => p.name.toLowerCase() === root.currentVPN.toLowerCase())
        if (profile) {
            Quickshell.execDetached(["sh", "-c", profile.command])
        }
    }

    function showWarning(url, message) {
        warningWindow.show(url, message)
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 500
    implicitHeight: 400
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "auto-vpn-connector"
    WlrLayershell.exclusiveZone: -1

    anchors {
        bottom: true
        right: true
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
                text: "Auto VPN Connector"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: root.vpnConnected 
                    ? Qt.rgba(0, 1, 0, 0.2)
                    : Qt.rgba(1, 0, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.vpnConnected ? "VPN CONNECTED" : "VPN DISCONNECTED"
                        font.pixelSize: 16
                        font.bold: true
                        color: root.vpnConnected ? "#44ff44" : "#ff4444"
                    }
                }
            }

            Row {
                spacing: 10
                width: parent.width

                Text {
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Auto VPN:"
                    font.pixelSize: 12
                    color: colors.fg
                }

                Rectangle {
                    width: 50
                    height: 30
                    radius: 5
                    color: root.autoVPNEnabled ? "#44ff44" : "#ff4444"

                    Text {
                        anchors.centerIn: parent
                        text: root.autoVPNEnabled ? "ON" : "OFF"
                        font.pixelSize: 11
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.autoVPNEnabled = !root.autoVPNEnabled
                    }
                }
            }

            Column {
                spacing: 5
                width: parent.width

                Text {
                    text: "VPN Profile"
                    font.pixelSize: 12
                    color: colors.muted
                }

                ListView {
                    width: parent.width
                    height: 150
                    model: root.vpnProfiles

                    delegate: Rectangle {
                        width: parent.width
                        height: 40
                        radius: 6
                        color: modelData.name.toLowerCase() === root.currentVPN.toLowerCase()
                            ? Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.2)
                            : "transparent"
                        border.width: modelData.name.toLowerCase() === root.currentVPN.toLowerCase() ? 2 : 1
                        border.color: modelData.name.toLowerCase() === root.currentVPN.toLowerCase() 
                            ? colors.accent 
                            : colors.border

                        Text {
                            anchors.left: parent.left
                            anchors.leftMargin: 10
                            anchors.verticalCenter: parent.verticalCenter
                            text: modelData.name + " (" + modelData.type + ")"
                            font.pixelSize: 12
                            color: colors.fg
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.currentVPN = modelData.name.toLowerCase()
                        }
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Connect VPN Now"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.connectVPN()
                }
            }
        }
    }

    function showWarning(url, message) {
        securityWarning.show(url, message, "website")
    }
}

PanelWindow {
    id: securityWarning

    property string warningUrl: ""
    property string warningMessage: ""
    property string warningType: ""

    function show(url, message, type) {
        securityWarning.warningUrl = url
        securityWarning.warningMessage = message
        securityWarning.warningType = type
        securityWarning.visible = true
    }

    color: "transparent"
    visible: false
    implicitWidth: Screen.width
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "auto-vpn-warning"
    WlrLayershell.exclusiveZone: -1

    Rectangle {
        anchors.fill: parent
        color: Qt.rgba(0, 0, 0, 0.8)

        Rectangle {
            anchors.centerIn: parent
            width: 500
            height: 300
            radius: 15
            color: colors.surface
            border.width: 3
            border.color: "#ff4444"

            Column {
                anchors.fill: parent
                anchors.margins: 30
                spacing: 20

                Text {
                    anchors.horizontalCenter: parent.horizontalCenter
                    text: "SECURITY WARNING"
                    font.pixelSize: 24
                    font.bold: true
                    color: "#ff4444"
                }

                Text {
                    anchors.horizontalCenter: parent.horizontalCenter
                    text: securityWarning.warningMessage
                    font.pixelSize: 14
                    color: colors.fg
                    width: parent.width
                    wrapMode: Text.WordWrap
                }

                Text {
                    anchors.horizontalCenter: parent.horizontalCenter
                    text: "URL: " + securityWarning.warningUrl
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.muted
                    width: parent.width
                    elide: Text.ElideMiddle
                }

                Row {
                    anchors.horizontalCenter: parent.horizontalCenter
                    spacing: 15

                    Rectangle {
                        width: 120
                        height: 40
                        radius: 8
                        color: "#ff4444"

                        Text {
                            anchors.centerIn: parent
                            text: "Block"
                            font.pixelSize: 14
                            font.bold: true
                            color: "#ffffff"
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: securityWarning.visible = false
                        }
                    }

                    Rectangle {
                        width: 120
                        height: 40
                        radius: 8
                        color: "#44ff44"

                        Text {
                            anchors.centerIn: parent
                            text: "Continue"
                            font.pixelSize: 14
                            font.bold: true
                            color: "#ffffff"
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: securityWarning.visible = false
                        }
                    }
                }
            }
        }
    }
}


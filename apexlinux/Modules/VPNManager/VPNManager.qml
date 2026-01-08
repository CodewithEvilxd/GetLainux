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
    property bool vpnConnected: false
    property string vpnStatus: "Disconnected"

    Process {
        id: vpnStatusCheck
        command: ["ip", "addr", "show", "tun0"]
        running: root.isOpen
        interval: 3000

        onFinished: {
            root.vpnConnected = exitCode === 0
            root.vpnStatus = root.vpnConnected ? "Connected" : "Disconnected"
        }
    }

    function connectVPN() {
        Quickshell.execDetached(["sudo", "systemctl", "start", "openvpn-client@client"])
    }

    function disconnectVPN() {
        Quickshell.execDetached(["sudo", "systemctl", "stop", "openvpn-client@client"])
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 400
    implicitHeight: 300
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "vpn-manager"
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
                text: "VPN Manager"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 80
                radius: 10
                color: root.vpnConnected 
                    ? Qt.rgba(0, 1, 0, 0.2)
                    : Qt.rgba(1, 0, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.vpnStatus
                        font.pixelSize: 18
                        font.bold: true
                        color: root.vpnConnected ? "#44ff44" : "#ff4444"
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: root.vpnConnected ? "#ff4444" : colors.accent

                Text {
                    anchors.centerIn: parent
                    text: root.vpnConnected ? "Disconnect" : "Connect"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.vpnConnected ? root.disconnectVPN() : root.connectVPN()
                }
            }
        }
    }
}


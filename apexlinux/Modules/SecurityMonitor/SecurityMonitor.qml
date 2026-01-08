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
    property var suspiciousProcesses: []
    property var networkConnections: []
    property var securityAlerts: []

    Process {
        id: processMonitor
        command: ["ps", "aux"]
        running: root.isOpen
        interval: 5000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var suspicious = []
                for (var i = 1; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 10) {
                        var cpu = parseFloat(parts[2]) || 0
                        var mem = parseFloat(parts[3]) || 0
                        if (cpu > 80 || mem > 80) {
                            suspicious.push({
                                name: parts[10],
                                pid: parts[1],
                                cpu: cpu,
                                mem: mem
                            })
                        }
                    }
                }
                root.suspiciousProcesses = suspicious
            }
        }
    }

    Process {
        id: networkMonitor
        command: ["ss", "-tulpn"]
        running: root.isOpen
        interval: 3000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var connections = []
                for (var i = 1; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 4) {
                        connections.push({
                            protocol: parts[0],
                            local: parts[4],
                            state: parts.length > 5 ? parts[5] : "LISTEN",
                            pid: parts.length > 6 ? parts[6] : "N/A"
                        })
                    }
                }
                root.networkConnections = connections
            }
        }
    }

    function checkSecurity() {
        var alerts = []
        if (root.suspiciousProcesses.length > 5) {
            alerts.push("High number of suspicious processes detected")
        }
        var openPorts = root.networkConnections.filter(c => c.state === "LISTEN").length
        if (openPorts > 20) {
            alerts.push("Unusual number of open ports: " + openPorts)
        }
        root.securityAlerts = alerts
    }

    Timer {
        interval: 5000
        running: root.isOpen
        repeat: true
        onTriggered: root.checkSecurity()
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "security-monitor"
    WlrLayershell.exclusiveZone: -1

    anchors {
        right: true
        top: true
        bottom: true
    }

    Rectangle {
        anchors.fill: parent
        color: colors.surface
        border.width: 1
        border.color: colors.border

        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Text {
                text: "Security Monitor"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: root.securityAlerts.length > 0 
                    ? Qt.rgba(1, 0, 0, 0.2)
                    : Qt.rgba(0, 1, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.securityAlerts.length > 0 ? "ALERT" : "SECURE"
                        font.pixelSize: 16
                        font.bold: true
                        color: root.securityAlerts.length > 0 ? "#ff4444" : "#44ff44"
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.securityAlerts.length + " alerts"
                        font.pixelSize: 12
                        color: colors.muted
                    }
                }
            }

            Text {
                text: "Suspicious Processes"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 200
                model: root.suspiciousProcesses

                delegate: Rectangle {
                    width: parent.width
                    height: 50
                    radius: 6
                    color: Qt.rgba(1, 0, 0, 0.1)

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15

                        Text {
                            text: modelData.name || "Unknown"
                            font.pixelSize: 12
                            font.bold: true
                            color: colors.fg
                        }

                        Text {
                            text: "PID: " + modelData.pid
                            font.pixelSize: 11
                            color: colors.muted
                        }

                        Text {
                            text: "CPU: " + modelData.cpu.toFixed(1) + "%"
                            font.pixelSize: 11
                            color: "#ff4444"
                        }

                        Text {
                            text: "MEM: " + modelData.mem.toFixed(1) + "%"
                            font.pixelSize: 11
                            color: "#ff4444"
                        }
                    }
                }
            }

            Text {
                text: "Network Connections"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 300
                model: root.networkConnections

                delegate: Rectangle {
                    width: parent.width
                    height: 40
                    radius: 4
                    color: modelData.state === "LISTEN" 
                        ? Qt.rgba(1, 1, 0, 0.1)
                        : "transparent"

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 10

                        Text {
                            text: modelData.protocol || "TCP"
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                        }

                        Text {
                            text: modelData.local || ""
                            font.pixelSize: 10
                            font.family: "monospace"
                            color: colors.muted
                        }

                        Text {
                            text: modelData.state || ""
                            font.pixelSize: 10
                            color: modelData.state === "LISTEN" ? "#ffaa00" : colors.muted
                        }
                    }
                }
            }
        }
    }
}


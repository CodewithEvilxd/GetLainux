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
    property var dnsQueries: []
    property bool monitoring: false

    Process {
        id: dnsMonitor
        command: ["sudo", "tcpdump", "-i", "any", "port", "53", "-n"]
        running: root.monitoring

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].includes("A?") || lines[i].includes("AAAA?")) {
                        var parts = lines[i].split("A?")
                        if (parts.length > 1) {
                            var domain = parts[1].trim().split(/\s+/)[0]
                            root.dnsQueries.push({
                                timestamp: new Date().toLocaleTimeString(),
                                domain: domain
                            })
                            if (root.dnsQueries.length > 100) {
                                root.dnsQueries.shift()
                            }
                        }
                    }
                }
            }
        }
    }

    function startMonitoring() {
        root.monitoring = true
        root.dnsQueries = []
    }

    function stopMonitoring() {
        root.monitoring = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "dns-security"
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
                text: "DNS Security Monitor"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: root.monitoring 
                    ? Qt.rgba(0, 1, 0, 0.2)
                    : Qt.rgba(1, 1, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.monitoring ? "MONITORING" : "STOPPED"
                        font.pixelSize: 16
                        font.bold: true
                        color: root.monitoring ? "#44ff44" : "#ffaa00"
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Queries: " + root.dnsQueries.length
                        font.pixelSize: 12
                        color: colors.muted
                    }
                }
            }

            Row {
                spacing: 10
                width: parent.width

                Rectangle {
                    width: (parent.width - 10) / 2
                    height: 40
                    radius: 8
                    color: root.monitoring ? "#ff4444" : colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: root.monitoring ? "Stop" : "Start"
                        font.pixelSize: 14
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.monitoring ? root.stopMonitoring() : root.startMonitoring()
                    }
                }
            }

            ListView {
                width: parent.width
                height: 300
                model: root.dnsQueries

                delegate: Rectangle {
                    width: parent.width
                    height: 40
                    radius: 4
                    color: "transparent"
                    border.width: 1
                    border.color: colors.border

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15

                        Text {
                            text: modelData.timestamp
                            font.pixelSize: 10
                            font.family: "monospace"
                            color: colors.muted
                            width: 100
                        }

                        Text {
                            text: modelData.domain
                            font.pixelSize: 12
                            font.family: "monospace"
                            color: colors.fg
                        }
                    }
                }
            }
        }
    }
}


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
    property string targetHost: "127.0.0.1"
    property string portRange: "1-1000"
    property var scanResults: []
    property bool scanning: false

    function startScan() {
        root.scanning = true
        root.scanResults = []
        scannerProc.running = true
    }

    Process {
        id: scannerProc
        command: ["nmap", "-p", root.portRange, root.targetHost]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i]
                    if (line.includes('/tcp') || line.includes('/udp')) {
                        var parts = line.trim().split(/\s+/)
                        if (parts.length > 1) {
                            var portInfo = parts[0].split('/')
                            root.scanResults.push({
                                port: portInfo[0],
                                protocol: portInfo[1] || "tcp",
                                state: parts[1] || "unknown",
                                service: parts.length > 2 ? parts[2] : "unknown"
                            })
                        }
                    }
                }
            }
        }

        onFinished: {
            root.scanning = false
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "port-scanner"
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
                text: "Port Scanner"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Row {
                spacing: 10
                width: parent.width

                Column {
                    spacing: 5
                    width: (parent.width - 10) / 2

                    Text {
                        text: "Target Host"
                        font.pixelSize: 12
                        color: colors.muted
                    }

                    Rectangle {
                        width: parent.width
                        height: 30
                        radius: 5
                        color: colors.bg
                        border.width: 1
                        border.color: colors.border

                        TextInput {
                            anchors.fill: parent
                            anchors.margins: 5
                            text: root.targetHost
                            font.pixelSize: 12
                            color: colors.fg
                            onTextChanged: root.targetHost = text
                        }
                    }
                }

                Column {
                    spacing: 5
                    width: (parent.width - 10) / 2

                    Text {
                        text: "Port Range"
                        font.pixelSize: 12
                        color: colors.muted
                    }

                    Rectangle {
                        width: parent.width
                        height: 30
                        radius: 5
                        color: colors.bg
                        border.width: 1
                        border.color: colors.border

                        TextInput {
                            anchors.fill: parent
                            anchors.margins: 5
                            text: root.portRange
                            font.pixelSize: 12
                            color: colors.fg
                            onTextChanged: root.portRange = text
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
                    text: root.scanning ? "Scanning..." : "Start Scan"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    enabled: !root.scanning
                    onClicked: root.startScan()
                }
            }

            Text {
                text: "Scan Results"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 300
                model: root.scanResults

                delegate: Rectangle {
                    width: parent.width
                    height: 40
                    radius: 4
                    color: modelData.state === "open" 
                        ? Qt.rgba(0, 1, 0, 0.1)
                        : "transparent"

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15

                        Text {
                            text: "Port: " + modelData.port + "/" + modelData.protocol
                            font.pixelSize: 12
                            font.family: "monospace"
                            color: colors.fg
                        }

                        Text {
                            text: modelData.state
                            font.pixelSize: 12
                            color: modelData.state === "open" ? "#44ff44" : colors.muted
                        }

                        Text {
                            text: modelData.service
                            font.pixelSize: 12
                            color: colors.muted
                        }
                    }
                }
            }
        }
    }
}


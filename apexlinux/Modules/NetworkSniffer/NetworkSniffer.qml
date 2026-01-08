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
    property var capturedPackets: []
    property bool capturing: false

    Process {
        id: packetCapture
        command: ["sudo", "tcpdump", "-i", "any", "-n", "-c", "50"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].trim() !== "") {
                        root.capturedPackets.push({
                            timestamp: new Date().toLocaleTimeString(),
                            data: lines[i]
                        })
                        if (root.capturedPackets.length > 100) {
                            root.capturedPackets.shift()
                        }
                    }
                }
            }
        }

        onFinished: {
            root.capturing = false
        }
    }

    function startCapture() {
        root.capturing = true
        root.capturedPackets = []
        packetCapture.running = true
    }

    function stopCapture() {
        packetCapture.running = false
        root.capturing = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "network-sniffer"
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
                text: "Network Sniffer"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Row {
                spacing: 10
                width: parent.width

                Rectangle {
                    width: 120
                    height: 40
                    radius: 8
                    color: root.capturing ? "#ff4444" : colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: root.capturing ? "Stop" : "Start"
                        font.pixelSize: 14
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.capturing ? root.stopCapture() : root.startCapture()
                    }
                }

                Text {
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Packets: " + root.capturedPackets.length
                    font.pixelSize: 12
                    color: colors.muted
                }
            }

            ListView {
                width: parent.width
                height: parent.height - 100
                model: root.capturedPackets

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
                            text: modelData.data
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                            elide: Text.ElideRight
                            width: parent.width - 120
                        }
                    }
                }
            }
        }
    }
}


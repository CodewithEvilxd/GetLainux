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
    property var packetQueue: []
    property bool capturing: false

    Process {
        id: packetCapture
        command: ["tcpdump", "-i", "any", "-n", "-c", "100"]
        running: root.capturing

        stdout: SplitParser {
            onRead: (data) => {
                root.packetQueue.push({
                    data: data,
                    timestamp: new Date().toISOString()
                })
                if (root.packetQueue.length > 1000) {
                    root.packetQueue.shift()
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 1000
    implicitHeight: 700
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "network-packet-manipulator"
    WlrLayershell.exclusiveZone: -1

    Rectangle {
        anchors.fill: parent
        color: colors.surface
        border.width: 2
        border.color: colors.border
        radius: 20

        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Row {
                width: parent.width
                spacing: 10

                Text {
                    text: "Network Packet Manipulator"
                    font.pixelSize: 24
                    font.bold: true
                    color: colors.fg
                }

                Rectangle {
                    width: 120
                    height: 35
                    radius: 8
                    color: root.capturing ? "#ff4444" : "#44ff44"

                    Text {
                        anchors.centerIn: parent
                        text: root.capturing ? "Stop" : "Start Capture"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.capturing = !root.capturing
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 100

                ListView {
                    model: root.packetQueue
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 60
                        color: colors.bg
                        border.width: 1
                        border.color: colors.border
                        radius: 5

                        Column {
                            anchors.fill: parent
                            anchors.margins: 8
                            spacing: 3

                            Text {
                                text: modelData.timestamp
                                font.pixelSize: 10
                                color: colors.muted
                            }

                            Text {
                                text: modelData.data
                                font.pixelSize: 11
                                font.family: "monospace"
                                color: colors.fg
                                width: parent.width
                                elide: Text.ElideRight
                            }
                        }
                    }
                }
            }

            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                spacing: 10

                Rectangle {
                    width: 120
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Clear Queue"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.packetQueue = []
                    }
                }
            }
        }
    }
}


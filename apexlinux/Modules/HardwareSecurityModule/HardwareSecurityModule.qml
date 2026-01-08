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
    property var usbDevices: []
    property var bluetoothDevices: []

    Process {
        id: usbMonitor
        command: ["lsusb"]
        running: root.isOpen
        interval: 3000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                root.usbDevices = []
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].trim().length > 0) {
                        root.usbDevices.push(lines[i].trim())
                    }
                }
            }
        }
    }

    Process {
        id: bluetoothScanner
        command: ["bluetoothctl", "devices"]
        running: root.isOpen
        interval: 5000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                root.bluetoothDevices = []
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].trim().length > 0) {
                        root.bluetoothDevices.push(lines[i].trim())
                    }
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "hardware-security-module"
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

            Text {
                text: "Hardware Security Module"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "USB Devices:"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ScrollView {
                width: parent.width
                height: 200

                ListView {
                    model: root.usbDevices
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 30
                        color: colors.bg
                        border.width: 1
                        border.color: colors.border
                        radius: 3

                        Text {
                            anchors.fill: parent
                            anchors.margins: 8
                            text: modelData
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                        }
                    }
                }
            }

            Text {
                text: "Bluetooth Devices:"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ScrollView {
                width: parent.width
                height: 200

                ListView {
                    model: root.bluetoothDevices
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 30
                        color: colors.bg
                        border.width: 1
                        border.color: colors.border
                        radius: 3

                        Text {
                            anchors.fill: parent
                            anchors.margins: 8
                            text: modelData
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                        }
                    }
                }
            }
        }
    }
}


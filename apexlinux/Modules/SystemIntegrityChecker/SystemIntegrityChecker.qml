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
    property var fileChecks: []
    property bool scanning: false

    function startScan() {
        root.scanning = true
        root.fileChecks = []
        integrityCheck.running = true
    }

    Process {
        id: integrityCheck
        command: ["find", "/etc", "-type", "f", "-exec", "md5sum", "{}", "\\;"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                for (var i = 0; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 1) {
                        root.fileChecks.push({
                            hash: parts[0],
                            path: parts.slice(1).join(' ')
                        })
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
    implicitWidth: 700
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "system-integrity"
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
                text: "System Integrity Checker"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: root.scanning ? "Scanning..." : "Start Integrity Check"
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
                text: "Files Checked: " + root.fileChecks.length
                font.pixelSize: 14
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 450
                model: root.fileChecks

                delegate: Rectangle {
                    width: parent.width
                    height: 50
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
                            text: modelData.hash.substring(0, 16) + "..."
                            font.pixelSize: 10
                            font.family: "monospace"
                            color: colors.muted
                            width: 150
                        }

                        Text {
                            text: modelData.path
                            font.pixelSize: 11
                            color: colors.fg
                            elide: Text.ElideLeft
                            width: parent.width - 170
                        }
                    }
                }
            }
        }
    }
}


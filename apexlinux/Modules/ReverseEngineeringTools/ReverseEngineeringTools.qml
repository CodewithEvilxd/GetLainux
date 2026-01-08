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
    property string selectedFile: ""
    property var fileInfo: ({})

    Process {
        id: fileAnalyzer
        command: ["file", root.selectedFile]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.fileInfo.type = data.trim()
            }
        }
    }

    Process {
        id: hexDump
        command: ["hexdump", "-C", "-n", "512", root.selectedFile]
        running: false
        property string output: ""

        stdout: SplitParser {
            onRead: (data) => {
                hexDump.output += data
            }
        }
    }

    function analyzeFile(path) {
        root.selectedFile = path
        fileAnalyzer.running = true
        hexDump.output = ""
        hexDump.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 900
    implicitHeight: 700
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "reverse-engineering-tools"
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
                text: "Reverse Engineering Tools"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Row {
                width: parent.width
                spacing: 10

                Text {
                    text: "File:"
                    font.pixelSize: 14
                    color: colors.fg
                    anchors.verticalCenter: parent.verticalCenter
                }

                Rectangle {
                    width: parent.width - 200
                    height: 35
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border
                    radius: 5

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.selectedFile
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.selectedFile = text
                    }
                }

                Rectangle {
                    width: 100
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Analyze"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.analyzeFile(root.selectedFile)
                    }
                }
            }

            Text {
                text: "File Type: " + (root.fileInfo.type || "Not analyzed")
                font.pixelSize: 14
                color: colors.fg
            }

            Text {
                text: "Hex Dump (first 512 bytes):"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ScrollView {
                width: parent.width
                height: parent.height - 250

                Rectangle {
                    width: parent.width
                    height: hexDump.output.split('\n').length * 20
                    color: colors.bg

                    Text {
                        anchors.fill: parent
                        anchors.margins: 10
                        text: hexDump.output || "No data"
                        font.pixelSize: 11
                        font.family: "monospace"
                        color: colors.fg
                        wrapMode: Text.Wrap
                    }
                }
            }
        }
    }
}


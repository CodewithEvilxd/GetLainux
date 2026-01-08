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
    property string inputText: ""
    property string hashResult: ""
    property string selectedAlgorithm: "sha256"

    Process {
        id: hashGenerator
        command: ["sh", "-c", "echo -n '" + root.inputText + "' | " + root.selectedAlgorithm + "sum | cut -d' ' -f1"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.hashResult = data.trim()
            }
        }
    }

    function generateHash() {
        hashGenerator.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 700
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "cryptographic-toolkit"
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
                text: "Cryptographic Toolkit"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Hash Algorithm:"
                font.pixelSize: 14
                color: colors.fg
            }

            Row {
                width: parent.width
                spacing: 10

                Repeater {
                    model: ["md5", "sha1", "sha256", "sha512"]
                    delegate: Rectangle {
                        width: 100
                        height: 35
                        radius: 8
                        color: root.selectedAlgorithm === modelData ? colors.accent : colors.bg
                        border.width: 1
                        border.color: colors.border

                        Text {
                            anchors.centerIn: parent
                            text: modelData.toUpperCase()
                            font.pixelSize: 12
                            font.bold: true
                            color: root.selectedAlgorithm === modelData ? "#ffffff" : colors.fg
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.selectedAlgorithm = modelData
                        }
                    }
                }
            }

            Text {
                text: "Input Text:"
                font.pixelSize: 14
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 100
                color: colors.bg
                border.width: 1
                border.color: colors.border
                radius: 5

                TextInput {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.inputText
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: TextInput.Wrap
                    onTextChanged: root.inputText = text
                }
            }

            Rectangle {
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Generate Hash"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.generateHash()
                }
            }

            Text {
                text: "Hash Result:"
                font.pixelSize: 14
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                color: colors.bg
                border.width: 1
                border.color: colors.border
                radius: 5

                Text {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.hashResult || "No hash generated"
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: Text.Wrap
                }
            }
        }
    }
}


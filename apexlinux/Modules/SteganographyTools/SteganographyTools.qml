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
    property string imagePath: ""
    property string hiddenData: ""

    Process {
        id: metadataExtractor
        command: ["exiftool", root.imagePath]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.hiddenData += data
            }
        }
    }

    function extractMetadata() {
        root.hiddenData = ""
        metadataExtractor.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 700
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "steganography-tools"
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
                text: "Steganography Tools"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Image Path:"
                font.pixelSize: 14
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 35
                color: colors.bg
                border.width: 1
                border.color: colors.border
                radius: 5

                TextInput {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.imagePath
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.fg
                    onTextChanged: root.imagePath = text
                }
            }

            Rectangle {
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Extract Metadata"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.extractMetadata()
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 200

                Rectangle {
                    width: parent.width
                    height: root.hiddenData.split('\n').length * 20
                    color: colors.bg

                    Text {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.hiddenData || "No metadata extracted"
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


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
    property string sourceCode: ""
    property string obfuscatedCode: ""

    function obfuscate() {
        var obfuscated = root.sourceCode
        obfuscated = obfuscated.replace(/var /g, "v")
        obfuscated = obfuscated.replace(/function /g, "f")
        obfuscated = obfuscated.replace(/return /g, "r")
        root.obfuscatedCode = obfuscated
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "code-obfuscation-tools"
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
                text: "Code Obfuscation Tools"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Source Code:"
                font.pixelSize: 14
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 200
                color: colors.bg
                border.width: 1
                border.color: colors.border
                radius: 5

                TextInput {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.sourceCode
                    font.pixelSize: 11
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: TextInput.Wrap
                    onTextChanged: root.sourceCode = text
                }
            }

            Rectangle {
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Obfuscate"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.obfuscate()
                }
            }

            Text {
                text: "Obfuscated Code:"
                font.pixelSize: 14
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 200
                color: colors.bg
                border.width: 1
                border.color: colors.border
                radius: 5

                Text {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.obfuscatedCode || "No code obfuscated"
                    font.pixelSize: 11
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: Text.Wrap
                }
            }
        }
    }
}


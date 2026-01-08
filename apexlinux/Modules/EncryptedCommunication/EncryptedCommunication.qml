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
    property string message: ""
    property string encryptedMessage: ""
    property string key: ""

    Process {
        id: encryptor
        command: ["sh", "-c", "echo -n '" + root.message + "' | openssl enc -aes-256-cbc -a -k '" + root.key + "'"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.encryptedMessage = data.trim()
            }
        }
    }

    function encrypt() {
        encryptor.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 700
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "encrypted-communication"
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
                text: "Encrypted Communication Channel"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Encryption Key:"
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
                    text: root.key
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.fg
                    onTextChanged: root.key = text
                }
            }

            Text {
                text: "Message:"
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
                    text: root.message
                    font.pixelSize: 12
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: TextInput.Wrap
                    onTextChanged: root.message = text
                }
            }

            Rectangle {
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Encrypt"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.encrypt()
                }
            }

            Text {
                text: "Encrypted Message:"
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

                Text {
                    anchors.fill: parent
                    anchors.margins: 8
                    text: root.encryptedMessage || "No message encrypted"
                    font.pixelSize: 11
                    font.family: "monospace"
                    color: colors.fg
                    wrapMode: Text.Wrap
                }
            }
        }
    }
}


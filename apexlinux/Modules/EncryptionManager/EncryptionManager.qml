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
    property string filePath: ""
    property string password: ""

    function encryptFile() {
        if (root.filePath && root.password) {
            Quickshell.execDetached(["openssl", "enc", "-aes-256-cbc", "-salt", "-in", root.filePath, "-out", root.filePath + ".enc", "-k", root.password])
        }
    }

    function decryptFile() {
        if (root.filePath && root.password) {
            var outputPath = root.filePath.replace(".enc", "")
            Quickshell.execDetached(["openssl", "enc", "-aes-256-cbc", "-d", "-in", root.filePath, "-out", outputPath, "-k", root.password])
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 500
    implicitHeight: 400
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "encryption-manager"
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
                text: "Encryption Manager"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Column {
                spacing: 5
                width: parent.width

                Text {
                    text: "File Path"
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
                        text: root.filePath
                        font.pixelSize: 12
                        color: colors.fg
                        onTextChanged: root.filePath = text
                    }
                }
            }

            Column {
                spacing: 5
                width: parent.width

                Text {
                    text: "Password"
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
                        text: root.password
                        font.pixelSize: 12
                        color: colors.fg
                        echoMode: TextInput.Password
                        onTextChanged: root.password = text
                    }
                }
            }

            Row {
                spacing: 10
                width: parent.width

                Rectangle {
                    width: (parent.width - 10) / 2
                    height: 40
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Encrypt"
                        font.pixelSize: 14
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.encryptFile()
                    }
                }

                Rectangle {
                    width: (parent.width - 10) / 2
                    height: 40
                    radius: 8
                    color: "#44ff44"

                    Text {
                        anchors.centerIn: parent
                        text: "Decrypt"
                        font.pixelSize: 14
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.decryptFile()
                    }
                }
            }
        }
    }
}


import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property string password: ""
    property int strength: 0
    property string strengthText: ""

    function checkPassword(pwd) {
        var score = 0
        if (pwd.length >= 8) score++
        if (pwd.length >= 12) score++
        if (/[a-z]/.test(pwd)) score++
        if (/[A-Z]/.test(pwd)) score++
        if (/[0-9]/.test(pwd)) score++
        if (/[^a-zA-Z0-9]/.test(pwd)) score++
        
        root.strength = score
        if (score <= 2) root.strengthText = "Weak"
        else if (score <= 4) root.strengthText = "Medium"
        else if (score <= 5) root.strengthText = "Strong"
        else root.strengthText = "Very Strong"
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 400
    implicitHeight: 350
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "password-checker"
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
                text: "Password Strength Checker"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Column {
                spacing: 5
                width: parent.width

                Text {
                    text: "Enter Password"
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
                        onTextChanged: {
                            root.password = text
                            root.checkPassword(text)
                        }
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: root.strength <= 2 
                    ? Qt.rgba(1, 0, 0, 0.2)
                    : root.strength <= 4
                    ? Qt.rgba(1, 1, 0, 0.2)
                    : Qt.rgba(0, 1, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.strengthText || "Enter password"
                        font.pixelSize: 16
                        font.bold: true
                        color: root.strength <= 2 
                            ? "#ff4444"
                            : root.strength <= 4
                            ? "#ffaa00"
                            : "#44ff44"
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Strength: " + root.strength + "/6"
                        font.pixelSize: 12
                        color: colors.muted
                    }
                }
            }
        }
    }
}


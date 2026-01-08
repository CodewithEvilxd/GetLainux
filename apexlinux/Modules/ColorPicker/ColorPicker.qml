import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property string pickedColor: "#000000"

    function pickColor() {
        var proc = Quickshell.exec(["hyprpicker", "-a"])
        if (proc.exitCode === 0) {
            root.pickedColor = proc.stdout.trim()
            Quickshell.execDetached(["wl-copy", root.pickedColor])
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 300
    implicitHeight: 200
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "color-picker"
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
            anchors.centerIn: parent
            spacing: 20
            width: parent.width - 40

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Color Picker"
                font.pixelSize: 18
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                anchors.horizontalCenter: parent.horizontalCenter
                width: 100
                height: 100
                radius: 10
                color: root.pickedColor
                border.width: 2
                border.color: colors.border
            }

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: root.pickedColor
                font.pixelSize: 14
                font.family: "monospace"
                color: colors.fg
            }

            Rectangle {
                anchors.horizontalCenter: parent.horizontalCenter
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Pick Color"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.pickColor()
                }
            }
        }
    }
}


import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property var actions: [
        { name: "Screenshot", command: "grim -g \"$(slurp)\" - | wl-copy" },
        { name: "Full Screenshot", command: "grim - | wl-copy" },
        { name: "Color Picker", command: "hyprpicker -a" },
        { name: "Calculator", command: "gnome-calculator" },
        { name: "File Manager", command: "thunar" },
        { name: "Terminal", command: "kitty" },
        { name: "Browser", command: "firefox" },
        { name: "Code Editor", command: "code" }
    ]

    function executeAction(command) {
        Quickshell.execDetached(["sh", "-c", command])
        root.isOpen = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: Screen.width
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "quick-actions"
    WlrLayershell.exclusiveZone: -1

    Rectangle {
        anchors.fill: parent
        color: Qt.rgba(0, 0, 0, 0.7)

        Column {
            anchors.centerIn: parent
            spacing: 20
            width: 400

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Quick Actions"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Grid {
                anchors.horizontalCenter: parent.horizontalCenter
                columns: 2
                spacing: 15

                Repeater {
                    model: root.actions

                    Rectangle {
                        width: 180
                        height: 60
                        radius: 10
                        color: Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.8)
                        border.width: 1
                        border.color: colors.border

                        Text {
                            anchors.centerIn: parent
                            text: modelData.name
                            font.pixelSize: 14
                            font.bold: true
                            color: colors.fg
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.executeAction(modelData.command)
                        }
                    }
                }
            }
        }
    }
}


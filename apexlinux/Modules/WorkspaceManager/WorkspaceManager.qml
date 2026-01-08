import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property int currentWorkspace: 1
    property int totalWorkspaces: 9

    function switchWorkspace(index) {
        if (index >= 1 && index <= totalWorkspaces) {
            Quickshell.execDetached(["hyprctl", "workspace", index.toString()])
            currentWorkspace = index
        }
    }

    function moveToWorkspace(index) {
        if (index >= 1 && index <= totalWorkspaces) {
            Quickshell.execDetached(["hyprctl", "dispatch", "movetoworkspace", index.toString()])
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: Screen.width
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "workspace-manager"
    WlrLayershell.exclusiveZone: -1

    Rectangle {
        anchors.fill: parent
        color: Qt.rgba(0, 0, 0, 0.7)

        Column {
            anchors.centerIn: parent
            spacing: 20

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Workspace Manager"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Grid {
                anchors.horizontalCenter: parent.horizontalCenter
                columns: 3
                spacing: 15

                Repeater {
                    model: root.totalWorkspaces

                    Rectangle {
                        width: 80
                        height: 80
                        radius: 10
                        color: (index + 1) === root.currentWorkspace 
                            ? colors.accent 
                            : Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.8)
                        border.width: (index + 1) === root.currentWorkspace ? 2 : 1
                        border.color: colors.accent

                        Text {
                            anchors.centerIn: parent
                            text: (index + 1).toString()
                            font.pixelSize: 20
                            font.bold: true
                            color: (index + 1) === root.currentWorkspace 
                                ? colors.bg 
                                : colors.fg
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.switchWorkspace(index + 1)
                        }
                    }
                }
            }
        }
    }
}


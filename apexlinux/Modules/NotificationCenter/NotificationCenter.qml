import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core
import qs.Modules.Notifications

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property var notifManager
    required property Colors colors

    color: "transparent"
    visible: isOpen
    implicitWidth: 400
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "notification-center"
    WlrLayershell.exclusiveZone: -1

    anchors {
        right: true
        top: true
        bottom: true
    }

    Rectangle {
        anchors.fill: parent
        color: colors.surface
        border.width: 1
        border.color: colors.border

        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Row {
                width: parent.width
                spacing: 10

                Text {
                    text: "Notifications"
                    font.pixelSize: 20
                    font.bold: true
                    color: colors.fg
                }

                Item { width: 1; height: 1 }

                Text {
                    anchors.right: parent.right
                    text: "Clear All"
                    font.pixelSize: 12
                    color: colors.accent
                    MouseArea {
                        anchors.fill: parent
                        onClicked: notifManager.clearAll()
                    }
                }
            }

            ListView {
                width: parent.width
                height: parent.height - 60
                model: notifManager.notifications
                spacing: 10

                delegate: Rectangle {
                    width: parent.width
                    height: 80
                    radius: 10
                    color: Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.5)
                    border.width: 1
                    border.color: colors.border

                    Column {
                        anchors.fill: parent
                        anchors.margins: 10
                        spacing: 5

                        Text {
                            text: modelData.appName || "Unknown"
                            font.pixelSize: 14
                            font.bold: true
                            color: colors.fg
                        }

                        Text {
                            text: modelData.summary || ""
                            font.pixelSize: 12
                            color: colors.muted
                            wrapMode: Text.WordWrap
                            width: parent.width
                        }
                    }
                }
            }
        }
    }
}


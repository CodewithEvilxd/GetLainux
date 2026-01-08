import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core
import qs.Services

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors

    MprisService {
        id: mprisService
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 350
    implicitHeight: 200
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "media-controls"
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
            spacing: 15
            width: parent.width - 40

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: mprisService.title || "No media playing"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
                elide: Text.ElideRight
                width: parent.width
            }

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: mprisService.artist || ""
                font.pixelSize: 14
                color: colors.muted
                elide: Text.ElideRight
                width: parent.width
            }

            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                spacing: 15

                Rectangle {
                    width: 40
                    height: 40
                    radius: 20
                    color: colors.accent
                    Text {
                        anchors.centerIn: parent
                        text: "⏮"
                        font.pixelSize: 16
                        color: colors.bg
                    }
                    MouseArea {
                        anchors.fill: parent
                        onClicked: mprisService.previous()
                    }
                }

                Rectangle {
                    width: 50
                    height: 50
                    radius: 25
                    color: colors.accent
                    Text {
                        anchors.centerIn: parent
                        text: mprisService.playing ? "⏸" : "▶"
                        font.pixelSize: 20
                        color: colors.bg
                    }
                    MouseArea {
                        anchors.fill: parent
                        onClicked: mprisService.playPause()
                    }
                }

                Rectangle {
                    width: 40
                    height: 40
                    radius: 20
                    color: colors.accent
                    Text {
                        anchors.centerIn: parent
                        text: "⏭"
                        font.pixelSize: 16
                        color: colors.bg
                    }
                    MouseArea {
                        anchors.fill: parent
                        onClicked: mprisService.next()
                    }
                }
            }
        }
    }
}


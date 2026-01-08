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

    NetworkService {
        id: networkService
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 400
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "network-manager"
    WlrLayershell.exclusiveZone: -1

    anchors {
        right: true
        top: true
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
                text: "Network Manager"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)

                Row {
                    anchors.centerIn: parent
                    spacing: 15

                    Text {
                        text: "WiFi:"
                        font.pixelSize: 14
                        color: colors.fg
                    }

                    Text {
                        text: networkService.connected ? "Connected" : "Disconnected"
                        font.pixelSize: 14
                        color: networkService.connected ? colors.accent : colors.muted
                    }
                }
            }

            Text {
                text: "Available Networks"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 300
                model: networkService.networks || []

                delegate: Rectangle {
                    width: parent.width
                    height: 50
                    radius: 8
                    color: Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.5)

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 15
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 10

                        Text {
                            text: modelData.ssid || "Unknown"
                            font.pixelSize: 14
                            color: colors.fg
                        }

                        Text {
                            text: modelData.signal + "%"
                            font.pixelSize: 12
                            color: colors.muted
                        }
                    }
                }
            }
        }
    }
}


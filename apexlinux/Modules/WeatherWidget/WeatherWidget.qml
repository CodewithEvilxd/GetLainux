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

    WeatherService {
        id: weatherService
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 350
    implicitHeight: 250
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "weather-widget"
    WlrLayershell.exclusiveZone: -1

    anchors {
        top: true
        right: true
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
                text: "Weather"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 150
                radius: 10
                color: Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)

                Column {
                    anchors.centerIn: parent
                    spacing: 10

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: weatherService.temperature || "N/A"
                        font.pixelSize: 32
                        font.bold: true
                        color: colors.fg
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: weatherService.condition || "Unknown"
                        font.pixelSize: 16
                        color: colors.muted
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: weatherService.location || "Location not set"
                        font.pixelSize: 12
                        color: colors.muted
                    }
                }
            }
        }
    }
}


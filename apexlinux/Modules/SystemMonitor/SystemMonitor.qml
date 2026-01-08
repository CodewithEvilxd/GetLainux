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

    CpuService {
        id: cpuService
    }

    MemService {
        id: memService
    }

    DiskService {
        id: diskService
    }

    BatteryService {
        id: batteryService
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 400
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "system-monitor"
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
            spacing: 20

            Text {
                text: "System Monitor"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 100
                radius: 10
                color: Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "CPU: " + cpuService.usage.toFixed(1) + "%"
                        font.pixelSize: 16
                        color: colors.fg
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Memory: " + memService.usedPercent.toFixed(1) + "%"
                        font.pixelSize: 16
                        color: colors.fg
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 80
                radius: 10
                color: Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Disk: " + diskService.usedPercent.toFixed(1) + "%"
                        font.pixelSize: 16
                        color: colors.fg
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Battery: " + (batteryService.percent || 0) + "%"
                        font.pixelSize: 16
                        color: colors.fg
                    }
                }
            }
        }
    }
}


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
    property var intrusions: []
    property bool monitoring: false

    Process {
        id: fail2banStatus
        command: ["sudo", "fail2ban-client", "status"]
        running: root.monitoring
        interval: 5000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].includes("Banned IP")) {
                        var parts = lines[i].split(':')
                        if (parts.length > 1) {
                            root.intrusions.push({
                                timestamp: new Date().toLocaleTimeString(),
                                type: "Banned IP",
                                details: parts[1].trim()
                            })
                        }
                    }
                }
            }
        }
    }

    function startMonitoring() {
        root.monitoring = true
        root.intrusions = []
    }

    function stopMonitoring() {
        root.monitoring = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "intrusion-detection"
    WlrLayershell.exclusiveZone: -1

    anchors {
        bottom: true
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
                text: "Intrusion Detection"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 60
                radius: 10
                color: root.monitoring 
                    ? Qt.rgba(0, 1, 0, 0.2)
                    : Qt.rgba(1, 0, 0, 0.2)

                Column {
                    anchors.centerIn: parent
                    spacing: 5

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: root.monitoring ? "MONITORING" : "STOPPED"
                        font.pixelSize: 16
                        font.bold: true
                        color: root.monitoring ? "#44ff44" : "#ff4444"
                    }

                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        text: "Intrusions: " + root.intrusions.length
                        font.pixelSize: 12
                        color: colors.muted
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
                    color: root.monitoring ? "#ff4444" : colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: root.monitoring ? "Stop" : "Start"
                        font.pixelSize: 14
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.monitoring ? root.stopMonitoring() : root.startMonitoring()
                    }
                }
            }

            ListView {
                width: parent.width
                height: 300
                model: root.intrusions

                delegate: Rectangle {
                    width: parent.width
                    height: 60
                    radius: 6
                    color: Qt.rgba(1, 0, 0, 0.1)
                    border.width: 1
                    border.color: "#ff4444"

                    Column {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 5

                        Text {
                            text: modelData.timestamp + " - " + modelData.type
                            font.pixelSize: 12
                            font.bold: true
                            color: "#ff4444"
                        }

                        Text {
                            text: modelData.details
                            font.pixelSize: 11
                            color: colors.fg
                        }
                    }
                }
            }
        }
    }
}


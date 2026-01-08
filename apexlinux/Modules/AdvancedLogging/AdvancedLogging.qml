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
    property var logEvents: []
    property var patterns: ["ERROR", "WARNING", "CRITICAL", "FAILED"]

    Process {
        id: logMonitor
        command: ["tail", "-f", "/var/log/syslog"]
        running: root.isOpen

        stdout: SplitParser {
            onRead: (data) => {
                for (var i = 0; i < root.patterns.length; i++) {
                    if (data.includes(root.patterns[i])) {
                        root.logEvents.push({
                            level: root.patterns[i],
                            message: data.trim(),
                            timestamp: new Date().toISOString()
                        })
                        if (root.logEvents.length > 500) {
                            root.logEvents.shift()
                        }
                    }
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 900
    implicitHeight: 700
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "advanced-logging"
    WlrLayershell.exclusiveZone: -1

    Rectangle {
        anchors.fill: parent
        color: colors.surface
        border.width: 2
        border.color: colors.border
        radius: 20

        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Text {
                text: "Advanced Logging & Forensics"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            ScrollView {
                width: parent.width
                height: parent.height - 80

                ListView {
                    model: root.logEvents
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 70
                        color: modelData.level === "CRITICAL" ? "#ff4444" : 
                               modelData.level === "ERROR" ? "#ff8844" :
                               modelData.level === "WARNING" ? "#ffaa00" : colors.bg
                        border.width: 1
                        border.color: colors.border
                        radius: 5

                        Column {
                            anchors.fill: parent
                            anchors.margins: 8
                            spacing: 3

                            Row {
                                width: parent.width
                                spacing: 10

                                Text {
                                    text: modelData.level
                                    font.pixelSize: 12
                                    font.bold: true
                                    color: "#ffffff"
                                }

                                Text {
                                    text: modelData.timestamp
                                    font.pixelSize: 10
                                    color: "#ffffff"
                                }
                            }

                            Text {
                                text: modelData.message
                                font.pixelSize: 11
                                font.family: "monospace"
                                color: "#ffffff"
                                width: parent.width
                                elide: Text.ElideRight
                            }
                        }
                    }
                }
            }
        }
    }
}


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
    property var detectedThreats: []
    property var suspiciousPatterns: [
        "SELECT.*FROM.*WHERE",
        "<script.*>",
        "eval\\(",
        "exec\\(",
        "system\\(",
        "shell_exec",
        "passthru"
    ]

    Process {
        id: logMonitor
        command: ["tail", "-f", "/var/log/syslog"]
        running: root.isOpen

        stdout: SplitParser {
            onRead: (data) => {
                for (var i = 0; i < root.suspiciousPatterns.length; i++) {
                    var pattern = root.suspiciousPatterns[i]
                    var regex = new RegExp(pattern, "i")
                    if (regex.test(data)) {
                        root.detectedThreats.push({
                            type: "Code Injection",
                            pattern: pattern,
                            log: data.substring(0, 200),
                            timestamp: new Date().toISOString()
                        })
                        if (root.detectedThreats.length > 50) {
                            root.detectedThreats.shift()
                        }
                    }
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "code-injection-detector"
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
                text: "Code Injection Detector"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            ScrollView {
                width: parent.width
                height: parent.height - 100

                ListView {
                    model: root.detectedThreats
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 80
                        color: colors.surface
                        border.width: 1
                        border.color: "#ff4444"
                        radius: 8

                        Column {
                            anchors.fill: parent
                            anchors.margins: 10
                            spacing: 5

                            Text {
                                text: modelData.type + " - " + modelData.pattern
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ff4444"
                            }

                            Text {
                                text: modelData.log
                                font.pixelSize: 12
                                color: colors.muted
                                width: parent.width
                                elide: Text.ElideRight
                            }

                            Text {
                                text: modelData.timestamp
                                font.pixelSize: 10
                                color: colors.muted
                            }
                        }
                    }
                }
            }

            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                spacing: 10

                Rectangle {
                    width: 120
                    height: 40
                    radius: 8
                    color: "#ff4444"

                    Text {
                        anchors.centerIn: parent
                        text: "Clear Logs"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.detectedThreats = []
                    }
                }
            }
        }
    }
}


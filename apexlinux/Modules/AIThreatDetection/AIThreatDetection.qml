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
    property var anomalies: []
    property var baseline: []

    Process {
        id: processMonitor
        command: ["ps", "aux"]
        running: root.isOpen
        interval: 5000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var current = []
                for (var i = 1; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 10) {
                        current.push({
                            name: parts[10],
                            cpu: parseFloat(parts[2]) || 0,
                            mem: parseFloat(parts[3]) || 0
                        })
                    }
                }
                
                if (root.baseline.length === 0) {
                    root.baseline = current
                } else {
                    for (var j = 0; j < current.length; j++) {
                        var proc = current[j]
                        var found = false
                        for (var k = 0; k < root.baseline.length; k++) {
                            if (root.baseline[k].name === proc.name) {
                                found = true
                                if (proc.cpu > root.baseline[k].cpu * 2 || proc.mem > root.baseline[k].mem * 2) {
                                    root.anomalies.push({
                                        process: proc.name,
                                        type: "High Resource Usage",
                                        timestamp: new Date().toISOString()
                                    })
                                }
                                break
                            }
                        }
                        if (!found) {
                            root.anomalies.push({
                                process: proc.name,
                                type: "New Process",
                                timestamp: new Date().toISOString()
                            })
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
    WlrLayershell.namespace: "ai-threat-detection"
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
                text: "AI-Powered Threat Detection"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Anomalies Detected: " + root.anomalies.length
                font.pixelSize: 16
                color: root.anomalies.length > 0 ? "#ff4444" : colors.fg
            }

            ScrollView {
                width: parent.width
                height: parent.height - 120

                ListView {
                    model: root.anomalies
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 70
                        color: colors.bg
                        border.width: 1
                        border.color: "#ff4444"
                        radius: 5

                        Column {
                            anchors.fill: parent
                            anchors.margins: 8
                            spacing: 3

                            Text {
                                text: modelData.type + " - " + modelData.process
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ff4444"
                            }

                            Text {
                                text: modelData.timestamp
                                font.pixelSize: 11
                                color: colors.muted
                            }
                        }
                    }
                }
            }

            Rectangle {
                width: 150
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: "Clear Anomalies"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: root.anomalies = []
                }
            }
        }
    }
}


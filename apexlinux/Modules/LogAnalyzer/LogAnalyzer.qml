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
    property var securityEvents: []
    property string searchQuery: ""

    Process {
        id: logReader
        command: ["sudo", "journalctl", "-n", "100", "--no-pager"]
        running: root.isOpen
        interval: 3000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var events = []
                var keywords = ["failed", "error", "unauthorized", "denied", "attack", "intrusion", "breach"]
                
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i].toLowerCase()
                    for (var j = 0; j < keywords.length; j++) {
                        if (line.includes(keywords[j])) {
                            events.push({
                                timestamp: lines[i].substring(0, 20),
                                message: lines[i].substring(20),
                                severity: keywords[j] === "attack" || keywords[j] === "intrusion" ? "critical" : "warning"
                            })
                            break
                        }
                    }
                }
                root.securityEvents = events
            }
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 800
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "log-analyzer"
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

            Text {
                text: "Log Analyzer"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 30
                radius: 5
                color: colors.bg
                border.width: 1
                border.color: colors.border

                TextInput {
                    anchors.fill: parent
                    anchors.margins: 5
                    text: root.searchQuery
                    font.pixelSize: 12
                    color: colors.fg
                    placeholderText: "Search logs..."
                    onTextChanged: root.searchQuery = text
                }
            }

            Text {
                text: "Security Events: " + root.securityEvents.length
                font.pixelSize: 14
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: parent.height - 150
                model: root.securityEvents.filter(e => 
                    root.searchQuery === "" || e.message.toLowerCase().includes(root.searchQuery.toLowerCase())
                )

                delegate: Rectangle {
                    width: parent.width
                    height: 60
                    radius: 6
                    color: modelData.severity === "critical"
                        ? Qt.rgba(1, 0, 0, 0.2)
                        : Qt.rgba(1, 1, 0, 0.1)
                    border.width: 1
                    border.color: modelData.severity === "critical" ? "#ff4444" : "#ffaa00"

                    Column {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 5

                        Text {
                            text: modelData.timestamp
                            font.pixelSize: 10
                            font.family: "monospace"
                            color: colors.muted
                        }

                        Text {
                            text: modelData.message
                            font.pixelSize: 12
                            color: colors.fg
                            width: parent.width - 20
                            elide: Text.ElideRight
                        }
                    }
                }
            }
        }
    }
}


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
    property var suspiciousProcesses: []
    property bool scanning: false

    function scanForKeyloggers() {
        root.scanning = true
        root.suspiciousProcesses = []
        
        var keywords = ["keylog", "sniff", "capture", "hook", "input"]
        var proc = Quickshell.exec(["ps", "aux"])
        var lines = proc.stdout.split('\n')
        
        for (var i = 1; i < lines.length; i++) {
            var line = lines[i].toLowerCase()
            for (var j = 0; j < keywords.length; j++) {
                if (line.includes(keywords[j])) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 10) {
                        root.suspiciousProcesses.push({
                            pid: parts[1],
                            name: parts[10],
                            command: parts.slice(10).join(' ')
                        })
                    }
                    break
                }
            }
        }
        
        root.scanning = false
    }

    function killProcess(pid) {
        Quickshell.execDetached(["kill", "-9", pid.toString()])
        root.scanForKeyloggers()
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "keylogger-detector"
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
            anchors.fill: parent
            anchors.margins: 20
            spacing: 15

            Text {
                text: "Keylogger Detector"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: root.scanning ? "Scanning..." : "Scan for Keyloggers"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    enabled: !root.scanning
                    onClicked: root.scanForKeyloggers()
                }
            }

            Text {
                text: "Suspicious Processes: " + root.suspiciousProcesses.length
                font.pixelSize: 14
                font.bold: true
                color: root.suspiciousProcesses.length > 0 ? "#ff4444" : colors.fg
            }

            ListView {
                width: parent.width
                height: 350
                model: root.suspiciousProcesses

                delegate: Rectangle {
                    width: parent.width
                    height: 70
                    radius: 6
                    color: Qt.rgba(1, 0, 0, 0.1)
                    border.width: 2
                    border.color: "#ff4444"

                    Column {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 5

                        Text {
                            text: "PID: " + modelData.pid + " - " + modelData.name
                            font.pixelSize: 12
                            font.bold: true
                            color: "#ff4444"
                        }

                        Text {
                            text: modelData.command
                            font.pixelSize: 11
                            color: colors.fg
                            width: parent.width - 100
                            elide: Text.ElideRight
                        }
                    }

                    Rectangle {
                        anchors.right: parent.right
                        anchors.rightMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        width: 60
                        height: 30
                        radius: 5
                        color: "#ff4444"

                        Text {
                            anchors.centerIn: parent
                            text: "Kill"
                            font.pixelSize: 11
                            font.bold: true
                            color: "#ffffff"
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.killProcess(modelData.pid)
                        }
                    }
                }
            }
        }
    }
}


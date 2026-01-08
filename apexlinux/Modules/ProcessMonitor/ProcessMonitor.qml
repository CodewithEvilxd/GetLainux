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
    property var processes: []
    property int selectedPid: -1

    Process {
        id: processList
        command: ["ps", "aux"]
        running: root.isOpen
        interval: 2000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var procList = []
                for (var i = 1; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 10) {
                        procList.push({
                            pid: parts[1],
                            cpu: parseFloat(parts[2]) || 0,
                            mem: parseFloat(parts[3]) || 0,
                            command: parts.slice(10).join(' ')
                        })
                    }
                }
                root.processes = procList
            }
        }
    }

    function killProcess(pid) {
        Quickshell.execDetached(["kill", "-9", pid.toString()])
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 700
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "process-monitor"
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
                text: "Process Monitor"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: parent.height - 100
                model: root.processes

                delegate: Rectangle {
                    width: parent.width
                    height: 50
                    radius: 6
                    color: root.selectedPid === parseInt(modelData.pid)
                        ? Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.2)
                        : "transparent"
                    border.width: root.selectedPid === parseInt(modelData.pid) ? 2 : 0
                    border.color: colors.accent

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15
                        width: parent.width - 100

                        Text {
                            text: "PID: " + modelData.pid
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                            width: 80
                        }

                        Text {
                            text: "CPU: " + modelData.cpu.toFixed(1) + "%"
                            font.pixelSize: 11
                            color: modelData.cpu > 50 ? "#ff4444" : colors.muted
                            width: 80
                        }

                        Text {
                            text: "MEM: " + modelData.mem.toFixed(1) + "%"
                            font.pixelSize: 11
                            color: modelData.mem > 50 ? "#ff4444" : colors.muted
                            width: 80
                        }

                        Text {
                            text: modelData.command
                            font.pixelSize: 11
                            color: colors.fg
                            elide: Text.ElideRight
                            width: parent.width - 240
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

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.selectedPid = parseInt(modelData.pid)
                    }
                }
            }
        }
    }
}


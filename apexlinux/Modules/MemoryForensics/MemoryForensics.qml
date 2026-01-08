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
    property var memoryDumps: []
    property string selectedProcess: ""

    Process {
        id: processList
        command: ["ps", "aux"]
        running: root.isOpen
        interval: 2000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var processes = []
                for (var i = 1; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 10) {
                        processes.push({
                            pid: parts[1],
                            name: parts[10],
                            mem: parts[3]
                        })
                    }
                }
                root.processListData = processes
            }
        }
    }

    property var processListData: []

    function dumpMemory(pid) {
        root.memoryDumps.push({
            pid: pid,
            timestamp: new Date().toISOString(),
            status: "Dumping..."
        })
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "memory-forensics"
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
                text: "Memory Forensics"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Row {
                width: parent.width
                spacing: 10

                ScrollView {
                    width: parent.width / 2 - 5
                    height: 300

                    ListView {
                        model: root.processListData
                        delegate: Rectangle {
                            width: ListView.view.width
                            height: 40
                            color: colors.bg
                            border.width: 1
                            border.color: colors.border
                            radius: 5

                            Row {
                                anchors.fill: parent
                                anchors.margins: 8
                                spacing: 10

                                Text {
                                    text: modelData.pid
                                    font.pixelSize: 12
                                    font.family: "monospace"
                                    color: colors.fg
                                    width: 60
                                }

                                Text {
                                    text: modelData.name
                                    font.pixelSize: 12
                                    color: colors.fg
                                    width: parent.width - 100
                                    elide: Text.ElideRight
                                }

                                Text {
                                    text: modelData.mem + "%"
                                    font.pixelSize: 12
                                    color: colors.muted
                                }
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: root.dumpMemory(modelData.pid)
                            }
                        }
                    }
                }

                ScrollView {
                    width: parent.width / 2 - 5
                    height: 300

                    ListView {
                        model: root.memoryDumps
                        delegate: Rectangle {
                            width: ListView.view.width
                            height: 60
                            color: colors.bg
                            border.width: 1
                            border.color: colors.border
                            radius: 5

                            Column {
                                anchors.fill: parent
                                anchors.margins: 8
                                spacing: 3

                                Text {
                                    text: "PID: " + modelData.pid
                                    font.pixelSize: 12
                                    font.bold: true
                                    color: colors.fg
                                }

                                Text {
                                    text: modelData.timestamp
                                    font.pixelSize: 10
                                    color: colors.muted
                                }

                                Text {
                                    text: "Status: " + modelData.status
                                    font.pixelSize: 11
                                    color: colors.muted
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


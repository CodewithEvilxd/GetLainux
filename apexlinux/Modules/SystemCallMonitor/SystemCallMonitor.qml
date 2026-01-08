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
    property var syscalls: []
    property string selectedProcess: ""

    Process {
        id: straceMonitor
        command: ["strace", "-p", root.selectedProcess, "-c"]
        running: root.isOpen && root.selectedProcess !== ""

        stdout: SplitParser {
            onRead: (data) => {
                root.syscalls.push({
                    data: data,
                    timestamp: new Date().toISOString()
                })
                if (root.syscalls.length > 100) {
                    root.syscalls.shift()
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "system-call-monitor"
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
                text: "System Call Monitor"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Row {
                width: parent.width
                spacing: 10

                Text {
                    text: "PID:"
                    font.pixelSize: 14
                    color: colors.fg
                    anchors.verticalCenter: parent.verticalCenter
                }

                Rectangle {
                    width: 150
                    height: 35
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border
                    radius: 5

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.selectedProcess
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.selectedProcess = text
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 120

                ListView {
                    model: root.syscalls
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
                                text: modelData.timestamp
                                font.pixelSize: 10
                                color: colors.muted
                            }

                            Text {
                                text: modelData.data
                                font.pixelSize: 11
                                font.family: "monospace"
                                color: colors.fg
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


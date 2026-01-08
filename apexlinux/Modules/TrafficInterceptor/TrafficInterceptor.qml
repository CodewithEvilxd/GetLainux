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
    property var interceptedTraffic: []
    property bool intercepting: false

    Process {
        id: trafficLogger
        command: ["tcpdump", "-i", "any", "-A", "-n", "-c", "50"]
        running: root.intercepting

        stdout: SplitParser {
            onRead: (data) => {
                root.interceptedTraffic.push({
                    data: data,
                    timestamp: new Date().toISOString()
                })
                if (root.interceptedTraffic.length > 200) {
                    root.interceptedTraffic.shift()
                }
            }
        }
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 900
    implicitHeight: 700
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "traffic-interceptor"
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

            Row {
                width: parent.width
                spacing: 10

                Text {
                    text: "Traffic Interceptor & Analyzer"
                    font.pixelSize: 24
                    font.bold: true
                    color: colors.fg
                }

                Rectangle {
                    width: 120
                    height: 35
                    radius: 8
                    color: root.intercepting ? "#ff4444" : "#44ff44"

                    Text {
                        anchors.centerIn: parent
                        text: root.intercepting ? "Stop" : "Start"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.intercepting = !root.intercepting
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 100

                ListView {
                    model: root.interceptedTraffic
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 80
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


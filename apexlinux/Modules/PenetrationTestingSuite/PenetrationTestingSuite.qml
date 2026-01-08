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
    property string target: ""
    property var testResults: []

    Process {
        id: portScan
        command: ["nmap", "-p", "1-1000", root.target]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                if (data.includes("open")) {
                    root.testResults.push({
                        type: "Open Port",
                        result: data.trim(),
                        timestamp: new Date().toISOString()
                    })
                }
            }
        }
    }

    function runPortScan() {
        root.testResults = []
        portScan.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "penetration-testing-suite"
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
                text: "Penetration Testing Suite"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Row {
                width: parent.width
                spacing: 10

                Rectangle {
                    width: parent.width - 120
                    height: 35
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border
                    radius: 5

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.target
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.target = text
                    }
                }

                Rectangle {
                    width: 100
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Scan Ports"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.runPortScan()
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 120

                ListView {
                    model: root.testResults
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 60
                        color: colors.bg
                        border.width: 1
                        border.color: "#ffaa00"
                        radius: 5

                        Column {
                            anchors.fill: parent
                            anchors.margins: 8
                            spacing: 3

                            Text {
                                text: modelData.type
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffaa00"
                            }

                            Text {
                                text: modelData.result
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


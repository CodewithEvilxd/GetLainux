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
    property string targetURL: ""
    property var vulnerabilities: []

    Process {
        id: sqlScanner
        command: ["sh", "-c", "curl -s '" + root.targetURL + "?id=1\\' OR \\'1\\'=\\'1'" + "' | grep -i 'error\\|sql\\|database'"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                if (data.trim().length > 0) {
                    root.vulnerabilities.push({
                        type: "SQL Injection",
                        url: root.targetURL,
                        result: data.trim(),
                        timestamp: new Date().toISOString()
                    })
                }
            }
        }
    }

    function testSQLInjection() {
        root.vulnerabilities = []
        sqlScanner.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 800
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "web-app-security-tester"
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
                text: "Web Application Security Tester"
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
                        text: root.targetURL
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.targetURL = text
                    }
                }

                Rectangle {
                    width: 100
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Test SQLi"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.testSQLInjection()
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 120

                ListView {
                    model: root.vulnerabilities
                    delegate: Rectangle {
                        width: ListView.view.width
                        height: 80
                        color: colors.bg
                        border.width: 1
                        border.color: "#ff4444"
                        radius: 5

                        Column {
                            anchors.fill: parent
                            anchors.margins: 8
                            spacing: 3

                            Text {
                                text: modelData.type + " - " + modelData.url
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ff4444"
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


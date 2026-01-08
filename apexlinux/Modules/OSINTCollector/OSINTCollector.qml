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
    property string targetIP: ""
    property string geoLocation: ""

    Process {
        id: geoLookup
        command: ["sh", "-c", "curl -s 'https://ipapi.co/" + root.targetIP + "/json/' | grep -E 'city|region|country|org'"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.geoLocation += data
            }
        }
    }

    function lookupIP() {
        root.geoLocation = ""
        geoLookup.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 700
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "osint-collector"
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
                text: "OSINT Collector"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            Text {
                text: "Target IP Address:"
                font.pixelSize: 14
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
                        text: root.targetIP
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.targetIP = text
                    }
                }

                Rectangle {
                    width: 100
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Lookup"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.lookupIP()
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 150

                Rectangle {
                    width: parent.width
                    height: root.geoLocation.split('\n').length * 20
                    color: colors.bg

                    Text {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.geoLocation || "No data collected"
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        wrapMode: Text.Wrap
                    }
                }
            }
        }
    }
}


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
    property string filePath: ""
    property int passes: 3
    property bool shredding: false

    function shredFile() {
        if (root.filePath) {
            root.shredding = true
            for (var i = 0; i < root.passes; i++) {
                Quickshell.exec(["shred", "-f", "-z", "-u", "-n", root.passes.toString(), root.filePath])
            }
            root.shredding = false
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 500
    implicitHeight: 300
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "secure-file-shredder"
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
                text: "Secure File Shredder"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Column {
                spacing: 5
                width: parent.width

                Text {
                    text: "File Path"
                    font.pixelSize: 12
                    color: colors.muted
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
                        text: root.filePath
                        font.pixelSize: 12
                        color: colors.fg
                        onTextChanged: root.filePath = text
                    }
                }
            }

            Row {
                spacing: 10
                width: parent.width

                Text {
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Overwrite Passes:"
                    font.pixelSize: 12
                    color: colors.fg
                }

                Rectangle {
                    width: 60
                    height: 30
                    radius: 5
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 5
                        text: root.passes.toString()
                        font.pixelSize: 12
                        color: colors.fg
                        validator: IntValidator { bottom: 1; top: 10 }
                        onTextChanged: root.passes = parseInt(text) || 3
                    }
                }
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: "#ff4444"

                Text {
                    anchors.centerIn: parent
                    text: root.shredding ? "Shredding..." : "Shred File"
                    font.pixelSize: 14
                    font.bold: true
                    color: "#ffffff"
                }

                MouseArea {
                    anchors.fill: parent
                    enabled: !root.shredding && root.filePath !== ""
                    onClicked: root.shredFile()
                }
            }
        }
    }
}


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
    property string currentPath: Quickshell.env("HOME")
    property var files: []

    function loadDirectory(path) {
        var dir = Quickshell.dir(path)
        var fileList = []
        try {
            var entries = dir.entries()
            for (var i = 0; i < entries.length; i++) {
                fileList.push({
                    name: entries[i],
                    path: path + "/" + entries[i],
                    isDir: dir.isDir(entries[i])
                })
            }
            root.files = fileList
            root.currentPath = path
        } catch (e) {
            console.log("Error loading directory:", e)
        }
    }

    Component.onCompleted: {
        loadDirectory(currentPath)
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "file-manager"
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
            anchors.margins: 15
            spacing: 10

            Text {
                text: "File Manager"
                font.pixelSize: 18
                font.bold: true
                color: colors.fg
            }

            Text {
                text: root.currentPath
                font.pixelSize: 12
                font.family: "monospace"
                color: colors.muted
                elide: Text.ElideLeft
                width: parent.width
            }

            ListView {
                width: parent.width
                height: parent.height - 80
                model: root.files

                delegate: Rectangle {
                    width: parent.width
                    height: 40
                    radius: 6
                    color: mouseArea.containsMouse 
                        ? Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)
                        : "transparent"

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 10

                        Text {
                            text: modelData.isDir ? "📁" : "📄"
                            font.pixelSize: 16
                        }

                        Text {
                            text: modelData.name
                            font.pixelSize: 14
                            color: colors.fg
                        }
                    }

                    MouseArea {
                        id: mouseArea
                        anchors.fill: parent
                        hoverEnabled: true
                        onClicked: {
                            if (modelData.isDir) {
                                root.loadDirectory(modelData.path)
                            } else {
                                Quickshell.execDetached(["xdg-open", modelData.path])
                            }
                        }
                    }
                }
            }
        }
    }
}


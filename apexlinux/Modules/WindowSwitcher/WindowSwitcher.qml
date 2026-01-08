import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core
import qs.Services

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property var windows: []
    property int currentIndex: 0

    ActiveWindowService {
        id: activeWindowService
    }

    function updateWindows() {
        var proc = Quickshell.exec(["hyprctl", "clients", "-j"])
        var output = proc.stdout
        try {
            var json = JSON.parse(output)
            root.windows = json
        } catch (e) {
            console.log("Failed to parse windows:", e)
        }
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: Screen.width
    implicitHeight: Screen.height
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "window-switcher"
    WlrLayershell.exclusiveZone: -1

    onVisibleChanged: {
        if (visible) {
            updateWindows()
        }
    }

    Rectangle {
        anchors.fill: parent
        color: Qt.rgba(0, 0, 0, 0.7)

        Column {
            anchors.centerIn: parent
            spacing: 20
            width: 600

            Text {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Window Switcher"
                font.pixelSize: 24
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 400
                model: root.windows

                delegate: Rectangle {
                    width: parent.width
                    height: 60
                    color: index === root.currentIndex 
                        ? colors.accent 
                        : Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.8)
                    radius: 8

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 15
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15

                        Text {
                            anchors.verticalCenter: parent.verticalCenter
                            text: modelData.class || "Unknown"
                            font.pixelSize: 16
                            font.bold: true
                            color: index === root.currentIndex ? colors.bg : colors.fg
                        }

                        Text {
                            anchors.verticalCenter: parent.verticalCenter
                            text: modelData.title || ""
                            font.pixelSize: 14
                            color: index === root.currentIndex ? colors.bg : colors.muted
                        }
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            Quickshell.execDetached(["hyprctl", "dispatch", "focuswindow", modelData.address])
                            root.isOpen = false
                        }
                    }
                }
            }
        }
    }
}


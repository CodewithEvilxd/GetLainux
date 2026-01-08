import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

PanelWindow {
    id: root

    property bool isOpen: false
    required property var globalState
    required property Colors colors
    property string display: "0"
    property string expression: ""

    function calculate() {
        try {
            var result = eval(root.expression)
            root.display = result.toString()
            root.expression = result.toString()
        } catch (e) {
            root.display = "Error"
            root.expression = ""
        }
    }

    function append(value) {
        if (root.display === "0" || root.display === "Error") {
            root.display = value
            root.expression = value
        } else {
            root.display += value
            root.expression += value
        }
    }

    function clear() {
        root.display = "0"
        root.expression = ""
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 300
    implicitHeight: 400
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "calculator"
    WlrLayershell.exclusiveZone: -1

    anchors {
        bottom: true
        right: true
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

            Rectangle {
                width: parent.width
                height: 60
                radius: 8
                color: Qt.rgba(colors.accent.r, colors.accent.g, colors.accent.b, 0.1)

                Text {
                    anchors.right: parent.right
                    anchors.rightMargin: 15
                    anchors.verticalCenter: parent.verticalCenter
                    text: root.display
                    font.pixelSize: 24
                    font.family: "monospace"
                    color: colors.fg
                }
            }

            Grid {
                width: parent.width
                columns: 4
                spacing: 10

                Repeater {
                    model: ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=", "="]

                    Rectangle {
                        width: (parent.width - 30) / 4
                        height: 50
                        radius: 8
                        color: modelData === "=" 
                            ? colors.accent 
                            : Qt.rgba(colors.surface.r, colors.surface.g, colors.surface.b, 0.5)

                        Text {
                            anchors.centerIn: parent
                            text: modelData
                            font.pixelSize: 18
                            font.bold: true
                            color: modelData === "=" ? colors.bg : colors.fg
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: {
                                if (modelData === "C") {
                                    root.clear()
                                } else if (modelData === "=") {
                                    root.calculate()
                                } else {
                                    root.append(modelData)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


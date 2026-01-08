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
    property var firewallRules: []
    property string newRule: ""

    Process {
        id: rulesLoader
        command: ["sudo", "iptables", "-L", "-n", "-v", "--line-numbers"]
        running: root.isOpen
        interval: 5000

        stdout: SplitParser {
            onRead: (data) => {
                var lines = data.split('\n')
                var rules = []
                for (var i = 2; i < lines.length; i++) {
                    var parts = lines[i].trim().split(/\s+/)
                    if (parts.length > 3) {
                        rules.push({
                            num: parts[0],
                            target: parts[1],
                            protocol: parts[2] || "all",
                            source: parts[3] || "anywhere",
                            destination: parts.length > 4 ? parts[4] : "anywhere"
                        })
                    }
                }
                root.firewallRules = rules
            }
        }
    }

    function addRule(rule) {
        Quickshell.execDetached(["sudo", "sh", "-c", "iptables " + rule])
        rulesLoader.running = false
        rulesLoader.running = true
    }

    function deleteRule(num) {
        Quickshell.execDetached(["sudo", "iptables", "-D", "INPUT", num])
        rulesLoader.running = false
        rulesLoader.running = true
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 700
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "firewall-manager"
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
                text: "Firewall Manager"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Row {
                spacing: 10
                width: parent.width

                Rectangle {
                    width: parent.width - 100
                    height: 30
                    radius: 5
                    color: colors.bg
                    border.width: 1
                    border.color: colors.border

                    TextInput {
                        anchors.fill: parent
                        anchors.margins: 5
                        text: root.newRule
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        placeholderText: "-A INPUT -p tcp --dport 22 -j ACCEPT"
                        onTextChanged: root.newRule = text
                    }
                }

                Rectangle {
                    width: 80
                    height: 30
                    radius: 5
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Add"
                        font.pixelSize: 12
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.addRule(root.newRule)
                    }
                }
            }

            Text {
                text: "Firewall Rules"
                font.pixelSize: 16
                font.bold: true
                color: colors.fg
            }

            ListView {
                width: parent.width
                height: 400
                model: root.firewallRules

                delegate: Rectangle {
                    width: parent.width
                    height: 50
                    radius: 4
                    color: "transparent"
                    border.width: 1
                    border.color: colors.border

                    Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 15

                        Text {
                            text: "#" + modelData.num
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.muted
                            width: 40
                        }

                        Text {
                            text: modelData.target
                            font.pixelSize: 11
                            color: modelData.target === "ACCEPT" ? "#44ff44" : "#ff4444"
                            width: 80
                        }

                        Text {
                            text: modelData.protocol
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.fg
                            width: 60
                        }

                        Text {
                            text: modelData.source + " -> " + modelData.destination
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.muted
                            elide: Text.ElideRight
                            width: parent.width - 200
                        }
                    }

                    Rectangle {
                        anchors.right: parent.right
                        anchors.rightMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        width: 50
                        height: 25
                        radius: 4
                        color: "#ff4444"

                        Text {
                            anchors.centerIn: parent
                            text: "Del"
                            font.pixelSize: 10
                            color: "#ffffff"
                        }

                        MouseArea {
                            anchors.fill: parent
                            onClicked: root.deleteRule(modelData.num)
                        }
                    }
                }
            }
        }
    }
}


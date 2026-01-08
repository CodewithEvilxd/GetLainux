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
    property var securityChecks: []
    property bool scanning: false

    function runHardeningCheck() {
        root.scanning = true
        root.securityChecks = []
        
        var checks = [
            { name: "Check for unnecessary services", command: ["systemctl", "list-units", "--type=service", "--state=running"] },
            { name: "Check SUID files", command: ["find", "/usr", "-type", "f", "-perm", "-4000"] },
            { name: "Check world-writable files", command: ["find", "/", "-type", "f", "-perm", "-002", "2>/dev/null"] },
            { name: "Check root login", command: ["grep", "PermitRootLogin", "/etc/ssh/sshd_config"] }
        ]

        for (var i = 0; i < checks.length; i++) {
            var proc = Quickshell.exec(checks[i].command)
            root.securityChecks.push({
                name: checks[i].name,
                status: proc.exitCode === 0 ? "Found" : "Not Found",
                result: proc.stdout || "No issues"
            })
        }
        
        root.scanning = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 700
    implicitHeight: 600
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "system-hardening"
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
                text: "System Hardening"
                font.pixelSize: 20
                font.bold: true
                color: colors.fg
            }

            Rectangle {
                width: parent.width
                height: 40
                radius: 8
                color: colors.accent

                Text {
                    anchors.centerIn: parent
                    text: root.scanning ? "Scanning..." : "Run Security Check"
                    font.pixelSize: 14
                    font.bold: true
                    color: colors.bg
                }

                MouseArea {
                    anchors.fill: parent
                    enabled: !root.scanning
                    onClicked: root.runHardeningCheck()
                }
            }

            ListView {
                width: parent.width
                height: parent.height - 100
                model: root.securityChecks

                delegate: Rectangle {
                    width: parent.width
                    height: 80
                    radius: 6
                    color: "transparent"
                    border.width: 1
                    border.color: colors.border

                    Column {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 5

                        Text {
                            text: modelData.name
                            font.pixelSize: 14
                            font.bold: true
                            color: colors.fg
                        }

                        Text {
                            text: "Status: " + modelData.status
                            font.pixelSize: 12
                            color: colors.muted
                        }

                        Text {
                            text: modelData.result.substring(0, 100)
                            font.pixelSize: 11
                            font.family: "monospace"
                            color: colors.muted
                            width: parent.width - 20
                            elide: Text.ElideRight
                        }
                    }
                }
            }
        }
    }
}


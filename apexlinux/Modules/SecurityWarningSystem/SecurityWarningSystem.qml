import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Core

Item {
    id: root

    required property Colors colors

    function showWebsiteWarning(url, reason) {
        warningWindow.show(url, reason, "website")
    }

    function showMalwareWarning(file, type) {
        warningWindow.show(file, "Malware detected: " + type, "malware")
    }

    function showVPNWarning(message) {
        warningWindow.show("VPN", message, "vpn")
    }

    function showThreatWarning(url, threatLevel) {
        warningWindow.show(url, "Threat Level: " + threatLevel, "threat")
    }

    PanelWindow {
        id: warningWindow

        property string warningTitle: ""
        property string warningMessage: ""
        property string warningType: ""

        function show(title, message, type) {
            warningWindow.warningTitle = title
            warningWindow.warningMessage = message
            warningWindow.warningType = type
            warningWindow.visible = true
            
            // Auto-hide after 10 seconds
            autoHideTimer.restart()
        }

        color: "transparent"
        visible: false
        implicitWidth: Screen.width
        implicitHeight: Screen.height
        WlrLayershell.layer: WlrLayer.Overlay
        WlrLayershell.namespace: "security-warning-system"
        WlrLayershell.exclusiveZone: -1

        Timer {
            id: autoHideTimer
            interval: 10000
            onTriggered: warningWindow.visible = false
        }

        Rectangle {
            anchors.fill: parent
            color: Qt.rgba(0, 0, 0, 0.7)

            Rectangle {
                anchors.centerIn: parent
                width: 550
                height: 350
                radius: 20
                color: colors.surface
                border.width: 4
                border.color: warningWindow.warningType === "malware" 
                    ? "#ff0000"
                    : warningWindow.warningType === "threat"
                    ? "#ff4444"
                    : "#ffaa00"

                Column {
                    anchors.fill: parent
                    anchors.margins: 30
                    spacing: 20

                    Row {
                        width: parent.width
                        spacing: 15

                        Text {
                            text: "!"
                            font.pixelSize: 32
                            font.bold: true
                            color: warningWindow.warningType === "malware" 
                                ? "#ff0000"
                                : warningWindow.warningType === "threat"
                                ? "#ff4444"
                                : "#ffaa00"
                        }

                        Text {
                            text: warningWindow.warningType === "malware" ? "MALWARE DETECTED"
                                : warningWindow.warningType === "threat" ? "SECURITY THREAT"
                                : "SECURITY WARNING"
                            font.pixelSize: 22
                            font.bold: true
                            color: warningWindow.warningType === "malware" 
                                ? "#ff0000"
                                : warningWindow.warningType === "threat"
                                ? "#ff4444"
                                : "#ffaa00"
                        }
                    }

                    Text {
                        text: warningWindow.warningMessage
                        font.pixelSize: 14
                        color: colors.fg
                        width: parent.width
                        wrapMode: Text.WordWrap
                    }

                    Text {
                        text: warningWindow.warningTitle
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.muted
                        width: parent.width
                        elide: Text.ElideMiddle
                    }

                    Row {
                        anchors.horizontalCenter: parent.horizontalCenter
                        spacing: 15

                        Rectangle {
                            width: 140
                            height: 45
                            radius: 8
                            color: "#ff4444"

                            Text {
                                anchors.centerIn: parent
                                text: "BLOCK"
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffffff"
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: warningWindow.visible = false
                            }
                        }

                        Rectangle {
                            width: 140
                            height: 45
                            radius: 8
                            color: "#44ff44"

                            Text {
                                anchors.centerIn: parent
                                text: "ALLOW"
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffffff"
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: warningWindow.visible = false
                            }
                        }

                        Rectangle {
                            width: 140
                            height: 45
                            radius: 8
                            color: "#0088ff"

                            Text {
                                anchors.centerIn: parent
                                text: "USE VPN"
                                font.pixelSize: 14
                                font.bold: true
                                color: "#ffffff"
                            }

                            MouseArea {
                                anchors.fill: parent
                                onClicked: {
                                    // Auto connect VPN
                                    warningWindow.visible = false
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


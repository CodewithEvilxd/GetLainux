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
    property string query: ""
    property var threatResults: []
    property bool checking: false

    function checkThreat() {
        if (root.query === "") return
        
        root.checking = true
        root.threatResults = []
        
        var proc = Quickshell.exec(["curl", "-s", "https://api.abuseipdb.com/api/v2/check", 
            "--data-urlencode", "ipAddress=" + root.query,
            "-H", "Key: YOUR_API_KEY",
            "-H", "Accept: application/json"])
        
        try {
            var json = JSON.parse(proc.stdout)
            if (json.data) {
                root.threatResults.push({
                    ip: root.query,
                    abuseConfidence: json.data.abuseConfidencePercentage || 0,
                    isPublic: json.data.isPublic || false,
                    isWhitelisted: json.data.isWhitelisted || false,
                    usageType: json.data.usageType || "unknown"
                })
            }
        } catch (e) {
            root.threatResults.push({
                ip: root.query,
                status: "Error checking threat intelligence"
            })
        }
        
        root.checking = false
    }

    color: "transparent"
    visible: isOpen
    implicitWidth: 600
    implicitHeight: 400
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "threat-intelligence"
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
                text: "Threat Intelligence"
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
                        text: root.query
                        font.pixelSize: 12
                        color: colors.fg
                        placeholderText: "Enter IP address or domain"
                        onTextChanged: root.query = text
                    }
                }

                Rectangle {
                    width: 80
                    height: 30
                    radius: 5
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Check"
                        font.pixelSize: 12
                        font.bold: true
                        color: colors.bg
                    }

                    MouseArea {
                        anchors.fill: parent
                        enabled: !root.checking
                        onClicked: root.checkThreat()
                    }
                }
            }

            ListView {
                width: parent.width
                height: 250
                model: root.threatResults

                delegate: Rectangle {
                    width: parent.width
                    height: 80
                    radius: 6
                    color: modelData.abuseConfidence > 50
                        ? Qt.rgba(1, 0, 0, 0.2)
                        : Qt.rgba(0, 1, 0, 0.2)
                    border.width: 1
                    border.color: modelData.abuseConfidence > 50 ? "#ff4444" : "#44ff44"

                    Column {
                        anchors.left: parent.left
                        anchors.leftMargin: 10
                        anchors.verticalCenter: parent.verticalCenter
                        spacing: 5

                        Text {
                            text: "IP: " + modelData.ip
                            font.pixelSize: 12
                            font.bold: true
                            color: colors.fg
                        }

                        Text {
                            text: "Abuse Confidence: " + (modelData.abuseConfidence || 0) + "%"
                            font.pixelSize: 11
                            color: modelData.abuseConfidence > 50 ? "#ff4444" : colors.muted
                        }

                        Text {
                            text: "Usage: " + (modelData.usageType || "unknown")
                            font.pixelSize: 11
                            color: colors.muted
                        }
                    }
                }
            }
        }
    }
}


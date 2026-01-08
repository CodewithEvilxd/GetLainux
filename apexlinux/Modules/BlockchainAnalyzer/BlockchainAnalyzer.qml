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
    property string walletAddress: ""
    property string transactionInfo: ""

    Process {
        id: addressValidator
        command: ["sh", "-c", "curl -s 'https://blockchain.info/rawaddr/" + root.walletAddress + "' | head -20"]
        running: false

        stdout: SplitParser {
            onRead: (data) => {
                root.transactionInfo += data
            }
        }
    }

    function analyzeAddress() {
        root.transactionInfo = ""
        addressValidator.running = true
    }

    color: "transparent"
    visible: root.isOpen
    implicitWidth: 700
    implicitHeight: 500
    WlrLayershell.layer: WlrLayer.Overlay
    WlrLayershell.namespace: "blockchain-analyzer"
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
                text: "Blockchain Analyzer"
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
                        text: root.walletAddress
                        font.pixelSize: 12
                        font.family: "monospace"
                        color: colors.fg
                        onTextChanged: root.walletAddress = text
                    }
                }

                Rectangle {
                    width: 100
                    height: 35
                    radius: 8
                    color: colors.accent

                    Text {
                        anchors.centerIn: parent
                        text: "Analyze"
                        font.pixelSize: 14
                        font.bold: true
                        color: "#ffffff"
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.analyzeAddress()
                    }
                }
            }

            ScrollView {
                width: parent.width
                height: parent.height - 120

                Rectangle {
                    width: parent.width
                    height: root.transactionInfo.split('\n').length * 20
                    color: colors.bg

                    Text {
                        anchors.fill: parent
                        anchors.margins: 8
                        text: root.transactionInfo || "No data retrieved"
                        font.pixelSize: 11
                        font.family: "monospace"
                        color: colors.fg
                        wrapMode: Text.Wrap
                    }
                }
            }
        }
    }
}


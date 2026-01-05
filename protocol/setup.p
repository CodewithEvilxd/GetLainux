// Protocol Language

import "sys/virtual"
import "ui"

layer_01 {
    print("Initializing Protocol on GetLainux...")

    let target_vm = "qemu-x86_64"

    // Работа с железом через встроенные функции
    if (sys.memory < 2048) {
        ui.warn("Low memory detected for Wired bridge")
    }

    // Блок установки
    nexus build_machine {
        iso: "https://github.com/CodewithEvilxd/GetLainux/releases/download/getlainuxiso/getlainuxiso-2025.01.15-x86_64.iso",
        disk: 20GB,
        virt: target_vm
    }

    print("Connection established.")
}

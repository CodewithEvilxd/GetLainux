# Working with GetLainux Installer (Beta v0.1)

At the current stage of development, version *0.1 (Beta)* is presented. This iteration is an early prototype of the installer and is intended for familiarization and testing of the main functionality.

> *Note:* Due to the beta version status, unstable operation and bugs may occur. It is recommended to use isolated environments for testing.

---

## Quick Start

All necessary executable files are located in the `bin` directory. The main component is the binary file `installer.lain`.

### Launch Instructions:

To start the installation process, sequentially execute the following commands in the terminal:

1. *Grant execution permissions:*

```bash
   chmod +x ./bin/installer.lain
```

2. **Launch the installer:**
 ```bash
   ./bin/installer.lain
```

---

## Working in Virtualization Mode (Recommended)

At this stage of development, it is *strongly recommended* to perform installation inside a virtual machine. The GetLainux installer has built-in automation logic for working with virtual environments.

### Installer Work Algorithm:
1. *Environment Detection:* The system automatically determines your host parameters.
2. *Hypervisor Deployment:* The installer independently configures the QEMU environment.
3. *Resource Preparation:* In automatic mode, configuration files (cfg) are generated and the current ISO image is downloaded remotely.
4. *System Build:* Automatic initialization and launch of a virtual machine with pre-configured parameters.

---

## Contributing

We sincerely need your support and promotion of the distribution. Community activity is the fundamental motivation for creating a quality, free and open-source product. If you find a bug or have suggestions for improvement - create an Issue or share information about the project.

For more information, visit: https://github.com/CodewithEvilxd/GetLainux

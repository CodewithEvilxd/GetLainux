# GetLainux Ecosystem

![GetLainux Logo](https://raw.githubusercontent.com/codewithevilxd/ApexLinux/main/assets/logo.png)

**GetLainux Ecosystem** is a collection of open-source projects for system-level development, low-level programming, and Linux distribution development. Developed by **codewithevilxd**, these projects are dedicated to pushing the boundaries of system performance, absolute control, and uncompromising security for expert users, system developers, and low-level programming enthusiasts.

## 🎯 Projects Overview

This repository contains three main projects:

### 1. **ApexLinux Shell** 

**What is ApexLinux?**

ApexLinux is a QML-based shell configuration for Quickshell. It provides a minimal, customizable desktop environment with panels, launchers, and system controls. Built entirely in QML, you can modify every aspect of the shell by editing QML files. No complex configuration languages—just QML.

**Key Features:**
- QML-based modern UI with full customization
- 50+ advanced modules including:
  - 30+ security modules (Port Scanner, Firewall Manager, Intrusion Detection, etc.)
  - 20+ developer/hacker tools (Code Injection Detector, Reverse Engineering, Memory Forensics, etc.)
- Auto VPN connector for dangerous websites
- Website security scanner with real-time threat detection
- Malware detector and removal system
- Real-time security warnings and popups
- Advanced developer tools (Binary exploitation, Penetration testing, OSINT, etc.)
- Modular architecture for easy extension
- IPC commands for automation and scripting
- Minimal resource usage
- Beautiful, modern design

**Quick Installation:**
```bash
git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
cp -r /tmp/apexlinux-temp/apexlinux/* ~/.config/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp
qs -c evilxd -f apexlinux.qml
```

**📖 [See Full Documentation →](apexlinux/README.md)** | **[Website Documentation](https://your-website.com/apexlinux)**

---

### 2. **GetLainux**
A highly specialized, command-line-centric Linux distribution meticulously engineered from the robust foundation of Arch Linux. Custom installer, optimized kernel, zero bloat.

**Key Features:**
- Arch Linux based
- Custom C-based installer with TUI
- Custom kernel optimization
- Minimal & fast
- Full system control
- C utilities suite (apexlinux-coreutils)
- Works on Arch, Ubuntu, Debian, Kali, Fedora

**Installation:**
```bash
# Clone the repository
git clone https://github.com/codewithevilxd/ApexLinux.git
cd ApexLinux

# Make build script executable
chmod +x build.sh

# Build the installer
./build.sh
# Type 'y' when prompted

# Run the installer (requires root)
sudo ./bin/installer.lain
```

**Documentation:** [QUICK_START.md](QUICK_START.md) | [USAGE_GUIDE.md](USAGE_GUIDE.md) | [Website](https://your-website.com/getlainux)

---

### 3. **Nexus Engine**
High-performance system execution engine with Protocol language. Bridge between kernel and system automation. Low-level control with high-level abstraction.

**Key Features:**
- Protocol language for system automation
- C and Assembly for performance
- Direct kernel interaction
- System execution engine
- Automation bridge

**Documentation:** [Website](https://your-website.com/nexus)

---

## 🚀 Quick Start

### Prerequisites

Before building, install required dependencies:

**Arch Linux:**
```bash
sudo pacman -S gcc ncurses curl openssl arch-install-scripts
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev
```

**Kali Linux:**
```bash
sudo apt-get update
sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev
```

**Fedora:**
```bash
sudo dnf install gcc ncurses-devel curl-devel openssl-devel
```

### Download & Setup

#### Option 1: Clone Repository (Recommended)
```bash
# Clone the repository
git clone https://github.com/codewithevilxd/ApexLinux.git
cd ApexLinux
```

#### Option 2: Download ZIP
1. Visit: https://github.com/codewithevilxd/ApexLinux
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder

### Troubleshooting

**Build fails?**
- Make sure all dependencies are installed (see Prerequisites above)
- Check that you have `gcc`, `make`, and development libraries
- Verify internet connection for downloading packages

**Permission denied?**
- Use `sudo` when running the installer: `sudo ./bin/installer.lain`
- Make sure build script is executable: `chmod +x build.sh`

**No disks found?**
- Run installer with `sudo`: `sudo ./bin/installer.lain`
- Check available disks: `lsblk`
- Make sure you have proper permissions

For detailed instructions, see [QUICK_START.md](QUICK_START.md) or [USAGE_GUIDE.md](USAGE_GUIDE.md)

---

## 📋 Project Philosophy

Our core philosophy emphasizes:
*   **Extreme Performance:** Achieved through highly optimized custom components and a strictly curated set of active services.
*   **Determinism:** Providing unparalleled control over system behavior and resource allocation.
*   **Security by Design:** A minimal attack surface due to a lean software footprint and transparent system processes.
*   **Extensibility:** An inherently modular architecture designed for flexible expansion without introducing bloat.

---

## 🎯 Target Audience & Applications

These projects are designed for professionals and advanced users in fields such as:
*   **Embedded Systems Development & IoT:** Lightweight and controllable platforms for specialized firmware and operating system development.
*   **System Analysis & Reverse Engineering:** Pristine environments for exploit development, malware analysis, and security research.
*   **High-Performance Computing (HPC):** Ideal for benchmarks and workloads demanding maximum hardware utilization.
*   **Academic & Research Projects:** Invaluable tools for in-depth study of Linux internals and operating system design.

---

## 🛠️ Technological Stack

*   **C/C++:** Primary language for system components, utilities, and kernel interactions.
*   **QML/Quickshell:** For modern, customizable shell interfaces.
*   **NASM / GNU Assembler:** For micro-optimizations, bootloader analysis, and direct hardware interfacing.
*   **Bash Scripting:** Essential for automation, system initialization, and package management.
*   **Arch Linux Base:** Provides the flexible and current ecosystem foundation.
*   **Protocol Language:** For system automation and execution engine.

---

## 📊 Project Status & Roadmap

All projects are actively under development. Current development phases being driven by **codewithevilxd** include:

**ApexLinux Shell:**
*   Advanced security features implementation
*   Real-time threat monitoring
*   Auto VPN integration
*   Website security scanning

**GetLainux Distribution:**
*   Refinement of core kernel build configurations and patch integration.
*   **apexlinux-coreutils:** Complete C utilities suite implemented (ls, cat, grep, cp, mv, rm, mkdir, chmod, chown, and 30+ more utilities). Fully functional and ready for use.
*   Establishing a stable, minimal command-line environment blueprint.
*   Development of a robust ISO generation pipeline for testable releases.

**Nexus Engine:**
*   Protocol language development
*   System automation features
*   Kernel bridge implementation

Progress updates, commit history, and branch specifics are openly available within this repository.

---

## 🤝 Contribution

We welcome contributions from the global open-source community. If you are interested in collaboration, testing, or feature development, please consult our [CONTRIBUTING.md](CONTRIBUTING.md) guide for engagement guidelines.

---

## 📄 License

All projects in the GetLainux ecosystem are distributed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). See the `LICENSE` files in each project directory for more details.

---

## 👤 About the Author

**codewithevilxd** is a dedicated system programmer with a profound interest in operating system internals, low-level programming, and hardware-software interaction. The GetLainux ecosystem represents a personal and professional endeavor to craft tools and distributions that embody precision, efficiency, and full transparency from the ground up.

---

## 🔗 Links

- **GitHub:** https://github.com/codewithevilxd/ApexLinux
- **Website:** https://your-website.com
- **Issues:** https://github.com/codewithevilxd/ApexLinux/issues
- **Documentation:** See individual project README files

---

**Note:** This repository contains multiple projects. Each project has its own documentation and installation instructions. Please refer to the specific project's README or documentation for detailed information.

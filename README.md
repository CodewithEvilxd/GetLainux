# GetLainux

![GetLainux Logo](https://raw.githubusercontent.com/CodewithEvilxd/GetLainux/main/assets/logo.png)

**GetLainux** is a highly specialized, command-line-centric Linux distribution meticulously engineered from the robust foundation of Arch Linux. Developed by **Nishant Gaurav**, this project is dedicated to pushing the boundaries of system performance, absolute control, and uncompromising security for expert users, system developers, and low-level programming enthusiasts.

## Project Overview

GetLainux aims to deliver an unburdened, efficient, and transparent operating environment by drastically minimizing system overhead and abstracting away unnecessary components. The development methodology is rooted in a deep understanding of underlying system architecture, leveraging **C** for critical utility development and **NASM (x86 Assembler)** for precise, performance-sensitive code where applicable.

## Key Features & Differentiators

*   **Arch Linux Core:** Benefits from the rolling release model, offering the latest software packages and a straightforward, well-documented base.
*   **Custom-Built Linux Kernel:** Tailored specifically for GetLainux, compiled with performance and security in mind. This includes fine-tuning kernel parameters, stripping unnecessary modules, and evaluating real-time (RT) or enhanced security patches where applicable.
*   **Custom C-based Installer:** Full-featured installer with ncurses-based TUI for seamless installation experience.
*   **Minimalist Design:** Zero bloat, maximum performance with minimal resource usage.
*   **Custom Utilities Suite:** Complete C utilities suite (getlainux-coreutils) with essential system tools.
*   **Cross-Distribution Support:** Works on Arch, Ubuntu, Debian, Kali, Fedora.
*   **Full System Control:** Complete control over system behavior and resource allocation.

## Installation

```bash
# Clone the repository
git clone https://github.com/CodewithEvilxd/GetLainux.git
cd GetLainux

# Make build script executable
chmod +x build.sh

# Build the installer
./build.sh
# Type 'y' when prompted

# Run the installer (requires root)
sudo ./bin/installer.lain
```

**Documentation:** [QUICK_START.md](QUICK_START.md) | [USAGE_GUIDE.md](USAGE_GUIDE.md)

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
git clone https://github.com/CodewithEvilxd/GetLainux.git
cd GetLainux
```

#### Option 2: Download ZIP
1. Visit: https://github.com/CodewithEvilxd/GetLainux
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

GetLainux is designed for professionals and advanced users in fields such as:
*   **Embedded Systems Development & IoT:** Lightweight and controllable platforms for specialized firmware and operating system development.
*   **System Analysis & Reverse Engineering:** Pristine environments for exploit development, malware analysis, and security research.
*   **High-Performance Computing (HPC):** Ideal for benchmarks and workloads demanding maximum hardware utilization.
*   **Academic & Research Projects:** Invaluable tools for in-depth study of Linux internals and operating system design.

---

## 🛠️ Technological Stack

*   **C/C++:** Primary language for system components, utilities, and kernel interactions.
*   **NASM / GNU Assembler:** For micro-optimizations, bootloader analysis, and direct hardware interfacing.
*   **Bash Scripting:** Essential for automation, system initialization, and package management.
*   **Arch Linux Base:** Provides the flexible and current ecosystem foundation.
*   **Go:** Alternative installer implementation with modern TUI.

---

## 📊 Project Status & Roadmap

GetLainux is actively under development. Current development phases being driven by **Nishant Gaurav** include:

*   Refinement of core kernel build configurations and patch integration.
*   **getlainux-coreutils:** Complete C utilities suite implemented (ls, cat, grep, cp, mv, rm, mkdir, chmod, chown, and 30+ more utilities). Fully functional and ready for use.
*   Establishing a stable, minimal command-line environment blueprint.
*   Development of a robust ISO generation pipeline for testable releases.

Progress updates, commit history, and branch specifics are openly available within this repository.

---

## 📝 Note on Related Projects

**ApexLinux** and **Nexus Engine** are separate projects and are not part of this repository. This repository focuses solely on the GetLainux Linux distribution.

---

## 🤝 Contribution

We welcome contributions from the global open-source community. If you are interested in collaboration, testing, or feature development, please consult our [CONTRIBUTING.md](CONTRIBUTING.md) guide for engagement guidelines.

---

## 👤 About the Author

**Nishant Gaurav** is a dedicated system programmer with a profound interest in operating system internals, low-level programming, and hardware-software interaction. GetLainux represents a personal and professional endeavor to craft a Linux distribution that embodies precision, efficiency, and full transparency from the ground up.

---

## 🔗 Links

- **GitHub:** https://github.com/CodewithEvilxd/GetLainux
- **Issues:** https://github.com/CodewithEvilxd/GetLainux/issues
- **Documentation:** See [QUICK_START.md](QUICK_START.md) and [USAGE_GUIDE.md](USAGE_GUIDE.md)

---

## 📄 License

GetLainux is distributed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). See the `LICENSE` file for more details.

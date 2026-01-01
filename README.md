# GetLainux
![GetLainux Logo](https://raw.githubusercontent.com/codewithevilxd/GetLainux/main/assets/logo.png) 

**GetLainux** is a highly specialized, command-line-centric Linux distribution meticulously engineered from the robust foundation of Arch Linux. Developed by **Nishant Gaurav**, this project is dedicated to pushing the boundaries of system performance, absolute control, and uncompromising security for expert users, system developers, and low-level programming enthusiasts.

## 🚀 Quick Start

### Download & Setup

#### Option 1: Clone Repository (Recommended)
```bash
# Clone the repository
git clone https://github.com/codewithevilxd/GetLainux.git
cd GetLainux

# Make build script executable
chmod +x build.sh

# Build the installer
./build.sh
# Type 'y' when prompted

# Run the installer (requires root)
sudo ./bin/installer.lain
```

#### Option 2: Download ZIP
1. Visit: https://github.com/codewithevilxd/GetLainux
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder
5. Follow the build steps above

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

**Fedora:**
```bash
sudo dnf install gcc ncurses-devel curl-devel openssl-devel
```

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

## Project Overview
GetLainux aims to deliver an unburdened, efficient, and transparent operating environment by drastically minimizing system overhead and abstracting away unnecessary components. The development methodology is rooted in a deep understanding of underlying system architecture, leveraging **C** for critical utility development and **NASM (x86 Assembler)** for precise, performance-sensitive code where applicable.

Our core philosophy emphasizes:
*   **Extreme Performance:** Achieved through a highly optimized custom kernel and a strictly curated set of active services.
*   **Determinism:** Providing unparalleled control over system behavior and resource allocation.
*   **Security by Design:** A minimal attack surface due to a lean software footprint and transparent system processes.
*   **Extensibility:** An inherently modular architecture designed for flexible expansion without introducing bloat.

## Key Features & Differentiators
*   **Arch Linux Core:** Benefits from the rolling release model, offering the latest software packages and a straightforward, well-documented base.
*   **Custom-Built Linux Kernel:** Tailored specifically for GetLainux, compiled with performance and security in mind. This includes fine-tuning kernel parameters, stripping unnecessary modules, and evaluating real-time (RT) or enhanced security patches where applicable.
*   **Minimalist Init System:** Utilizes *[e.g., systemd with a heavily trimmed set of units, or a fast alternative like Runit/OpenRC if adopted]* for rapid boot times and negligible resource consumption.
*   **Bare-Bones Graphical Environment (Optional):** Designed to integrate seamlessly with highly efficient tiling window managers (*e.g., i3wm, dwm, bspwm*) or to operate purely in a command-line interface.
*   **Proprietary C Library/Utilities:** Development of custom, performance-critical system utilities and an API in C, providing direct and efficient interaction with hardware and OS resources.
*   **Robust Bash Automation:** Comprehensive scripting for streamlined system provisioning, configuration management, and post-installation setup.
*   **Targeted Optimization:** Leveraging low-level insights from Assembler to identify and optimize bottlenecks within critical system paths.

## Target Audience & Applications
GetLainux is designed for professionals and advanced users in fields such as:
*   **Embedded Systems Development & IoT:** A lightweight and controllable platform for specialized firmware and operating system development.
*   **System Analysis & Reverse Engineering:** Provides a pristine environment for exploit development, malware analysis, and security research.
*   **High-Performance Computing (HPC):** Ideal for benchmarks and workloads demanding maximum hardware utilization.
*   **Academic & Research Projects:** An invaluable tool for in-depth study of Linux internals and operating system design.

## Project Status & Roadmap
GetLainux is actively under development. Current development phases being driven by **Nishant Gaurav** include:
*   Refinement of core kernel build configurations and patch integration.
*   Implementation of the `getlainux-coreutils` (a custom suite of essential system tools in C).
*   Estab
lishing a stable, minimal command-line environment blueprint.
*   Development of a robust ISO generation pipeline for testable releases.

Progress updates, commit history, and branch specifics are openly available within this repository.

## Technological Stack
*   **C/C++:** Primary language for system components, utilities, and kernel interactions.
*   **NASM / GNU Assembler:** For micro-optimizations, bootloader analysis, and direct hardware interfacing.
*   **Bash Scripting:** Essential for automation, system initialization, and package management.
*   **Arch Linux Base:** Provides the flexible and current ecosystem foundation.

## Contribution
We welcome contributions from the global open-source community. If you are interested in collaboration, testing, or feature development, please consult our [CONTRIBUTING.md](CONTRIBUTING.md) guide for engagement guidelines.

## License
GetLainux is distributed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). See the `LICENSE` file for more details.

---

### About the Author
**Nishant Gaurav** is a dedicated system programmer with a profound interest in operating system internals, low-level programming, and hardware-software interaction. GetLainux represents a personal and professional endeavor to craft a Linux distribution that embodies precision, efficiency, and full transparency from the ground up.

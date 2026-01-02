# GetLainux - Complete Usage Guide

This guide provides step-by-step instructions on how to use the GetLainux project.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Building the Project](#building-the-project)
4. [Running the Installer](#running-the-installer)
5. [Installation Modes](#installation-modes)
6. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

### Minimum Requirements:
- **OS**: Linux (Arch Linux, Ubuntu, Fedora, etc.)
- **RAM**: Minimum 1GB (4GB recommended)
- **CPU**: Dual-core or better
- **Disk Space**: 
  - For building: 2GB free space in `/tmp`
  - For installation: 20GB+ free space
- **Internet**: Required for downloading packages

### Required Dependencies:

#### For C Installer:
```bash
# Arch Linux
sudo pacman -S gcc ncurses curl openssl arch-install-scripts

# Ubuntu/Debian
sudo apt-get install build-essential libncurses5-dev libncursesw5-dev libcurl4-openssl-dev libssl-dev

# Kali Linux
sudo apt-get update
sudo apt-get install build-essential libncurses5-dev libncursesw5-dev libcurl4-openssl-dev libssl-dev

# Fedora
sudo dnf install gcc ncurses-devel curl-devel openssl-devel
```

#### For Go Installer:
```bash
# Install Go 1.21 or later
# Arch Linux
sudo pacman -S go

# Ubuntu/Debian
sudo apt-get install golang-go

# Fedora
sudo dnf install golang
```

#### For Arch Linux Installation Tools:
```bash
# Arch Linux
sudo pacman -S arch-install-scripts dosfstools e2fsprogs gptfdisk grub efibootmgr

# Ubuntu/Debian (if installing on Arch from Ubuntu)
sudo apt-get install arch-install-scripts dosfstools e2fsprogs gdisk grub-efi-amd64
```

---

## 🚀 Installation Methods

This project has **2 types of installers**:

### 1. **C-based Installer** (Main - Recommended)
- Location: `src/installer/`
- Binary: `bin/installer.lain`
- Features: Full-featured, ncurses-based TUI

### 2. **Go-based Installer** (Alternative)
- Location: `go/` directory
- Features: Modern TUI with bubbletea

---

## 🔨 Building the Project

### Method 1: Using Build Script (Recommended)

#### Step 1: Make build script executable
```bash
chmod +x build.sh
```

#### Step 2: Run build script
```bash
./build.sh
```

Script automatically:
- Checks all source files
- Compiles C installer
- Creates binary: `bin/installer.lain`
- Asks for confirmation before building

#### Step 3: Verify build
```bash
ls -lh bin/installer.lain
```

### Method 2: Manual Build (C Installer)

```bash
# Navigate to project root
cd /path/to/GetLainux

# Compile manually
gcc \
    src/installer/installer.c \
    src/utils/network_connection/network_sniffer.c \
    src/utils/network_connection/network_state.c \
    src/installer/ui/logo.c \
    src/installer/vm/vm.c \
    src/installer/system_utils/log_message.c \
    src/installer/system_utils/run_command.c \
    src/installer/disk_utils/disk_info.c \
    src/installer/locale/lang.c \
    src/installer/locale/ru.c \
    src/installer/locale/en.c \
    src/installer/settings/settings.c \
    -o bin/installer.lain \
    -lncurses \
    -lcurl \
    -lcrypto \
    -Wextra \
    -O2 \
    -std=c11 \
    -D_DEFAULT_SOURCE
```

### Method 3: Build Go Installer

```bash
# Navigate to go directory
cd go

# Download dependencies
go mod download

# Build
go build -o ../bin/getlainux-installer-go main.go

# Or build from root
cd ..
go build -o bin/getlainux-installer-go ./main.go
```

---

## ▶️ Running the Installer

### Option 1: C Installer (Main)

#### Step 1: Make executable
```bash
chmod +x bin/installer.lain
```

#### Step 2: Run (requires root/sudo)
```bash
# Important: Run as root or with sudo
sudo ./bin/installer.lain
```

**⚠️ WARNING**: Installer needs root access to:
- Partition disks
- Mount filesystems
- Install system packages
- Configure bootloader

### Option 2: Go Installer

```bash
# Make executable
chmod +x bin/getlainux-installer-go

# Run
sudo ./bin/getlainux-installer-go
```

---

## 🎯 Installation Modes

### 1. **Install on Hardware** (Real Machine)

**⚠️ DANGER**: This will **ERASE ALL DATA** on selected disk!

#### Steps:
1. Boot from GetLainux ISO or run from live USB
2. Start installer: `sudo ./bin/installer.lain`
3. Select "Install on Hardware"
4. Choose target disk (carefully!)
5. Confirm installation (type "YES" or "TURBO")
6. Wait for installation to complete
7. Reboot system

#### What it does:
- Partitions the disk (GPT/UEFI or MBR/BIOS)
- Formats partitions (FAT32 for EFI, ext4 for root)
- Installs Arch Linux base system
- Configures network, locale, timezone
- Installs GRUB bootloader
- Sets up default user (username: `getlainux`, password: `getlainux`)

### 2. **Install on Virtual Machine** (Recommended for Testing)

#### Prerequisites:
```bash
# Install QEMU
# Arch Linux
sudo pacman -S qemu libvirt virt-manager

# Ubuntu/Debian
sudo apt-get install qemu-system-x86 qemu-utils libvirt-clients libvirt-daemon-system

# Fedora
sudo dnf install qemu-kvm libvirt virt-manager
```

#### Steps:
1. Run installer: `sudo ./bin/installer.lain`
2. Select "Install on Virtual Machine"
3. Installer will:
   - Check QEMU dependencies
   - Create virtual disk (20GB)
   - Download ISO (if needed)
   - Launch QEMU VM
   - Install GetLainux inside VM

### 3. **Hardware Information**

Shows detailed system information:
- CPU model and cores
- RAM size
- Disk information
- Graphics card
- UEFI/BIOS firmware type
- Virtualization support

### 4. **System Requirements Check**

Verifies if system meets minimum requirements:
- RAM check (1GB minimum)
- CPU check (dual-core recommended)
- Disk space check (2GB in /tmp)

### 5. **Configuration Selection**

Choose installation type:
- **Minimal**: Base system only
- **Standard**: Base + XFCE desktop
- **Development**: Full dev tools
- **Server**: Server packages
- **Security**: Hardened kernel

### 6. **Network Check**

Tests internet connectivity:
- Checks multiple endpoints (8.8.8.8, 1.1.1.1, archlinux.org)
- Shows public IP
- Network diagnostics

---

## 🎮 Installer Menu Navigation

### Keyboard Controls:

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate menu |
| `Enter` | Select option |
| `q` | Quit/Exit |
| `b` | Go back |
| `l` | Toggle language (EN/RU) |

### Menu Options:

1. **Install on Hardware** - Install on real machine
2. **Install on Virtual Machine** - Install in VM
3. **Hardware Information** - View system specs
4. **System Requirements Check** - Verify requirements
5. **Configuration Selection** - Choose install type
6. **View Disk Information** - List available disks
7. **Check Network** - Test internet connection
8. **Network Diagnostics** - Detailed network info
9. **Exit Installer** - Quit program

---

## 🔧 Advanced Usage

### Custom Configuration

Edit `configs/getlainux.cfg`:
```ini
name=GetLainux
version=0.1
date=2025.01.15
author=Nishant Gaurav
package=pacman, aur
```

### Kernel Optimization

GetLainux includes automatic kernel optimization during installation. The optimization:
- Tunes kernel parameters for maximum performance
- Optimizes CPU scheduler settings
- Configures memory management
- Applies boot-time optimizations

**Manual Optimization:**
```bash
cd kernel
sudo ./optimize_kernel.sh /
```

For details, see `kernel/README.md`.

### Kernel Configuration

Edit `kernel/config.txt`:
```
NAME=lainuxOS
VERSION=1.1
AUTHOR=Nishant Gaurav
IMPORT=default
```

### Build Custom Kernel

```bash
cd kernel
gcc compile_kernel.c -o compile_kernel
./compile_kernel
```

---

## 🐛 Troubleshooting

### Problem: Build fails with "ncurses not found"

**Solution:**
```bash
# Install ncurses development package
# Arch Linux
sudo pacman -S ncurses

# Ubuntu/Debian
sudo apt-get install libncurses5-dev libncursesw5-dev

# Fedora
sudo dnf install ncurses-devel
```

### Problem: "Permission denied" when running installer

**Solution:**
```bash
# Make executable
chmod +x bin/installer.lain

# Run with sudo
sudo ./bin/installer.lain
```

### Problem: Network check fails

**Solution:**
```bash
# Check internet connection
ping -c 3 8.8.8.8

# Start network service (if needed)
sudo systemctl start NetworkManager
# or
sudo systemctl start dhcpcd
```

### Problem: No disks detected

**Solution:**
```bash
# List disks manually
lsblk

# Check disk permissions
sudo fdisk -l

# Ensure you're running as root
sudo ./bin/installer.lain
```

### Problem: Installation fails at partitioning

**Solution:**
- Ensure disk is not mounted
- Check disk is not in use
- Verify disk permissions
- Try unmounting all partitions:
```bash
sudo umount /dev/sdX* 2>/dev/null
```

### Problem: Go installer dependencies missing

**Solution:**
```bash
cd go
go mod download
go mod tidy
go build -o ../bin/getlainux-installer-go main.go
```

### Problem: QEMU VM installation fails

**Solution:**
```bash
# Install QEMU
sudo pacman -S qemu libvirt  # Arch
sudo apt-get install qemu-system-x86  # Ubuntu

# Enable virtualization in BIOS
# Check if virtualization is enabled:
grep -E '(vmx|svm)' /proc/cpuinfo
```

---

## 📝 Important Notes

### ⚠️ Warnings:

1. **Data Loss**: Installation will **ERASE ALL DATA** on selected disk
2. **Root Access**: Always run installer with `sudo` or as root
3. **Testing**: Use VM mode for testing, not on production/work machines
4. **Backup**: Always backup important data before installation
5. **Internet**: Stable internet connection required for package downloads

### ✅ Best Practices:

1. **Test First**: Always test in VM before real installation
2. **Check Requirements**: Verify system meets minimum requirements
3. **Network**: Ensure stable internet before starting
4. **Disk Selection**: Double-check disk selection (wrong disk = data loss!)
5. **Read Logs**: Check installation logs if something fails

---

## 🎓 Quick Start Example

```bash
# 1. Clone/download project
cd GetLainux

# 2. Install dependencies
sudo pacman -S gcc ncurses curl openssl arch-install-scripts

# 3. Build installer
chmod +x build.sh
./build.sh
# Type 'y' when prompted

# 4. Run installer (in VM recommended)
sudo ./bin/installer.lain

# 5. Follow on-screen instructions
# - Select "Install on Virtual Machine" for testing
# - Or "Install on Hardware" for real installation
```

---

## 📞 Support

For issues, questions, or contributions:
- **GitHub**: https://github.com/CodewithEvilxd/GetLainux
- **Issues**: Create an issue on GitHub
- **Documentation**: Check `docs/` directory

---

## 📚 Additional Resources

- **Main README**: `README.md`
- **Source README**: `src/README.md`
- **API Documentation**: `docs/API.md`
- **Project Info**: `docs/INFO.md`

---

**Happy Installing! 🚀**

*Remember: Always test in VM first!*


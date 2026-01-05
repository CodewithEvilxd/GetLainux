# GetLainux - Quick Start Guide

## 🚀 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
# Arch Linux
sudo pacman -S gcc ncurses curl openssl arch-install-scripts

# Ubuntu/Debian  
sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev

# Kali Linux
sudo apt-get update
sudo apt-get install build-essential libncurses5-dev libcurl4-openssl-dev libssl-dev

# Fedora
sudo dnf install gcc ncurses-devel curl-devel openssl-devel
```

### Step 2: Build Installer
```bash
chmod +x build.sh
./build.sh
# Type 'y' when asked
```

### Step 3: Run Installer
```bash
sudo ./bin/installer.lain
```

### Step 4: Choose Option
- **For Testing**: Select "Install on Virtual Machine" (Safe)
- **For Real Install**: Select "Install on Hardware" (⚠️ Warning - All data will be deleted!)

---

## 📋 Common Commands

```bash
# Build installer
./build.sh

# Run C installer
sudo ./bin/installer.lain

# Run Go installer (alternative)
cd go && go build -o ../bin/go-installer main.go
sudo ../bin/go-installer

# Check system info
lsblk                    # List disks
free -h                   # Check RAM
lscpu                     # Check CPU
```

---

## ⚠️ Important Warnings

1. **Always use VM for testing** - Real installation will DELETE all data!
2. **Run with sudo** - Installer needs root access
3. **Check disk carefully** - Wrong disk = data loss!
4. **Internet required** - For downloading packages

---

## 🎮 Menu Navigation

- `↑` `↓` - Move up/down
- `Enter` - Select
- `q` - Quit
- `b` - Back

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Install dependencies (see Step 1) |
| Permission denied | Use `sudo` |
| No disks found | Run with `sudo`, check `lsblk` |
| Network fails | Check internet: `ping 8.8.8.8` |

---

**Full Guide**: See `USAGE_GUIDE.md` for detailed instructions


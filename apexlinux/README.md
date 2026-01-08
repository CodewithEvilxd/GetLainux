<p align="center">
  <img src="./Assets/logo.svg" width="30%" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/codewithevilxd/ApexLinux?style=for-the-badge&color=8ad7eb&logo=git&logoColor=D9E0EE&labelColor=1E202B" alt="Last Commit" />
  &nbsp;
  <img src="https://img.shields.io/github/stars/codewithevilxd/ApexLinux?style=for-the-badge&logo=andela&color=86dbd7&logoColor=D9E0EE&labelColor=1E202B" alt="Stars" />
  &nbsp;
  <img src="https://img.shields.io/github/repo-size/codewithevilxd/ApexLinux?color=86dbce&label=SIZE&logo=protondrive&style=for-the-badge&logoColor=D9E0EE&labelColor=1E202B" alt="Repo Size" />
  &nbsp;
  <br />
</p>

<div align="center">
  <video src="https://github.com/user-attachments/assets/1e8849fb-2d56-490b-a943-14fed7ddbcb0" width="100%" />
</div>

## Installation

### User Install
```bash
git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
cp -r /tmp/apexlinux-temp/apexlinux/* ~/.config/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp
```

### System-wide Install
```bash
git clone https://github.com/codewithevilxd/ApexLinux /tmp/apexlinux-temp
sudo cp -r /tmp/apexlinux-temp/apexlinux/* /etc/xdg/quickshell/evilxd/
rm -rf /tmp/apexlinux-temp
```

## Running the Shell

Start ApexLinux shell:
```bash
qs -c evilxd -f apexlinux.qml
```

Or if `apexlinux.qml` is the default entry point:
```bash
qs -c evilxd
```

## IPC Calls

You can interact with the shell using `qs ipc` commands.
Format: `qs -c evilxd ipc call <target> <function>`

### Available Commands

```bash
ipc call launcher toggle

ipc call clipboard toggle

ipc call sidePanel open
ipc call sidePanel close
ipc call sidePanel toggle
ipc call sidePanel lock
ipc call sidePanel unlock
ipc call sidePanel toggleLock

ipc call wallpaperpanel toggle

ipc call powermenu toggle

ipc call infopanel toggle

ipc call settings toggle

ipc call wallpaper set <path>

ipc call cliphistService update

ipc call lock lock
```

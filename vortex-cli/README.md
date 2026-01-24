<div align="center">

# 🌪️ Vortex CLI

**A powerful, lightning-fast YouTube browser for your terminal**

[![GitHub Stars](https://img.shields.io/github/stars/codewithevilxd/vortex-cli?style=for-the-badge&logo=github&color=yellow)](https://github.com/codewithevilxd/vortex-cli/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/codewithevilxd/vortex-cli?style=for-the-badge&logo=github)](https://github.com/codewithevilxd/vortex-cli/issues)
[![GitHub License](https://img.shields.io/github/license/codewithevilxd/vortex-cli?style=for-the-badge&logo=github)](https://github.com/codewithevilxd/vortex-cli/blob/main/LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/codewithevilxd/vortex-cli?style=for-the-badge&logo=github)](https://github.com/codewithevilxd/vortex-cli/releases)
[![GitHub Downloads](https://img.shields.io/github/downloads/codewithevilxd/vortex-cli/total?style=for-the-badge&logo=github)](https://github.com/codewithevilxd/vortex-cli/releases)

[![Discord](https://img.shields.io/discord/123456789012345678?label=Discord&style=for-the-badge&logo=discord&color=blue)](https://discord.gg/raj.dev_)
[![NixOS](https://img.shields.io/badge/NixOS-Ready-blue?style=for-the-badge&logo=nixos)](https://github.com/codewithevilxd/vortex-cli)
[![AUR](https://img.shields.io/aur/version/vortex-cli-git?style=for-the-badge&logo=arch-linux&color=1793d1)](https://aur.archlinux.org/packages/vortex-cli-git)

[📖 Documentation](#-documentation) • [🚀 Installation](#-installation) • [⚡ Quick Start](#-quick-start) • [🎯 Features](#-features) • [🤝 Contributing](#-contributing)



</div>

## ✨ Overview

**Vortex CLI** is a modern, feature-rich terminal-based YouTube browser that brings the power of YouTube to your command line. Built with performance and user experience in mind, it provides seamless access to YouTube's vast content library without leaving your terminal.

> **🚀 Why Vortex CLI?**
> - ⚡ **Lightning Fast** - Instant search and navigation
> - 🎨 **Beautiful UI** - Modern terminal interface with previews
> - 🔧 **Highly Configurable** - Customize everything to your liking
> - 🌍 **Universal Support** - Works with all yt-dlp supported sites
> - 🛠️ **Extensible** - Build your own extensions and commands

## 🎯 Features

### 🎵 Core Functionality
- **🎬 Interactive Video Browser** - Navigate YouTube with fuzzy search
- **📺 Live Streaming** - Watch live streams directly in terminal
- **🎵 Audio Playback** - Extract and play audio from videos
- **⬇️ Download Manager** - Download videos, playlists, and audio
- **📋 Playlist Support** - Create and manage custom playlists
- **⭐ Favorites** - Bookmark channels and videos

### 🎨 User Interface
- **🖼️ Rich Previews** - Image previews with thumbnails
- **🎯 Multiple Selectors** - Choose between fzf, rofi, or custom
- **🌈 Theming Support** - Fully customizable colors and styles
- **📱 Responsive Design** - Works on any terminal size
- **⌨️ Keyboard Shortcuts** - Efficient navigation with hotkeys

### 🔧 Advanced Features
- **🔍 Extended Search** - Filter by duration, quality, upload date
- **📊 History Tracking** - Keep track of watched videos
- **🔄 Auto Updates** - Stay up-to-date with latest features
- **🌐 Multi-Site Support** - Beyond YouTube (Vimeo, Twitch, etc.)
- **🛠️ Extension System** - Build custom functionality
- **⚙️ Configuration** - Fine-tune every aspect

### 📊 Statistics

<div align="center">

| Metric | Value |
|--------|-------|
| ⭐ Stars | ![GitHub stars](https://img.shields.io/github/stars/codewithevilxd/vortex-cli?style=flat-square) |
| 🍴 Forks | ![GitHub forks](https://img.shields.io/github/forks/codewithevilxd/vortex-cli?style=flat-square) |
| 👀 Watchers | ![GitHub watchers](https://img.shields.io/github/watchers/codewithevilxd/vortex-cli?style=flat-square) |
| 📦 Downloads | ![GitHub downloads](https://img.shields.io/github/downloads/codewithevilxd/vortex-cli/total?style=flat-square) |
| 💻 Languages | ![GitHub top language](https://img.shields.io/github/languages/top/codewithevilxd/vortex-cli?style=flat-square) |
| 📝 License | ![GitHub license](https://img.shields.io/github/license/codewithevilxd/vortex-cli?style=flat-square) |

</div>

## 📦 Installation

### 🚀 Quick Install (Cross-platform)

```bash
# One-liner install
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o ~/.local/bin/vortex-cli && chmod +x ~/.local/bin/vortex-cli

# Verify installation
vortex-cli --version
```

### 🐧 Linux Distributions

#### 📚 Arch Linux (AUR)
```bash
# Using yay
yay -S vortex-cli-git

# Using paru
paru -S vortex-cli-git
```

#### ❄️ NixOS / Home Manager
```bash
# Imperative install
nix profile install github:codewithevilxd/vortex-cli

# Declarative (add to flake.nix)
{
  inputs.vortex-cli.url = "github:codewithevilxd/vortex-cli";
  # ... rest of your flake
}
```

#### 🐧 Ubuntu/Debian
```bash
# Install dependencies
sudo apt update
sudo apt install jq curl yt-dlp fzf mpv ffmpeg

# Install Vortex CLI
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o /usr/local/bin/vortex-cli
chmod +x /usr/local/bin/vortex-cli
```

#### 🍎 macOS
```bash
# Using Homebrew
brew install jq yt-dlp fzf mpv ffmpeg
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o /usr/local/bin/vortex-cli
chmod +x /usr/local/bin/vortex-cli
```

### 🤖 Android (Termux)
```bash
pkg install jq curl python yt-dlp fzf mpv ffmpeg
curl -sL "https://raw.githubusercontent.com/codewithevilxd/vortex-cli/main/vortex-cli" -o $PREFIX/bin/vortex-cli
chmod +x $PREFIX/bin/vortex-cli
```

## ⚡ Quick Start

```bash
# Launch the main interface
vortex-cli

# Search for videos
vortex-cli -S "your search query"

# Edit configuration
vortex-cli -e

# Get help
vortex-cli --help
```

## 📋 Requirements

### Required Dependencies
- **bash** >= 4.0 - Shell interpreter
- **jq** - JSON processor
- **curl** - HTTP client
- **yt-dlp** - Media downloader
- **fzf** >= 0.30.0 - Fuzzy finder
- **mpv** - Media player
- **ffmpeg** - Audio/video processing

### Optional Dependencies
- **gum** - Enhanced UI elements
- **rofi** - Alternative selector
- **chafa** / **icat** - Image previews
- **kitty** / **wezterm** - Terminal image support

## 🎨 Configuration

Vortex CLI is highly configurable. Edit `~/.config/vortex-cli/vortex-cli.conf`:

```ini
# Player settings
PLAYER: mpv
VIDEO_QUALITY: 1080

# UI preferences
PREFERRED_SELECTOR: fzf
ENABLE_PREVIEW: true
IMAGE_RENDERER: chafa

# Download settings
DOWNLOAD_DIRECTORY: ~/Videos
UPDATE_RECENT: true

# Browser integration
PREFERRED_BROWSER: firefox
```

### 🎨 Theming

Customize the interface with `VORTEX_CLI_FZF_OPTS`:

```bash
# Add to your ~/.bashrc or ~/.zshrc
export VORTEX_CLI_FZF_OPTS='
--color=fg:#d0d0d0,fg+:#d0d0d0,bg:#121212,bg+:#262626
--color=hl:#5f87af,hl+:#5fd7ff,info:#afaf87,marker:#87ff00
--color=prompt:#d7005f,spinner:#af5fff,pointer:#af5fff,header:#87afaf
--color=border:#262626,label:#aeaeae,query:#d9d9d9
--border="rounded" --border-label="" --preview-window="border-rounded"
--prompt="🔍 " --marker="▶" --pointer="◆" --separator="─"
'
```

## 🔍 Advanced Usage

### Search Filters
Prefix your search with commands for filtered results:

| Filter | Description | Example |
|--------|-------------|---------|
| `:live` | Live streams only | `:live gaming` |
| `:today` | Uploaded today | `:today news` |
| `:week` | This week | `:week tutorials` |
| `:hd` | HD quality | `:hd movies` |
| `:4k` | 4K quality | `:4k nature` |
| `:short` | < 4 minutes | `:short comedy` |

### Sorting Options
| Sort | Description |
|------|-------------|
| `:views` | By view count |
| `:rating` | By rating |
| `:newest` | By upload date |

### Custom Playlists

Create `~/.config/vortex-cli/custom_playlists.json`:

```json
[
  {
    "name": "My Favorites",
    "playlistUrl": "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID",
    "playlistWatchUrl": "https://www.youtube.com/watch?v=VIDEO_ID&list=YOUR_PLAYLIST_ID"
  }
]
```

### Extensions

Extend Vortex CLI with custom functionality. Place scripts in `~/.config/vortex-cli/extensions/`.

Example extension structure:
```bash
# my-extension.sh
#!/usr/bin/env bash
# Vortex CLI Extension: Custom functionality

# Your custom functions here
my_custom_function() {
    # Implementation
}
```

## 🐛 Troubleshooting

### Common Issues

**❌ "Command not found"**
```bash
# Ensure vortex-cli is in your PATH
export PATH="$HOME/.local/bin:$PATH"
```

**❌ "fzf: command not found"**
```bash
# Install fzf
# Ubuntu/Debian: sudo apt install fzf
# Arch: sudo pacman -S fzf
# macOS: brew install fzf
```

**❌ "mpv: command not found"**
```bash
# Install mpv
# Ubuntu/Debian: sudo apt install mpv
# Arch: sudo pacman -S mpv
# macOS: brew install mpv
```

**❌ Cookie decryption errors**
```bash
# Set your browser in config
PREFERRED_BROWSER: firefox
```

### Debug Mode
```bash
# Run with verbose output
bash -x vortex-cli
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use [GitHub Issues](https://github.com/codewithevilxd/vortex-cli/issues)
- Include terminal output and system info
- Describe steps to reproduce

### ✨ Feature Requests
- Check existing issues first
- Provide detailed use case
- Explain why it would be valuable

### 🛠️ Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 📝 Development Setup
```bash
# Clone repository
git clone https://github.com/codewithevilxd/vortex-cli.git
cd vortex-cli

# Install dependencies
# ... (see installation section)

# Test changes
./vortex-cli --help
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **yt-dlp** - The backbone of media downloading
- **fzf** - Amazing fuzzy finding capabilities
- **mpv** - Superior media playback
- **Original yt-x project** - Inspiration and foundation

## 📞 Support

### 💬 Community
- **Discord**: [Join our server](https://discord.gg/raj.dev_)
- **GitHub Discussions**: [Ask questions](https://github.com/codewithevilxd/vortex-cli/discussions)

### 📧 Contact
- **Author**: Nishant Gaurav
- **Email**: [your-email@example.com]
- **GitHub**: [@codewithevilxd](https://github.com/codewithevilxd)

---

<div align="center">

**Made with ❤️ by [Nishant Gaurav](https://github.com/codewithevilxd)**

⭐ **Star this repo if you find it useful!**

[⬆️ Back to Top](#-vortex-cli)

</div>

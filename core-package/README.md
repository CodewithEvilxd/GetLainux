# GetLainux Core Package

This directory contains the build files for the GetLainux core package.

## What is this?

The `getlainux-core` package is an Arch Linux package (`.pkg.tar.zst`) that contains:
- System configuration files
- GetLainux branding and identification
- Essential system scripts
- Systemd service files

## Building the Package

### Prerequisites

You need to be on an Arch Linux system (or a system with `pacman` and `makepkg`):

```bash
# Install base-devel group (includes makepkg)
sudo pacman -S base-devel
```

### Build Steps

1. **Make the build script executable:**
   ```bash
   chmod +x build-core.sh
   ```

2. **Run the build script:**
   ```bash
   ./build-core.sh
   ```

3. **The package will be created in `output/` directory:**
   ```
   output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
   ```

### Manual Build (Alternative)

If you prefer to build manually:

```bash
# In the core-package directory
makepkg -f --cleanbuild --clean
```

## Installing the Package

After building, you can install it:

```bash
sudo pacman -U output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
```

## Uploading to GitHub

To make the package available for the installer:

### Option 1: Upload to main branch (raw)
1. Upload the `.pkg.tar.zst` file to the `core-package/output/` directory in the repository
2. The URL will be:
   ```
   https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
   ```
3. Update `CORE_URL` in `src/installer/include/installer.h`:
   ```c
   #define CORE_URL "https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst"
   ```

### Option 2: Upload to GitHub Releases
1. Create a new release on GitHub
2. Upload the `.pkg.tar.zst` file as a release asset
3. Update `FALLBACK_CORE_URL` in `src/installer/include/installer.h`:
   ```c
   #define FALLBACK_CORE_URL "https://github.com/CodewithEvilxd/GetLainux/releases/download/v0.1/getlainux-core-0.1-1-x86_64.pkg.tar.zst"
   ```

## Package Contents

The package includes:
- `/etc/getlainux-release` - System identification file
- `/etc/hostname` - Default hostname (getlainux)
- `/usr/bin/getlainux-info` - System information script
- `/usr/lib/systemd/system/getlainux-core.service` - Systemd service

## Customization

Edit `PKGBUILD` to customize:
- Package version (`pkgver`, `pkgrel`)
- Package contents
- Dependencies
- Installation scripts

## Troubleshooting

### makepkg not found
```bash
sudo pacman -S base-devel
```

### Permission errors
Make sure you're running as a regular user (not root). `makepkg` should not be run as root.

### Build fails
Check the error messages. Common issues:
- Missing dependencies (install with `pacman -S <package>`)
- Invalid PKGBUILD syntax
- Insufficient disk space


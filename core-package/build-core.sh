#!/bin/bash

# Build script for GetLainux Core Package
# This script builds the getlainux-core Arch Linux package

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PKGNAME="getlainux-core"
PKGVER="0.1"
PKGREL="1"
OUTPUT_DIR="$SCRIPT_DIR/output"
PKGFILE="${PKGNAME}-${PKGVER}-${PKGREL}-x86_64.pkg.tar.zst"

echo "=========================================="
echo "GetLainux Core Package Builder"
echo "=========================================="
echo ""

# Check if running on Arch Linux
if [ ! -f /etc/arch-release ]; then
    echo "⚠️  Warning: This script is designed for Arch Linux"
    echo "   It may work on other distributions with pacman installed"
    echo ""
fi

# Check for required tools
echo "Checking dependencies..."
if ! command -v makepkg &> /dev/null; then
    echo "❌ Error: makepkg not found. Please install base-devel:"
    echo "   sudo pacman -S base-devel"
    exit 1
fi

if ! command -v pacman &> /dev/null; then
    echo "❌ Error: pacman not found. This script requires Arch Linux or a system with pacman."
    exit 1
fi

echo "✅ Dependencies OK"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Navigate to script directory
cd "$SCRIPT_DIR"

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf src pkg "$OUTPUT_DIR"/*.pkg.tar.zst 2>/dev/null || true
echo "✅ Cleaned"
echo ""

# Build the package
echo "Building package..."
echo "Package: $PKGFILE"
echo ""

# Run makepkg
if makepkg -f --cleanbuild --clean; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    
    # Move package to output directory
    if [ -f "$PKGFILE" ]; then
        mv "$PKGFILE" "$OUTPUT_DIR/"
        echo "📦 Package created: $OUTPUT_DIR/$PKGFILE"
        echo ""
        echo "File size:"
        ls -lh "$OUTPUT_DIR/$PKGFILE"
        echo ""
        echo "To install the package:"
        echo "  sudo pacman -U $OUTPUT_DIR/$PKGFILE"
        echo ""
        echo "To upload to GitHub:"
        echo "  1. Upload to: core-package/output/ directory in your repo"
        echo "  2. The URL will be:"
        echo "     https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/$PKGFILE"
        echo "  3. Or create a GitHub release and upload as asset"
        echo ""
    else
        echo "❌ Error: Package file not found after build"
        exit 1
    fi
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi


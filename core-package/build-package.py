#!/usr/bin/env python3
"""
Build GetLainux Core Package for Windows
Creates a .pkg.tar.zst file from the pkg/ directory
"""

import os
import tarfile
import subprocess
import sys
from pathlib import Path
from datetime import datetime
from io import BytesIO

SCRIPT_DIR = Path(__file__).parent.resolve()
PKG_DIR = SCRIPT_DIR / "pkg"
OUTPUT_DIR = SCRIPT_DIR / "output"
PKGNAME = "getlainux-core"
PKGVER = "0.1"
PKGREL = "1"
ARCH = "x86_64"
PKGFILE = f"{PKGNAME}-{PKGVER}-{PKGREL}-{ARCH}.pkg.tar.zst"

def create_pkginfo():
    """Create .PKGINFO file with package metadata"""
    pkginfo = f"""pkgname = {PKGNAME}
pkgver = {PKGVER}-{PKGREL}
pkgdesc = GetLainux Core Package - Essential system components and kernel
url = https://github.com/CodewithEvilxd/GetLainux
builddate = {int(datetime.now().timestamp())}
packager = Nishant Gaurav <codewithevilxd>
size = 0
arch = {ARCH}
license = GPL3
depend = linux
depend = linux-firmware
depend = base
"""
    return pkginfo.encode('utf-8')

def create_mtree(pkg_dir):
    """Create .MTREE file with file metadata"""
    mtree_lines = ["#mtree\n"]
    
    def add_file(path, rel_path):
        stat = path.stat()
        mode = oct(stat.st_mode)[-4:]  # Last 4 digits (permissions)
        mtree_lines.append(f"./{rel_path} type=file mode={mode} uid=0 gid=0 size={stat.st_size} time={int(stat.st_mtime)}\n")
    
    def add_dir(path, rel_path):
        stat = path.stat()
        mode = oct(stat.st_mode)[-4:]
        mtree_lines.append(f"./{rel_path} type=dir mode={mode} uid=0 gid=0 nlink=2 time={int(stat.st_mtime)}\n")
    
    # Add directories first
    for root, dirs, files in os.walk(pkg_dir):
        rel_root = os.path.relpath(root, pkg_dir)
        if rel_root != '.':
            add_dir(Path(root), rel_root.replace('\\', '/'))
        else:
            mtree_lines.append("./ type=dir mode=0755 uid=0 gid=0 nlink=2 time=0\n")
    
    # Add files
    for root, dirs, files in os.walk(pkg_dir):
        rel_root = os.path.relpath(root, pkg_dir)
        for file in files:
            file_path = Path(root) / file
            if rel_root != '.':
                rel_path = f"{rel_root}/{file}".replace('\\', '/')
            else:
                rel_path = file
            add_file(file_path, rel_path)
    
    return ''.join(mtree_lines).encode('utf-8')

def compress_with_zstd(input_file, output_file):
    """Compress file using zstd"""
    try:
        # Try using zstd command if available
        result = subprocess.run(
            ['zstd', '-f', '-o', str(output_file), str(input_file)],
            capture_output=True,
            check=True
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        try:
            # Try using zstandard Python library
            import zstandard as zstd
            with open(input_file, 'rb') as f_in:
                with open(output_file, 'wb') as f_out:
                    cctx = zstd.ZstdCompressor()
                    cctx.copy_stream(f_in, f_out)
            return True
        except ImportError:
            print("Error: zstd compression not available.")
            print("Please install zstd:")
            print("  - Windows: Download from https://github.com/facebook/zstd/releases")
            print("  - Or install zstandard Python library: pip install zstandard")
            return False

def build_package():
    """Build the Arch Linux package"""
    print("=" * 50)
    print("GetLainux Core Package Builder (Windows)")
    print("=" * 50)
    print()
    
    # Check if pkg directory exists
    if not PKG_DIR.exists():
        print(f"ERROR: {PKG_DIR} directory not found")
        return False
    
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Create temporary tar file
    tar_file = OUTPUT_DIR / f"{PKGNAME}.tar"
    output_file = OUTPUT_DIR / PKGFILE
    
    print("Creating package structure...")
    
    # Create tar archive
    with tarfile.open(tar_file, 'w') as tar:
        # Add .PKGINFO
        pkginfo_data = create_pkginfo()
        info = tarfile.TarInfo(name='.PKGINFO')
        info.size = len(pkginfo_data)
        info.mtime = datetime.now().timestamp()
        tar.addfile(info, fileobj=BytesIO(pkginfo_data))
        
        # Add .MTREE
        mtree_data = create_mtree(PKG_DIR)
        info = tarfile.TarInfo(name='.MTREE')
        info.size = len(mtree_data)
        info.mtime = datetime.now().timestamp()
        tar.addfile(info, fileobj=BytesIO(mtree_data))
        
        # Add files from pkg directory
        print("Adding files to package...")
        for root, dirs, files in os.walk(PKG_DIR):
            for file in files:
                file_path = Path(root) / file
                # Calculate relative path for tar
                rel_path = file_path.relative_to(PKG_DIR)
                arcname = str(rel_path).replace('\\', '/')
                tar.add(file_path, arcname=arcname, recursive=False)
                print(f"  Added: {arcname}")
    
    print(f"\n[OK] Tar archive created: {tar_file}")
    
    # Compress with zstd
    print("\nCompressing with zstd...")
    if compress_with_zstd(tar_file, output_file):
        # Remove temporary tar file
        tar_file.unlink()
        print(f"[OK] Package created: {output_file}")
        print(f"\nFile size: {output_file.stat().st_size / 1024:.2f} KB")
        print(f"\nPackage location: {output_file}")
        return True
    else:
        print(f"\n[WARNING] Tar file created but not compressed: {tar_file}")
        print("   You can compress it manually with zstd")
        return False

if __name__ == "__main__":
    success = build_package()
    sys.exit(0 if success else 1)


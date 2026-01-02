#!/usr/bin/env bash

arch="x86_64"
iso_name="getlainux"
iso_label="GETLAINUX_$(date +%Y%m)"
iso_publisher="GetLainux <https://github.com/CodewithEvilxd/GetLainux>"
iso_application="GetLainux Live CD"
iso_version="$(date +%Y.%m.%d)"
install_dir="arch"
buildmodes=('iso')

# Filesystem settings
airootfs_image_type="squashfs"
airootfs_image_tool_options=('-comp' 'xz' '-Xbcj' 'x86' '-b' '1M' '-Xdict-size' '1M')

# Boot modes
bootmodes=('bios.syslinux.mbr' 'bios.syslinux.eltorito' \
           'uefi-ia32.grub.esp' 'uefi-x64.grub.esp' 'uefi-x64.grub.eltorito')

# Working directories
working_dir="work"
out_dir="out"

# GetLainux Kernel Optimization

This directory contains tools and configurations for optimizing the Linux kernel for GetLainux distribution.

## Overview

GetLainux includes custom kernel optimization features that:
- Tune kernel parameters for maximum performance
- Optimize CPU scheduler settings
- Configure memory management
- Strip unnecessary kernel modules (when building custom kernel)
- Apply boot-time optimizations

## Files

### `optimize_kernel.sh`
Main shell script for kernel optimization. Can be run during installation or on an existing system.

**Usage:**
```bash
# During installation (from installer)
./optimize_kernel.sh /mnt

# On existing system
sudo ./optimize_kernel.sh /
```

**Features:**
- Optimizes kernel parameters via sysctl
- Configures GRUB boot parameters
- Sets CPU governor to performance mode
- Creates optimization report

### `optimize_kernel.c`
C implementation of kernel optimization. Can be compiled and used as a standalone tool.

**Compilation:**
```bash
gcc -o optimize_kernel optimize_kernel.c
```

**Usage:**
```bash
./optimize_kernel [chroot_directory]
```

### `kernel.config`
Template kernel configuration file for building a custom optimized kernel. This configuration:
- Disables unnecessary filesystems
- Removes unused network protocols
- Optimizes scheduler settings
- Disables debugging features for production builds
- Includes only essential hardware drivers

**Note:** This is a template. To use it:
1. Download kernel source: `wget https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.x.x.tar.xz`
2. Extract: `tar xf linux-6.x.x.tar.xz && cd linux-6.x.x`
3. Copy config: `cp ../kernel.config .config`
4. Configure: `make oldconfig`
5. Build: `make -j$(nproc)`
6. Install: `sudo make modules_install && sudo make install`

### `compile_kernel.c`
ISO build tool for creating GetLainux installation media.

## Optimization Details

### Kernel Parameters (sysctl)

The optimization script applies the following kernel parameters:

**CPU Scheduler:**
- `kernel.sched_migration_cost_ns = 5000000` - Optimize task migration
- `kernel.sched_autogroup_enabled = 0` - Disable autogroup for better control
- `kernel.sched_cfs_bandwidth_slice_us = 1000` - CFS bandwidth tuning

**Memory Management:**
- `vm.swappiness = 10` - Prefer RAM over swap
- `vm.vfs_cache_pressure = 50` - Balance cache usage
- `vm.dirty_ratio = 15` - Optimize writeback behavior
- `vm.overcommit_memory = 1` - Allow memory overcommit

**Network:**
- Increased buffer sizes for better throughput
- TCP optimizations for lower latency

**File System:**
- Increased file handle limits
- Optimized inotify watches

### Boot Parameters

The following kernel boot parameters are added to GRUB:
- `intel_idle.max_cstate=1` - Limit CPU idle states for lower latency
- `processor.max_cstate=1` - Limit processor C-states
- `nohz_full=1-7` - Disable timer ticks on specified CPUs
- `rcu_nocbs=1-7` - Offload RCU callbacks from specified CPUs

### CPU Governor

The CPU governor is set to "performance" mode, which keeps CPUs at maximum frequency for optimal performance.

## Integration with Installer

The kernel optimization is automatically applied during installation:
- **Turbo Installer:** Runs optimization in Step 8.5
- **Standard Installer:** Runs optimization during system configuration

The installer will:
1. Try to use `optimize_kernel.sh` if available
2. Fall back to direct optimization if script not found
3. Create optimization report in `/var/log/getlainux-kernel-optimization.log`

## Manual Optimization

To manually optimize an existing GetLainux installation:

```bash
# Method 1: Use the shell script
cd kernel
sudo ./optimize_kernel.sh /

# Method 2: Use the C program
cd kernel
gcc -o optimize_kernel optimize_kernel.c
sudo ./optimize_kernel /

# Method 3: Apply optimizations manually
sudo sysctl -p /etc/sysctl.d/99-getlainux-kernel.conf
sudo systemctl enable cpu-governor.service
sudo systemctl start cpu-governor.service
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Verification

After optimization, verify the settings:

```bash
# Check kernel parameters
sysctl kernel.sched_migration_cost_ns
sysctl vm.swappiness

# Check CPU governor
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Check boot parameters
cat /proc/cmdline

# View optimization report
cat /var/log/getlainux-kernel-optimization.log
```

## Building Custom Kernel

For maximum optimization, build a custom kernel with stripped configuration:

1. **Install build dependencies:**
   ```bash
   sudo pacman -S base-devel git
   ```

2. **Download kernel source:**
   ```bash
   wget https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.x.x.tar.xz
   tar xf linux-6.x.x.tar.xz
   cd linux-6.x.x
   ```

3. **Use GetLainux config:**
   ```bash
   cp /path/to/getlainux/kernel/kernel.config .config
   make oldconfig
   ```

4. **Build kernel:**
   ```bash
   make -j$(nproc)
   ```

5. **Install:**
   ```bash
   sudo make modules_install
   sudo make install
   ```

6. **Update bootloader:**
   ```bash
   sudo grub-mkconfig -o /boot/grub/grub.cfg
   ```

7. **Reboot:**
   ```bash
   sudo reboot
   ```

## Notes

- Kernel optimizations take effect after reboot
- Some optimizations may not apply on all hardware
- Custom kernel builds require significant time and disk space
- Always test optimizations on a non-critical system first

## Troubleshooting

**Issue:** Optimization script fails
- **Solution:** Check permissions, ensure running as root or with sudo

**Issue:** Boot parameters not applied
- **Solution:** Regenerate GRUB config: `sudo grub-mkconfig -o /boot/grub/grub.cfg`

**Issue:** CPU governor not changing
- **Solution:** Check if CPU frequency scaling is supported: `ls /sys/devices/system/cpu/cpu*/cpufreq/`

**Issue:** Custom kernel build fails
- **Solution:** Ensure all dependencies are installed, check kernel source integrity

## Author

Nishant Gaurav

## License

GPL-3.0


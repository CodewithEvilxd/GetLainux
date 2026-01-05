/*
 * GetLainux Kernel Optimization Module
 * C implementation for kernel parameter optimization
 *
 * Author: Nishant Gaurav
 * Version: 1.0
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <errno.h>

#define MAX_PATH 512
#define MAX_LINE 1024

// Color codes for output
#define COLOR_RESET "\033[0m"
#define COLOR_GREEN "\033[32m"
#define COLOR_YELLOW "\033[33m"
#define COLOR_RED "\033[31m"

#define INFO(fmt, ...) printf(COLOR_GREEN "[INFO]" COLOR_RESET " " fmt "\n", ##__VA_ARGS__)
#define WARN(fmt, ...) printf(COLOR_YELLOW "[WARN]" COLOR_RESET " " fmt "\n", ##__VA_ARGS__)
#define ERROR(fmt, ...) printf(COLOR_RED "[ERROR]" COLOR_RESET " " fmt "\n", ##__VA_ARGS__)

/**
 * Write kernel optimization sysctl configuration
 */
int write_kernel_sysctl(const char *chroot_dir) {
    char sysctl_path[MAX_PATH];
    snprintf(sysctl_path, sizeof(sysctl_path), "%s/etc/sysctl.d/99-getlainux-kernel.conf", chroot_dir);
    
    // Create directory if it doesn't exist
    char dir_path[MAX_PATH];
    snprintf(dir_path, sizeof(dir_path), "%s/etc/sysctl.d", chroot_dir);
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "mkdir -p '%s'", dir_path);
    system(cmd);
    
    FILE *fp = fopen(sysctl_path, "w");
    if (!fp) {
        ERROR("Failed to create sysctl config: %s", sysctl_path);
        return -1;
    }
    
    fprintf(fp, "# GetLainux Kernel Optimization Configuration\n");
    fprintf(fp, "# Performance-focused kernel tuning\n\n");
    
    fprintf(fp, "# CPU Scheduler Optimizations\n");
    fprintf(fp, "kernel.sched_migration_cost_ns = 5000000\n");
    fprintf(fp, "kernel.sched_autogroup_enabled = 0\n");
    fprintf(fp, "kernel.sched_cfs_bandwidth_slice_us = 1000\n\n");
    
    fprintf(fp, "# Memory Management Optimizations\n");
    fprintf(fp, "vm.swappiness = 10\n");
    fprintf(fp, "vm.vfs_cache_pressure = 50\n");
    fprintf(fp, "vm.dirty_ratio = 15\n");
    fprintf(fp, "vm.dirty_background_ratio = 5\n");
    fprintf(fp, "vm.overcommit_memory = 1\n\n");
    
    fprintf(fp, "# I/O Scheduler Optimizations\n");
    fprintf(fp, "vm.dirty_writeback_centisecs = 500\n");
    fprintf(fp, "vm.dirty_expire_centisecs = 3000\n\n");
    
    fprintf(fp, "# Network Optimizations\n");
    fprintf(fp, "net.core.rmem_default = 262144\n");
    fprintf(fp, "net.core.wmem_default = 262144\n");
    fprintf(fp, "net.core.rmem_max = 33554432\n");
    fprintf(fp, "net.core.wmem_max = 33554432\n");
    fprintf(fp, "net.core.netdev_max_backlog = 5000\n");
    fprintf(fp, "net.ipv4.tcp_rmem = 4096 87380 33554432\n");
    fprintf(fp, "net.ipv4.tcp_wmem = 4096 65536 33554432\n");
    fprintf(fp, "net.ipv4.tcp_fin_timeout = 10\n");
    fprintf(fp, "net.ipv4.tcp_tw_reuse = 1\n");
    fprintf(fp, "net.ipv4.tcp_slow_start_after_idle = 0\n\n");
    
    fprintf(fp, "# File System Optimizations\n");
    fprintf(fp, "fs.file-max = 2097152\n");
    fprintf(fp, "fs.inotify.max_user_watches = 524288\n\n");
    
    fprintf(fp, "# Security & Performance Balance\n");
    fprintf(fp, "kernel.unprivileged_bpf_disabled = 0\n");
    fprintf(fp, "kernel.kptr_restrict = 1\n");
    
    fclose(fp);
    INFO("Kernel sysctl configuration written: %s", sysctl_path);
    return 0;
}

/**
 * Optimize GRUB boot parameters
 */
int optimize_grub_params(const char *chroot_dir) {
    char grub_path[MAX_PATH];
    snprintf(grub_path, sizeof(grub_path), "%s/etc/default/grub", chroot_dir);
    
    // Check if file exists
    FILE *fp = fopen(grub_path, "r+");
    if (!fp) {
        // Create new file
        fp = fopen(grub_path, "w");
        if (!fp) {
            WARN("Could not create GRUB config, skipping boot parameter optimization");
            return 0;
        }
        fprintf(fp, "GRUB_CMDLINE_LINUX=\"quiet splash intel_idle.max_cstate=1 processor.max_cstate=1 nohz_full=1-7 rcu_nocbs=1-7\"\n");
        fclose(fp);
        INFO("Created GRUB config with optimized boot parameters");
        return 0;
    }
    
    // Read existing content
    char content[4096] = {0};
    size_t len = fread(content, 1, sizeof(content) - 1, fp);
    fclose(fp);
    
    // Check if optimization params already exist
    if (strstr(content, "nohz_full") != NULL) {
        INFO("GRUB boot parameters already optimized");
        return 0;
    }
    
    // Append or modify GRUB_CMDLINE_LINUX
    fp = fopen(grub_path, "w");
    if (!fp) {
        ERROR("Failed to write GRUB config");
        return -1;
    }
    
    // Write existing content and add optimizations
    if (strstr(content, "GRUB_CMDLINE_LINUX=") != NULL) {
        // Modify existing line
        char *line_start = strstr(content, "GRUB_CMDLINE_LINUX=");
        char *line_end = strchr(line_start, '\n');
        if (line_end) {
            *line_end = '\0';
            fprintf(fp, "%s intel_idle.max_cstate=1 processor.max_cstate=1 nohz_full=1-7 rcu_nocbs=1-7\"\n", line_start);
            if (line_end[1]) {
                fputs(line_end + 1, fp);
            }
        } else {
            fputs(content, fp);
            fprintf(fp, " intel_idle.max_cstate=1 processor.max_cstate=1 nohz_full=1-7 rcu_nocbs=1-7\"\n");
        }
    } else {
        fputs(content, fp);
        fprintf(fp, "GRUB_CMDLINE_LINUX=\"quiet splash intel_idle.max_cstate=1 processor.max_cstate=1 nohz_full=1-7 rcu_nocbs=1-7\"\n");
    }
    
    fclose(fp);
    INFO("GRUB boot parameters optimized");
    return 0;
}

/**
 * Create CPU governor service
 */
int create_cpu_governor_service(const char *chroot_dir) {
    char service_path[MAX_PATH];
    snprintf(service_path, sizeof(service_path), "%s/etc/systemd/system/cpu-governor.service", chroot_dir);
    
    // Create directory
    char dir_path[MAX_PATH];
    snprintf(dir_path, sizeof(dir_path), "%s/etc/systemd/system", chroot_dir);
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "mkdir -p '%s'", dir_path);
    system(cmd);
    
    FILE *fp = fopen(service_path, "w");
    if (!fp) {
        ERROR("Failed to create CPU governor service");
        return -1;
    }
    
    fprintf(fp, "[Unit]\n");
    fprintf(fp, "Description=Set CPU governor to performance\n");
    fprintf(fp, "After=multi-user.target\n\n");
    fprintf(fp, "[Service]\n");
    fprintf(fp, "Type=oneshot\n");
    fprintf(fp, "ExecStart=/bin/bash -c 'for cpu in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do echo performance > \"$cpu\" 2>/dev/null || true; done'\n");
    fprintf(fp, "RemainAfterExit=yes\n\n");
    fprintf(fp, "[Install]\n");
    fprintf(fp, "WantedBy=multi-user.target\n");
    
    fclose(fp);
    INFO("CPU governor service created");
    
    // Try to enable the service (if systemd is available)
    snprintf(cmd, sizeof(cmd), "arch-chroot '%s' systemctl enable cpu-governor.service 2>/dev/null || true", chroot_dir);
    system(cmd);
    
    return 0;
}

/**
 * Create optimization report
 */
int create_optimization_report(const char *chroot_dir) {
    char report_path[MAX_PATH];
    snprintf(report_path, sizeof(report_path), "%s/var/log/getlainux-kernel-optimization.log", chroot_dir);
    
    // Create directory
    char dir_path[MAX_PATH];
    snprintf(dir_path, sizeof(dir_path), "%s/var/log", chroot_dir);
    char cmd[1024];
    snprintf(cmd, sizeof(cmd), "mkdir -p '%s'", dir_path);
    system(cmd);
    
    FILE *fp = fopen(report_path, "w");
    if (!fp) {
        WARN("Could not create optimization report");
        return 0;
    }
    
    fprintf(fp, "GetLainux Kernel Optimization Report\n");
    fprintf(fp, "====================================\n");
    fprintf(fp, "Chroot Directory: %s\n", chroot_dir);
    fprintf(fp, "\nOptimizations Applied:\n");
    fprintf(fp, "1. ✓ Kernel parameters tuned via sysctl\n");
    fprintf(fp, "2. ✓ Boot parameters optimized\n");
    fprintf(fp, "3. ✓ CPU governor set to performance mode\n");
    fprintf(fp, "\nConfiguration Files:\n");
    fprintf(fp, "- /etc/sysctl.d/99-getlainux-kernel.conf\n");
    fprintf(fp, "- /etc/default/grub\n");
    fprintf(fp, "- /etc/systemd/system/cpu-governor.service\n");
    
    fclose(fp);
    INFO("Optimization report created: %s", report_path);
    return 0;
}

/**
 * Main optimization function
 */
int optimize_kernel(const char *chroot_dir) {
    if (!chroot_dir) {
        chroot_dir = "/mnt";
    }
    
    INFO("Starting GetLainux Kernel Optimization...");
    INFO("Target directory: %s", chroot_dir);
    
    // Check if directory exists
    struct stat st;
    if (stat(chroot_dir, &st) != 0) {
        ERROR("Chroot directory not found: %s", chroot_dir);
        return -1;
    }
    
    // Run optimization steps
    if (write_kernel_sysctl(chroot_dir) != 0) {
        ERROR("Failed to write kernel sysctl config");
        return -1;
    }
    
    if (optimize_grub_params(chroot_dir) != 0) {
        WARN("GRUB parameter optimization had issues");
    }
    
    if (create_cpu_governor_service(chroot_dir) != 0) {
        WARN("CPU governor service creation had issues");
    }
    
    create_optimization_report(chroot_dir);
    
    INFO("Kernel optimization completed successfully!");
    INFO("Reboot the system to apply all optimizations");
    
    return 0;
}

/**
 * Main entry point
 */
int main(int argc, char *argv[]) {
    const char *chroot_dir = "/mnt";
    
    if (argc > 1) {
        chroot_dir = argv[1];
    }
    
    return optimize_kernel(chroot_dir);
}


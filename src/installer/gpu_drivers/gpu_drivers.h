#ifndef GPU_DRIVERS_H
#define GPU_DRIVERS_H

typedef struct {
    char *vendor;
    char *driver_package;
    char *kernel_modules;
} gpu_info_t;

const gpu_info_t *detect_gpu();

#endif // GPU_DRIVERS_H
/*
 * GetLainux touch - Create empty files or update timestamps
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>
#include <utime.h>

static int create_only = 0;
static int no_create = 0;
static int verbose = 0;

int touch_file(const char *path) {
    FILE *file = fopen(path, "a");
    if (!file) {
        if (no_create) {
            print_error("Cannot touch '%s' (file does not exist)", path);
            return -1;
        }
        // Create empty file
        file = fopen(path, "w");
        if (!file) {
            print_error("Cannot create '%s'", path);
            return -1;
        }
        if (verbose) {
            printf("Created '%s'\n", path);
        }
    } else {
        fclose(file);
        
        // Update timestamps
        struct utimbuf times;
        times.actime = time(NULL);
        times.modtime = time(NULL);
        
        if (utime(path, &times) != 0) {
            print_error("Cannot update timestamps of '%s'", path);
            return -1;
        }
        if (verbose) {
            printf("Updated '%s'\n", path);
        }
    }
    
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [options] file...\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "cv")) != -1) {
        switch (opt) {
            case 'c': no_create = 1; break;
            case 'v': verbose = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] file...\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: File(s) required\n");
        return 1;
    }
    
    int error = 0;
    for (int i = optind; i < argc; i++) {
        if (touch_file(argv[i]) != 0) {
            error = 1;
        }
    }
    
    return error;
}


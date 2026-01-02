/*
 * GetLainux mkdir - Create directories
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int parents = 0;
static int verbose = 0;
static mode_t mode = 0755;

int create_path(const char *path) {
    if (file_exists(path)) {
        if (is_directory(path)) {
            return 0;
        }
        print_error("'%s' exists and is not a directory", path);
        return -1;
    }
    
    if (parents) {
        char *path_copy = strdup(path);
        char *p = path_copy;
        
        // Skip leading slashes
        while (*p == '/') p++;
        
        while (*p) {
            p = strchr(p, '/');
            if (!p) p = path_copy + strlen(path_copy);
            
            char c = *p;
            *p = '\0';
            
            if (!file_exists(path_copy)) {
                if (create_directory(path_copy, mode) != 0) {
                    free(path_copy);
                    return -1;
                }
                if (verbose) {
                    printf("Created directory '%s'\n", path_copy);
                }
            }
            
            *p = c;
            if (*p) p++;
        }
        
        free(path_copy);
    } else {
        if (create_directory(path, mode) != 0) {
            return -1;
        }
        if (verbose) {
            printf("Created directory '%s'\n", path);
        }
    }
    
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [options] directory...\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "pm:v")) != -1) {
        switch (opt) {
            case 'p': parents = 1; break;
            case 'm':
                mode = strtol(optarg, NULL, 8);
                break;
            case 'v': verbose = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] directory...\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: Directory name required\n");
        return 1;
    }
    
    int error = 0;
    for (int i = optind; i < argc; i++) {
        if (create_path(argv[i]) != 0) {
            error = 1;
        }
    }
    
    return error;
}


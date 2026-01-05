/*
 * GetLainux rmdir - Remove empty directories
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int parents = 0;
static int verbose = 0;

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [options] directory...\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "pv")) != -1) {
        switch (opt) {
            case 'p': parents = 1; break;
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
        const char *path = argv[i];
        
        if (rmdir(path) == 0) {
            if (verbose) {
                printf("Removed directory '%s'\n", path);
            }
            
            if (parents) {
                char *parent = get_dirname(path);
                while (strcmp(parent, ".") != 0 && strcmp(parent, "/") != 0) {
                    if (rmdir(parent) == 0 && verbose) {
                        printf("Removed directory '%s'\n", parent);
                    } else {
                        break;
                    }
                    char *new_parent = get_dirname(parent);
                    free(parent);
                    parent = new_parent;
                }
                free(parent);
            }
        } else {
            print_error("Cannot remove '%s'", path);
            error = 1;
        }
    }
    
    return error;
}


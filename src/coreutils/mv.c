/*
 * GetLainux mv - Move/rename files
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int interactive = 0;
static int verbose = 0;

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s [options] source... dest\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "iv")) != -1) {
        switch (opt) {
            case 'i': interactive = 1; break;
            case 'v': verbose = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] source... dest\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc - 1) {
        fprintf(stderr, "Error: Source and destination required\n");
        return 1;
    }
    
    const char *dst = argv[argc - 1];
    int is_dir = is_directory(dst);
    
    if (argc - optind > 2 && !is_dir) {
        print_error("Target '%s' is not a directory", dst);
        return 1;
    }
    
    for (int i = optind; i < argc - 1; i++) {
        const char *src = argv[i];
        char dst_path[MAX_PATH];
        
        if (is_dir) {
            char *basename = get_basename(src);
            snprintf(dst_path, sizeof(dst_path), "%s/%s", dst, basename);
            free(basename);
        } else {
            strncpy(dst_path, dst, sizeof(dst_path));
        }
        
        if (interactive && file_exists(dst_path)) {
            printf("Overwrite '%s'? (y/n): ", dst_path);
            int c = getchar();
            if (c != 'y' && c != 'Y') {
                continue;
            }
        }
        
        if (move_file(src, dst_path) == 0 && verbose) {
            printf("'%s' -> '%s'\n", src, dst_path);
        }
    }
    
    return 0;
}


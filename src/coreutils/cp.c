/*
 * GetLainux cp - Copy files and directories
 * Advanced implementation with recursive support
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>
#include <ftw.h>

static int recursive = 0;
static int preserve = 0;
static int interactive = 0;
static int verbose = 0;

int copy_recursive(const char *src, const char *dst) {
    struct stat st;
    if (stat(src, &st) != 0) {
        print_error("Cannot access '%s'", src);
        return -1;
    }
    
    if (S_ISDIR(st.st_mode)) {
        if (create_directory(dst, st.st_mode) != 0) {
            return -1;
        }
        
        DIR *dir = opendir(src);
        if (!dir) {
            print_error("Cannot open directory '%s'", src);
            return -1;
        }
        
        struct dirent *entry;
        while ((entry = readdir(dir)) != NULL) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }
            
            char src_path[MAX_PATH];
            char dst_path[MAX_PATH];
            snprintf(src_path, sizeof(src_path), "%s/%s", src, entry->d_name);
            snprintf(dst_path, sizeof(dst_path), "%s/%s", dst, entry->d_name);
            
            copy_recursive(src_path, dst_path);
        }
        
        closedir(dir);
    } else {
        if (copy_file(src, dst, preserve) != 0) {
            return -1;
        }
        if (verbose) {
            printf("'%s' -> '%s'\n", src, dst);
        }
    }
    
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s [options] source... dest\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "ripv")) != -1) {
        switch (opt) {
            case 'r': recursive = 1; break;
            case 'i': interactive = 1; break;
            case 'p': preserve = 1; break;
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
        
        if (is_directory(src) && !recursive) {
            print_error("'%s' is a directory (use -r)", src);
            continue;
        }
        
        if (recursive || is_directory(src)) {
            copy_recursive(src, dst_path);
        } else {
            if (copy_file(src, dst_path, preserve) == 0 && verbose) {
                printf("'%s' -> '%s'\n", src, dst_path);
            }
        }
    }
    
    return 0;
}


/*
 * GetLainux rm - Remove files and directories
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int recursive = 0;
static int force = 0;
static int interactive = 0;
static int verbose = 0;

int remove_recursive(const char *path) {
    struct stat st;
    if (lstat(path, &st) != 0) {
        if (!force) {
            print_error("Cannot access '%s'", path);
        }
        return force ? 0 : -1;
    }
    
    if (S_ISDIR(st.st_mode)) {
        DIR *dir = opendir(path);
        if (!dir) {
            if (!force) {
                print_error("Cannot open directory '%s'", path);
            }
            return force ? 0 : -1;
        }
        
        struct dirent *entry;
        while ((entry = readdir(dir)) != NULL) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }
            
            char sub_path[MAX_PATH];
            snprintf(sub_path, sizeof(sub_path), "%s/%s", path, entry->d_name);
            remove_recursive(sub_path);
        }
        
        closedir(dir);
        
        if (rmdir(path) != 0 && !force) {
            print_error("Cannot remove directory '%s'", path);
            return -1;
        }
        
        if (verbose) {
            printf("Removed directory '%s'\n", path);
        }
    } else {
        if (remove_file(path) != 0 && !force) {
            return -1;
        }
        if (verbose) {
            printf("Removed '%s'\n", path);
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
    while ((opt = getopt(argc, argv, "rifv")) != -1) {
        switch (opt) {
            case 'r': recursive = 1; break;
            case 'i': interactive = 1; break;
            case 'f': force = 1; break;
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
    
    for (int i = optind; i < argc; i++) {
        const char *path = argv[i];
        
        if (interactive) {
            printf("Remove '%s'? (y/n): ", path);
            int c = getchar();
            if (c != 'y' && c != 'Y') {
                continue;
            }
        }
        
        if (is_directory(path) && !recursive) {
            print_error("'%s' is a directory (use -r)", path);
            continue;
        }
        
        if (recursive || is_directory(path)) {
            remove_recursive(path);
        } else {
            remove_file(path);
        }
    }
    
    return 0;
}


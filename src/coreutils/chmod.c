/*
 * GetLainux chmod - Change file permissions
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int recursive = 0;
static int verbose = 0;

mode_t parse_mode(const char *mode_str) {
    mode_t mode = 0;
    
    if (mode_str[0] >= '0' && mode_str[0] <= '7') {
        // Octal mode
        return strtol(mode_str, NULL, 8);
    }
    
    // Symbolic mode (basic implementation)
    // Format: ugo+-=rwx
    // This is a simplified version
    mode_t current = 0;
    struct stat st;
    
    const char *p = mode_str;
    while (*p) {
        if (*p == 'u') current = S_IRWXU;
        else if (*p == 'g') current = S_IRWXG;
        else if (*p == 'o') current = S_IRWXO;
        else if (*p == 'a') current = S_IRWXU | S_IRWXG | S_IRWXO;
        
        if (p[1] == '+' || p[1] == '-' || p[1] == '=') {
            char op = p[1];
            p += 2;
            
            mode_t bits = 0;
            while (*p && *p != ',') {
                if (*p == 'r') bits |= (S_IRUSR | S_IRGRP | S_IROTH);
                else if (*p == 'w') bits |= (S_IWUSR | S_IWGRP | S_IWOTH);
                else if (*p == 'x') bits |= (S_IXUSR | S_IXGRP | S_IXOTH);
                p++;
            }
            
            if (op == '+') mode |= (current & bits);
            else if (op == '-') mode &= ~(current & bits);
            else if (op == '=') {
                mode &= ~current;
                mode |= (current & bits);
            }
        }
        
        if (*p == ',') p++;
        else break;
    }
    
    return mode;
}

int change_mode(const char *path, mode_t mode) {
    if (chmod(path, mode) == 0) {
        if (verbose) {
            printf("Changed mode of '%s'\n", path);
        }
        return 0;
    }
    print_error("Cannot change mode of '%s'", path);
    return -1;
}

int change_mode_recursive(const char *path, mode_t mode) {
    struct stat st;
    if (stat(path, &st) != 0) {
        print_error("Cannot access '%s'", path);
        return -1;
    }
    
    change_mode(path, mode);
    
    if (S_ISDIR(st.st_mode)) {
        DIR *dir = opendir(path);
        if (!dir) return -1;
        
        struct dirent *entry;
        while ((entry = readdir(dir)) != NULL) {
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }
            
            char sub_path[MAX_PATH];
            snprintf(sub_path, sizeof(sub_path), "%s/%s", path, entry->d_name);
            change_mode_recursive(sub_path, mode);
        }
        
        closedir(dir);
    }
    
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s [options] mode file...\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "Rv")) != -1) {
        switch (opt) {
            case 'R': recursive = 1; break;
            case 'v': verbose = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] mode file...\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: Mode and file(s) required\n");
        return 1;
    }
    
    mode_t mode = parse_mode(argv[optind++]);
    
    if (optind >= argc) {
        fprintf(stderr, "Error: File(s) required\n");
        return 1;
    }
    
    int error = 0;
    for (int i = optind; i < argc; i++) {
        if (recursive) {
            if (change_mode_recursive(argv[i], mode) != 0) {
                error = 1;
            }
        } else {
            if (change_mode(argv[i], mode) != 0) {
                error = 1;
            }
        }
    }
    
    return error;
}


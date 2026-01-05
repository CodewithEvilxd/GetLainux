/*
 * GetLainux ls - List directory contents
 * Advanced implementation with colors and formatting
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include "common/color.h"
#include <dirent.h>
#include <getopt.h>

static int show_all = 0;
static int show_long = 0;
static int show_colors = 1;
static int show_human = 0;
static int recursive = 0;

void print_file_info(const char *path, const char *name) {
    struct stat st;
    char full_path[MAX_PATH];
    snprintf(full_path, sizeof(full_path), "%s/%s", path, name);
    
    if (lstat(full_path, &st) != 0) return;
    
    if (show_long) {
        char perms[11];
        format_permissions(perms, sizeof(perms), st.st_mode);
        
        char time_str[64];
        format_time(time_str, sizeof(time_str), st.st_mtime);
        
        char size_str[32];
        if (show_human) {
            format_size(size_str, sizeof(size_str), st.st_size);
        } else {
            snprintf(size_str, sizeof(size_str), "%ld", (long)st.st_size);
        }
        
        printf("%s %3ld %-8s %-8s %8s %s ",
            perms, (long)st.st_nlink,
            get_user_name(st.st_uid),
            get_group_name(st.st_gid),
            size_str, time_str);
    }
    
    // Color coding
    if (show_colors) {
        if (S_ISDIR(st.st_mode)) {
            printf(COLOR_BLUE);
        } else if (S_ISLNK(st.st_mode)) {
            printf(COLOR_CYAN);
        } else if (st.st_mode & S_IXUSR) {
            printf(COLOR_GREEN);
        }
    }
    
    printf("%s", name);
    
    if (show_colors) {
        printf(COLOR_RESET);
    }
    
    if (S_ISLNK(st.st_mode) && show_long) {
        char link_target[MAX_PATH];
        ssize_t len = readlink(full_path, link_target, sizeof(link_target) - 1);
        if (len != -1) {
            link_target[len] = '\0';
            printf(" -> %s", link_target);
        }
    }
    
    printf("\n");
}

void list_directory(const char *path) {
    DIR *dir = opendir(path);
    if (!dir) {
        print_error("Cannot access '%s'", path);
        return;
    }
    
    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        if (!show_all && entry->d_name[0] == '.') {
            continue;
        }
        
        print_file_info(path, entry->d_name);
    }
    
    closedir(dir);
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "ahlR")) != -1) {
        switch (opt) {
            case 'a': show_all = 1; break;
            case 'h': show_human = 1; break;
            case 'l': show_long = 1; break;
            case 'R': recursive = 1; break;
            default:
                fprintf(stderr, "Usage: %s [-ahlR] [directory...]\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        list_directory(".");
    } else {
        for (int i = optind; i < argc; i++) {
            if (is_directory(argv[i])) {
                if (argc - optind > 1) {
                    printf("%s:\n", argv[i]);
                }
                list_directory(argv[i]);
                if (i < argc - 1) printf("\n");
            } else {
                print_file_info(".", argv[i]);
            }
        }
    }
    
    return 0;
}


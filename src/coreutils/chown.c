/*
 * GetLainux chown - Change file ownership
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>
#include <pwd.h>
#include <grp.h>

static int recursive = 0;
static int verbose = 0;

int parse_ownership(const char *spec, uid_t *uid, gid_t *gid) {
    char *spec_copy = strdup(spec);
    char *colon = strchr(spec_copy, ':');
    
    if (colon) {
        *colon = '\0';
        char *user = spec_copy;
        char *group = colon + 1;
        
        if (*user) {
            struct passwd *pw = getpwnam(user);
            if (!pw) {
                print_error("Invalid user: %s", user);
                free(spec_copy);
                return -1;
            }
            *uid = pw->pw_uid;
        }
        
        if (*group) {
            struct group *gr = getgrnam(group);
            if (!gr) {
                print_error("Invalid group: %s", group);
                free(spec_copy);
                return -1;
            }
            *gid = gr->gr_gid;
        }
    } else {
        struct passwd *pw = getpwnam(spec_copy);
        if (pw) {
            *uid = pw->pw_uid;
            *gid = pw->pw_gid;
        } else {
            print_error("Invalid user: %s", spec_copy);
            free(spec_copy);
            return -1;
        }
    }
    
    free(spec_copy);
    return 0;
}

int change_ownership(const char *path, uid_t uid, gid_t gid) {
    if (chown(path, uid, gid) == 0) {
        if (verbose) {
            printf("Changed ownership of '%s'\n", path);
        }
        return 0;
    }
    print_error("Cannot change ownership of '%s'", path);
    return -1;
}

int change_ownership_recursive(const char *path, uid_t uid, gid_t gid) {
    change_ownership(path, uid, gid);
    
    struct stat st;
    if (stat(path, &st) != 0) return -1;
    
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
            change_ownership_recursive(sub_path, uid, gid);
        }
        
        closedir(dir);
    }
    
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s [options] owner[:group] file...\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "Rv")) != -1) {
        switch (opt) {
            case 'R': recursive = 1; break;
            case 'v': verbose = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] owner[:group] file...\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: Owner and file(s) required\n");
        return 1;
    }
    
    uid_t uid = -1;
    gid_t gid = -1;
    
    if (parse_ownership(argv[optind++], &uid, &gid) != 0) {
        return 1;
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: File(s) required\n");
        return 1;
    }
    
    int error = 0;
    for (int i = optind; i < argc; i++) {
        if (recursive) {
            if (change_ownership_recursive(argv[i], uid, gid) != 0) {
                error = 1;
            }
        } else {
            if (change_ownership(argv[i], uid, gid) != 0) {
                error = 1;
            }
        }
    }
    
    return error;
}


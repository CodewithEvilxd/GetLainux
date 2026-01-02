/*
 * GetLainux Coreutils - Common Utilities Implementation
 * Shared functions for all utilities
 * Author: Nishant Gaurav
 */

#include "utils.h"
#include <stdarg.h>
#include <fcntl.h>
#include <sys/statvfs.h>

// Error printing
void print_error(const char *format, ...) {
    va_list args;
    va_start(args, format);
    fprintf(stderr, "\033[31mError:\033[0m ");
    vfprintf(stderr, format, args);
    fprintf(stderr, "\n");
    va_end(args);
}

void print_warning(const char *format, ...) {
    va_list args;
    va_start(args, format);
    fprintf(stderr, "\033[33mWarning:\033[0m ");
    vfprintf(stderr, format, args);
    fprintf(stderr, "\n");
    va_end(args);
}

void print_info(const char *format, ...) {
    va_list args;
    va_start(args, format);
    fprintf(stdout, "\033[36mInfo:\033[0m ");
    vfprintf(stdout, format, args);
    fprintf(stdout, "\n");
    va_end(args);
}

// File type checks
int is_directory(const char *path) {
    struct stat st;
    if (stat(path, &st) == 0) {
        return S_ISDIR(st.st_mode);
    }
    return 0;
}

int is_regular_file(const char *path) {
    struct stat st;
    if (stat(path, &st) == 0) {
        return S_ISREG(st.st_mode);
    }
    return 0;
}

int is_symlink(const char *path) {
    struct stat st;
    if (lstat(path, &st) == 0) {
        return S_ISLNK(st.st_mode);
    }
    return 0;
}

int file_exists(const char *path) {
    return access(path, F_OK) == 0;
}

// Path utilities
char *get_absolute_path(const char *path) {
    char *abs_path = realpath(path, NULL);
    if (!abs_path) {
        char *cwd = getcwd(NULL, 0);
        if (cwd) {
            size_t len = strlen(cwd) + strlen(path) + 2;
            abs_path = malloc(len);
            snprintf(abs_path, len, "%s/%s", cwd, path);
            free(cwd);
        }
    }
    return abs_path;
}

char *get_basename(const char *path) {
    const char *base = strrchr(path, '/');
    if (base) {
        return strdup(base + 1);
    }
    return strdup(path);
}

char *get_dirname(const char *path) {
    char *path_copy = strdup(path);
    char *dir = dirname(path_copy);
    char *result = strdup(dir);
    free(path_copy);
    return result;
}

// Formatting utilities
void format_size(char *buffer, size_t size, off_t bytes) {
    const char *units[] = {"B", "KB", "MB", "GB", "TB"};
    double size_val = bytes;
    int unit = 0;
    
    while (size_val >= 1024 && unit < 4) {
        size_val /= 1024;
        unit++;
    }
    
    if (unit == 0) {
        snprintf(buffer, size, "%ld", (long)bytes);
    } else {
        snprintf(buffer, size, "%.2f%s", size_val, units[unit]);
    }
}

void format_time(char *buffer, size_t size, time_t time) {
    struct tm *tm_info = localtime(&time);
    strftime(buffer, size, "%Y-%m-%d %H:%M:%S", tm_info);
}

void format_permissions(char *buffer, size_t size, mode_t mode) {
    snprintf(buffer, size, "%c%c%c%c%c%c%c%c%c%c",
        (mode & S_IFDIR) ? 'd' : (mode & S_IFLNK) ? 'l' : '-',
        (mode & S_IRUSR) ? 'r' : '-',
        (mode & S_IWUSR) ? 'w' : '-',
        (mode & S_IXUSR) ? 'x' : '-',
        (mode & S_IRGRP) ? 'r' : '-',
        (mode & S_IWGRP) ? 'w' : '-',
        (mode & S_IXGRP) ? 'x' : '-',
        (mode & S_IROTH) ? 'r' : '-',
        (mode & S_IWOTH) ? 'w' : '-',
        (mode & S_IXOTH) ? 'x' : '-');
}

const char *get_file_type(mode_t mode) {
    if (S_ISREG(mode)) return "regular file";
    if (S_ISDIR(mode)) return "directory";
    if (S_ISLNK(mode)) return "symbolic link";
    if (S_ISCHR(mode)) return "character device";
    if (S_ISBLK(mode)) return "block device";
    if (S_ISFIFO(mode)) return "FIFO";
    if (S_ISSOCK(mode)) return "socket";
    return "unknown";
}

const char *get_user_name(uid_t uid) {
    struct passwd *pw = getpwuid(uid);
    return pw ? pw->pw_name : "unknown";
}

const char *get_group_name(gid_t gid) {
    struct group *gr = getgrgid(gid);
    return gr ? gr->gr_name : "unknown";
}

// File operations
int copy_file(const char *src, const char *dst, int preserve) {
    FILE *src_file = fopen(src, "rb");
    if (!src_file) {
        print_error("Cannot open source file: %s", src);
        return -1;
    }
    
    FILE *dst_file = fopen(dst, "wb");
    if (!dst_file) {
        fclose(src_file);
        print_error("Cannot create destination file: %s", dst);
        return -1;
    }
    
    char buffer[8192];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src_file)) > 0) {
        if (fwrite(buffer, 1, bytes, dst_file) != bytes) {
            fclose(src_file);
            fclose(dst_file);
            print_error("Write error to: %s", dst);
            return -1;
        }
    }
    
    fclose(src_file);
    fclose(dst_file);
    
    if (preserve) {
        struct stat st;
        if (stat(src, &st) == 0) {
            chmod(dst, st.st_mode);
        }
    }
    
    return 0;
}

int move_file(const char *src, const char *dst) {
    if (rename(src, dst) == 0) {
        return 0;
    }
    
    // Fallback: copy and remove
    if (copy_file(src, dst, 1) == 0) {
        remove(src);
        return 0;
    }
    
    return -1;
}

int remove_file(const char *path) {
    if (unlink(path) == 0) {
        return 0;
    }
    print_error("Cannot remove: %s", path);
    return -1;
}

int create_directory(const char *path, mode_t mode) {
    if (mkdir(path, mode) == 0) {
        return 0;
    }
    if (errno == EEXIST) {
        return 0; // Already exists
    }
    print_error("Cannot create directory: %s", path);
    return -1;
}

// String utilities
char *trim_whitespace(char *str) {
    char *end;
    while (*str == ' ' || *str == '\t' || *str == '\n') str++;
    if (*str == 0) return str;
    end = str + strlen(str) - 1;
    while (end > str && (*end == ' ' || *end == '\t' || *end == '\n')) end--;
    end[1] = '\0';
    return str;
}

int str_starts_with(const char *str, const char *prefix) {
    return strncmp(str, prefix, strlen(prefix)) == 0;
}

int str_ends_with(const char *str, const char *suffix) {
    size_t str_len = strlen(str);
    size_t suffix_len = strlen(suffix);
    if (suffix_len > str_len) return 0;
    return strcmp(str + str_len - suffix_len, suffix) == 0;
}

// File reading
char *read_file_contents(const char *path, size_t *size) {
    FILE *file = fopen(path, "rb");
    if (!file) return NULL;
    
    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);
    fseek(file, 0, SEEK_SET);
    
    char *buffer = malloc(file_size + 1);
    if (!buffer) {
        fclose(file);
        return NULL;
    }
    
    size_t read = fread(buffer, 1, file_size, file);
    buffer[read] = '\0';
    
    fclose(file);
    if (size) *size = read;
    return buffer;
}

int read_file_lines(const char *path, char ***lines, size_t *count) {
    FILE *file = fopen(path, "r");
    if (!file) return -1;
    
    char **line_array = NULL;
    size_t line_count = 0;
    char *line = NULL;
    size_t len = 0;
    
    while (getline(&line, &len, file) != -1) {
        line_array = realloc(line_array, (line_count + 1) * sizeof(char*));
        line_array[line_count] = strdup(line);
        trim_whitespace(line_array[line_count]);
        line_count++;
    }
    
    free(line);
    fclose(file);
    
    *lines = line_array;
    *count = line_count;
    return 0;
}


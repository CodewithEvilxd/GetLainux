/*
 * GetLainux Coreutils - Common Utilities Header
 * Shared functions and definitions for all utilities
 * Author: Nishant Gaurav
 */

#ifndef GETLAINUX_UTILS_H
#define GETLAINUX_UTILS_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <dirent.h>
#include <time.h>
#include <errno.h>
#include <limits.h>
#include <pwd.h>
#include <grp.h>

// Buffer sizes
#define MAX_PATH 4096
#define MAX_LINE 8192
#define MAX_BUFFER 65536

// File type macros
#define IS_REGULAR(mode) (((mode) & S_IFMT) == S_IFREG)
#define IS_DIRECTORY(mode) (((mode) & S_IFMT) == S_IFDIR)
#define IS_SYMLINK(mode) (((mode) & S_IFMT) == S_IFLNK)

// Permission helpers
#define PERM_READ(mode) ((mode) & S_IRUSR)
#define PERM_WRITE(mode) ((mode) & S_IWUSR)
#define PERM_EXEC(mode) ((mode) & S_IXUSR)

// Function prototypes
void print_error(const char *format, ...);
void print_warning(const char *format, ...);
void print_info(const char *format, ...);

int is_directory(const char *path);
int is_regular_file(const char *path);
int is_symlink(const char *path);
int file_exists(const char *path);

char *get_absolute_path(const char *path);
char *get_basename(const char *path);
char *get_dirname(const char *path);

void format_size(char *buffer, size_t size, off_t bytes);
void format_time(char *buffer, size_t size, time_t time);
void format_permissions(char *buffer, size_t size, mode_t mode);

const char *get_file_type(mode_t mode);
const char *get_user_name(uid_t uid);
const char *get_group_name(gid_t gid);

int copy_file(const char *src, const char *dst, int preserve);
int move_file(const char *src, const char *dst);
int remove_file(const char *path);
int create_directory(const char *path, mode_t mode);

// String utilities
char *trim_whitespace(char *str);
char *str_replace(char *str, const char *old, const char *new);
int str_starts_with(const char *str, const char *prefix);
int str_ends_with(const char *str, const char *suffix);

// File reading utilities
char *read_file_contents(const char *path, size_t *size);
int read_file_lines(const char *path, char ***lines, size_t *count);

#endif // GETLAINUX_UTILS_H


/*
 * GetLainux grep - Search for patterns in files
 * Advanced implementation with regex support
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include "common/color.h"
#include <getopt.h>
#include <regex.h>

static int case_insensitive = 0;
static int invert_match = 0;
static int show_line_numbers = 0;
static int show_count = 0;
static int show_only_files = 0;
static int recursive = 0;
static int color_output = 1;

regex_t compile_pattern(const char *pattern) {
    regex_t regex;
    int flags = REG_EXTENDED;
    if (case_insensitive) flags |= REG_ICASE;
    
    if (regcomp(&regex, pattern, flags) != 0) {
        print_error("Invalid regex pattern");
        exit(1);
    }
    
    return regex;
}

void search_in_file(const char *filepath, regex_t *regex) {
    FILE *file = fopen(filepath, "r");
    if (!file) {
        print_error("Cannot open '%s'", filepath);
        return;
    }
    
    char *line = NULL;
    size_t len = 0;
    int line_num = 1;
    int match_count = 0;
    
    while (getline(&line, &len, file) != -1) {
        int match = regexec(regex, line, 0, NULL, 0) == 0;
        if (invert_match) match = !match;
        
        if (match) {
            match_count++;
            
            if (show_only_files) {
                printf("%s\n", filepath);
                break;
            }
            
            if (show_count) continue;
            
            if (color_output) {
                printf(COLOR_GREEN);
            }
            
            if (show_line_numbers) {
                printf("%s:%d:", filepath, line_num);
            }
            
            printf("%s", line);
            
            if (color_output) {
                printf(COLOR_RESET);
            }
        }
        
        line_num++;
    }
    
    if (show_count) {
        printf("%s:%d\n", filepath, match_count);
    }
    
    free(line);
    fclose(file);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [options] pattern [file...]\n", argv[0]);
        return 1;
    }
    
    int opt;
    while ((opt = getopt(argc, argv, "icnrl")) != -1) {
        switch (opt) {
            case 'i': case_insensitive = 1; break;
            case 'c': show_count = 1; break;
            case 'n': show_line_numbers = 1; break;
            case 'r': recursive = 1; break;
            case 'l': show_only_files = 1; break;
            default:
                fprintf(stderr, "Usage: %s [options] pattern [file...]\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        fprintf(stderr, "Error: Pattern required\n");
        return 1;
    }
    
    const char *pattern = argv[optind++];
    regex_t regex = compile_pattern(pattern);
    
    if (optind >= argc) {
        // Read from stdin
        char *line = NULL;
        size_t len = 0;
        while (getline(&line, &len, stdin) != -1) {
            int match = regexec(&regex, line, 0, NULL, 0) == 0;
            if (invert_match) match = !match;
            if (match) {
                printf("%s", line);
            }
        }
        free(line);
    } else {
        for (int i = optind; i < argc; i++) {
            search_in_file(argv[i], &regex);
        }
    }
    
    regfree(&regex);
    return 0;
}


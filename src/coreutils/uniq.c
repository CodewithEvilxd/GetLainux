/*
 * GetLainux uniq - Remove duplicate lines
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int count = 0;
static int show_all = 0;

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "cd")) != -1) {
        switch (opt) {
            case 'c': count = 1; break;
            case 'd': show_all = 1; break;
            default:
                fprintf(stderr, "Usage: %s [-cd] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    FILE *file = (optind < argc) ? fopen(argv[optind], "r") : stdin;
    if (!file && optind < argc) {
        print_error("Cannot open '%s'", argv[optind]);
        return 1;
    }
    
    char *prev_line = NULL;
    size_t prev_len = 0;
    char *line = NULL;
    size_t len = 0;
    int line_count = 1;
    
    while (getline(&line, &len, file) != -1) {
        if (prev_line && strcmp(prev_line, line) == 0) {
            line_count++;
        } else {
            if (prev_line) {
                if (count) {
                    printf("%7d %s", line_count, prev_line);
                } else {
                    printf("%s", prev_line);
                }
            }
            free(prev_line);
            prev_line = strdup(line);
            line_count = 1;
        }
    }
    
    if (prev_line) {
        if (count) {
            printf("%7d %s", line_count, prev_line);
        } else {
            printf("%s", prev_line);
        }
        free(prev_line);
    }
    
    free(line);
    if (file != stdin) fclose(file);
    
    return 0;
}


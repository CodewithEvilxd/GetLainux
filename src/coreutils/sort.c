/*
 * GetLainux sort - Sort lines of text
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>
#include <stdlib.h>

static int numeric = 0;
static int reverse = 0;
static int unique = 0;

int compare_strings(const void *a, const void *b) {
    const char **str_a = (const char **)a;
    const char **str_b = (const char **)b;
    
    if (numeric) {
        long num_a = strtol(*str_a, NULL, 10);
        long num_b = strtol(*str_b, NULL, 10);
        return reverse ? (num_b - num_a) : (num_a - num_b);
    }
    
    int cmp = strcmp(*str_a, *str_b);
    return reverse ? -cmp : cmp;
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "nru")) != -1) {
        switch (opt) {
            case 'n': numeric = 1; break;
            case 'r': reverse = 1; break;
            case 'u': unique = 1; break;
            default:
                fprintf(stderr, "Usage: %s [-nru] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    char **lines = NULL;
    size_t count = 0;
    size_t capacity = 1024;
    lines = malloc(capacity * sizeof(char*));
    
    FILE *file = (optind < argc) ? fopen(argv[optind], "r") : stdin;
    if (!file && optind < argc) {
        print_error("Cannot open '%s'", argv[optind]);
        return 1;
    }
    
    char *line = NULL;
    size_t len = 0;
    while (getline(&line, &len, file) != -1) {
        if (count >= capacity) {
            capacity *= 2;
            lines = realloc(lines, capacity * sizeof(char*));
        }
        lines[count++] = strdup(line);
    }
    
    free(line);
    if (file != stdin) fclose(file);
    
    qsort(lines, count, sizeof(char*), compare_strings);
    
    for (size_t i = 0; i < count; i++) {
        if (unique && i > 0 && strcmp(lines[i], lines[i-1]) == 0) {
            continue;
        }
        printf("%s", lines[i]);
        free(lines[i]);
    }
    
    free(lines);
    return 0;
}


/*
 * GetLainux cat - Concatenate and print files
 * Advanced implementation with line numbers and more
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include "common/color.h"
#include <getopt.h>

static int show_line_numbers = 0;
static int show_nonprintable = 0;
static int squeeze_blank = 0;

void print_file(const char *path) {
    FILE *file = fopen(path, "r");
    if (!file) {
        print_error("Cannot open '%s'", path);
        return;
    }
    
    char *line = NULL;
    size_t len = 0;
    int line_num = 1;
    int prev_blank = 0;
    
    while (getline(&line, &len, file) != -1) {
        int is_blank = (line[0] == '\n' || line[0] == '\0');
        
        if (squeeze_blank && is_blank && prev_blank) {
            continue;
        }
        prev_blank = is_blank;
        
        if (show_line_numbers) {
            printf("%6d  ", line_num++);
        }
        
        if (show_nonprintable) {
            for (size_t i = 0; line[i]; i++) {
                if (line[i] == '\n') {
                    printf("$\n");
                } else if (line[i] == '\t') {
                    printf("^I");
                } else if (line[i] < 32 || line[i] > 126) {
                    printf("^%c", line[i] + 64);
                } else {
                    putchar(line[i]);
                }
            }
        } else {
            printf("%s", line);
        }
    }
    
    free(line);
    fclose(file);
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "nbs")) != -1) {
        switch (opt) {
            case 'n': show_line_numbers = 1; break;
            case 'b': show_line_numbers = 1; break; // Number non-blank
            case 's': squeeze_blank = 1; break;
            default:
                fprintf(stderr, "Usage: %s [-nbs] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        // Read from stdin
        char buffer[4096];
        while (fgets(buffer, sizeof(buffer), stdin)) {
            printf("%s", buffer);
        }
    } else {
        for (int i = optind; i < argc; i++) {
            if (strcmp(argv[i], "-") == 0) {
                // Read from stdin
                char buffer[4096];
                while (fgets(buffer, sizeof(buffer), stdin)) {
                    printf("%s", buffer);
                }
            } else {
                print_file(argv[i]);
            }
        }
    }
    
    return 0;
}


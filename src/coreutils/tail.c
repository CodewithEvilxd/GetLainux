/*
 * GetLainux tail - Output last lines of files
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int num_lines = 10;
static int follow = 0;

void print_tail(FILE *file, const char *filename) {
    char **lines = NULL;
    size_t count = 0;
    size_t capacity = num_lines;
    lines = malloc(capacity * sizeof(char*));
    
    char *line = NULL;
    size_t len = 0;
    size_t index = 0;
    
    while (getline(&line, &len, file) != -1) {
        if (count >= capacity) {
            free(lines[index]);
            lines[index] = strdup(line);
            index = (index + 1) % capacity;
        } else {
            lines[count++] = strdup(line);
        }
    }
    
    free(line);
    
    // Print lines
    for (size_t i = 0; i < count; i++) {
        if (filename && optind < argc) {
            printf("%s: ", filename);
        }
        printf("%s", lines[i]);
        free(lines[i]);
    }
    
    free(lines);
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "n:f")) != -1) {
        switch (opt) {
            case 'n':
                num_lines = atoi(optarg);
                break;
            case 'f':
                follow = 1;
                break;
            default:
                fprintf(stderr, "Usage: %s [-n lines] [-f] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        print_tail(stdin, NULL);
    } else {
        for (int i = optind; i < argc; i++) {
            FILE *file = fopen(argv[i], "r");
            if (!file) {
                print_error("Cannot open '%s'", argv[i]);
                continue;
            }
            
            if (argc - optind > 1) {
                printf("==> %s <==\n", argv[i]);
            }
            
            print_tail(file, argv[i]);
            fclose(file);
            
            if (i < argc - 1) {
                printf("\n");
            }
        }
    }
    
    return 0;
}


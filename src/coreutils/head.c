/*
 * GetLainux head - Output first lines of files
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int num_lines = 10;

void print_head(FILE *file, const char *filename) {
    char *line = NULL;
    size_t len = 0;
    int count = 0;
    
    while (count < num_lines && getline(&line, &len, file) != -1) {
        if (filename && optind < argc) {
            printf("%s: ", filename);
        }
        printf("%s", line);
        count++;
    }
    
    free(line);
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "n:")) != -1) {
        switch (opt) {
            case 'n':
                num_lines = atoi(optarg);
                break;
            default:
                fprintf(stderr, "Usage: %s [-n lines] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    if (optind >= argc) {
        print_head(stdin, NULL);
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
            
            print_head(file, argv[i]);
            fclose(file);
            
            if (i < argc - 1) {
                printf("\n");
            }
        }
    }
    
    return 0;
}


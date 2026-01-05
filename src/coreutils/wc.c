/*
 * GetLainux wc - Word count
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>
#include <ctype.h>

static int show_lines = 0;
static int show_words = 0;
static int show_bytes = 0;
static int show_chars = 0;

void count_file(FILE *file, long *lines, long *words, long *bytes, long *chars) {
    *lines = *words = *bytes = *chars = 0;
    
    int in_word = 0;
    int c;
    
    while ((c = fgetc(file)) != EOF) {
        (*bytes)++;
        (*chars)++;
        
        if (c == '\n') {
            (*lines)++;
        }
        
        if (isspace(c)) {
            if (in_word) {
                (*words)++;
                in_word = 0;
            }
        } else {
            in_word = 1;
        }
    }
    
    if (in_word) {
        (*words)++;
    }
}

void print_counts(long lines, long words, long bytes, long chars, const char *filename) {
    if (show_lines) printf("%8ld ", lines);
    if (show_words) printf("%8ld ", words);
    if (show_bytes) printf("%8ld ", bytes);
    if (show_chars) printf("%8ld ", chars);
    if (filename) printf(" %s", filename);
    printf("\n");
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "lwcm")) != -1) {
        switch (opt) {
            case 'l': show_lines = 1; break;
            case 'w': show_words = 1; break;
            case 'c': show_bytes = 1; break;
            case 'm': show_chars = 1; break;
            default:
                fprintf(stderr, "Usage: %s [-lwcm] [file...]\n", argv[0]);
                return 1;
        }
    }
    
    // Default: show all
    if (!show_lines && !show_words && !show_bytes && !show_chars) {
        show_lines = show_words = show_bytes = 1;
    }
    
    if (optind >= argc) {
        long lines, words, bytes, chars;
        count_file(stdin, &lines, &words, &bytes, &chars);
        print_counts(lines, words, bytes, chars, NULL);
    } else {
        long total_lines = 0, total_words = 0, total_bytes = 0, total_chars = 0;
        
        for (int i = optind; i < argc; i++) {
            FILE *file = fopen(argv[i], "r");
            if (!file) {
                print_error("Cannot open '%s'", argv[i]);
                continue;
            }
            
            long lines, words, bytes, chars;
            count_file(file, &lines, &words, &bytes, &chars);
            print_counts(lines, words, bytes, chars, argv[i]);
            
            total_lines += lines;
            total_words += words;
            total_bytes += bytes;
            total_chars += chars;
            
            fclose(file);
        }
        
        if (argc - optind > 1) {
            print_counts(total_lines, total_words, total_bytes, total_chars, "total");
        }
    }
    
    return 0;
}


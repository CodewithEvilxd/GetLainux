/*
 * GetLainux echo - Display a line of text
 * Advanced implementation with escape sequences
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

static int interpret_escapes = 0;
static int no_newline = 0;

void print_escaped(const char *str) {
    for (const char *p = str; *p; p++) {
        if (*p == '\\' && interpret_escapes) {
            switch (p[1]) {
                case 'n': putchar('\n'); p++; break;
                case 't': putchar('\t'); p++; break;
                case 'r': putchar('\r'); p++; break;
                case 'a': putchar('\a'); p++; break;
                case 'b': putchar('\b'); p++; break;
                case 'v': putchar('\v'); p++; break;
                case 'f': putchar('\f'); p++; break;
                case '\\': putchar('\\'); p++; break;
                default: putchar(*p); break;
            }
        } else {
            putchar(*p);
        }
    }
}

int main(int argc, char *argv[]) {
    int opt;
    while ((opt = getopt(argc, argv, "neE")) != -1) {
        switch (opt) {
            case 'n': no_newline = 1; break;
            case 'e': interpret_escapes = 1; break;
            case 'E': interpret_escapes = 0; break;
            default:
                fprintf(stderr, "Usage: %s [-neE] [string...]\n", argv[0]);
                return 1;
        }
    }
    
    for (int i = optind; i < argc; i++) {
        if (i > optind) putchar(' ');
        print_escaped(argv[i]);
    }
    
    if (!no_newline) {
        putchar('\n');
    }
    
    return 0;
}


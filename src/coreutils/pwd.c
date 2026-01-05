/*
 * GetLainux pwd - Print working directory
 * Author: Nishant Gaurav
 */

#include "common/utils.h"
#include <getopt.h>

int main(int argc, char *argv[]) {
    char *cwd = getcwd(NULL, 0);
    if (!cwd) {
        print_error("Cannot get current directory");
        return 1;
    }
    
    printf("%s\n", cwd);
    free(cwd);
    
    return 0;
}


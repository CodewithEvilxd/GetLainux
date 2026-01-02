/*
 * Error handling utilities
 */

#ifndef ERROR_H
#define ERROR_H

#include <errno.h>
#include <string.h>

#define ERROR_MSG(msg) fprintf(stderr, "Error: %s: %s\n", msg, strerror(errno))

#endif


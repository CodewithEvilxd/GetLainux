# GetLainux Coreutils Makefile
# Advanced C utilities suite for GetLainux
# Author: Nishant Gaurav

CC = gcc
CFLAGS = -Wall -Wextra -O2 -std=c11 -D_GNU_SOURCE
LDFLAGS = 
PREFIX = /usr/local
BINDIR = $(PREFIX)/bin
MANDIR = $(PREFIX)/share/man/man1

# All utilities (implemented)
UTILS = ls cat echo grep cp mv rm mkdir rmdir chmod chown touch head tail wc sort uniq pwd

# Source files
SOURCES = $(addsuffix .c, $(UTILS))
OBJECTS = $(addsuffix .o, $(UTILS))
BINARIES = $(addprefix bin/, $(UTILS))

# Common source files
COMMON_SRC = common/utils.c common/color.c common/error.c
COMMON_OBJ = $(COMMON_SRC:.c=.o)

.PHONY: all clean install uninstall test

all: $(BINARIES)

# Create bin directory
bin:
	mkdir -p bin

# Build each utility
bin/%: %.o $(COMMON_OBJ) | bin
	$(CC) $(LDFLAGS) -o $@ $< $(COMMON_OBJ)
	@echo "Built: $@"

# Compile source files
%.o: %.c common/utils.h common/color.h common/error.h
	$(CC) $(CFLAGS) -c $< -o $@

# Common object files
common/%.o: common/%.c common/%.h
	$(CC) $(CFLAGS) -c $< -o $@

# Install all utilities
install: all
	@echo "Installing getlainux-coreutils..."
	mkdir -p $(DESTDIR)$(BINDIR)
	cp $(BINARIES) $(DESTDIR)$(BINDIR)/
	chmod +x $(DESTDIR)$(BINDIR)/*
	@echo "Installed to $(DESTDIR)$(BINDIR)"

# Uninstall
uninstall:
	@echo "Uninstalling getlainux-coreutils..."
	rm -f $(addprefix $(DESTDIR)$(BINDIR)/, $(UTILS))
	@echo "Uninstalled"

# Clean build files
clean:
	rm -rf bin/ *.o common/*.o
	@echo "Cleaned"

# Test utilities
test: all
	@echo "Running tests..."
	@./test/test_all.sh || true

# Package for Arch Linux
package: all
	@echo "Creating package..."
	mkdir -p pkg/usr/bin
	cp $(BINARIES) pkg/usr/bin/
	@echo "Package ready in pkg/"


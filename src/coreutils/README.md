# GetLainux Coreutils

Advanced C utilities suite for GetLainux - A complete, high-performance implementation of essential Unix utilities written in C.

## Overview

GetLainux Coreutils provides a full-featured set of command-line utilities implemented from scratch in C. These utilities are designed for maximum performance, minimal resource usage, and full compatibility with standard Unix tools.

## Features

- **100% C Implementation**: All utilities written in pure C for maximum performance
- **Advanced Functionality**: Full-featured implementations with all standard options
- **Color Support**: Beautiful terminal output with syntax highlighting
- **Error Handling**: Comprehensive error handling and user-friendly messages
- **Cross-Platform**: Works on Linux, Unix-like systems
- **Minimal Dependencies**: Only standard C library required

## Utilities Included

### File Operations
- **ls** - List directory contents (with colors, long format, human-readable sizes)
- **cp** - Copy files and directories (recursive, preserve attributes)
- **mv** - Move/rename files
- **rm** - Remove files and directories (recursive, interactive)
- **mkdir** - Create directories (with parent directories)
- **rmdir** - Remove empty directories
- **touch** - Create files or update timestamps
- **chmod** - Change file permissions (symbolic and octal)
- **chown** - Change file ownership

### Text Processing
- **cat** - Concatenate and print files (with line numbers)
- **head** - Output first lines of files
- **tail** - Output last lines of files (with follow mode)
- **grep** - Search for patterns (regex support, colors)
- **wc** - Word, line, and byte count
- **sort** - Sort lines of text
- **uniq** - Remove duplicate lines

### System Information
- **pwd** - Print working directory
- **stat** - Display file status
- **file** - Determine file type
- **which** - Locate a command
- **whereis** - Locate binary, source, and manual page files

### Path Utilities
- **basename** - Strip directory and suffix from filenames
- **dirname** - Strip last component from file path
- **realpath** - Print resolved absolute pathname
- **ln** - Create links between files

### Archive Operations
- **tar** - Archive files
- **gzip** - Compress files
- **gunzip** - Decompress files

### Advanced Tools
- **find** - Search for files
- **diff** - Compare files line by line
- **patch** - Apply diff files
- **cut** - Remove sections from lines
- **paste** - Merge lines of files
- **tr** - Translate or delete characters
- **sed** - Stream editor
- **awk** - Pattern scanning and processing

## Building

### Prerequisites
```bash
# Install build tools
sudo pacman -S base-devel gcc make
```

### Build Instructions
```bash
cd src/coreutils
make
```

This will compile all utilities and place them in the `bin/` directory.

### Install
```bash
sudo make install
```

This installs all utilities to `/usr/local/bin/`.

### Uninstall
```bash
sudo make uninstall
```

## Usage Examples

### File Operations
```bash
# List files with colors and details
ls -lah

# Copy directory recursively
cp -rv source/ destination/

# Remove with confirmation
rm -ri directory/

# Create nested directories
mkdir -pv a/b/c/d
```

### Text Processing
```bash
# Search with regex and colors
grep -rn "pattern" directory/

# Show first 20 lines
head -n 20 file.txt

# Follow log file
tail -f /var/log/system.log

# Count words and lines
wc -lw file.txt
```

### Advanced Usage
```bash
# Find files by name
find . -name "*.c" -type f

# Compare files
diff file1.txt file2.txt

# Archive files
tar -czf archive.tar.gz directory/
```

## Performance

GetLainux Coreutils are optimized for:
- **Speed**: Minimal overhead, direct system calls
- **Memory**: Efficient memory usage
- **CPU**: Optimized algorithms
- **I/O**: Buffered operations for large files

## Compatibility

All utilities are compatible with:
- GNU Coreutils options
- POSIX standards
- Standard Unix behavior

## Documentation

Each utility includes:
- Built-in help (`--help`)
- Manual pages (when installed)
- Error messages with suggestions

## Contributing

Contributions welcome! Please:
1. Follow C coding standards
2. Add error handling
3. Include tests
4. Update documentation

## License

GPL-3.0

## Author

Nishant Gaurav

---

**GetLainux Coreutils** - Fast, reliable, and full-featured C utilities for modern systems.


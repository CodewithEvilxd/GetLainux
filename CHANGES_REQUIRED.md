# GetLainux Project - Required Changes List

This document lists all the changes that need to be made to customize the project with your own name.

## 📋 Overview

This project was originally developed by **wienton**. Now it needs to be customized with your own name.

---

## 🔴 CRITICAL CHANGES (Must Do)

### 1. **Change Author/Developer Names**

#### Replace "wienton" or "Wienton" in files:

**C Source Files:**
- `src/utils/network_connection/network_state.c` - Line 3: `@author Wienton`
- `src/utils/network_connection/network_sniffer.c` - Line 2: `@author: Wienton`
- `src/lainux-driver/src/lainux_driver.c` - Line 5: `@author wienton, lainux development lab`
- `src/installer/ui/logo.c` - Line 3: `@author wienton, lainux development laboratory`
- `src/installer/main.c` - Line 4: `@authors Wienton Low-Level Developer...`
- `src/installer/installer.c` - Line 4: `@author Wienton | Lainux Development Laboratory`

**Configuration Files:**
- `configs/lainux.cfg` - Line 4: `author=wienton, lainux development laboratory`

**Documentation:**
- `README.md` - Multiple lines:
  - Line 4: `Developed by **wienton**`
  - Line 32: `Current development phases being driven by \`wienton\``
  - Line 56: `**wienton** is a dedicated system programmer...`

---

### 2. **Change Repository URLs**

#### Update GitHub/Codeberg URLs:

**Go Module Path:**
- `go/go.mod` - Line 1: `module codeberg.org/wienton/LainuxOS`
  - Change to: `module github.com/YOUR_USERNAME/GetLainux` (or your repository path)

**Go Import Statements:**
- `go/main.go` - Line 7: `"github.com/wienton/LainuxOS/go/internal/ui"`
  - Change to: `"github.com/YOUR_USERNAME/GetLainux/go/internal/ui"`

**Download URLs in C Code:**
- `src/installer/include/installer.h` - Lines 8-10:
  - Line 8: `#define CORE_URL "https://github.com/wienton/Lainux/raw/main/..."`
  - Line 9: `#define FALLBACK_CORE_URL "https://mirror.lainux.org/core/..."`
  - Line 10: `#define ARCH_ISO_URL "https://github.com/wienton/Lainux/releases/download/..."`
  - Replace these URLs with your repository URLs

**README Logo URL:**
- `README.md` - Line 2: `![Lainux Logo](https://raw.githubusercontent.com/wienton/lainux/main/assets/logo.png)`
  - Update with your repository path

---

### 3. **Kernel Configuration**

- `kernel/config.txt` - Line 5: `AUTHOR=LAINUX_LAB`
  - Set your author name

---

### 4. **Copyright Notices**

Check if copyright notices contain the original author's name:
- `src/installer/ui/logo.c` - Line 8: `@copyright Copyright (c) 2025`
  - Update if you need to change the copyright owner

---

## 🟡 IMPORTANT CHANGES (Should Do)

### 5. **Go Module Dependencies**

- `go/go.mod` contains Russian comments (Lines 6-7):
  - `# TUI библиотека` → `# TUI library`
  - `# CLI команды (если нужно)` → `# CLI commands (if needed)`
  - Translate to English if you want to keep it in English

### 6. **Error Messages in Russian**

- `go/main.go` - Line 12: `"Ошибка: %v\n"` (Russian error message)
  - Change to: `"Error: %v\n"` (English)

### 7. **UI Welcome Message**

- `go/internal/ui/tui.go` - Line 11: `"Добро пожаловать в установщик вашего дистрибутива!"` (Russian)
  - Change to: `"Welcome to GetLainux Installer!"` (or your custom message)

---

## 🟢 OPTIONAL CHANGES (Nice to Have)

### 8. **Version Numbers**

If you want to update the version:
- `configs/lainux.cfg` - Line 2: `verison=0.1` (also has a typo - should be "version")
- `kernel/config.txt` - Line 4: `VERSION=1.1`

### 9. **Date Updates**

- `configs/lainux.cfg` - Line 3: `date=25.12.25`
  - Set current date

### 10. **Project Description**

- Update "About the Author" section in `README.md` (Lines 55-57)
  - Add information about yourself

---

## 📝 Summary Checklist

### Files to Modify:

1. ✅ `README.md` - Author references, repository URLs
2. ✅ `go/go.mod` - Module path
3. ✅ `go/main.go` - Import path, error messages
4. ✅ `go/internal/ui/tui.go` - Welcome message
5. ✅ `src/installer/include/installer.h` - Download URLs
6. ✅ `configs/lainux.cfg` - Author name, version, date
7. ✅ `kernel/config.txt` - Author name
8. ✅ `src/installer/main.c` - Author comment
9. ✅ `src/installer/installer.c` - Author comment
10. ✅ `src/installer/ui/logo.c` - Author comment
11. ✅ `src/utils/network_connection/network_state.c` - Author comment
12. ✅ `src/utils/network_connection/network_sniffer.c` - Author comment
13. ✅ `src/lainux-driver/src/lainux_driver.c` - Author comment

### Key Replacements Needed:

- `wienton` → `YOUR_NAME`
- `Wienton` → `YOUR_NAME`
- `github.com/wienton` → `github.com/YOUR_USERNAME`
- `codeberg.org/wienton` → `github.com/YOUR_USERNAME` (or your platform)
- `lainux development laboratory` → `YOUR_ORGANIZATION` (optional)
- `LAINUX_LAB` → `YOUR_LAB_NAME` (optional)

---

## ⚠️ Important Notes

1. **Repository Setup**: First create your GitHub/Codeberg repository
2. **URLs Update**: Replace all download URLs with your repository URLs
3. **Testing**: Test the code after every change
4. **Git History**: Be careful if you want to keep the original git history
5. **License**: Check the license file, update if needed

---

## 🚀 Next Steps

1. Create your repository
2. Make changes in the files listed above
3. Update all URLs and paths
4. Test the code
5. Update documentation
6. Commit and push

---

**Note**: This list is comprehensive, but there may be other files in the project that contain references. Verify by searching with the `grep` command.

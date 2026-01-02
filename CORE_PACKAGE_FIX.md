# Core Package Download Fix

## Problem
Core package file is not available on GitHub, so downloads are failing.

## Solution

### Step 1: Build the Core Package

You can build the package on either Arch Linux or Windows:

**Option A: On Arch Linux (using makepkg):**
```bash
cd core-package
chmod +x build-core.sh
./build-core.sh
```

**Option B: On Windows (using Python):**
```bash
cd core-package
python build-package.py
```

Both methods will create: `core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst`

### Step 2: Upload to GitHub

**Option A: Upload to `core-package/output/` folder (Recommended)**

1. Create the `output` folder in your GitHub repo:
   ```
   core-package/output/
   ```

2. Upload the built package file:
   ```
   core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
   ```

3. The URL will be:
   ```
   https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
   ```

**Option B: Upload to GitHub Releases**

1. Go to your GitHub repo: https://github.com/CodewithEvilxd/GetLainux
2. Click "Releases" → "Create a new release"
3. Tag: `v0.1`
4. Upload `getlainux-core-0.1-1-x86_64.pkg.tar.zst` as a release asset
5. Update `FALLBACK_CORE_URL` in `src/installer/include/installer.h`:
   ```c
   #define FALLBACK_CORE_URL "https://github.com/CodewithEvilxd/GetLainux/releases/download/v0.1/getlainux-core-0.1-1-x86_64.pkg.tar.zst"
   ```

### Step 3: Verify the File

After uploading, test the URL:
```
https://github.com/CodewithEvilxd/GetLainux/raw/main/core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst
```

This should download the file directly.

## Current Status

✅ **Fixed:**
- All GitHub URLs updated to use correct username: `CodewithEvilxd` (capital C)
- Installer C code URLs updated
- Website component URLs updated
- Documentation URLs updated
- Package build script created for Windows (`build-package.py`)
- Package file can be built on Windows using Python

✅ **Package Built:**
- Package file created: `core-package/output/getlainux-core-0.1-1-x86_64.pkg.tar.zst`
- Ready to upload to GitHub

❌ **Still Needed:**
- Upload `getlainux-core-0.1-1-x86_64.pkg.tar.zst` to GitHub
- Create `core-package/output/` folder in repo (if not exists)
- Upload the package file to that folder

## Quick Fix Commands

If you have the package file locally:

```bash
# Create output directory
mkdir -p core-package/output

# Copy your built package (if you have it)
# cp /path/to/getlainux-core-0.1-1-x86_64.pkg.tar.zst core-package/output/

# Then commit and push
git add core-package/output/
git commit -m "Add core package file"
git push
```

## Note

The `.gitignore` in `core-package/` is configured to allow `.pkg.tar.zst` files, so the package file can be committed to the repository.


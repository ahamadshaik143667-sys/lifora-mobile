# 📦 Required Installations - Quick Reference

## Essential Software

### 1. Node.js 18+ 
**Download:** https://nodejs.org/  
**Verify:** `node --version`

### 2. Java JDK 17
**Download:** https://adoptium.net/temurin/releases/?version=17  
**Verify:** `java -version` (should show 17.x.x)

### 3. Android Studio
**Download:** https://developer.android.com/studio  
**Includes:** Android SDK, Emulator, ADB

### 4. Git
**Download:** https://git-scm.com/download/win  
**Verify:** `git --version`

---

## Environment Variables (Windows)

Set these after installing Android Studio:

```powershell
# ANDROID_HOME
C:\Users\YourName\AppData\Local\Android\Sdk

# Add to PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
```

**Set JAVA_HOME:**
```powershell
# Usually:
C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
```

---

## Quick Verification

```bash
node --version      # v18+ ✅
java -version       # Java 17 ✅
echo $env:ANDROID_HOME  # Path shown ✅
adb version         # ADB version ✅
```

---

## Full Guide

For detailed installation instructions, see **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)**

---

**Need help?** Check `INSTALLATION_GUIDE.md` for step-by-step instructions and troubleshooting.


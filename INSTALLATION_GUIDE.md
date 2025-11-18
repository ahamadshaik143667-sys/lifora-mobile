# 📦 Required Installations - Complete Guide

This guide covers **everything** you need to install to run, build, and deploy the Lifora Mobile application.

---

## 🎯 Quick Checklist

- [ ] Node.js 18+ 
- [ ] npm (comes with Node.js)
- [ ] Java JDK 17
- [ ] Android Studio
- [ ] Android SDK
- [ ] Git
- [ ] Expo CLI (optional, can use npx)
- [ ] EAS CLI (optional, for cloud builds)

---

## 1️⃣ Node.js & npm

### Windows Installation

**Option A: Official Installer (Recommended)**
1. Visit: https://nodejs.org/
2. Download **LTS version** (v20.x.x or v22.x.x)
3. Run installer
4. Check "Add to PATH" during installation
5. Complete installation

**Option B: Using Chocolatey**
```powershell
choco install nodejs-lts
```

**Verify Installation:**
```bash
node --version
# Should show: v20.x.x or v22.x.x

npm --version
# Should show: 10.x.x or higher
```

**If Node.js is already installed but wrong version:**
- Use [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage versions
- Or download and install the correct version from nodejs.org

---

## 2️⃣ Java JDK 17

### Why Java 17?
Android builds require Java 17 (not 18, 19, or 20+). Java 17 is the LTS version compatible with Android Gradle.

### Windows Installation

**Option A: Adoptium Temurin (Recommended)**
1. Visit: https://adoptium.net/temurin/releases/?version=17
2. Download **JDK 17** for Windows x64
3. Run installer
4. **Important:** Note the installation path (usually `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`)

**Option B: Using Chocolatey**
```powershell
choco install temurin17
```

**Verify Installation:**
```bash
java -version
# Should show: openjdk version "17.x.x"
```

**Set JAVA_HOME (Required):**
```powershell
# PowerShell (temporary for current session)
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.10+8-hotspot"

# PowerShell (permanent - run as Administrator)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Eclipse Adoptium\jdk-17.0.10+8-hotspot", "Machine")

# Add to PATH
$env:PATH += ";$env:JAVA_HOME\bin"
[System.Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";$env:JAVA_HOME\bin", "Machine")
```

**Verify JAVA_HOME:**
```bash
echo $env:JAVA_HOME
# Should show your JDK path
```

---

## 3️⃣ Android Studio

### Why Android Studio?
- Provides Android SDK
- Includes Android Emulator
- Includes ADB (Android Debug Bridge)
- Required for local Android builds

### Windows Installation

1. **Download:**
   - Visit: https://developer.android.com/studio
   - Click "Download Android Studio"
   - Accept terms and download

2. **Install:**
   - Run installer
   - Choose "Standard" installation
   - Let it download Android SDK components (this takes time!)

3. **First Launch Setup:**
   - Android Studio will download SDK components
   - Wait for "SDK Manager" to finish
   - Accept all licenses when prompted

4. **Install SDK Components:**
   - Open Android Studio
   - Go to: **Tools → SDK Manager**
   - **SDK Platforms Tab:**
     - ✅ Android 14.0 (API 34) - **Required**
     - ✅ Android 13.0 (API 33) - Recommended
   - **SDK Tools Tab:**
     - ✅ Android SDK Build-Tools
     - ✅ Android SDK Platform-Tools
     - ✅ Android SDK Command-line Tools
     - ✅ Android Emulator
     - ✅ Intel x86 Emulator Accelerator (HAXM installer) - if using Intel CPU
   - Click "Apply" and wait for installation

**Verify Installation:**
```bash
# Check if Android SDK is installed
$env:ANDROID_HOME
# Should show path like: C:\Users\YourName\AppData\Local\Android\Sdk

# Or check via Android Studio
# File → Settings → Appearance & Behavior → System Settings → Android SDK
```

---

## 4️⃣ Android SDK Environment Variables

### Set Environment Variables (Windows)

**Option A: Via System Settings (Permanent)**
1. Press `Win + X` → **System**
2. Click **Advanced system settings**
3. Click **Environment Variables**
4. Under **User variables**, click **New**:
   - **Variable name:** `ANDROID_HOME`
   - **Variable value:** `C:\Users\YourName\AppData\Local\Android\Sdk`
5. Edit **Path** variable, add:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`
6. Click **OK** on all dialogs
7. **Restart your terminal/PowerShell**

**Option B: Via PowerShell (Run as Administrator)**
```powershell
# Set ANDROID_HOME
$androidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdkPath, "User")
[System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $androidSdkPath, "User")

# Add to PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = "$currentPath;$androidSdkPath\platform-tools;$androidSdkPath\tools;$androidSdkPath\tools\bin"
[System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
```

**Verify Environment Variables:**
```bash
# Close and reopen PowerShell, then:
echo $env:ANDROID_HOME
# Should show: C:\Users\YourName\AppData\Local\Android\Sdk

adb version
# Should show: Android Debug Bridge version x.x.x
```

---

## 5️⃣ Git

### Windows Installation

**Option A: Official Installer**
1. Visit: https://git-scm.com/download/win
2. Download and run installer
3. Use default options (recommended)

**Option B: Using Chocolatey**
```powershell
choco install git
```

**Verify Installation:**
```bash
git --version
# Should show: git version 2.x.x
```

---

## 6️⃣ Expo CLI (Optional)

Expo CLI is included with the project via `npx`, but you can install globally:

```bash
npm install -g expo-cli
```

**Or use npx (no installation needed):**
```bash
npx expo --version
```

---

## 7️⃣ EAS CLI (Optional - For Cloud Builds)

Only needed if you want to use EAS Build (cloud builds):

```bash
npm install -g eas-cli
eas login
```

---

## ✅ Verification Checklist

After installation, verify everything works:

### 1. Check Node.js
```bash
node --version
npm --version
```
✅ Should show v18+ and npm 9+

### 2. Check Java
```bash
java -version
echo $env:JAVA_HOME
```
✅ Should show Java 17 and a valid JAVA_HOME path

### 3. Check Android SDK
```bash
echo $env:ANDROID_HOME
adb version
```
✅ Should show ANDROID_HOME path and ADB version

### 4. Check Git
```bash
git --version
```
✅ Should show Git version

### 5. Test Project Setup
```bash
cd C:\Projects\lifora-mobile
npm install
npx expo-doctor
```
✅ Should show "All checks passed" or minimal warnings

---

## 🚨 Common Installation Issues

### Issue 1: "Java version mismatch"
**Problem:** Android build requires Java 17, but system has Java 18/19/20+

**Solution:**
1. Install Java 17 (see section 2)
2. Set JAVA_HOME to Java 17 path
3. Verify: `java -version` shows 17.x.x

### Issue 2: "ANDROID_HOME not set"
**Problem:** Android SDK not found

**Solution:**
1. Install Android Studio (see section 3)
2. Set ANDROID_HOME environment variable (see section 4)
3. Restart terminal/PowerShell
4. Verify: `echo $env:ANDROID_HOME` shows path

### Issue 3: "adb: command not found"
**Problem:** ADB not in PATH

**Solution:**
1. Add `%ANDROID_HOME%\platform-tools` to PATH (see section 4)
2. Restart terminal
3. Verify: `adb version` works

### Issue 4: "Node version mismatch"
**Problem:** Project requires Node 18+, but system has older version

**Solution:**
1. Install Node.js 18+ (see section 1)
2. Or use nvm-windows to manage versions:
   ```bash
   nvm install 20
   nvm use 20
   ```

### Issue 5: "Gradle build fails"
**Problem:** Various Gradle errors

**Solution:**
1. Ensure Java 17 is installed and JAVA_HOME is set
2. Clean Gradle cache:
   ```bash
   cd android
   ./gradlew clean
   ```
3. Delete `.gradle` folder in project root if corrupted

---

## 📋 Installation Order (Recommended)

1. **Node.js** → Provides npm
2. **Git** → For version control
3. **Java JDK 17** → Required for Android builds
4. **Android Studio** → Provides Android SDK
5. **Set Environment Variables** → ANDROID_HOME, JAVA_HOME
6. **Verify Everything** → Run verification checklist

---

## 🎯 Quick Install Script (PowerShell)

Save this as `install-requirements.ps1` and run as Administrator:

```powershell
# Install Node.js (if not installed)
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..."
    choco install nodejs-lts -y
}

# Install Java 17 (if not installed)
if (!(Get-Command java -ErrorAction SilentlyContinue) -or (java -version 2>&1 | Select-String "17" -Quiet)) {
    Write-Host "Installing Java 17..."
    choco install temurin17 -y
}

# Install Git (if not installed)
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Git..."
    choco install git -y
}

# Set JAVA_HOME
$javaPath = (Get-ChildItem "C:\Program Files\Eclipse Adoptium" -Filter "jdk-17*" -Directory | Select-Object -First 1).FullName
if ($javaPath) {
    [System.Environment]::SetEnvironmentVariable("JAVA_HOME", $javaPath, "Machine")
    Write-Host "JAVA_HOME set to: $javaPath"
}

# Set ANDROID_HOME (if Android Studio is installed)
$androidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"
if (Test-Path $androidSdkPath) {
    [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidSdkPath, "User")
    [System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $androidSdkPath, "User")
    Write-Host "ANDROID_HOME set to: $androidSdkPath"
}

Write-Host "`nInstallation complete! Please:"
Write-Host "1. Install Android Studio manually from: https://developer.android.com/studio"
Write-Host "2. Restart your terminal/PowerShell"
Write-Host "3. Run verification checklist"
```

**Note:** This script requires Chocolatey. Install it first: https://chocolatey.org/install

---

## 📚 Next Steps

After completing installations:

1. **Verify all installations** (use checklist above)
2. **Navigate to project:**
   ```bash
   cd C:\Projects\lifora-mobile
   ```
3. **Install project dependencies:**
   ```bash
   npm install
   ```
4. **Start development:**
   ```bash
   npm start
   ```

See `QUICK_START.md` for next steps!

---

## 🆘 Still Having Issues?

1. **Check Expo Doctor:**
   ```bash
   npx expo-doctor
   ```
   This will identify missing requirements.

2. **Check Documentation:**
   - `PRODUCTION_SETUP_GUIDE.md` - Detailed setup guide
   - `QUICK_START.md` - Quick reference

3. **Common Solutions:**
   - Restart terminal after setting environment variables
   - Restart computer after installing Android Studio
   - Check that paths don't have spaces or special characters
   - Ensure you're using PowerShell (not CMD) for best compatibility

---

**Last Updated:** $(Get-Date)  
**Platform:** Windows  
**Project:** Lifora Mobile v1.0.1


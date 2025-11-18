# 🚀 Lifora Mobile - Complete Production Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Local Development](#local-development)
4. [Android Build & Testing](#android-build--testing)
5. [Production Release](#production-release)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should show v18.x.x or higher
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **Expo CLI** (installed globally or via npx)
   ```bash
   npx expo --version  # Should show 54.x.x
   ```

4. **Java Development Kit (JDK) 17**
   ```bash
   java -version  # Should show openjdk version "17.x.x"
   ```
   - Download: [Adoptium Temurin 17](https://adoptium.net/temurin/releases/?version=17)

5. **Android Studio** (for Android development)
   - Download: [Android Studio](https://developer.android.com/studio)
   - Install Android SDK (API 34 recommended)
   - Set environment variables:
     ```bash
     # Windows (PowerShell)
     $env:ANDROID_HOME = "C:\Users\YourName\AppData\Local\Android\Sdk"
     $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
     
     # Add to PATH
     $env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
     ```

6. **Git** (for version control)
   ```bash
   git --version
   ```

### Optional but Recommended

- **EAS CLI** (for cloud builds)
  ```bash
   npm install -g eas-cli
   eas login
   ```

---

## Initial Setup

### Step 1: Clone/Navigate to Project

```bash
cd C:\Projects\lifora-mobile
```

### Step 2: Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added 1320 packages, and audited 1321 packages in 45s
```

**If you see errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- If peer dependency warnings appear, they're usually safe to ignore

### Step 3: Verify Installation

```bash
npx expo-doctor
```

**Expected Output:**
```
✅ All checks passed
```

**If issues found:**
- Follow the suggestions provided
- Most common: Missing Android SDK → Install via Android Studio

### Step 4: Environment Variables

Create a `.env` file in the root directory:

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.lifora.com/api
```

**Note:** For production, use your actual API URL. The app will use `https://api.lifora.com/api` as default if not set.

### Step 5: Type Check

```bash
npx tsc --noEmit
```

**Expected Output:**
```
# No errors (or only non-blocking type warnings)
```

---

## Local Development

### Step 1: Start Development Server

```bash
npm start
# or
npx expo start
```

**Expected Output:**
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

### Step 2: Run on Device/Emulator

#### Option A: Physical Device (Recommended for Testing)

**Android:**
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npm run android` or press `a` in Expo CLI

**Expected Output:**
```
› Opening on Android device...
› Building JavaScript bundle...
```

#### Option B: Android Emulator

1. Open Android Studio
2. Tools → Device Manager → Create Virtual Device
3. Select a device (e.g., Pixel 6)
4. Select system image (API 34 recommended)
5. Start the emulator
6. Run: `npm run android` or press `a` in Expo CLI

#### Option C: Web Browser

Press `w` in Expo CLI or run:
```bash
npm run web
```

**Expected Output:**
```
› Opening http://localhost:8081 in your browser...
```

### Step 3: Verify App Runs

You should see:
- ✅ App loads without crashes
- ✅ Login screen appears
- ✅ Navigation works
- ✅ No red error screens

### Step 4: Test Core Features

1. **Authentication:**
   - Try logging in (will fail without backend, but UI should work)
   - Try signing up
   - Check error handling

2. **Navigation:**
   - Navigate between tabs
   - Test back buttons
   - Test deep linking

3. **UI/UX:**
   - Check dark/light theme toggle
   - Verify responsive layouts
   - Test loading states

---

## Android Build & Testing

### Option 1: Local Build (APK)

#### Step 1: Clean Build

```bash
cd android
./gradlew clean
# Windows: gradlew.bat clean
```

#### Step 2: Build Debug APK

```bash
./gradlew assembleDebug
# Windows: gradlew.bat assembleDebug
```

**Expected Output:**
```
BUILD SUCCESSFUL in 2m 30s
```

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### Step 3: Install on Device

**Via ADB:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Via File Transfer:**
1. Copy APK to device
2. Enable "Install from Unknown Sources"
3. Open APK file
4. Install

### Option 2: EAS Cloud Build (Recommended)

#### Step 1: Configure EAS

```bash
eas build:configure
```

#### Step 2: Build Development APK

```bash
eas build --platform android --profile development
```

**Expected Output:**
```
✔ Build started
✔ Build ID: xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
✔ Build URL: https://expo.dev/accounts/your-account/builds/xxxxxx
```

#### Step 3: Download APK

1. Visit the build URL
2. Wait for build to complete (~10-15 minutes)
3. Download APK
4. Install on device

### Testing Checklist

- [ ] App installs successfully
- [ ] App launches without crashes
- [ ] Login/signup screens load
- [ ] Navigation works
- [ ] API calls work (if backend is available)
- [ ] Error handling works
- [ ] Theme switching works
- [ ] Performance is acceptable
- [ ] No console errors in production mode

---

## Production Release

### Pre-Release Checklist

- [ ] Remove all `console.log` statements (✅ Already done - using logger)
- [ ] Remove debug code
- [ ] Update version numbers
- [ ] Test on multiple devices
- [ ] Verify API endpoints are production URLs
- [ ] Check error boundaries work
- [ ] Verify analytics/monitoring is set up
- [ ] Test offline functionality
- [ ] Review security settings

### Step 1: Update Version

**In `app.json`:**
```json
{
  "expo": {
    "version": "1.0.1",  // Increment for each release
    "android": {
      "versionCode": 2  // Increment for each release
    }
  }
}
```

**In `package.json`:**
```json
{
  "version": "1.0.1"  // Keep in sync with app.json
}
```

### Step 2: Generate Production Keystore

**⚠️ IMPORTANT: Keep this file secure!**

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore lifora-release.keystore -alias lifora-key -keyalg RSA -keysize 2048 -validity 10000
```

**Store credentials securely:**
- Keystore password
- Key alias
- Key password

### Step 3: Configure Release Signing

**Create `android/keystore.properties`:**
```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=lifora-key
storeFile=../app/lifora-release.keystore
```

**Update `android/app/build.gradle`:**
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... existing config
        }
    }
}
```

### Step 4: Build Production App Bundle

**Via EAS (Recommended):**
```bash
eas build --platform android --profile production
```

**Via Local:**
```bash
cd android
./gradlew bundleRelease
# Windows: gradlew.bat bundleRelease
```

**AAB Location:**
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Step 5: Prepare Play Store Listing

1. **App Icon:** `assets/images/icon.png` (1024x1024)
2. **Screenshots:** Take screenshots on multiple devices
3. **Feature Graphic:** 1024x500
4. **Description:** Write compelling app description
5. **Privacy Policy:** Required for Play Store

### Step 6: Upload to Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app (if first release)
3. Go to "Production" → "Create new release"
4. Upload AAB file
5. Fill in release notes
6. Review and publish

### Step 7: Monitor Release

- Monitor crash reports (Firebase Crashlytics recommended)
- Check analytics
- Monitor user reviews
- Track API errors

---

## Troubleshooting

### Common Issues

#### 1. "Metro bundler failed to start"

**Solution:**
```bash
npx expo start --clear
```

#### 2. "Android build fails with Gradle error"

**Solution:**
```bash
cd android
./gradlew clean
./gradlew --stop
./gradlew assembleDebug
```

#### 3. "Cannot find module" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 4. "Java version mismatch"

**Solution:**
- Ensure Java 17 is installed
- Set `JAVA_HOME` environment variable:
  ```bash
  # Windows
  $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
  ```

#### 5. "Android SDK not found"

**Solution:**
- Install Android Studio
- Install Android SDK (API 34)
- Set `ANDROID_HOME` environment variable

#### 6. "Build succeeds but app crashes on launch"

**Check:**
- Check logs: `adb logcat | grep ReactNativeJS`
- Verify API URL is correct
- Check error boundaries are working
- Verify all native modules are linked

#### 7. "TypeScript errors"

**Solution:**
```bash
npx tsc --noEmit
# Fix reported errors
```

#### 8. "EAS build fails"

**Check:**
- Verify `eas.json` is correct
- Check build logs in EAS dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Getting Help

1. Check Expo documentation: https://docs.expo.dev
2. Check React Native docs: https://reactnative.dev
3. Search GitHub issues
4. Ask in Expo Discord

---

## Quick Reference Commands

```bash
# Development
npm start                    # Start dev server
npm run android             # Run on Android
npm run ios                 # Run on iOS
npm run web                 # Run on web

# Building
cd android && ./gradlew assembleDebug    # Local debug APK
cd android && ./gradlew bundleRelease    # Local release AAB
eas build --platform android --profile production  # EAS production build

# Testing
npx tsc --noEmit            # Type check
npx expo-doctor             # Check configuration
npx eslint .                # Lint code

# Maintenance
npm install                 # Install dependencies
npx expo prebuild --clean   # Regenerate native code
```

---

## Production Checklist Summary

✅ **Code Quality**
- [x] All console.log replaced with logger
- [x] Error boundaries implemented
- [x] TypeScript errors fixed
- [x] ESLint warnings resolved

✅ **Configuration**
- [x] app.json configured
- [x] eas.json configured
- [x] Android build.gradle configured
- [x] Environment variables set

✅ **Security**
- [x] Tokens stored in SecureStore
- [x] API client with retry logic
- [x] Error handling implemented
- [x] No hardcoded credentials

✅ **Performance**
- [x] Code splitting (via Expo Router)
- [x] Image optimization
- [x] Lazy loading where applicable

✅ **Testing**
- [ ] Unit tests (if applicable)
- [ ] Integration tests (if applicable)
- [ ] Manual testing completed
- [ ] Device testing completed

---

**Last Updated:** $(Get-Date)
**Project Version:** 1.0.0
**Expo SDK:** 54.0.23


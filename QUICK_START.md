# ⚡ Quick Start Guide - Lifora Mobile

## 🎯 Get Running in 5 Minutes

### Prerequisites
**Before starting, ensure you have installed:**
- Node.js 18+ ([Installation Guide](INSTALLATION_GUIDE.md))
- Java JDK 17 ([Installation Guide](INSTALLATION_GUIDE.md))
- Android Studio & SDK ([Installation Guide](INSTALLATION_GUIDE.md))

**Quick verification:**
```bash
node --version    # Should show v18+
java -version     # Should show Java 17
echo $env:ANDROID_HOME  # Should show Android SDK path
```

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Run on Device
- **Android:** Press `a` or run `npm run android`
- **iOS:** Press `i` or run `npm run ios`  
- **Web:** Press `w` or run `npm run web`

---

## 📱 Build Android APK

### Local Build (Fast)
```bash
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### EAS Cloud Build (Recommended)
```bash
eas build --platform android --profile development
```

---

## 🚀 Production Release

### 1. Update Version
Edit `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

### 2. Build Production Bundle
```bash
eas build --platform android --profile production
```

### 3. Upload to Play Store
- Download AAB from EAS dashboard
- Upload to Google Play Console
- Submit for review

---

## 📚 Full Documentation

- **Complete Setup:** See `PRODUCTION_SETUP_GUIDE.md`
- **Optimizations:** See `PRODUCTION_OPTIMIZATIONS.md`
- **Previous Fixes:** See `FIXES_REPORT.md`

---

## ⚠️ Troubleshooting

**Metro won't start?**
```bash
npx expo start --clear
```

**Build fails?**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

**Type errors?**
```bash
npx tsc --noEmit
# (Some style utility errors are non-blocking)
```

---

**Need Help?** Check `PRODUCTION_SETUP_GUIDE.md` for detailed instructions.


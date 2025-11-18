# ⚡ Quick Command Reference

## 🚀 Setup Commands (Run Once)

```bash
# 1. Install global EAS CLI
npm install -g eas-cli

# 2. Install project dependencies
npm install

# 3. Login to EAS (if not already)
eas login

# 4. Configure EAS (if not already)
eas build:configure
```

---

## 📱 Preview App on Phone

### Using Expo Go (Easiest)

```bash
npm start
```

Then scan QR code with Expo Go app.

### Using Development Build

```bash
npm run start:dev
```

Then scan QR code with your development build app.

---

## 📦 Build Commands

### Development APK (For Testing)

```bash
eas build --platform android --profile development
```

### Production APK (For Direct Installation)

```bash
eas build --platform android --profile production --type apk
```

### Production AAB (For Play Store)

```bash
eas build --platform android --profile production
```

---

## 🔧 Environment Setup

### Create .env.development

Copy `env.example` to `.env.development` and update values.

### Create .env.production

Copy `env.example` to `.env.production` and update values.

### Set EAS Secrets (Production)

```bash
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.lifora.com/api
```

---

## ✅ Verification

```bash
# Check project health
npx expo-doctor

# Type check
npm run type-check

# Lint
npm run lint
```

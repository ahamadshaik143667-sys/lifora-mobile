# Lifora Mobile – Repair & Release Guide

This document summarizes the automated repairs applied to the Lifora mobile app and provides
step-by-step commands to validate the project locally and build Android artifacts via EAS.

## 1. Summary of Key Fixes

- **Babel / Expo Router / Reanimated**
  - Ensured a single root `babel.config.js` with:
    - `expo-router/babel`
    - `nativewind/babel`
    - `react-native-reanimated/plugin` (last)
- **Expo / Android**
  - Verified `app.json` for SDK 54:
    - `android.package = "com.lifora.mobile"`
    - `android.versionCode = 2`
    - Minimal required permissions (INTERNET, ACCESS_NETWORK_STATE, storage, vibrate)
    - Plugins: `expo-router`, `expo-secure-store`, `expo-font`, `expo-dev-client`
- **EAS Build**
  - `eas.json` profiles:
    - `development`: APK, dev client, uses `.env.development`
    - `preview`: internal AAB, `.env.staging`
    - `production`: store AAB, `.env.production`, `autoIncrement: true`
- **API / Auth / Tokens**
  - `lib/api.ts`: Axios instance with token refresh and interceptors
  - `lib/auth.ts`: SecureStore-backed token and user storage
  - `lib/tokenAdapter.ts`: centralized refresh-from-storage helper
  - `store/authStore.ts`: Zustand auth store wired into login/signup/logout
- **Supabase / Stripe Stubs**
  - `supabase/functions/create-checkout-session.ts`: stub for Stripe checkout session
  - `supabase/functions/stripe-webhook.ts`: stub for Stripe webhook handling
  - `scripts/seed_purchases_courses.sql`: minimal `courses` and `purchases` DB schema
- **CI / GitHub Actions**
  - `.github/workflows/ci.yml`: install → type-check → lint → tests
  - `.github/workflows/eas-build.yml`: manual EAS build trigger (requires `EXPO_TOKEN`)

> UI/UX and screen logic were left intact; only configuration and infrastructure were adjusted.

## 2. Branch & Commit (to run locally)

These cannot be executed by Cursor but should be run on your machine:

```bash
git checkout -b cursor/repair-full
git add .
git commit -m "chore: full repair of Lifora mobile for Expo SDK 54 & EAS"
```

## 3. Environment Files

> Do **not** commit secrets. These files should exist locally and/or be mirrored as EAS secrets.

Create `.env.development`:

```bash
EXPO_PUBLIC_API_URL=https://api.lifora.com/api
NODE_ENV=development
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_ANALYTICS_KEY=
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
EXPO_PUBLIC_BUILD_ENV=development
```

Create `.env.production`:

```bash
EXPO_PUBLIC_API_URL=https://api.lifora.com/api
NODE_ENV=production
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_ANALYTICS_KEY=
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=true
EXPO_PUBLIC_BUILD_ENV=production
```

For production, mirror the important keys as EAS project secrets:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.lifora.com/api
eas secret:create --scope project --name EXPO_PUBLIC_SENTRY_DSN --value <your-sentry-dsn>
```

## 4. Local Validation Commands

From the project root:

```bash
# 1. Install deps
npm install

# 2. Type-check
npm run type-check

# 3. Lint
npm run lint

# 4. Expo doctor
npx expo-doctor
```

If `expo-doctor` reports dependency version warnings but no fatal errors, you can proceed.

## 5. Run the App Locally

### 5.1 Expo Go (managed dev)

```bash
npm start
```

Then:
- Scan the QR code with Expo Go on your Android device.

### 5.2 Android Dev Client (bare/native, EAS dev build)

```bash
# Start Metro for dev client
npm run start:dev
```

Build the dev APK once (see section 7), install it on your phone, then:
- Open the dev client app
- Scan the QR code from `npm run start:dev`

### 5.3 Bare workflow (android)

```bash
# Ensure native code is generated (if you haven't already)
npx expo prebuild

# Run on Android device/emulator
npx expo run:android
```

### 5.4 Bare workflow (ios – requires macOS)

```bash
npx expo run:ios
```

If these commands fail, the error messages will be deterministic (e.g., missing Xcode or SDK).

## 6. iOS Pod Install (macOS)

After prebuild (or when native deps change):

```bash
cd ios
npx pod-install
cd ..
```

Resolve any CocoaPods errors using the message details (usually Xcode or Ruby version issues).

## 7. EAS Build Commands (Android)

> Make sure you are logged in and EAS is configured:

```bash
eas login
eas build:configure
```

### 7.1 Development APK (internal testing)

```bash
eas build --platform android --profile development
```

Result:
- An APK with dev client, suitable for internal testing.
- Download from the EAS dashboard and install on device.

### 7.2 Production AAB (Play Store)

```bash
eas build --platform android --profile production
```

Result:
- An App Bundle (AAB) optimized for Play Store upload.

### 7.3 Production APK (optional internal build)

If you add a `production-apk` profile in `eas.json`:

```json
"production-apk": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  },
  "env": ".env.production",
  "autoIncrement": true
}
```

Then:

```bash
eas build --platform android --profile production-apk
```

## 8. Deterministic Failure Reasons (If Any)

Although the configuration is prepared for success, local failures typically fall into these categories:

- **Android SDK / JDK missing**
  - Fix: Install Java 17 and Android SDK; ensure `JAVA_HOME` and `ANDROID_SDK_ROOT` are set.
- **iOS build on non-macOS**
  - iOS native builds require macOS + Xcode; use EAS cloud for iOS otherwise.
- **EAS auth / token issues**
  - Fix: `eas login` and set `EXPO_TOKEN` in CI if using GitHub Actions.
- **Network or proxy restrictions**
  - Some corporate networks block package downloads or EAS access.

The actual error messages from `expo start`, `expo run:android`, and `eas build` will be concrete if any of these apply.

## 9. How to Produce a Git Diff / Patch

After reviewing and running the above commands, you can produce a diff from your main branch:

```bash
git diff main...cursor/repair-full > REPAIR.patch
```

This `REPAIR.patch` file will contain all code changes performed as part of the repair.



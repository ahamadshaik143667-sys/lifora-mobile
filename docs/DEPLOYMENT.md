# 🚀 Deployment Guide

## Prerequisites

1. **EAS Account**: Sign up at [expo.dev](https://expo.dev)
2. **EAS CLI**: `npm install -g eas-cli`
3. **EAS Login**: `eas login`
4. **Project ID**: Already configured in `app.json`

## Environment Setup

### 1. Environment Variables

Create `.env` file (use `env.example` as template):

```bash
EXPO_PUBLIC_API_URL=https://api.lifora.com/api
EXPO_PUBLIC_SENTRY_DSN=your-sentry-dsn
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=true
```

### 2. EAS Secrets

For sensitive values, use EAS secrets:

```bash
# Set secrets
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.lifora.com/api
eas secret:create --scope project --name EXPO_PUBLIC_SENTRY_DSN --value your-sentry-dsn
```

## Build Profiles

Build profiles are configured in `eas.json`:

- **development**: Internal distribution, debug APK
- **preview**: Internal distribution, release AAB
- **production**: Store distribution, release AAB
- **internal**: Internal distribution, debug APK

## Building

### Android

#### Development Build

```bash
eas build --platform android --profile development
```

#### Preview Build

```bash
eas build --platform android --profile preview
```

#### Production Build

```bash
eas build --platform android --profile production
```

### iOS

#### Development Build

```bash
eas build --platform ios --profile development
```

#### Production Build

```bash
eas build --platform ios --profile production
```

### Both Platforms

```bash
eas build --platform all --profile production
```

## Submitting to Stores

### Google Play Store

1. **Build Production AAB**:

   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Play Store**:

   ```bash
   eas submit --platform android
   ```

3. **Manual Upload**:
   - Download AAB from EAS dashboard
   - Upload to Google Play Console
   - Complete store listing
   - Submit for review

### Apple App Store

1. **Build Production IPA**:

   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit to App Store**:

   ```bash
   eas submit --platform ios
   ```

3. **Prerequisites**:
   - Apple Developer account ($99/year)
   - App Store Connect app created
   - Certificates and provisioning profiles (auto-managed by EAS)

## Version Management

### Bump Version

```bash
# Patch version (1.0.0 → 1.0.1)
npm run version:bump patch

# Minor version (1.0.0 → 1.1.0)
npm run version:bump minor

# Major version (1.0.0 → 2.0.0)
npm run version:bump major
```

This automatically:

- Updates `package.json` version
- Updates `app.json` version
- Increments Android `versionCode`
- Increments iOS `buildNumber`

### Generate Changelog

```bash
npm run changelog
```

## Release Process

### 1. Pre-Release Checklist

- [ ] All tests passing (`npm run validate`)
- [ ] Version bumped (`npm run version:bump`)
- [ ] Changelog generated (`npm run changelog`)
- [ ] Environment variables set
- [ ] EAS secrets configured
- [ ] Store listings updated

### 2. Build Release

```bash
# Build for both platforms
eas build --platform all --profile production

# Or build separately
eas build --platform android --profile production
eas build --platform ios --profile production
```

### 3. Test Builds

- Download builds from EAS dashboard
- Test on physical devices
- Verify all features work
- Check crash reports

### 4. Submit to Stores

```bash
# Submit both
eas submit --platform all

# Or submit separately
eas submit --platform android
eas submit --platform ios
```

### 5. Create Git Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 6. Monitor Release

- Monitor Sentry for crashes
- Check store reviews
- Monitor analytics
- Track download numbers

## Continuous Deployment

GitHub Actions workflows are configured for:

- **CI**: Runs on every push/PR
  - Type checking
  - Linting
  - Tests
  - Security audit

- **Build**: Runs on main branch
  - Builds Android APK/AAB
  - Builds iOS IPA (on tags)

- **Release**: Runs on version tags
  - Creates GitHub release
  - Generates changelog

## Troubleshooting

### Build Fails

1. Check EAS build logs
2. Verify environment variables
3. Check dependency versions
4. Run `expo-doctor` locally

### Submission Fails

1. Verify store credentials
2. Check app metadata
3. Ensure certificates are valid
4. Review store guidelines

### Version Conflicts

1. Ensure version bumped in both files
2. Check Android versionCode
3. Check iOS buildNumber
4. Verify EAS project ID

## Best Practices

1. **Always test builds** before submitting
2. **Use preview builds** for internal testing
3. **Monitor crash reports** after release
4. **Gradual rollout** for major updates
5. **Keep dependencies updated** regularly
6. **Document breaking changes** in changelog

## Resources

- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [EAS Submit Docs](https://docs.expo.dev/submit/introduction/)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)

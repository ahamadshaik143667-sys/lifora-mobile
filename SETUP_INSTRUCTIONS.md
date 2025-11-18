# 🛠️ Setup Instructions

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all production and development dependencies, including:

- Testing libraries (Jest, React Native Testing Library)
- Code quality tools (Prettier, ESLint plugins)
- Git hooks (Husky, lint-staged)

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp env.example .env

# Edit .env with your actual values
# Required: EXPO_PUBLIC_API_URL
# Optional: Sentry DSN, Analytics keys
```

### 3. Initialize Git Hooks

```bash
npm run prepare
```

This sets up Husky for pre-commit and pre-push hooks.

### 4. Verify Setup

```bash
# Run full validation
npm run validate

# This runs:
# - TypeScript type checking
# - ESLint
# - Tests with coverage
```

## Optional: Sentry Setup

If you want error tracking:

```bash
# Install Sentry
npm install @sentry/react-native

# Add to .env
EXPO_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=true
```

## Optional: Analytics Setup

If you want analytics:

```bash
# Install your analytics SDK (example: Amplitude)
npm install @amplitude/analytics-react-native

# Add to .env
EXPO_PUBLIC_ANALYTICS_KEY=your-analytics-key
EXPO_PUBLIC_ENABLE_ANALYTICS=true
```

## First Run

```bash
# Start development server
npm start

# Or run on specific platform
npm run android
npm run ios
npm run web
```

## Troubleshooting

### Husky not working?

```bash
# Reinstall hooks
npm run prepare

# Make hooks executable (Unix/Mac)
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Tests failing?

```bash
# Clear cache and reinstall
npm run clean:install

# Run tests
npm test
```

### Type errors?

```bash
# Check TypeScript
npm run type-check

# Fix or add type annotations
```

### Lint errors?

```bash
# Auto-fix most issues
npm run lint:fix

# Format code
npm run format
```

## Next Steps

1. ✅ Dependencies installed
2. ✅ Environment variables set
3. ✅ Git hooks initialized
4. ✅ Validation passing

**You're ready to develop!** 🎉

See `QUICK_REFERENCE.md` for common commands and `PRODUCTION_READY_SUMMARY.md` for full details.

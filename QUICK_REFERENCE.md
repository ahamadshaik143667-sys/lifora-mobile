# 🚀 Quick Reference Guide

## Common Commands

### Development

```bash
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on web
```

### Testing

```bash
npm test               # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage
npm run test:ci        # CI mode
```

### Code Quality

```bash
npm run lint           # Check linting
npm run lint:fix       # Auto-fix linting
npm run type-check     # TypeScript check
npm run format         # Format code
npm run format:check   # Check formatting
npm run validate       # Full validation (type + lint + test)
```

### Building

```bash
npm run build:android  # Build Android (EAS)
npm run build:ios      # Build iOS (EAS)
npm run build:all      # Build both platforms
```

### Version Management

```bash
npm run version:bump patch   # 1.0.0 → 1.0.1
npm run version:bump minor   # 1.0.0 → 1.1.0
npm run version:bump major   # 1.0.0 → 2.0.0
npm run changelog            # Generate changelog
```

### Security

```bash
npm run security:audit # Check vulnerabilities
npm run security:fix   # Fix vulnerabilities
```

### Maintenance

```bash
npm run clean          # Remove build artifacts
npm run clean:install  # Clean + reinstall
```

## File Structure Quick Reference

```
app/              # Routes (Expo Router)
components/       # Reusable components
lib/             # Utilities (API, auth, logger)
store/            # Zustand stores
hooks/            # Custom hooks
styles/           # Theme & styling
scripts/          # Build scripts
docs/             # Documentation
__tests__/        # Test files
```

## Environment Variables

Create `.env` from `env.example`:

```bash
EXPO_PUBLIC_API_URL=https://api.lifora.com/api
EXPO_PUBLIC_SENTRY_DSN=your-sentry-dsn
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=true
```

## Git Workflow

1. **Before committing**: Auto-formatting runs (pre-commit hook)
2. **Before pushing**: Full validation runs (pre-push hook)
3. **On push**: CI runs tests and linting
4. **On main**: Builds are triggered
5. **On tags**: Releases are created

## Common Issues

### Tests failing?

```bash
npm run clean:install
npm test
```

### Type errors?

```bash
npm run type-check
# Fix issues or add @ts-ignore with comment
```

### Lint errors?

```bash
npm run lint:fix
# Auto-fixes most issues
```

### Build fails?

```bash
npx expo-doctor
# Follow suggestions
```

## Documentation

- **Architecture**: `docs/ARCHITECTURE.md`
- **API**: `docs/API.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Full Summary**: `PRODUCTION_READY_SUMMARY.md`

## Getting Help

1. Check documentation in `docs/` folder
2. Run `npx expo-doctor` for setup issues
3. Check GitHub Actions for CI errors
4. Review error logs in Sentry (if configured)

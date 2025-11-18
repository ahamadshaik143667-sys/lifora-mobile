# 🎓 Lifora Mobile

A production-ready React Native mobile application built with Expo, featuring course management, authentication, and offline capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Java JDK 17
- Android Studio (for Android development)
- Expo CLI (via npx)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Run on Device

- **Android:** Press `a` or run `npm run android`
- **iOS:** Press `i` or run `npm run ios`
- **Web:** Press `w` or run `npm run web`

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- **[Production Setup Guide](PRODUCTION_SETUP_GUIDE.md)** - Complete setup instructions
- **[Production Optimizations](PRODUCTION_OPTIMIZATIONS.md)** - All optimizations applied
- **[Fixes Report](FIXES_REPORT.md)** - Previous fixes and improvements

## 🏗️ Build

### Development APK
```bash
cd android
./gradlew assembleDebug
```

### Production Build (EAS)
```bash
eas build --platform android --profile production
```

## ✨ Features

- ✅ **Authentication** - Secure login/signup with token management
- ✅ **Course Management** - Browse, search, and manage courses
- ✅ **Offline Support** - Download courses for offline viewing
- ✅ **Error Handling** - Production-grade error boundaries and logging
- ✅ **Theme Support** - Light/dark mode with system preference
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Production Ready** - Optimized for release

## 🛠️ Tech Stack

- **Framework:** React Native 0.81.5
- **UI Library:** React 19.1.0
- **Routing:** Expo Router 6.0.14
- **State Management:** Zustand
- **Styling:** NativeWind (Tailwind CSS)
- **Build System:** Expo SDK 54
- **Type Safety:** TypeScript 5.9.2

## 📦 Project Structure

```
lifora-mobile/
├── app/              # Expo Router pages
│   ├── (auth)/      # Authentication screens
│   └── (tabs)/      # Main app tabs
├── components/       # Reusable components
├── lib/             # Utilities (API, auth, logger)
├── store/           # Zustand state management
├── styles/          # Theme and styling
└── android/         # Android native code
```

## 🔒 Security

- Secure token storage with `expo-secure-store`
- Automatic token refresh
- API client with retry logic
- Error boundaries for crash prevention
- Production logging system

## 📱 Platform Support

- ✅ Android (APK & AAB)
- ✅ iOS (requires macOS)
- ✅ Web

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private - All rights reserved

## 🆘 Support

For issues and questions:
1. Check [PRODUCTION_SETUP_GUIDE.md](PRODUCTION_SETUP_GUIDE.md)
2. Review [Troubleshooting section](PRODUCTION_SETUP_GUIDE.md#troubleshooting)
3. Check Expo documentation: https://docs.expo.dev

---

**Version:** 1.0.0  
**Expo SDK:** 54.0.23  
**Status:** ✅ Production Ready

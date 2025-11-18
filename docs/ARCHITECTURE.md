# 🏗️ Architecture Documentation

## Overview

Lifora Mobile is a React Native application built with Expo, following modern mobile development best practices with a focus on scalability, maintainability, and performance.

## Tech Stack

### Core Framework

- **React Native 0.81.5** - Mobile framework
- **React 19.1.0** - UI library
- **Expo SDK 54** - Development platform and tooling
- **Expo Router 6.0.14** - File-based routing

### State Management

- **Zustand 4.5.7** - Lightweight state management
  - `store/authStore.ts` - Authentication state
  - `store/courseStore.ts` - Course data state

### Styling

- **NativeWind 4.2.1** - Tailwind CSS for React Native
- **Tailwind CSS 3.4.18** - Utility-first CSS framework

### Networking

- **Axios 1.13.1** - HTTP client with interceptors
- Automatic token refresh
- Request/response interceptors

### Storage

- **Expo Secure Store** - Secure token storage
- **AsyncStorage** - General purpose storage

## Project Structure

```
lifora-mobile/
├── app/                    # Expo Router pages (file-based routing)
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/            # Main app tabs
│   │   ├── home.tsx
│   │   ├── courses/
│   │   ├── downloads/
│   │   ├── explore.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
│
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── CourseCard.tsx
│   ├── ErrorBoundary.tsx
│   └── VideoPlayer.tsx
│
├── lib/                  # Core utilities
│   ├── api.ts           # Axios instance with interceptors
│   ├── auth.ts          # Authentication helpers
│   ├── constants.ts     # App constants
│   ├── logger.ts        # Production logging
│   ├── sentry.ts        # Error tracking
│   └── toast.tsx        # Toast notifications
│
├── store/               # Zustand stores
│   ├── authStore.ts
│   └── courseStore.ts
│
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   └── use-color-scheme.ts
│
├── styles/              # Styling configuration
│   ├── theme.tsx       # Theme provider
│   └── tw.ts           # Tailwind setup
│
└── scripts/            # Build and utility scripts
    ├── version-bump.js
    └── generate-changelog.js
```

## Architecture Patterns

### 1. File-Based Routing

Expo Router uses file-based routing where:

- `app/` directory maps to routes
- `(auth)` and `(tabs)` are route groups (not in URL)
- `_layout.tsx` files define nested layouts

### 2. State Management

- **Zustand** for global state (auth, courses)
- **React State** for component-local state
- **URL State** for navigation and deep linking

### 3. API Layer

- Centralized API client in `lib/api.ts`
- Automatic token injection via interceptors
- Automatic token refresh on 401 errors
- Error handling and retry logic

### 4. Authentication Flow

1. User logs in → tokens stored in SecureStore
2. API requests include Bearer token
3. On 401 → refresh token automatically
4. On refresh failure → logout user
5. Protected routes use `RequireAuth` HOC

### 5. Error Handling

- **Error Boundaries** catch React errors
- **Logger** for structured logging
- **Sentry** for production error tracking
- **Toast** for user-facing errors

## Data Flow

### Authentication

```
Login Screen → authStore.login() → API → SecureStore → Update Store → Navigate
```

### Course Loading

```
Component Mount → courseStore.fetchCourses() → API → Update Store → Re-render
```

### API Request Flow

```
Component → API Call → Axios Interceptor (add token) → Server
                                                          ↓
Component ← Response ← Axios Interceptor (handle errors) ←
```

## Security Considerations

1. **Token Storage**: SecureStore (encrypted, OS keychain)
2. **API Security**: HTTPS only, token-based auth
3. **Error Handling**: No sensitive data in logs
4. **Code Obfuscation**: Enabled in production builds

## Performance Optimizations

1. **Image Optimization**: Expo Image with caching
2. **Code Splitting**: Automatic with Expo Router
3. **Lazy Loading**: Route-based code splitting
4. **Memoization**: React.memo, useMemo, useCallback
5. **Bundle Analysis**: Regular bundle size monitoring

## Testing Strategy

- **Unit Tests**: Jest for utilities and stores
- **Component Tests**: React Native Testing Library
- **Integration Tests**: API mocking, navigation testing
- **E2E Tests**: (Future) Detox or Maestro

## Build & Deployment

### Development

- Expo Go for quick iteration
- Development builds for native modules

### Production

- EAS Build for cloud builds
- Android: APK (internal) or AAB (Play Store)
- iOS: IPA (TestFlight or App Store)

## Environment Configuration

- `.env` files for environment variables
- `app.json` for app configuration
- `eas.json` for build profiles

## Monitoring & Analytics

- **Error Tracking**: Sentry (optional)
- **Analytics**: (To be integrated)
- **Performance**: React Native Performance Monitor
- **Logging**: Structured logging with context

## Future Enhancements

1. **Offline Support**: Enhanced offline capabilities
2. **Push Notifications**: Expo Notifications integration
3. **Deep Linking**: Enhanced deep link handling
4. **Biometrics**: Face ID / Touch ID auth
5. **Internationalization**: i18n support

// Environment variables are available at runtime in Expo
export const API_BASE_URL: string =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) ||
  'https://api.lifora.com/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    LESSON: (courseId: string, lessonId: string) => `/courses/${courseId}/lessons/${lessonId}`,
    WISHLIST: '/courses/wishlist',
    BOOKMARK: (courseId: string) => `/courses/${courseId}/bookmark`,
    DOWNLOAD: (courseId: string) => `/courses/${courseId}/download`,
  },
  DOWNLOADS: {
    LIST: '/downloads',
  },
  ADMIN: {
    USERS: '/admin/users',
    COURSES: '/admin/courses',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

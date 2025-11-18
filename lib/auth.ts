import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from './constants';

export const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  } catch {
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  } catch {
    return null;
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  } catch {
    // Ignore errors
  }
};

export const saveUser = async (user: object): Promise<void> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch {
    // Ignore errors
  }
};

export const getUser = async (): Promise<object | null> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch {
    // Ignore errors
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() >= exp;
  } catch {
    return true;
  }
};

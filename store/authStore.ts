import { create } from 'zustand';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/constants';
import { saveTokens, clearTokens, saveUser, clearUser, getUser } from '@/lib/auth';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
      const { accessToken, refreshToken, user } = response.data as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };

      await saveTokens(accessToken, refreshToken);
      await saveUser(user);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      router.replace('/(tabs)/home');
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post(ENDPOINTS.AUTH.SIGNUP, { name, email, password });
      const { accessToken, refreshToken, user } = response.data as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };

      await saveTokens(accessToken, refreshToken);
      await saveUser(user);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      router.replace('/(tabs)/home');
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  logout: async () => {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Ignore errors
    } finally {
      await clearTokens();
      await clearUser();
      set({
        user: null,
        isAuthenticated: false,
      });
      router.replace('/(auth)/login');
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const savedUser = await getUser();

      if (savedUser) {
        const response = await api.get(ENDPOINTS.AUTH.ME);
        const user = response.data as User;
        await saveUser(user);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          isLoading: false,
        });
      }
    } catch {
      await clearTokens();
      await clearUser();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  updateUser: (updatedUser: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      set({ user: newUser });
      saveUser(newUser);
    }
  },
}));

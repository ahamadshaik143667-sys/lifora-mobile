import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};

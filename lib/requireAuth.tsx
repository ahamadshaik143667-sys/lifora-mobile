import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { Loader } from '@/components/Loader';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
};

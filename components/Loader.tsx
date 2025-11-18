import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/styles/theme';

export const Loader = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
};

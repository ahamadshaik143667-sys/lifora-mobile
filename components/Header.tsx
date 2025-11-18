import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import { useAuthStore } from '@/store/authStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header = ({ title, showBack = false, rightAction }: HeaderProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuthStore();

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-3 border-b"
      style={{ backgroundColor: colors.card, borderBottomColor: colors.border }}
    >
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}
        {title && (
          <Text 
            className="text-xl font-semibold flex-1"
            style={{ color: colors.foreground }}
          >
            {title}
          </Text>
        )}
      </View>
      
      {rightAction || (
        <TouchableOpacity onPress={() => router.push('/profile')}>
          {user?.avatar ? (
            <View className="w-8 h-8 rounded-full bg-gray-300" />
          ) : (
            <Ionicons name="person-circle-outline" size={28} color={colors.foreground} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

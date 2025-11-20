import { Header } from '@/components/Header';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, setTheme, isDark } = useTheme();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      icon: 'person-outline',
      label: 'Edit Profile',
      onPress: () => router.push('/settings'),
    },
    {
      icon: 'bookmark-outline',
      label: 'Bookmarks',
      onPress: () => {},
    },
    {
      icon: 'heart-outline',
      label: 'Wishlist',
      onPress: () => {},
    },
    {
      icon: 'settings-outline',
      label: 'Settings',
      onPress: () => router.push('/settings'),
    },
    ...(user?.role === 'admin'
      ? [
          {
            icon: 'shield-outline',
            label: 'Admin Panel',
            onPress: () => router.push('/admin'),
          },
        ]
      : []),
    {
      icon: 'log-out-outline',
      label: 'Logout',
      onPress: handleLogout,
      destructive: true,
    },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Profile" />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View
            className="items-center py-8 rounded-xl mb-6"
            style={{ backgroundColor: colors.card }}
          >
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-3xl font-bold" style={{ color: colors.primaryForeground }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </Text>
            </View>
            <Text className="text-2xl font-bold mb-1" style={{ color: colors.foreground }}>
              {user?.name || 'User'}
            </Text>
            <Text className="text-base" style={{ color: colors.mutedForeground }}>
              {user?.email}
            </Text>
            {user?.role === 'admin' && (
              <View
                className="mt-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: colors.accent }}
              >
                <Text
                  className="text-xs font-semibold uppercase"
                  style={{ color: colors.accentForeground }}
                >
                  {user.role}
                </Text>
              </View>
            )}
          </View>

          <View
            className="rounded-xl mb-4 overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View
              className="flex-row items-center justify-between px-4 py-4 border-b"
              style={{ borderBottomColor: colors.border }}
            >
              <View className="flex-row items-center">
                <Ionicons name="moon-outline" size={24} color={colors.foreground} />
                <Text className="ml-3 text-base" style={{ color: colors.foreground }}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={value => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>

          <View className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.card }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                className={`flex-row items-center px-4 py-4 ${
                  index < menuItems.length - 1 ? 'border-b' : ''
                }`}
                style={{
                  borderBottomColor: index < menuItems.length - 1 ? colors.border : 'transparent',
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.destructive ? colors.destructive : colors.foreground}
                />
                <Text
                  className="ml-3 text-base flex-1"
                  style={{
                    color: item.destructive ? colors.destructive : colors.foreground,
                  }}
                >
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

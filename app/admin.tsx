import { Header } from '@/components/Header';
import { RequireAuth } from '@/lib/requireAuth';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AdminScreen() {
  const { colors } = useTheme();
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return (
      <RequireAuth>
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: colors.background }}
        >
          <Text style={{ color: colors.foreground }}>Access Denied</Text>
        </View>
      </RequireAuth>
    );
  }

  const adminMenuItems = [
    {
      icon: 'people-outline',
      label: 'Manage Users',
      description: 'View and manage all users',
      onPress: () => {},
    },
    {
      icon: 'library-outline',
      label: 'Manage Courses',
      description: 'Create, edit, and delete courses',
      onPress: () => {},
    },
    {
      icon: 'bar-chart-outline',
      label: 'Analytics',
      description: 'View app analytics and statistics',
      onPress: () => {},
    },
    {
      icon: 'settings-outline',
      label: 'System Settings',
      description: 'Configure system settings',
      onPress: () => {},
    },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Admin Panel" showBack />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View className="rounded-xl mb-6 p-4" style={{ backgroundColor: colors.card }}>
            <Text className="text-lg font-semibold mb-2" style={{ color: colors.foreground }}>
              Welcome, Admin
            </Text>
            <Text className="text-sm" style={{ color: colors.mutedForeground }}>
              Manage your learning platform
            </Text>
          </View>

          {adminMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="mb-4 rounded-xl overflow-hidden"
              style={{ backgroundColor: colors.card }}
            >
              <View className="flex-row items-center p-4">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Ionicons name={item.icon as any} size={24} color={colors.primaryForeground} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: colors.foreground }}
                  >
                    {item.label}
                  </Text>
                  <Text className="text-sm" style={{ color: colors.mutedForeground }}>
                    {item.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

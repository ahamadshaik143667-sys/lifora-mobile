import { Header } from '@/components/Header';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/styles/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    updateUser({ name, email });
    router.back();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Settings" showBack />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <View
            className="rounded-xl mb-4 overflow-hidden"
            style={{ backgroundColor: colors.card }}
          >
            <View className="px-4 py-4 border-b" style={{ borderBottomColor: colors.border }}>
              <Text className="text-base font-semibold mb-4" style={{ color: colors.foreground }}>
                Profile Information
              </Text>

              <View className="mb-4">
                <Text className="text-sm mb-2" style={{ color: colors.mutedForeground }}>
                  Full Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.mutedForeground}
                  className="px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: colors.input,
                    color: colors.foreground,
                  }}
                />
              </View>

              <View className="mb-4">
                <Text className="text-sm mb-2" style={{ color: colors.mutedForeground }}>
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: colors.input,
                    color: colors.foreground,
                  }}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSave}
            className="px-4 py-4 rounded-xl items-center"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-base font-semibold" style={{ color: colors.primaryForeground }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';

export default function ModalScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center p-6"
      style={{ backgroundColor: colors.background }}
    >
      <Ionicons name="information-circle-outline" size={64} color={colors.primary} />
      <Text
        className="text-2xl font-bold mt-4 mb-2 text-center"
        style={{ color: colors.foreground }}
      >
        Modal Screen
      </Text>
      <Text className="text-base text-center mb-6" style={{ color: colors.mutedForeground }}>
        This is a modal screen. You can customize it for your needs.
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="px-6 py-3 rounded-xl"
        style={{ backgroundColor: colors.primary }}
      >
        <Text className="text-base font-semibold" style={{ color: colors.primaryForeground }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
}

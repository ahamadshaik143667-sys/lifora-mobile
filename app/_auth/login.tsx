// FILE: app/(auth)/login.tsx
import SocialButtons from '@/components/SocialButtons';
import { showToast } from '@/lib/toast';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  async function onLogin() {
    if (!email.trim() || !password.trim()) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await login(email.trim(), password);
      showToast('Login successful', 'success');
      // Navigation is handled by the auth store
    } catch (error: any) {
      showToast(error.message || 'Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="items-center justify-center p-6"
        >
          <View
            className="w-full max-w-[840px] rounded-2xl overflow-hidden bg-white/5 shadow-lg"
            style={{ width: '100%' }}
          >
            <View className="flex-row">
              {/* Left: Form */}
              <View className="w-1/2 p-8 form-container login">
                <Text className="text-white text-3xl font-bold mb-6">Welcome Back</Text>

                <View className="space-y-4">
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full p-3 rounded-md bg-white/20 text-white"
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="w-full p-3 rounded-md bg-white/20 text-white"
                  />

                  <TouchableOpacity
                    onPress={onLogin}
                    activeOpacity={0.9}
                    disabled={isLoading}
                    className="w-full py-3 mt-3 bg-white rounded-md items-center"
                    style={{ opacity: isLoading ? 0.6 : 1 }}
                  >
                    <Text className="text-indigo-600 font-semibold">
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-6">
                  <SocialButtons />
                </View>
              </View>

              {/* Right: Toggle/visual area */}
              <View className="w-1/2 toggle-container p-8 items-center justify-center">
                <Text className="text-2xl font-bold text-white mb-2">New here?</Text>
                <Text className="text-white/90 mb-4 text-center">
                  Create an account to get access to premium courses and features.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)/signup')}
                  activeOpacity={0.9}
                  className="mt-2 px-6 py-2 border border-white rounded-lg"
                >
                  <Text className="text-white font-semibold">Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Responsive: for narrow screens stack vertically */}
          <View className="mt-6 w-full max-w-[840px] md:hidden">
            {/* fallback block for small devices: show compact form */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

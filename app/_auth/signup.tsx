// FILE: app/(auth)/signup.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import SocialButtons from '@/components/SocialButtons';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@/lib/toast';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthStore();

  async function onSignup() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await signup(name.trim(), email.trim(), password);
      showToast('Account created successfully', 'success');
      // Navigation is handled by the auth store
    } catch (error: any) {
      showToast(error.message || 'Signup failed. Please try again.', 'error');
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
          <View className="w-full max-w-[840px] rounded-2xl overflow-hidden bg-white/5 shadow-lg">
            <View className="flex-row">
              <View className="w-1/2 p-8 form-container">
                <Text className="text-white text-3xl font-bold mb-6">Create Account</Text>

                <View className="space-y-4">
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor={'rgba(255,255,255,0.8)'}
                    value={name}
                    onChangeText={setName}
                    className="w-full p-3 rounded-md bg-white/20 text-white"
                  />
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
                    onPress={onSignup}
                    activeOpacity={0.9}
                    disabled={isLoading}
                    className="w-full py-3 mt-3 bg-white rounded-md items-center"
                    style={{ opacity: isLoading ? 0.6 : 1 }}
                  >
                    <Text className="text-indigo-600 font-semibold">
                      {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-6">
                  <SocialButtons />
                </View>
              </View>

              <View className="w-1/2 toggle-container p-8 items-center justify-center">
                <Text className="text-2xl font-bold text-white mb-2">Already a member?</Text>
                <Text className="text-white/90 mb-4 text-center">
                  Sign in to continue where you left off.
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)/login')}
                  activeOpacity={0.9}
                  className="mt-2 px-6 py-2 border border-white rounded-lg"
                >
                  <Text className="text-white font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// FILE: components/SocialButtons.tsx
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function SocialButtons() {
  return (
    <View className="flex-row justify-center mt-2 gap-4 social-login">
      <TouchableOpacity
        className="social-btn google p-3 rounded-lg bg-white items-center"
        activeOpacity={0.8}
      >
        <FontAwesome name="google" size={22} color="#db4437" />
      </TouchableOpacity>

      <TouchableOpacity
        className="social-btn facebook p-3 rounded-lg bg-white items-center"
        activeOpacity={0.8}
      >
        <FontAwesome name="facebook" size={22} color="#1877f2" />
      </TouchableOpacity>

      <TouchableOpacity
        className="social-btn github p-3 rounded-lg bg-white items-center"
        activeOpacity={0.8}
      >
        <AntDesign name="github" size={22} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        className="social-btn x p-3 rounded-lg bg-white items-center"
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="twitter" size={22} color="#1DA1F2" />
      </TouchableOpacity>
    </View>
  );
}

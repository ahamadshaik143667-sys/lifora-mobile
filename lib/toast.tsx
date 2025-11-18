import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { useTheme } from '@/styles/theme';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

let toastState: ToastState = {
  message: '',
  type: 'info',
  visible: false,
};

let setToastStateFn: ((state: ToastState) => void) | null = null;

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  if (setToastStateFn) {
    setToastStateFn({ message, type, visible: true });
  }
};

export const Toast = () => {
  const [state, setState] = React.useState<ToastState>(toastState);
  const { colors } = useTheme();

  useEffect(() => {
    setToastStateFn = setState;
    return () => {
      setToastStateFn = null;
    };
  }, []);

  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.visible]);

  const translateY = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(state.visible ? 0 : -100, {
          duration: 300,
        }),
      },
    ],
    opacity: withTiming(state.visible ? 1 : 0, { duration: 300 }),
  }));

  if (!state.visible) return null;

  const getIcon = () => {
    switch (state.type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      default:
        return 'information-circle';
    }
  };

  const getColor = () => {
    switch (state.type) {
      case 'success':
        return '#10b981';
      case 'error':
        return colors.destructive;
      default:
        return colors.primary;
    }
  };

  return (
    <Animated.View
      style={[
        translateY,
        {
          position: 'absolute',
          top: 50,
          left: 16,
          right: 16,
          zIndex: 9999,
        },
      ]}
    >
      <View
        className="flex-row items-center px-4 py-3 rounded-xl shadow-lg"
        style={{ backgroundColor: colors.card, borderLeftWidth: 4, borderLeftColor: getColor() }}
      >
        <Ionicons name={getIcon() as any} size={24} color={getColor()} />
        <Text className="flex-1 ml-3 text-base" style={{ color: colors.foreground }}>
          {state.message}
        </Text>
        <TouchableOpacity onPress={() => setState(prev => ({ ...prev, visible: false }))}>
          <Ionicons name="close" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

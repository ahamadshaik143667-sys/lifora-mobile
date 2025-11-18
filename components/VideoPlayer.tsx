import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface VideoPlayerProps {
  uri: string;
  onComplete?: () => void;
}

export const VideoPlayer = ({ uri, onComplete }: VideoPlayerProps) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const { colors } = useTheme();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying]);

  const controlsOpacity = useAnimatedStyle(() => ({
    opacity: withTiming(showControls ? 1 : 0),
  }));

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying ?? false);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);

      if (status.didJustFinish && onComplete) {
        onComplete();
      }
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
  };

  const handleTap = () => {
    setShowControls(true);
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity 
      activeOpacity={1}
      onPress={handleTap}
      className="relative w-full" 
      style={{ backgroundColor: '#000' }}
    >
      <Video
        ref={videoRef}
        source={{ uri }}
        className="w-full"
        style={{ height: 240 }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={isPlaying}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        useNativeControls={false}
      />

      <Animated.View
        style={[styles.controls, controlsOpacity]}
        className="absolute inset-0 items-center justify-center"
      >
        <TouchableOpacity
          onPress={togglePlayPause}
          className="bg-black/50 rounded-full p-4"
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#ffffff"
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[styles.bottomControls, controlsOpacity]}
        className="absolute bottom-0 left-0 right-0 px-4 py-2"
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-xs">{formatTime(position)}</Text>
          <View className="flex-1 h-1 mx-2 bg-white/30 rounded">
            <View
              className="h-full bg-white rounded"
              style={{ width: `${duration ? (position / duration) * 100 : 0}%` }}
            />
          </View>
          <Text className="text-white text-xs">{formatTime(duration)}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  controls: {
    backgroundColor: 'transparent',
  },
  bottomControls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

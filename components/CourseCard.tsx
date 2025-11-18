import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import { Course } from '@/store/courseStore';
import { useCourseStore } from '@/store/courseStore';
import { logger } from '@/lib/logger';
import { showToast } from '@/lib/toast';


interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  const { toggleWishlist } = useCourseStore();

  const handleWishlist = async () => {
    try {
      await toggleWishlist(course.id);
    } catch (error) {
      logger.error('Failed to toggle wishlist', error instanceof Error ? error : new Error(String(error)), {
        courseId: course.id,
      });
      showToast('Failed to update wishlist', 'error');
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/course', params: { id: course.id } })}
        className="mb-4"
        activeOpacity={0.8}
      >
        <View 
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: colors.card }}
        >
          <View className="relative">
            <Image
              source={{ uri: course.thumbnail }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handleWishlist}
              className="absolute top-2 right-2 p-2 rounded-full"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <Ionicons
                name={course.isWishlisted ? 'heart' : 'heart-outline'}
                size={20}
                color={course.isWishlisted ? '#ef4444' : '#ffffff'}
              />
            </TouchableOpacity>
            {course.price === 0 && (
              <View 
                className="absolute top-2 left-2 px-2 py-1 rounded"
                style={{ backgroundColor: colors.primary }}
              >
                <Text 
                  className="text-xs font-bold"
                  style={{ color: colors.primaryForeground }}
                >
                  FREE
                </Text>
              </View>
            )}
          </View>

          <View className="p-4">
            <Text 
              className="text-lg font-semibold mb-1"
              style={{ color: colors.foreground }}
              numberOfLines={2}
            >
              {course.title}
            </Text>
            <Text 
              className="text-sm mb-2"
              style={{ color: colors.mutedForeground }}
              numberOfLines={2}
            >
              {course.instructor}
            </Text>

            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text 
                  className="text-sm ml-1"
                  style={{ color: colors.foreground }}
                >
                  {course.rating.toFixed(1)}
                </Text>
                <Text 
                  className="text-sm ml-2"
                  style={{ color: colors.mutedForeground }}
                >
                  ({course.studentsCount})
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="play-circle" size={14} color={colors.mutedForeground} />
                <Text 
                  className="text-sm ml-1"
                  style={{ color: colors.mutedForeground }}
                >
                  {course.lessonsCount} lessons
                </Text>
              </View>
            </View>

            {course.price > 0 && (
              <Text 
                className="text-lg font-bold"
                style={{ color: colors.primary }}
              >
                ${course.price}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { Loader } from '@/components/Loader';
import { useCourseStore } from '@/store/courseStore';
import { useAuthStore } from '@/store/authStore';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { courses, isLoading, fetchCourses } = useCourseStore();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  if (isLoading && courses.length === 0) {
    return <Loader />;
  }

  const featuredCourses = courses.slice(0, 3);
  const allCourses = courses;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title={`Welcome, ${user?.name || 'User'}`} />
      
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-4 py-6">
          <View className="mb-6">
            <Text 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Featured Courses
            </Text>
            <Text 
              className="text-base"
              style={{ color: colors.mutedForeground }}
            >
              Start learning today
            </Text>
          </View>

          {featuredCourses.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
              {featuredCourses.map((course) => (
                <View key={course.id} className="mr-4" style={{ width: 300 }}>
                  <CourseCard course={course} />
                </View>
              ))}
            </ScrollView>
          )}

          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.foreground }}
              >
                All Courses
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/courses')}>
                <Text 
                  className="text-base"
                  style={{ color: colors.primary }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

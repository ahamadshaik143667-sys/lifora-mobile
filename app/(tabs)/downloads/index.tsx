import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '@/styles/theme';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { Loader } from '@/components/Loader';
import { useCourseStore } from '@/store/courseStore';

export default function DownloadsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { courses, downloads, isLoading, fetchCourses, fetchDownloads } = useCourseStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDownloads();
    fetchCourses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDownloads();
    await fetchCourses();
    setRefreshing(false);
  };

  const downloadedCourses = courses.filter(course => downloads.includes(course.id));

  if (isLoading && downloadedCourses.length === 0) {
    return <Loader />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Downloads" />

      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="px-4 py-6">
          {downloadedCourses.length === 0 ? (
            <View className="items-center justify-center py-12">
              <Ionicons name="download-outline" size={64} color={colors.mutedForeground} />
              <Text className="text-lg font-semibold mt-4" style={{ color: colors.foreground }}>
                No downloads yet
              </Text>
              <Text
                className="text-base mt-2 text-center px-8"
                style={{ color: colors.mutedForeground }}
              >
                Download courses to access them offline
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/courses')}
                className="mt-6 px-6 py-3 rounded-xl"
                style={{ backgroundColor: colors.primary }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.primaryForeground }}
                >
                  Browse Courses
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text className="text-lg font-semibold mb-4" style={{ color: colors.foreground }}>
                Downloaded Courses ({downloadedCourses.length})
              </Text>
              {downloadedCourses.map(course => (
                <View key={course.id} className="mb-4">
                  <CourseCard course={course} />
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: '/course', params: { id: course.id } })}
                    className="mt-2 px-4 py-2 rounded-lg flex-row items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Ionicons name="play" size={20} color={colors.primaryForeground} />
                    <Text
                      className="ml-2 font-semibold"
                      style={{ color: colors.primaryForeground }}
                    >
                      Continue Learning
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

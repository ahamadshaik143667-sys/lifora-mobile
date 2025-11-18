import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import { Header } from '@/components/Header';
import { Loader } from '@/components/Loader';
import { useCourseStore } from '@/store/courseStore';
import { VideoPlayer } from '@/components/VideoPlayer';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { currentCourse, isLoading, fetchCourseById, toggleBookmark, downloadCourse, setCurrentLesson } = useCourseStore();

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id]);

  const handleStartLesson = (lessonIndex: number) => {
    if (currentCourse?.lessons && currentCourse.lessons[lessonIndex]) {
      setCurrentLesson(currentCourse.lessons[lessonIndex]);
      router.push({
        pathname: '/courses',
        params: {
          courseId: id,
          lessonId: currentCourse.lessons[lessonIndex].id,
        },
      });
    }
  };

  if (isLoading || !currentCourse) {
    return <Loader />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title={currentCourse.title} showBack />
      
      <ScrollView className="flex-1">
        <Image
          source={{ uri: currentCourse.thumbnail }}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="px-4 py-6">
          <View className="mb-4">
            <Text 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              {currentCourse.title}
            </Text>
            <Text 
              className="text-base mb-4"
              style={{ color: colors.mutedForeground }}
            >
              {currentCourse.instructor}
            </Text>

            <View className="flex-row items-center mb-4">
              <View className="flex-row items-center mr-4">
                <Ionicons name="star" size={16} color="#fbbf24" />
                <Text 
                  className="ml-1 text-base"
                  style={{ color: colors.foreground }}
                >
                  {currentCourse.rating.toFixed(1)}
                </Text>
              </View>
              <View className="flex-row items-center mr-4">
                <Ionicons name="people" size={16} color={colors.mutedForeground} />
                <Text 
                  className="ml-1 text-base"
                  style={{ color: colors.mutedForeground }}
                >
                  {currentCourse.studentsCount} students
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color={colors.mutedForeground} />
                <Text 
                  className="ml-1 text-base"
                  style={{ color: colors.mutedForeground }}
                >
                  {Math.floor(currentCourse.duration / 60)}h
                </Text>
              </View>
            </View>

            <Text 
              className="text-base leading-6 mb-4"
              style={{ color: colors.foreground }}
            >
              {currentCourse.description}
            </Text>

            <View className="flex-row gap-2 mb-6">
              <TouchableOpacity
                onPress={() => toggleBookmark(currentCourse.id)}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{
                  backgroundColor: currentCourse.isBookmarked ? colors.primary : colors.muted,
                }}
              >
                <Ionicons
                  name={currentCourse.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={currentCourse.isBookmarked ? colors.primaryForeground : colors.foreground}
                />
                <Text 
                  className="ml-2 font-semibold"
                  style={{
                    color: currentCourse.isBookmarked ? colors.primaryForeground : colors.foreground,
                  }}
                >
                  {currentCourse.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => downloadCourse(currentCourse.id)}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <Ionicons name="download-outline" size={20} color={colors.accentForeground} />
                <Text 
                  className="ml-2 font-semibold"
                  style={{ color: colors.accentForeground }}
                >
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View 
            className="rounded-xl overflow-hidden mb-4"
            style={{ backgroundColor: colors.card }}
          >
            <View className="px-4 py-4 border-b" style={{ borderBottomColor: colors.border }}>
              <Text 
                className="text-lg font-semibold"
                style={{ color: colors.foreground }}
              >
                Course Content
              </Text>
              <Text 
                className="text-sm mt-1"
                style={{ color: colors.mutedForeground }}
              >
                {currentCourse.lessons?.length || 0} lessons
              </Text>
            </View>

            {currentCourse.lessons?.map((lesson, index) => (
              <TouchableOpacity
                key={lesson.id}
                onPress={() => handleStartLesson(index)}
                className="px-4 py-4 border-b flex-row items-center"
                style={{
                  borderBottomColor: index < (currentCourse.lessons?.length || 0) - 1 ? colors.border : 'transparent',
                }}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: lesson.completed ? colors.primary : colors.muted }}
                >
                  {lesson.completed ? (
                    <Ionicons name="checkmark" size={20} color={colors.primaryForeground} />
                  ) : (
                    <Text 
                      className="text-sm font-semibold"
                      style={{ color: colors.foreground }}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-base font-medium mb-1"
                    style={{ color: colors.foreground }}
                  >
                    {lesson.title}
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.mutedForeground }}
                  >
                    {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
                <Ionicons name="play-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

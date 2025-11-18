import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@/styles/theme";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useCourseStore } from "@/store/courseStore";
import { Lesson } from "@/store/courseStore";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/constants";
import { logger } from "@/lib/logger";
import { showToast } from "@/lib/toast";

export default function LessonScreen() {
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { currentCourse, fetchCourseById, markLessonComplete, setCurrentLesson } = useCourseStore();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [courseId, lessonId]);

  const loadLesson = async () => {
    try {
      setIsLoading(true);
      if (!currentCourse && courseId) {
        await fetchCourseById(courseId);
      }
      
      if (courseId && lessonId) {
        const response = await api.get(ENDPOINTS.COURSES.LESSON(courseId, lessonId));
        const lessonData = response.data as Lesson;
        setLesson(lessonData);
        setCurrentLesson(lessonData);
      }
    } catch (error) {
      logger.error('Failed to load lesson', error instanceof Error ? error : new Error(String(error)), {
        courseId,
        lessonId,
      });
      showToast('Failed to load lesson', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    if (courseId && lessonId && lesson) {
      try {
        await markLessonComplete(courseId, lessonId);
        // Mark as complete in local state
        setLesson({ ...lesson, completed: true });
      } catch (error) {
        logger.error('Failed to mark lesson complete', error instanceof Error ? error : new Error(String(error)), {
          courseId,
          lessonId,
        });
        showToast('Failed to mark lesson as complete', 'error');
      }
    }
  };

  const currentIndex = currentCourse?.lessons?.findIndex((l) => l.id === lessonId) ?? -1;
  const nextLesson = currentIndex >= 0 && currentCourse?.lessons
    ? currentCourse.lessons[currentIndex + 1]
    : null;
  const prevLesson = currentIndex > 0 && currentCourse?.lessons
    ? currentCourse.lessons[currentIndex - 1]
    : null;

  if (isLoading || !lesson) {
    return <Loader />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title={lesson.title} showBack />
      
      <ScrollView className="flex-1">
        <VideoPlayer uri={lesson.videoUrl} onComplete={handleComplete} />

        <View className="px-4 py-6">
          <Text 
            className="text-2xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            {lesson.title}
          </Text>
          
          <Text 
            className="text-base leading-6 mb-6"
            style={{ color: colors.foreground }}
          >
            {lesson.description}
          </Text>

          <View className="flex-row gap-2 mb-6">
            {prevLesson && (
              <TouchableOpacity
                onPress={() => router.replace({
                  pathname: '/courses',
                  params: { courseId: courseId!, lessonId: prevLesson.id },
                })}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: colors.muted }}
              >
                <Ionicons name="chevron-back" size={20} color={colors.foreground} />
                <Text 
                  className="ml-2 font-semibold"
                  style={{ color: colors.foreground }}
                >
                  Previous
                </Text>
              </TouchableOpacity>
            )}

            {!lesson.completed && (
              <TouchableOpacity
                onPress={handleComplete}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Ionicons name="checkmark-circle" size={20} color={colors.primaryForeground} />
                <Text 
                  className="ml-2 font-semibold"
                  style={{ color: colors.primaryForeground }}
                >
                  Mark Complete
                </Text>
              </TouchableOpacity>
            )}

            {nextLesson ? (
              <TouchableOpacity
                onPress={() => router.replace({
                  pathname: '/courses',
                  params: { courseId: courseId!, lessonId: nextLesson.id },
                })}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Text 
                  className="mr-2 font-semibold"
                  style={{ color: colors.primaryForeground }}
                >
                  Next
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.primaryForeground} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-1 px-4 py-3 rounded-xl flex-row items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <Text 
                  className="font-semibold"
                  style={{ color: colors.accentForeground }}
                >
                  Back to Course
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
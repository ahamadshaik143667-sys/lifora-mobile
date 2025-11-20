import { Header } from '@/components/Header';
import { useCourseStore } from '@/store/courseStore';
import { useTheme } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ExploreScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { courses } = useCourseStore();

  const categories = [
    { id: 'all', name: 'All', icon: 'grid-outline' },
    { id: 'programming', name: 'Programming', icon: 'code-outline' },
    { id: 'design', name: 'Design', icon: 'brush-outline' },
    { id: 'business', name: 'Business', icon: 'briefcase-outline' },
    { id: 'marketing', name: 'Marketing', icon: 'megaphone-outline' },
  ];

  const featuredCourses = courses.slice(0, 6);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Explore" />

      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold mb-4" style={{ color: colors.foreground }}>
            Categories
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                className="items-center mr-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: colors.card, minWidth: 100 }}
              >
                <Ionicons name={category.icon as any} size={24} color={colors.primary} />
                <Text className="mt-2 text-sm font-medium" style={{ color: colors.foreground }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-2xl font-bold mb-4" style={{ color: colors.foreground }}>
            Featured Courses
          </Text>

          {featuredCourses.length === 0 ? (
            <View className="items-center justify-center py-12">
              <Ionicons name="library-outline" size={64} color={colors.mutedForeground} />
              <Text className="text-lg font-semibold mt-4" style={{ color: colors.foreground }}>
                No courses available
              </Text>
              <Text
                className="text-base mt-2 text-center"
                style={{ color: colors.mutedForeground }}
              >
                Check back later for new courses
              </Text>
            </View>
          ) : (
            <View>
              {featuredCourses.map(course => (
                <TouchableOpacity
                  key={course.id}
                  onPress={() => router.push({ pathname: '/course', params: { id: course.id } })}
                  className="mb-4 p-4 rounded-xl flex-row"
                  style={{ backgroundColor: colors.card }}
                >
                  <View className="flex-1">
                    <Text
                      className="text-lg font-semibold mb-1"
                      style={{ color: colors.foreground }}
                      numberOfLines={2}
                    >
                      {course.title}
                    </Text>
                    <Text className="text-sm mb-2" style={{ color: colors.mutedForeground }}>
                      {course.instructor}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#fbbf24" />
                      <Text className="text-sm ml-1" style={{ color: colors.foreground }}>
                        {course.rating.toFixed(1)}
                      </Text>
                      <Text className="text-sm ml-2" style={{ color: colors.mutedForeground }}>
                        • {course.studentsCount} students
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.mutedForeground}
                    style={{ alignSelf: 'center', marginLeft: 12 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

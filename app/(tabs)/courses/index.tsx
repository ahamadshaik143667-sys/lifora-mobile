import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/styles/theme';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { Loader } from '@/components/Loader';
import { useCourseStore } from '@/store/courseStore';

export default function CoursesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { courses, isLoading, fetchCourses } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || course.level === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading && courses.length === 0) {
    return <Loader />;
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <Header title="Courses" />

      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="px-4 py-4">
          <View
            className="flex-row items-center px-4 py-3 rounded-xl mb-4"
            style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}
          >
            <Ionicons name="search" size={20} color={colors.mutedForeground} />
            <TextInput
              placeholder="Search courses..."
              placeholderTextColor={colors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3"
              style={{ color: colors.foreground }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(level => (
              <TouchableOpacity
                key={level}
                onPress={() => setFilter(level)}
                className={`px-4 py-2 rounded-full mr-2 ${filter === level ? '' : 'opacity-60'}`}
                style={{
                  backgroundColor: filter === level ? colors.primary : colors.muted,
                }}
              >
                <Text
                  className="text-sm font-medium capitalize"
                  style={{
                    color: filter === level ? colors.primaryForeground : colors.foreground,
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-lg font-semibold mb-4" style={{ color: colors.foreground }}>
            {filteredCourses.length} Courses Found
          </Text>

          {filteredCourses.length === 0 ? (
            <View className="items-center justify-center py-12">
              <Ionicons name="search-outline" size={64} color={colors.mutedForeground} />
              <Text className="text-lg font-semibold mt-4" style={{ color: colors.foreground }}>
                No courses found
              </Text>
              <Text
                className="text-base mt-2 text-center"
                style={{ color: colors.mutedForeground }}
              >
                Try adjusting your search or filter
              </Text>
            </View>
          ) : (
            filteredCourses.map(course => <CourseCard key={course.id} course={course} />)
          )}
        </View>
      </ScrollView>
    </View>
  );
}

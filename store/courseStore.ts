import { create } from 'zustand';
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/constants';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isWishlisted: boolean;
  isBookmarked: boolean;
  lessons?: Lesson[];
}

interface CourseState {
  courses: Course[];
  wishlist: string[];
  bookmarks: string[];
  downloads: string[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  isLoading: boolean;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  toggleWishlist: (courseId: string) => Promise<void>;
  toggleBookmark: (courseId: string) => Promise<void>;
  downloadCourse: (courseId: string) => Promise<void>;
  fetchDownloads: () => Promise<void>;
  setCurrentLesson: (lesson: Lesson | null) => void;
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  wishlist: [],
  bookmarks: [],
  downloads: [],
  currentCourse: null,
  currentLesson: null,
  isLoading: false,

  fetchCourses: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get(ENDPOINTS.COURSES.LIST);
      const courses = (response.data.courses || response.data) as Course[];
      set({
        courses,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchCourseById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await api.get(ENDPOINTS.COURSES.DETAIL(id));
      const course = response.data as Course;
      set({
        currentCourse: course,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  toggleWishlist: async (courseId: string) => {
    try {
      await api.post(ENDPOINTS.COURSES.BOOKMARK(courseId), { type: 'wishlist' });
      const { wishlist, courses } = get();
      const newWishlist = wishlist.includes(courseId)
        ? wishlist.filter(id => id !== courseId)
        : [...wishlist, courseId];

      const updatedCourses = courses.map(course =>
        course.id === courseId ? { ...course, isWishlisted: !course.isWishlisted } : course
      );

      set({ wishlist: newWishlist, courses: updatedCourses });
    } catch (error) {
      throw error;
    }
  },

  toggleBookmark: async (courseId: string) => {
    try {
      await api.post(ENDPOINTS.COURSES.BOOKMARK(courseId), { type: 'bookmark' });
      const { bookmarks, courses } = get();
      const newBookmarks = bookmarks.includes(courseId)
        ? bookmarks.filter(id => id !== courseId)
        : [...bookmarks, courseId];

      const updatedCourses = courses.map(course =>
        course.id === courseId ? { ...course, isBookmarked: !course.isBookmarked } : course
      );

      set({ bookmarks: newBookmarks, courses: updatedCourses });
    } catch (error) {
      throw error;
    }
  },

  downloadCourse: async (courseId: string) => {
    try {
      await api.post(ENDPOINTS.COURSES.DOWNLOAD(courseId));
      const { downloads } = get();
      if (!downloads.includes(courseId)) {
        set({ downloads: [...downloads, courseId] });
      }
    } catch (error) {
      throw error;
    }
  },

  fetchDownloads: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get(ENDPOINTS.DOWNLOADS.LIST);
      const courses = response.data as Course[];
      const downloadIds = courses.map(course => course.id);
      set({
        downloads: downloadIds,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setCurrentLesson: (lesson: Lesson | null) => {
    set({ currentLesson: lesson });
  },

  markLessonComplete: async (courseId: string, lessonId: string) => {
    try {
      await api.post(ENDPOINTS.COURSES.LESSON(courseId, lessonId) + '/complete');
      const { currentCourse } = get();
      if (currentCourse?.lessons) {
        const updatedLessons = currentCourse.lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        set({
          currentCourse: {
            ...currentCourse,
            lessons: updatedLessons,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  },
}));

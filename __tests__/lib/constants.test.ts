/**
 * Example test file - demonstrates testing patterns
 */

import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS, USER_ROLES } from '@/lib/constants';

describe('Constants', () => {
  describe('API_BASE_URL', () => {
    it('should have a default API URL', () => {
      expect(API_BASE_URL).toBeDefined();
      expect(typeof API_BASE_URL).toBe('string');
      expect(API_BASE_URL).toContain('http');
    });
  });

  describe('ENDPOINTS', () => {
    it('should have auth endpoints', () => {
      expect(ENDPOINTS.AUTH).toBeDefined();
      expect(ENDPOINTS.AUTH.LOGIN).toBe('/auth/login');
      expect(ENDPOINTS.AUTH.SIGNUP).toBe('/auth/signup');
    });

    it('should have course endpoints', () => {
      expect(ENDPOINTS.COURSES).toBeDefined();
      expect(ENDPOINTS.COURSES.LIST).toBe('/courses');
    });

    it('should generate dynamic course endpoints', () => {
      const courseId = '123';
      const lessonId = '456';
      expect(ENDPOINTS.COURSES.DETAIL(courseId)).toBe(`/courses/${courseId}`);
      expect(ENDPOINTS.COURSES.LESSON(courseId, lessonId)).toBe(
        `/courses/${courseId}/lessons/${lessonId}`
      );
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have all required storage keys', () => {
      expect(STORAGE_KEYS.ACCESS_TOKEN).toBe('access_token');
      expect(STORAGE_KEYS.REFRESH_TOKEN).toBe('refresh_token');
      expect(STORAGE_KEYS.USER).toBe('user');
      expect(STORAGE_KEYS.THEME).toBe('theme');
    });
  });

  describe('USER_ROLES', () => {
    it('should have user and admin roles', () => {
      expect(USER_ROLES.USER).toBe('user');
      expect(USER_ROLES.ADMIN).toBe('admin');
    });
  });
});

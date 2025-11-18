# 📡 API Documentation

## Base URL

The API base URL is configured via `EXPO_PUBLIC_API_URL` environment variable.

Default: `https://api.lifora.com/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Refresh

The app automatically refreshes tokens when they expire. The refresh flow:

1. Access token expires → 401 response
2. App uses refresh token to get new access token
3. Retry original request with new token
4. If refresh fails → logout user

## Endpoints

### Authentication

#### POST `/auth/login`

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### POST `/auth/signup`

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:** Same as login

#### POST `/auth/logout`

Logout current user (invalidates tokens).

**Request:** None (uses Bearer token)

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

#### POST `/auth/refresh`

Refresh access token.

**Request:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/auth/me`

Get current user information.

**Request:** None (uses Bearer token)

**Response:**

```json
{
  "id": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```

### Courses

#### GET `/courses`

Get list of courses.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search query
- `category` (optional): Filter by category

**Response:**

```json
{
  "courses": [
    {
      "id": "course-123",
      "title": "Introduction to React Native",
      "description": "Learn React Native from scratch",
      "thumbnail": "https://...",
      "duration": 3600,
      "instructor": "John Doe",
      "rating": 4.5,
      "students": 1234
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

#### GET `/courses/:id`

Get course details.

**Response:**

```json
{
  "id": "course-123",
  "title": "Introduction to React Native",
  "description": "Learn React Native from scratch",
  "thumbnail": "https://...",
  "duration": 3600,
  "instructor": {
    "id": "instructor-1",
    "name": "John Doe",
    "avatar": "https://..."
  },
  "rating": 4.5,
  "students": 1234,
  "lessons": [
    {
      "id": "lesson-1",
      "title": "Getting Started",
      "duration": 600,
      "videoUrl": "https://...",
      "order": 1
    }
  ]
}
```

#### GET `/courses/:courseId/lessons/:lessonId`

Get lesson details.

**Response:**

```json
{
  "id": "lesson-1",
  "title": "Getting Started",
  "description": "Introduction to the course",
  "duration": 600,
  "videoUrl": "https://...",
  "order": 1,
  "courseId": "course-123"
}
```

#### POST `/courses/:id/bookmark`

Bookmark/unbookmark a course.

**Response:**

```json
{
  "bookmarked": true
}
```

#### GET `/courses/wishlist`

Get user's wishlist.

**Response:** Same as `/courses` list

#### POST `/courses/:id/download`

Download course for offline viewing.

**Response:**

```json
{
  "downloadId": "download-123",
  "status": "queued"
}
```

### Downloads

#### GET `/downloads`

Get user's downloads.

**Response:**

```json
{
  "downloads": [
    {
      "id": "download-123",
      "courseId": "course-123",
      "course": {
        "id": "course-123",
        "title": "Introduction to React Native"
      },
      "status": "completed",
      "progress": 100,
      "downloadedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Admin (Admin Only)

#### GET `/admin/users`

Get all users (admin only).

#### GET `/admin/courses`

Get all courses (admin only).

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Invalid or expired token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid request data
- `SERVER_ERROR` (500): Internal server error

## Rate Limiting

API requests are rate-limited:

- **Authenticated**: 100 requests/minute
- **Unauthenticated**: 10 requests/minute

Rate limit headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Implementation

All API calls are made through the centralized client in `lib/api.ts`:

```typescript
import api from '@/lib/api';
import { ENDPOINTS } from '@/lib/constants';

// Example: Fetch courses
const response = await api.get(ENDPOINTS.COURSES.LIST);
const courses = response.data.courses;
```

The API client automatically:

- Adds Authorization header
- Refreshes tokens on 401
- Handles errors
- Retries failed requests

export interface Course {
  id: number;
  courseName: string;
}

export interface CreateCourseData {
  courseName: string;
}

export interface UpdateCourseData {
  courseName?: string;
}

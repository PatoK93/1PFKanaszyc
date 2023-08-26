import { Student } from '../../../pages/students/models/student.model';
import { Course } from '../../../pages/courses/models/course.model';

export interface Inscription {
  id: number;
  studentId: number;
  courseId: number;
}

export interface InscriptionWithStudentAndCourse extends Inscription {
  student: Student;
  course: Course;
}

export interface CreateInscriptionPayload {
  studentId: number | null;
  courseId: number | null;
}

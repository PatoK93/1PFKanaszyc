import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';
import { Student } from '../models/student.model';
import { STUDENTS_MOCK } from '../mocks/student.mock';

export const StudentsFeatureKey = 'students';

export interface State {
  students: Student[],
  studentDetail: Student | null,
}

export const initialState: State = {
  students: [],
  studentDetail: null,
};

export const reducer = createReducer(
  initialState,

  on(StudentsActions.loadStudents, state => {
    return {
      ...state,
      students: STUDENTS_MOCK,
    }
  }),

  on(StudentsActions.loadStudentDetail, (state, action) => {
    return {
      ...state,
      studentDetail: STUDENTS_MOCK.find((c) => c.id == action.studentId) || null,
    }
  })

);

export const studentsFeature = createFeature({
  name: StudentsFeatureKey,
  reducer,
});


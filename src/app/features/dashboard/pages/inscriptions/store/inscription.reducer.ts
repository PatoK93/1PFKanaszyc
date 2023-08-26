import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithStudentAndCourse } from '../models/inscription.model';
import { Student } from '../../../pages/students/models/student.model';
import { Course } from '../../../pages/courses/models/course.model';

export const InscriptionFeatureKey = 'Inscription';

export interface State {
  data: InscriptionWithStudentAndCourse[];
  studentOptions: Student[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  studentOptions: [],
  courseOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),

  on(InscriptionActions.loadStudentOptions, (state) => state),
  on(InscriptionActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data,
    }
  }),

  on(InscriptionActions.loadCourseOptions, (state) => state),
  on(InscriptionActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      coruseOptions: action.data,
    }
  })

);

export const InscriptionFeature = createFeature({
  name: InscriptionFeatureKey,
  reducer,
});


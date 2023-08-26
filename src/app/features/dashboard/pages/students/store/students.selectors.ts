import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.State>(
  fromStudents.StudentsFeatureKey
);

export const selectStudentsArray = createSelector(selectStudentsState, (state) => state.students)

export const selectStudentsDetailName = createSelector(selectStudentsState, (state) => state.studentDetail?.name)

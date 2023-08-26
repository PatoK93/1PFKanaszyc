import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectinscriptionstate = createFeatureSelector<fromInscription.State>(
  fromInscription.InscriptionFeatureKey
);
export const selectinscriptions = createSelector(selectinscriptionstate, (state) => state.data)
export const selectStudentOptions = createSelector(selectinscriptionstate, (state) => state.studentOptions)
export const selectCourseOptions = createSelector(selectinscriptionstate, (state) => state.courseOptions)

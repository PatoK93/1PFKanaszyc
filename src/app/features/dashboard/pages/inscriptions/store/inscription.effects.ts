import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscriptionPayload, Inscription, InscriptionWithStudentAndCourse } from '../models/inscription.model';
import { environment } from 'src/environments/environment';
import { Student } from '../../../pages/students/models/student.model';
import { Course } from '../../../pages/courses/models/course.model';
import { Store } from '@ngrx/store';


@Injectable()
export class InscriptionEffects {

  loadinscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.getinscriptionsFromDB().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadStudentOptions),
      concatMap(() =>
        this.getStudentOptions().pipe(
          map(data => InscriptionActions.loadStudentOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadCourseOptions),
      concatMap(() =>
        this.getCourseOptions().pipe(
          map(data => InscriptionActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });

  createinscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.createinscription(action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionActions.createInscriptionFailure({ error }))))
      )
    );
  });

  createinscriptionsuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getinscriptionsFromDB(): Observable<InscriptionWithStudentAndCourse[]> {
    return this.httpClient.get<InscriptionWithStudentAndCourse[]>(environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course')
  }

  private getStudentOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
  }

  private getCourseOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses');
  }

  private createinscription(payload: CreateInscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscriptions', payload)
  }
  
}

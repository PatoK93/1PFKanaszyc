import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { StudentsActions } from './students.actions';

@Injectable()
export class StudentsEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}

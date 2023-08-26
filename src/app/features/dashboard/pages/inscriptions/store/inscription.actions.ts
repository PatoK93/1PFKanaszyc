import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateInscriptionPayload, Inscription, InscriptionWithStudentAndCourse } from '../models/inscription.model';
import { Student } from '../../../pages/students/models/student.model';
import { Course } from '../../../pages/courses/models/course.model';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load inscriptions': emptyProps(),
    'Load inscriptions Success': props<{ data: InscriptionWithStudentAndCourse[] }>(),
    'Load inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{ data: Student[] }>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Student Detail': props<{ studentId: number }>(),
  }
});

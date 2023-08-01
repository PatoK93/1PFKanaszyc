import { Injectable } from '@angular/core';
import { CreateTeacherData, Teacher, UpdateTeacherData } from '../models/teacher.model';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private teachersDB: Observable<Teacher[]> = of([
    {
      id: 1,
      name: 'Marcos',
      surname: 'Rodriguez',
      age: 30,
      email: 'mrodriguez@mail.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Julian',
      surname: 'Perez',
      age: 30,
      email: 'jperez@mail.com',
      password: '123456',
    },
    {
      id: 3,
      name: 'Marcelo',
      surname: 'Alvarez',
      age: 30,
      email: 'malvarez@mail.com',
      password: '123456',
    },
  ]);

  private _teacher$ = new BehaviorSubject<Teacher[]>([]);
  private teacher$ = this._teacher$.asObservable();

  constructor() {}

  loadTeachers(): void {
    this.teachersDB.subscribe({
      next: (teachersFromDb) => this._teacher$.next(teachersFromDb),
    });
  }

  getTeachers(): Observable<Teacher[]> {
    return this.teacher$;
  }

  getTeachersById(id: number) {
    return this.teacher$.pipe(
      take(1),
      map(( teachers ) =>  teachers.find((t) => t.id === id)),
    )
  }

  createTeacher(teacher: CreateTeacherData): void {
    this.teacher$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._teacher$.next([
          ...arrayActual,
          { ...teacher, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateTeacherById(id: number, profesorActualizado: UpdateTeacherData): void {
    this.teacher$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._teacher$.next(
          arrayActual.map((t) =>
            t.id === id ? { ...t, ...profesorActualizado } : t
          )
        );
      },
    });
  }

  deleteTeacherById(id: number): void {
    this.teacher$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._teacher$.next(arrayActual.filter((t) => t.id !== id));
      },
    });
  }

}

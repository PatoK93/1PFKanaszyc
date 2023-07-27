import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models/student.model';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private studentsDB: Observable<Student[]> = of([
    {
      id: 1,
      name: 'Marcos',
      surname: 'Rodriguez',
      age: 30,
      email: 'mark@mail.com',
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

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  constructor() {}

  loadStudents(): void {
    this.studentsDB.subscribe({
      next: (studentsFromDb) => this._students$.next(studentsFromDb),
    });
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getstudentById(id: number) {
    return this.students$.pipe(
      take(1),
      map(( students ) =>  students.find((s) => s.id === id)),
    )
  }

  createStudent(student: CreateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next([
          ...arrayActual,
          { ...student, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateStudentById(id: number, estudianteActualizado: UpdateStudentData): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next(
          arrayActual.map((s) =>
            s.id === id ? { ...s, ...estudianteActualizado } : s
          )
        );
      },
    });
  }

  deleteStudentById(id: number): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next(arrayActual.filter((s) => s.id !== id));
      },
    });
  }

}

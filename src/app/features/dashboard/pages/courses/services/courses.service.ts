import { Injectable } from '@angular/core';
import { CreateCourseData, Course, UpdateCourseData } from '../models/course.model';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private courseDB: Observable<Course[]> = of([
    {
      id: 1,
      courseName: 'Biologia',
    },
    {
      id: 2,
      courseName: 'Matematica',
    },
    {
      id: 3,
      courseName: 'Geografia',
    },
  ]);

  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  constructor() {}

  loadCourses(): void {
    this.courseDB.subscribe({
      next: (coursesFromDb) => this._courses$.next(coursesFromDb),
    });
  }

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCoursesById(id: number) {
    return this.courses$.pipe(
      take(1),
      map(( courses ) =>  courses.find((c) => c.id === id)),
    )
  }

  createCourse(course: CreateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next([
          ...arrayActual,
          { ...course, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateCourseById(id: number, cursoActualizado: UpdateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(
          arrayActual.map((c) =>
            c.id === id ? { ...c, ...cursoActualizado } : c
          )
        );
      },
    });
  }

  deleteCourseById(id: number): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(arrayActual.filter((c) => c.id !== id));
      },
    });
  }

}

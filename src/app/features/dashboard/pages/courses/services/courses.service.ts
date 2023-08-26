import { Injectable } from '@angular/core';
import { CreateCourseData, Course, UpdateCourseData } from '../models/course.model';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadCourses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los cursos');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
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

  createCourse(payload: CreateCourseData): void {
    this.httpClient.post<Course>(environment.baseApiUrl  + '/courses', { ...payload})
      .pipe(
        mergeMap((courseCreate) => this.courses$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, courseCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._courses$.next(arrayActualizado);
        }
      })
  }

  updateCourseById(id: number, cursoActualizado: UpdateCourseData): void {
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, cursoActualizado).subscribe({
      next: () => this.loadCourses(),
    })
  }

  deleteCourseById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
      .pipe().subscribe({
        next: () => this.loadCourses(),
      })
  }

  getCoursesByStudentId(studentId: number): Observable<Student[]> {
    return this.http.get<Student[]>(environment.baseApiUrl + `/courses?studentId=${studentId}`)
  }

}

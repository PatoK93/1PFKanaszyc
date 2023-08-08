import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from '../models/student.model';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from '../../../../../shared/utils/helpers';
import { environment } from '../../../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadStudents(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students').subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los alumnos');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id: number) {
    return this.students$.pipe(
      take(1),
      map(( students ) =>  students.find((s) => s.id === id)),
    )
  }

  createStudent(payload: CreateStudentData): void {
    const token = generateRandomString(20);
    this.httpClient.post<Student>(environment.baseApiUrl  + '/students', { ...payload, token })
      .pipe(
        mergeMap((studentCreate) => this.students$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, studentCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._students$.next(arrayActualizado);
        }
      })
  }

  updateStudentById(id: number, estudianteActualizado: UpdateStudentData): void {
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, estudianteActualizado).subscribe({
      next: () => this.loadStudents(),
    })
  }

  deleteStudentById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
      .pipe().subscribe({
        next: () => this.loadStudents(),
      })
  }

}

import { Injectable } from '@angular/core';
import { CreateTeacherData, Teacher, UpdateTeacherData } from '../models/teacher.model';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from '../../../../../shared/utils/helpers';
import { environment } from '../../../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {

  private _teacher$ = new BehaviorSubject<Teacher[]>([]);
  private teacher$ = this._teacher$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadTeachers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Teacher[]>(environment.baseApiUrl + '/teachers').subscribe({
      next: (response) => {
        this._teacher$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los profesores');
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
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

  createTeacher(payload: CreateTeacherData): void {
    const token = generateRandomString(20);
    this.httpClient.post<Teacher>(environment.baseApiUrl  + '/teachers', { ...payload, token })
      .pipe(
        mergeMap((teacherCreate) => this.teacher$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, teacherCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._teacher$.next(arrayActualizado);
        }
      })
  }

  updateTeacherById(id: number, profesorActualizado: UpdateTeacherData): void {
    this.httpClient.put(environment.baseApiUrl + '/teachers/' + id, profesorActualizado).subscribe({
      next: () => this.loadTeachers(),
    })
  }

  deleteTeacherById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/teachers/' + id)
      .pipe().subscribe({
        next: () => this.loadTeachers(),
      })
  }

}

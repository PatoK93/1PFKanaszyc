import { Injectable } from "@angular/core";
import { LoginPayload } from "./models/login.model";
import { BehaviorSubject, Observable, map} from "rxjs";
import { User } from "../dashboard/pages/users/models/user.model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient,
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {
        return !!usersResult.length
      })
    )
  }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this._authUser$.next(authUser);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token);
        } else {
          this.notifier.showError('Email o contrasena invalida');
          this._authUser$.next(null);
        }
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          let message = 'Ocurrio un error inesperado';
          if (err.status === 401) {
            message = 'Email o contrasena invalida';
          }
          this.notifier.showError(message)
        }
      }
    })

  }
}

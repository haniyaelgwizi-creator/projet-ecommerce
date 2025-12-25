import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';

export type RegisterResult = 'success' | 'exists' | 'error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/users';
  private loggedInUser: User | null = null; // ⭐ stocke l'utilisateur connecté

  constructor(private http: HttpClient) {}

  // LOGIN
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.API}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.loggedInUser = users[0]; // stocke l'utilisateur connecté
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  // REGISTER
  register(user: User): Observable<RegisterResult> {
    return this.http.post<{ success: boolean; message?: string }>(this.API, user).pipe(
      map(res => {
        if (res.success === true) return 'success' as RegisterResult;
        if (res.message === 'EMAIL_EXISTS') return 'exists' as RegisterResult;
        return 'error' as RegisterResult;
      }),
      catchError(() => of('error' as RegisterResult))
    );
  }

  // ⭐ NOUVELLES MÉTHODES

  // Logout
  logout(): void {
    this.loggedInUser = null;
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  // Récupère l'utilisateur connecté
  getUser(): User | null {
    return this.loggedInUser;
  }
}

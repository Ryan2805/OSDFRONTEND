import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthCustomService {
  readonly currentUser$: BehaviorSubject<User | null>;
  readonly isAuthenticated$: BehaviorSubject<boolean>;

  private authenticateTimeout?: any;
  private Uri = `${environment.apiUri}`;

  constructor(private http: HttpClient) {
    this.currentUser$ = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user') || 'null')
    );
    this.isAuthenticated$ = new BehaviorSubject<boolean>(
      !!localStorage.getItem('token')
    );
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.Uri}/auth`, { email, password })
      .pipe(
        map((body) => {
          this.processAuthResponse(body);
          return;
        })
      );
  }

  public signup(userData: any): Observable<any> {
    return this.http.post(`${this.Uri}/users/signup`, userData);
  }

  private processAuthResponse(body: any) {
    try {
      const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
      const expires = payload.exp * 1000;

      localStorage.setItem('token', body.accessToken);
      localStorage.setItem('user', JSON.stringify(payload));

      this.currentUser$.next(payload as User);
      this.isAuthenticated$.next(true);

      this.startAuthenticateTimer(expires);
    } catch (error) {
      console.error('Error processing authentication response:', error);
    }
  }

  private startAuthenticateTimer(expires: number) {
    const timeout = expires - Date.now() - 60 * 1000;
    this.authenticateTimeout = setTimeout(() => {
      if (this.isAuthenticated$.value) {
        this.logout();
      }
    }, timeout);
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    this.isAuthenticated$.next(false);
  }

  public getTotalUsers(): Observable<number> {
    return this.http.get<{ totalUsers: number }>(`${this.Uri}/users/allusers`)
      .pipe(
        map(response => response.totalUsers) // Extract the totalUsers property
      );
  }
  // Fetch total number of drinks
  public getTotalDrinks(): Observable<number> {
    return this.http.get<number>(`${this.Uri}/drinks/alldrinks`);
  }
}

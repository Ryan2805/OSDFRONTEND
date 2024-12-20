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
    console.log('Initializing AuthCustomService...');

    this.currentUser$ = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    console.log('Initial user from localStorage:', this.currentUser$.value);

    const token = localStorage.getItem('token') || '';
    console.log('Initial token from localStorage:', token);

    if (token !== '') {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expires = payload.exp * 1000;

        console.log('Token payload:', payload);
        console.log('Token expires at:', new Date(expires));

        if (expires > Date.now()) {
          console.log('Token is valid. User is authenticated.');
          this.isAuthenticated$ = new BehaviorSubject<boolean>(true);
          this.startAuthenticateTimer(expires);
        } else {
          console.log('Token has expired. User is not authenticated.');
          this.isAuthenticated$ = new BehaviorSubject<boolean>(false);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        this.isAuthenticated$ = new BehaviorSubject<boolean>(false);
      }
    } else {
      console.log('No token found. User is not authenticated.');
      this.isAuthenticated$ = new BehaviorSubject<boolean>(false);
    }
  }

  public login(email: string, password: string): Observable<any> {
    console.log('Attempting login for email:', email);

    return this.http
      .post<any>(`${this.Uri}/auth`, { email: email, password: password })
      .pipe(
        map((body) => {
          console.log('Login response body:', body);

          try {
            const payload = JSON.parse(atob(body.accessToken.split('.')[1]));
            const expires = payload.exp * 1000;

            console.log('Token payload:', payload);
            console.log('Token expires at:', new Date(expires));

            localStorage.setItem('token', body.accessToken);
            console.log('Token saved to localStorage.');

            localStorage.setItem('user', JSON.stringify(payload));
            console.log('User saved to localStorage.');

            this.currentUser$.next(payload as User);
            this.isAuthenticated$.next(true);

            this.startAuthenticateTimer(expires);

            console.log('Login successful.');
          } catch (error) {
            console.error('Error processing login response:', error);
          }

          return;
        })
      );
  }

  private startAuthenticateTimer(expires: number) {
    const timeout = expires - Date.now() - 60 * 1000;
    console.log('Authentication timer set for:', timeout, 'milliseconds');

    this.authenticateTimeout = setTimeout(() => {
      console.log('Authentication timer expired. Logging out...');
      if (this.isAuthenticated$.value) {
        this.logout();
      }
    }, timeout);
  }

  public logout() {
    console.log('Logging out user...');
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.currentUser$.next(null);
    this.isAuthenticated$.next(false);

    console.log('User logged out successfully.');
  }
}


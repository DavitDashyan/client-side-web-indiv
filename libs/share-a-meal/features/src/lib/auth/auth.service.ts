import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '@avans-nx-workshop/shared/api';

export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>(
  'AuthService'
);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    // private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Check of we al een ingelogde user hebben
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: any) => {
          if (user) {
            const user1 = user; // const user1 = user.result; result weggehaald want was steeds undefined
            console.log('User Result', user.result, user);
            console.log('User found in local storage', user1);
            // console.log('UserID found in local storage', user1._id);
            this.currentUser$.next(user1);
            // return this.validateToken(user);
            return of(user1);
          } else {
            console.log(`No current user found`);
            return of(null);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  get currentUser(): Observable<IUser | null> {
    return this.currentUser$.asObservable();
  }

  //LOGIN VOOR USER
  login(email: string, password: string): Observable<IUser | null> {
    console.log(`login at ${environment.dataApiUrl}/api/user/login`);

    return this.http
    //posten naar de api/user/login endpoint in backend met email en ww
      .post<{ results: IUser }>(
        `${environment.dataApiUrl}/api/user/login`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((response) => { //transformatie van data
          const user = response.results;
          user && user._id && this.updateUser({ ...user, _id: user._id });
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user); //user sturen naar de obeservabels, subscribties krijgen de user
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);

          return of(null);
        })
      );
  }

  //REGISTER VOOR USER
  register(userData: IUser): Observable<IUser | null> {
    console.log(`register at ${environment.dataApiUrl}user`);
    console.log(userData);
    return this.http
      .post<IUser>(`${environment.dataApiUrl}/api/user`, userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          // const user = new User(response);
          console.dir(user);
          // this.saveUserToLocalStorage(user);
          // this.currentUser$.next(user);
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);

          return of(null);
        })
      );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        if (success) {
          console.log('logout - removing local user info');
          console.log('logout user:', this.currentUser$.getValue());

          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(null);
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<IUser | null> {
    const itemFromStorage = localStorage.getItem(this.CURRENT_USER);
    if (itemFromStorage === null) {
      return of(null);
    } else {
      const localUser = JSON.parse(itemFromStorage);  //parse van string naar object, JSON->javascript object
      console.log('getUserFromLocalStorage:', localUser);
      return of(localUser);
    }
  }

  private saveUserToLocalStorage(user: IUser): void {
    console.log('saveUserToLocalStorage:', user);
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user)); //opslaan in debrowser, naar javascript object dan opslaan met de key CURRENT_USER
  }

  updateUser(user: IUser | null): void {
    console.log('HURAAAAA User:', user);
    this.currentUser$.next(user);
  }
}

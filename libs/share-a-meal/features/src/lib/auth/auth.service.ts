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
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: any) => {
          if (user) {
            const user1 = user.results;
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

  login(email: string, password: string): Observable<IUser | null> {
    console.log(`login at ${environment.dataApiUrl}/api/user/login`);

    return this.http
      .post<{ results: IUser }>(
        `${environment.dataApiUrl}/api/user/login`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((response) => {
          const user = response.results;
          user && user._id && this.updateUser({ ...user, _id: user._id });
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          //this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return of(null);
        })
      );
  }
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
          // Deze regel moet worden verwijderd, zodat de gebruiker niet automatisch wordt ingelogd
          // this.saveUserToLocalStorage(user);
          // this.currentUser$.next(user);
          //this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return of(null);
        })
      );
  }
  
  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: IUser): Observable<IUser | null> {
    const url = `${environment.dataApiUrl}/api/auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      // catchError((error: any) => {
      catchError(() => {
        console.log('Validate token Failed');
        //this.logout();
        this.currentUser$.next(null);
        return of(null);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          console.log('logout user:', this.currentUser$.getValue());
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(null);
          //  this.alertService.success('You have been logged out.');
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
      const localUser = JSON.parse(itemFromStorage);
      console.log('getUserFromLocalStorage:', localUser);
      return of(localUser);
    }
  }

  private saveUserToLocalStorage(user: IUser): void {
    console.log('saveUserToLocalStorage:', user);
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: IUser | null) => (user ? user._id === itemUserId : false))
    );
  }
  updateUser(user: IUser | null): void {
    console.log('HURAAAAA update User:', user);
    this.currentUser$.next(user);
  }
}

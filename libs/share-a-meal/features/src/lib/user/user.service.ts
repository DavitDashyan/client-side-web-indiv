import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';


/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class UserService {
    endpoint = 'http://localhost:3000/api/user';

   //endpoint = ' https://demonodeapp42.azurewebsites.net/api/user';
    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> {
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser[]),
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> {
        const url = this.endpoint + '/' + id;
        console.log(`read ${url}`);
        return this.http
            .get<ApiResponse<IUser>>(url, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    // public create(): Observable<IUser> {
    //     console.log(`create ${this.endpoint}`);
        
    //     // Implementeer de logica om een nieuwe gebruiker te maken en retourneer de Observable
    //     return this.http.post<IUser>(this.endpoint, null, httpOptions)
    //         .pipe(
    //             tap(console.log),
    //             catchError(this.handleError)
    //         );
    // }

// ---------

    public create(newUserData: any): Observable<IUser> {
        console.log(`create ${this.endpoint}`);
        
        return this.http.post<IUser>(this.endpoint, newUserData,  {
                    observe: 'body' as const,
                    responseType: 'json' as const,
                })
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );
    }



    //================

    // public create(): Observable<IUser> {
    //     console.log(`create ${this.endpoint}`);
        
    //     // Implementeer de logica om een nieuwe gebruiker te maken en retourneer de Observable
    //     return this.http.post<IUser>(this.endpoint, user.number, {
    //         observe: 'body' as const,
    //         responseType: 'json' as const,
    //     })
    //     .pipe(
    //         tap(console.log),
    //         catchError(this.handleError)
    //     );
    // }
    

    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}

// import { Observable, throwError } from 'rxjs';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { map, catchError, tap } from 'rxjs/operators';
// import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
// import { Injectable } from '@angular/core';

// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";


// export const httpOptions = {
//     observe: 'body',
//     responseType: 'json',
// };
// @Injectable()
// export class UserService extends EntityService<IUser>{
//     endpoint = 'http://localhost:3000/api/user';

//     constructor (protected override alertServices: AlertService,
//         protected override http: HttpClient) {
//          super(http, environment.dataApiUrl, '/user');
//     }
   
// }
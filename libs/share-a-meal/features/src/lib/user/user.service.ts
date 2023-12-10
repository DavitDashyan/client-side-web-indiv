import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ProductService } from '../product/product.service';

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

    //endpoint = 'http://localhost:3000/api/user';
    //endpoint = environment.dataApiUrl + '/user';
    endpoint = `${environment.dataApiUrl}/api/user`;


    constructor(private readonly http: HttpClient,
      private productService: ProductService) {}

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
        console.log(`read ${this.endpoint}/${id}`);
        return this.http
            .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser),
                catchError(this.handleError)
            );
    }

    public create(user: IUser): Observable<IUser> {
        console.log(`create ${this.endpoint}`);
    
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        };
    
        return this.http
          .post<ApiResponse<IUser>>(this.endpoint, user, httpOptions)
          .pipe(
            tap(console.log),
            map((response: any) => response.results as IUser),
            catchError(this.handleError)
          );
    }

    public update(user: IUser): Observable<IUser> {
        console.log(`update ${this.endpoint}/${user.id}`);
        return this.http
          .put<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`, user)
          .pipe(
            tap(console.log),
            catchError((error) => {
              console.error('Update error:', error);
              throw error;
            })
          );
    }

    public delete(user: IUser): Observable<IUser> {
      console.log(`delete ${this.endpoint}/${user.id}`);
      return this.http
        .delete<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`)
        .pipe(tap(console.log), catchError(this.handleError));
    }
   
    
    // veranderen naar cart !AA!

//     public findOneWithProductlist(id: string | null): Observable<IUser> {
//       console.log(`getUserWithProductlist ${this.endpoint}/${id}/dashboard`);
//       return this.http
//           .get<ApiResponse<IUser>>(`${this.endpoint}/${id}/dashboard`)
//           .pipe(
//               tap(console.log),
//               map((response: any) => {
//                   const userWithProductlist: IUser = response.results as IUser;

//                   // Map each item in the boekenlijst to fetch the corresponding product details
//                   userWithProductlist.boekenlijst = userWithProductlist.boekenlijst.map(
//                       (productListItem: any) => {
//                           return {
//                               ...productListItem,
//                               productDetails: this.productService.getProductDetails(productListItem.boekId),
//                           };
//                       }
//                   );

//                   return userWithProductlist;
//               }),
//               catchError(this.handleError)
//           );
//   }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}

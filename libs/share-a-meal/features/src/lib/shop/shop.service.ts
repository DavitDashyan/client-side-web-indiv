import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import {
  ApiResponse,
  IProduct,
  IUser,
  IShop,
} from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpHeaders } from '@angular/common/http';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 */
@Injectable()
export class ShopService {
  //endpoint = 'http://localhost:3000/api/shop';
  //endpoint = environment.dataApiUrl + '/shop';
  endpoint = `${environment.dataApiUrl}/api/shop`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IShop[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IShop[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IShop[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(_id: string | null, options?: any): Observable<IShop> {
    console.log(`read ${this.endpoint}/${_id}`);
    return this.http
      .get<ApiResponse<IShop>>(`${this.endpoint}/${_id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IShop),
        catchError(this.handleError)
      );
  }

  public create(shop: IShop): Observable<IShop> {
    console.log(`create ${this.endpoint}`);
    console.log(`createThisEndpoint ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IShop>>(this.endpoint, shop, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IShop),
        catchError(this.handleError)
      );
  }

  public update(shop: IShop): Observable<IShop> {
    console.log(`update ${this.endpoint}/${shop.id}`);
    return this.http
      .put<ApiResponse<IShop>>(`${this.endpoint}/${shop.id}`, shop)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(shop: IShop): Observable<IShop> {
    console.log(`delete ${this.endpoint}/${shop.id}`);
    return this.http
      .delete<ApiResponse<IShop>>(`${this.endpoint}/${shop.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in ShopService', error);

    return throwError(() => new Error(error.message));
  }
}

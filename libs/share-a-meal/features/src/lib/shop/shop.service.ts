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

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

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

  // lijst van shops ophalen
  public list(options?: any): Observable<IShop[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IShop[]>>(this.endpoint, {
        //get request naar de endpoint
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IShop[]), // map de response naar een array van shops
        tap(console.log),
        catchError(this.handleError)
      );
  }

  // shop ophalen op basis van id
  public read(_id: string | null, options?: any): Observable<IShop> {
    console.log(`read ${this.endpoint}/${_id}`);
    return this.http
      .get<ApiResponse<IShop>>(`${this.endpoint}/${_id}`, {
        //get request naar de endpoint met het id
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IShop), // map de response naar een shop
        catchError(this.handleError)
      );
  }

  // shop aanmaken
  public create(shop: IShop): Observable<IShop> {
    console.log(`create ${this.endpoint}`);
    console.log(`createThisEndpoint ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IShop>>(this.endpoint, shop, httpOptions) //post request naar de endpoint met het shop
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IShop), // map de response naar een shop
        catchError(this.handleError)
      );
  }

  // shop updaten
  public update(shop: IShop): Observable<IShop> {
    console.log(`update shop ${this.endpoint}/${shop._id}`);
    return this.http
      .put<ApiResponse<IShop>>(`${this.endpoint}/${shop._id}`, shop) //put request naar de endpoint met het shop
      .pipe(tap(console.log), catchError(this.handleError)); //log en de error
  }

  // delete de shop
  public delete(shop: IShop): Observable<IShop> {
    console.log(`delete ${this.endpoint}/${shop._id}`);
    return this.http
      .delete<ApiResponse<IShop>>(`${this.endpoint}/${shop._id}`) //delete request naar de endpoint met het id
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in ShopService', error);

    return throwError(() => new Error(error.message));
  }
}

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

// export const httpOptions = {
//     observe: 'body',
//     responseType: 'json',
// };
export const httpOptions = {
  observe: 'body' as const,
  responseType: 'json' as const,
};

@Injectable()
export class ProductService {
  [x: string]: any;
  endpoint = `${environment.dataApiUrl}/api/product`;

  //endpoint = ' https://demonodeapp42.azurewebsites.net/api/product';
  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IProduct[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IProduct[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IProduct[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(_id: string | null, options?: any): Observable<IProduct> {
    console.log(`read ${this.endpoint}/${_id}`);
    return this.http
      .get<ApiResponse<IProduct>>(`${this.endpoint}/${_id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IProduct),
        catchError(this.handleError)
      );
  }

  public create(product: IProduct): Observable<IProduct> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IProduct>>(this.endpoint, product, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IProduct),
        catchError(this.handleError)
      );
  }

  public update(product: IProduct): Observable<IProduct> {
    console.log(`update product ${this.endpoint}/${product._id}`);
    return this.http
      .put<ApiResponse<IProduct>>(`${this.endpoint}/${product._id}`, product)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(product: IProduct): Observable<IProduct> {
    console.log(`delete ${this.endpoint}/${product._id}`);
    return this.http
      .delete<ApiResponse<IProduct>>(`${this.endpoint}/${product._id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public getShop(shopId: string | null): Observable<IShop> {
    const shopEndpoint = `${environment.dataApiUrl}/api/shop/${shopId}`;

    return this.http.get<ApiResponse<IShop>>(shopEndpoint).pipe(
      tap(console.log),
      map((response: any) => response.results as IShop),
      catchError(this.handleError)
    );
  }

  public getProductDetails(productId: string): Observable<IProduct> {
    return this.http
      .get<ApiResponse<IProduct>>(`${this.endpoint}/products/${productId}`)
      .pipe(
        map((response: any) => response.results as IProduct),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in ProductService', error);

    return throwError(() => new Error(error.message));
  }
}

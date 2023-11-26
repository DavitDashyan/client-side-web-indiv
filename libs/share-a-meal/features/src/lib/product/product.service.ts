import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IProduct } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import {environment}from '@avans-nx-workshop/shared/util-env'


export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};


@Injectable()
export class ProductService {
    endpoint = environment.dataApiUrl + '/product';

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

    public read(id: string | null, options?: any): Observable<IProduct> {
        const url = this.endpoint + '/' + id;
        console.log(`read ${url}`);
        return this.http
            .get<ApiResponse<IProduct>>(url, {
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IProduct),
                catchError(this.handleError)
            );
    }

    public create(newProductData: any): Observable<IProduct> {
        console.log(`create ${this.endpoint}`);
        
        return this.http.post<IProduct>(this.endpoint, newProductData,  {
                    observe: 'body' as const,
                    responseType: 'json' as const,
                })
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );
    }


    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in ProductService', error);

        return throwError(() => new Error(error.message));
    }
}

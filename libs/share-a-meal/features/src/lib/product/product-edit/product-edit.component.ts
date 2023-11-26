// import { Component } from '@angular/core';

// @Component({
//   selector: 'avans-nx-workshop-product-edit',
//   templateUrl: './product-edit.component.html',
//   styleUrls: ['./product-edit.component.css'],
// })
// export class ProductEditComponent {
// product: any;
// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { initModals} from 'flowbite';


@Component({
  selector: 'avans-nx-workshop-product-detail',
  templateUrl: './product-edit.component.html',

})
export class ProductEditComponent implements OnInit, OnDestroy {
  product: IProduct | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}


ngOnInit(): void {
    initModals();
    this.route.paramMap
      .pipe(
        tap((params: ParamMap) => console.log('product.id = ', params.get('id'))),
        switchMap((params: ParamMap) => {
          if (params.get('id') === null) {
          
            const newProductData = {

            };
            return this.productService.create(newProductData);
          }


        return this.productService.read(params.get('id')).pipe(
            tap((product) => {

            })
          );
        }),
        tap(console.log)
      )
      .subscribe((results) => {
        this.product = results;
      });
}


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
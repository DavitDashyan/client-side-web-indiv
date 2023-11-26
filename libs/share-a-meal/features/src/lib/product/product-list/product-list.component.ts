// import { Component } from '@angular/core';

// @Component({
//   selector: 'avans-nx-workshop-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent {}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.products = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
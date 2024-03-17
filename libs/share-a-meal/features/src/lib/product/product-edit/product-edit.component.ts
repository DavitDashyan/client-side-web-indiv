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
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initModals } from 'flowbite';
import { AuthService } from '../../auth/auth.service';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'avans-nx-workshop-product-detail',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  //OnDestroy
  product = {} as IProduct;
  //subscription: Subscription | undefined = undefined;
  productId: string | null = null;
  shop: IShop[] = [];
  selectedShopId: string | null = null;
  userId: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private authService: AuthService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //     initModals();
  //     this.route.paramMap
  //       .pipe(
  //         tap((params: ParamMap) => console.log('product.id = ', params.get('id'))),
  //         switchMap((params: ParamMap) => {
  //           if (params.get('id') === null) {

  //             const newProductData = {

  //             };
  //             return this.productService.create(newProductData);
  //           }

  //         return this.productService.read(params.get('id')).pipe(
  //             tap((product) => {

  //             })
  //           );
  //         }),
  //         tap(console.log)
  //       )
  //       .subscribe((results) => {
  //         this.product = results;
  //       });
  // }

  // ngOnDestroy(): void {
  //   if (this.subscription) this.subscription.unsubscribe();
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      if (this.productId) {
        this.productService.read(this.productId).subscribe((observable) => {
          this.product = observable;
        });
      }

      this.shopService.list().subscribe((shop) => {
        this.shop = shop?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
        console.log('Shop:', this.shop);
      });
    });

    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.userId = user._id;
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  updateProduct() {
    if (this.userId !== this.product?.creatorID) {
      console.error(
        'Current user is not the creator of the product. Updating is not allowed.'
      );
      return;
    }

    this.productService.update(this.product).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.router.navigate(['../../products', this.product?.id]);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../../products', this.product?.id]);
  }

  customSearch(term: string, item: any) {
    term = term.toLowerCase();
    return item.schrijvernaam.toLowerCase().includes(term);
  }

  // checkFuturePublicationDate(): boolean {
  // const currentDate = new Date();
  // const inputDate = new Date(this.product?.publiceerdatum);

  // return inputDate > currentDate;
  // }

  checkPriceNumber(): boolean {
    return this.product!.price > 0;
  }
}

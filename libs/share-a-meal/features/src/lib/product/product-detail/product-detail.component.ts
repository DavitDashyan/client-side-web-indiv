import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
// import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { CartService } from '../../../../../../backend/features/src//lib/cart/cart.service';

@Component({
  selector: 'avans-nx-workshop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

// export class ProductDetailComponent implements OnInit, OnDestroy {
//   product: IProduct | null = null;
//   subscription: Subscription | undefined = undefined;

//   constructor(
//     private productService: ProductService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap
//       .pipe(
//         tap((params: ParamMap) => console.log('product.id = ', params.get('id'))),

//         switchMap((params: ParamMap) =>
//           this.productService.read(params.get('id'))
//         ),
//         tap(console.log)
//       )
//       .subscribe((results) => {
//         this.product = results;
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }
// }
export class ProductDetailComponent implements OnInit {
  showDeleteConfirmation = false;
  showProductStatus = false;

  product = {} as IProduct;
  products: IProduct[] | null = null;
  productId: string | null = null;
  writers: IShop[] = [];
  userId: string | null = null;
  user: IUser | null = null;
  showButton: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    // private cartService: CartService, 
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // Krijg productId van route parameter
  //   this.route.paramMap.subscribe((params) => {
  //     this.productId = params.get('id');

  //     // Krijg userID van AuthService
  //     this.authService.currentUser$.subscribe({
  //       next: (user: IUser | null) => {
  //         if (user) {
  //           this.userId = user.id;
  //           // Product details ophalen gebaseerd op productId
  //           this.productService.read(this.productId).subscribe((observable) => {
  //             this.product = observable;

  //             // Check of de userId en creator hetzelfde zijn, als het niet zo is, is de knop niet zichtbaar
  //             this.showButton = this.isCurrentUserCreator();
  //           });
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error getting user information:', error);
  //       },
  //     });
  //   });
  // }
  ngOnInit(): void {
    // this.productService['getProducts']().subscribe((data: IProduct[]) => {
    //   this.products = data;

    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id') || '';

      this.authService.currentUser$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.userId = user.id;
            this.productService.read(productId).subscribe(
              (result) => {
                this.product = result;
                this.showButton = this.isCurrentUserCreator();
              },
              (error) => {
                console.error('Error getting product details:', error);
              }
            );
          }
        },
        error: (error) => {
          console.error('Error getting user information:', error);
        },
      });
    });
  }

  isCurrentUserCreator(): boolean {
    return this.userId === this.product?.creatorID;
  }

  // addToCart(): void {
  //   this.cartService.addToCart(this.product.id, 1); // 1 is de standaardhoeveelheid, je kunt dit aanpassen als dat nodig is.
  // }

  deleteProduct(): void {
    if (this.userId !== this.product?.creatorID) {
      console.error(
        'Current user is not the creator of the product. Deletion is not allowed.'
      );
      return;
    }

    if (this.productId) {
      this.productService.delete(this.product).subscribe({
        next: () => {
          console.log('Product deleted successfully');

          // sluit de uitklap dialoog
          this.showDeleteConfirmation = false;
          // Ga terug naar productenlijst
          this.router.navigate(['../../products'], { relativeTo: this.route });
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        },
      });
    } else {
      console.error('Product _id is missing for deletion.');
    }
  }
}

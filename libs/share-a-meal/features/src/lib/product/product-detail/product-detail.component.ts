// import { Component, OnDestroy, OnInit, inject } from '@angular/core';
// import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// // import { Subscription, switchMap, tap } from 'rxjs';
// import { AuthService } from '../../auth/auth.service';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { UserService } from '../../user/user.service';
// // import { CartService } from '../../../../../../backend/features/src//lib/cart/cart.service';
// //import { CartService } from '../../cart/cart.service';

// @Component({
//   selector: 'avans-nx-workshop-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.css'],
// })

// // export class ProductDetailComponent implements OnInit, OnDestroy {
// //   product: IProduct | null = null;
// //   subscription: Subscription | undefined = undefined;

// //   constructor(
// //     private productService: ProductService,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     this.route.paramMap
// //       .pipe(
// //         tap((params: ParamMap) => console.log('product.id = ', params.get('id'))),

// //         switchMap((params: ParamMap) =>
// //           this.productService.read(params.get('id'))
// //         ),
// //         tap(console.log)
// //       )
// //       .subscribe((results) => {
// //         this.product = results;
// //       });
// //   }

// //   ngOnDestroy(): void {
// //     if (this.subscription) this.subscription.unsubscribe();
// //   }
// // }
// export class ProductDetailComponent implements OnInit {
//   showDeleteConfirmation = false;
//   showProductStatus = false;

//   product = {} as IProduct;
//   products: IProduct[] | null = null;
//   productId: string | null = null;
//   shops: IShop[] = [];
//   userId: string | null = null;
//   user: IUser | null = null;
//   showButton: boolean | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private authService: AuthService,
//     //private cartService: CartService,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   // ngOnInit(): void {
//   //   // Krijg productId van route parameter
//   //   this.route.paramMap.subscribe((params) => {
//   //     this.productId = params.get('id');

//   //     // Krijg userID van AuthService
//   //     this.authService.currentUser$.subscribe({
//   //       next: (user: IUser | null) => {
//   //         if (user) {
//   //           this.userId = user.id;
//   //           // Product details ophalen gebaseerd op productId
//   //           this.productService.read(this.productId).subscribe((observable) => {
//   //             this.product = observable;

//   //             // Check of de userId en creator hetzelfde zijn, als het niet zo is, is de knop niet zichtbaar
//   //             this.showButton = this.isCurrentUserCreator();
//   //           });
//   //         }
//   //       },
//   //       error: (error) => {
//   //         console.error('Error getting user information:', error);
//   //       },
//   //     });
//   //   });
//   // }
//   ngOnInit(): void {
//     // this.productService['getProducts']().subscribe((data: IProduct[]) => {
//     //   this.products = data;

//     this.route.paramMap.subscribe((params) => {
//       const productId = params.get('id') || '';

//       this.authService.currentUser$.subscribe({
//         next: (user: IUser | null) => {
//           if (user) {
//             this.userId = user._id;
//             this.productService.read(productId).subscribe(
//               (result) => {
//                 this.product = result;
//                 this.showButton = this.isCurrentUserCreator();
//               },
//               (error) => {
//                 console.error('Error getting product details:', error);
//               }
//             );
//           }
//         },
//         error: (error) => {
//           console.error('Error getting user information:', error);
//         },
//       });
//     });
//   }

//   isCurrentUserCreator(): boolean {
//     return this.userId === this.product?.creatorID;
//   }

//   items: any[] = [];

//   // loadCartItems(): void {
//   //   if (this.userId) {
//   //     console.log(this.userId, 'This user product-detail.component.ts');
//   //     this.items = this.cartService.getCart(this.userId);
//   //     //this.calculateTotal();
//   //   }
//   // }

//   // // cartService = inject(CartService);
//   // addToCart(): void {
//   //   console.log(this.product, 'Product added to cart');
//   //   this.cartService.addToCart(this.product);
//   // }
//   addToCart(): void {
//     console.log(this.product, 'Product added to cart');
//     if (this.product) {
//       const user: IUser = {
//         _id: this.userId || '',
//         name: '',
//         address: '',
//         number: 0,
//         email: '',
//         password: '', // Add the missing 'password' property
//         bday: new Date(), // Change the type of 'bday' property to 'string'
//         cartList: [], // Add the missing 'cartList' property
//       }; // Create an instance of IUser with the userId
//       console.log(user._id, 'This user product-detail.component.ts');
//      // this.cartService.addToCart(user._id, this.product); // Pass the user id to the addToCart method
//     } else {
//       console.error('Product is not defined.');
//     }
//   }

//   deleteProduct(): void {
//     if (this.userId !== this.product?.creatorID) {
//       console.error(
//         'Current user is not the creator of the product. Deletion is not allowed.'
//       );
//       return;
//     }

//     if (this.productId) {
//       this.productService.delete(this.product).subscribe({
//         next: () => {
//           console.log('Product deleted successfully');

//           // sluit de uitklap dialoog
//           this.showDeleteConfirmation = false;
//           // Ga terug naar productenlijst
//           this.router.navigate(['../../products'], { relativeTo: this.route });
//         },
//         error: (error) => {
//           console.error('Error deleting product:', error);
//         },
//       });
//     } else {
//       console.error('Product _id is missing for deletion.');
//     }
//   }

//   handleStatusChange(): void {
//     // Check of het boek bestaat in het boekenlijst
//     this.userService.findOneInCartlist(this.userId!).subscribe({
//       next: (userWithBooklist: IUser) => {
//         this.user = userWithBooklist;

//         // productID vs productId ?
//         const productExists = this.user.cartList.some(
//           (product) => product.productId._id === this.productId
//         );

//         console.log('userId:', this.userId);
//         console.log('productId:', this.productId);
//         console.log('productExists:', productExists);

//         if (!productExists) {
//           // Boek bestaat niet, voeg het toe aan de boekenlijst
//           this.productService
//             .addProductlist(this.userId!, this.productId!)
//             .subscribe(
//               (result) => {
//                 this.router.navigate([`${this.userId}/dashboard`]);
//               },
//               (error) => {
//                 console.error('Error adding book to boekenlijst', error);
//               }
//             );
//         }
//       },
//       error: (error) => {
//         console.error('Error getting user information with booklist:', error);
//       },
//     });
//   }
// }

// product-detail.component.ts
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-workshop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  showDeleteConfirmation = false;
  showProductStatus = false;

  product = {} as IProduct;
  products: IProduct[] | null = null;
  productId: string | null = null;
  shops: IShop[] = [];
  userId: string | null = null;
  user: IUser | null = null;
  showButton: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');

      this.authService.currentUser$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.userId = user._id;
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

  // items: any[] = [];

  // addToCart(): void {
  //   console.log(this.product, 'Product added to cart');
  //   if (this.product) {
  //     const user: IUser = {
  //       _id: this.userId || '', // Provide a default value of an empty string if this.userId is null
  //       name: 'Test Naam',
  //       address: '',
  //       number: 0,
  //       email: '',
  //       password: '',
  //       bday: new Date(),
  //       cart: [], // Assign an empty array to the cart property
  //     }; // Create an instance of IUser with the userId
  //     console.log(
  //       user._id,
  //       //user.cart,
  //       user.email,
  //       user.name,
  //       'This user product-detail.component.ts'
  //     );
  //   } else {
  //     console.error('Product is not defined.');
  //   }
  // }

  addToCart(): void {
    if (!this.product) {
      console.error('Product is not defined.');
      return;
    }

    // Fetch the current user from the API based on this.userId
    this.userService.read(this.userId).subscribe({
      next: (user: IUser) => {
        // Initialize cart property if it doesn't exist
        // if (!user.cart) {
        //   user.cart = [];
        // }
        console.log('user.cart BB', user, user._id);

        console.log('user.bday before', user.bday);
        // Add the product to the user's cart
        console.log('Product._Id', this.product._id);
        if (typeof user.bday === 'string') {
          user.bday = new Date(user.bday);
        }

        user.cart.push({
          _id: this.product._id, // or generate a unique ID for the cart item
          productId: this.product._id, // Assuming productId is the ID of the product
          quantity: 1, // Assuming a default quantity of 1
          nameProduct: this.product.nameProduct, // Assuming nameProduct is the name of the product
          price: this.product.price, // Assuming price is the price of the product
          productImageUrl: this.product.productImageUrl, // Assuming productImageUrl is the image URL of the product
        });
        console.log('user.cart AA', user.cart);
        console.log('USER BDAY', user.bday);

        // Update the user's cart in the backend
        this.userService.update(user).subscribe({
          next: (updatedUser: IUser) => {
            console.log('Product added to cart:', this.product);
            console.log('Updated user:', updatedUser);
            // Optionally, you can redirect the user to the cart page
            // this.router.navigate([`${this.userId}/cart`]);
          },
          error: (error) => {
            console.log('bdayQQQQQ', user.bday);
            console.error('Error updating user with added product:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
  }

  deleteProduct(): void {
    if (this.userId !== this.product?.creatorID) {
      console.error(
        'Current user is not the creator of this product. Deletion not allowed.'
      );
      return;
    }

    this.productService.delete(this.product).subscribe(
      () => {
        console.log('Product deleted successfully.');
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}

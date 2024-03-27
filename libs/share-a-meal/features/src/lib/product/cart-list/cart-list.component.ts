// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { UserService } from '../../user/user.service';
// import { HttpInterceptorFn } from '@angular/common/http';
// import { IProduct, IUser } from '@avans-nx-workshop/shared/api';
// import { __values } from 'tslib';
// import { first } from 'rxjs';

// @Component({
//   selector: 'avans-nx-workshop-product-detail',
//   templateUrl: 'cart-list.component.html',
// })
// export class CartListComponent implements OnInit {
//   productId: string | null = null;
//   userId: string | null = null;
//   user: IUser | null = null;
//   product: IProduct[] | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private userService: UserService,
//     private productService: ProductService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       const idParam = params.get('id');
//       // console.log('BUHVUYVUV:', this.ngOnInit);
//       if (idParam) {
//         console.log('idParam:', idParam);
//         this.productId = idParam;
//       }
//     });

//     this.authService.currentUser$.subscribe({
//       next: (user: IUser | null) => {
//         if (user) {
//           console.log('user AAA:', user);
//           console.log('userId AAA:', user._id);
//           this.userId = user._id;
//           this.user = user;
//         } else {
//           console.log('No user found');
//         }
//       },
//       error: (error) => {
//         console.error('Error getting user information:', error);
//       },
//     });
//     console.log('USERID: ', this.userId);
//   }

//   removeBookFromList(productId: string): void {
//     this.productService.removeProductList(this.userId!, productId).subscribe({
//       next: (result) => {
//         console.log('Book removed from the list');
//         this.router.navigate([`${this.userId}/dashboard`]);
//       },
//       error: (error) => {
//         console.error('Error removing book from the list', error);
//       },
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { IProduct, IUser, ICartItem } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-cart-list',
  templateUrl: 'cart-list.component.html',
})
export class CartListComponent implements OnInit {
  user: IUser | null = null;
  cartItems: ICartItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.user = user;
          this.loadCartItems(user._id);
        } else {
          console.log('No user found');
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  loadCartItems(userId: string): void {
    console.log(
      'Loading cart items for user:',
      userId,
      this.userService.findOneInCartlist(userId)
    );
    this.userService.findOneInCartlist(userId).subscribe({
      next: (userWithCartlist: IUser) => {
        this.cartItems = userWithCartlist.cart;
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      },
    });
  }
  // removeFromCart(productId: string): void {
  //   if (!this.user) {
  //     console.error('User is not defined.');
  //     return;
  //   }

  //   // Fetch the current user from the API based on this.userId
  //   this.userService.read(this.user._id).subscribe({
  //     next: (user: IUser) => {
  //       // Remove the product from the user's cart
  //       user.cart = user.cart.filter(item => item.productId !== productId);

  //       // Update the user's cart in the backend
  //       this.userService.update(user).subscribe({
  //         next: (updatedUser: IUser) => {
  //           console.log('Product removed from cart:', productId);
  //           console.log('Updated user:', updatedUser);
  //           // Optionally, you can refresh the cart items on the component
  //           if (this.user) {
  //             this.loadCartItems(this.user._id);
  //           }
  //         },
  //         error: (error) => {
  //           console.error('Error updating user with removed product:', error);
  //         },
  //       });
  //     },
  //     error: (error) => {
  //       console.error('Error fetching user information:', error);
  //     },
  //   });
  // }

  removeFromCart(productId: string): void {
    if (!this.user) {
      console.error('User is not defined.');
      return;
    }

    // Fetch the current user from the API based on this.userId
    this.userService.read(this.user._id).subscribe({
      next: (user: IUser) => {
        // Find the index of the first item with the specified productId
        const index = user.cart.findIndex(
          (item) => item.productId === productId
        );

        if (index !== -1) {
          // Remove the item from the user's cart
          user.cart.splice(index, 1);

          // Update the user's cart in the backend
          this.userService.update(user).subscribe({
            next: (updatedUser: IUser) => {
              console.log('Product removed from cart:', productId);
              console.log('Updated user:', updatedUser);
              // Optionally, you can refresh the cart items on the component
              if (this.user) {
                this.loadCartItems(this.user._id);
              }
            },
            error: (error) => {
              console.error('Error updating user with removed product:', error);
            },
          });
        } else {
          console.log('Product not found in cart:', productId);
        }
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
  }
}

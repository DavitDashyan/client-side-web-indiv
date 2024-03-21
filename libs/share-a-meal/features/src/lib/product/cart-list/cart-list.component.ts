// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { UserService } from '../../user/user.service';
// import { HttpInterceptorFn } from '@angular/common/http';
// import { IProduct, IUser } from '@avans-nx-workshop/shared/api';

// @Component({
// selector: 'avans-nx-workshop-product-detail',
//   templateUrl: 'cart-list.component.html',
// })

// export class CartListComponent implements OnInit {

//       productId: string | null = null;
//       userId: string | null = null;
//       user: IUser | null = null;
//       product: IProduct[] | null = null;

//     constructor(
//       private route: ActivatedRoute,
//       private router: Router,
//       private userService: UserService,
//       private productService: ProductService,
//       private authService: AuthService,
//       ) {}

//       ngOnInit(): void {
//         // Haal product Id op
//         this.route.paramMap.subscribe((params) => {
//           const idParam = params.get('id');
//           if (idParam) {
//             this.productId = idParam;
//           }
//         });

//         this.authService.currentUser$.subscribe({
//           next: (user: IUser | null) => {
//             if (user) {
//               this.userId = user._id;
//               this.user = user;
//             }
//           },
//           error: (error) => {
//             console.error('Error getting user information:', error);
//           },
//         });
//       }

//       handleStatusChange(): void {
//         // Check of het boek bestaat in het boekenlijst
//         this.userService.findOneInCartlist(this.userId!).subscribe({
//           next: (userWithBooklist: IUser) => {
//             this.user = userWithBooklist;

//             // productID vs productId ?
//             const productExists = this.user.cartList.some(
//               (product) => product.productId._id === this.productId
//             );

//             console.log('userId:', this.userId);
//             console.log('productId:', this.productId);
//             console.log('productExists:', productExists);

//             if (!productExists) {
//               // Boek bestaat niet, voeg het toe aan de boekenlijst
//               this.productService
//                 .addProductlist(this.userId!, this.productId!)
//                 .subscribe(
//                   (result) => {
//                     this.router.navigate([`${this.userId}/dashboard`]);
//                   },
//                   (error) => {
//                     console.error('Error adding book to boekenlijst', error);
//                   }
//                 );
//             }
//           },
//           error: (error) => {
//             console.error('Error getting user information with booklist:', error);
//           },
//         });
//       }

//       removeBookFromList(): void {
//         this.productService.removeProductList(this.userId!, this.productId!).subscribe({
//           next: (result) => {
//             console.log('Book removed from the list');
//             this.router.navigate([`${this.userId}/dashboard`]);
//           },
//           error: (error) => {
//             console.error('Error removing book from the list', error);
//           },
//         });
//       }

// }

// cart-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { IProduct, IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-product-detail',
  templateUrl: 'cart-list.component.html',
})
export class CartListComponent implements OnInit {
  productId: string | null = null;
  userId: string | null = null;
  user: IUser | null = null;
  product: IProduct[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        console.log('idParam:', idParam);
        this.productId = idParam;
      }
    });

    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          console.log('user:', user);
          console.log('userId:', user._id);
          this.userId = user._id;
          this.user = user;
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  handleStatusChange(): void {
    console.log('OOOOOOOOOO');
    this.userService.findOneInCartlist(this.userId!).subscribe({
      next: (userWithBooklist: IUser) => {
        console.log('userWithBooklist:', userWithBooklist);
        this.user = userWithBooklist;
        const productExists = this.user.cart.some(
          (product) => product.productId === this.productId
        );

        console.log('userId 2:', this.userId);
        console.log('productId:', this.productId);
        console.log('productExists:', productExists);

        if (!productExists) {
          this.productService
            .addProductlist(this.userId!, this.productId!)
            .subscribe(
              (result) => {
                this.router.navigate([`${this.userId}/dashboard`]);
              },
              (error) => {
                console.error('Error adding book to boekenlijst', error);
              }
            );
        }
      },
      error: (error) => {
        console.error('Error getting user information with booklist:', error);
      },
    });
  }

  removeBookFromList(productId: string): void {
    this.productService.removeProductList(this.userId!, productId).subscribe({
      next: (result) => {
        console.log('Book removed from the list');
        this.router.navigate([`${this.userId}/dashboard`]);
      },
      error: (error) => {
        console.error('Error removing book from the list', error);
      },
    });
  }
}

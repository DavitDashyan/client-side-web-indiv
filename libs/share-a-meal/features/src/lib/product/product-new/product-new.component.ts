// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription, switchMap, tap } from 'rxjs';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { initModals } from 'flowbite';
// import { AuthService } from '../../auth/auth.service';
// import { ShopService } from '../../shop/shop.service';
// import { UserService } from '../../user/user.service';

// @Component({
//   selector: 'nx-emma-indiv-product-edit',
//   templateUrl: 'product-new.component.html',
//   styleUrls: ['./product-new.component.css'],
// })
// export class ProductNewComponent implements OnInit {
//   product = {} as IProduct;
//   productId: string | null = null;
//   selectedUserId: string | null = null;
//   users: IUser[] = [];
//   userId: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private userService: UserService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.userService.list().subscribe((users) => {
//       this.users = users?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
//       console.log('Shops:', this.users);
//     });

//     // Retrieve user ID from AuthService
//     this.authService.currentUser$.subscribe({
//       next: (user: IUser | null) => {
//         if (user) {
//           this.userId = user._id;
//         }
//       },
//       error: (error) => {
//         console.error('Error getting user information:', error);
//       },
//     });
//   }

//   createProduct(): void {
//     this.authService.currentUser$.subscribe({
//       next: (user: IUser | null) => {
//         if (user) {
//           this.userId = user._id;

//           const selectedUser = this.users.find(
//             (user) => user._id === this.selectedUserId
//           );

//           if (!selectedUser) {
//             console.error('Selected user not found.');
//             return;
//           }

//           const newProduct: IProduct = {
//             ...this.product,
//             creatorID: this.userId, // Set userID here
//           };

//           console.log('Product before creation:', newProduct);

//           this.productService.create(newProduct).subscribe(
//             (createdProduct) => {
//               console.log('Product created successfully:', createdProduct);
//               this.router.navigate(['../../product'], {
//                 relativeTo: this.route,
//               });
//             },
//             (error) => {
//               console.error('Error creating product:', error);
//             }
//           );
//         }
//       },
//       error: (error) => {
//         console.error('Error getting user information:', error);
//       },
//     });
//   }

// checkPriceNumber(): boolean {
//   return this.product.price > 0;
// }

//   customSearch(term: string, item: any) {
//     term = term.toLowerCase();
//     return item.schrijvernaam.toLowerCase().includes(term);
//   }

//   goBack(): void {
//     this.router.navigate(['../../product']);
//   }
// }

//  import { Component, OnDestroy, OnInit } from '@angular/core';
//  import { Conditie, IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
//  import { ProductService } from '../product.service';
//  import { Subscription, switchMap, tap } from 'rxjs';
//  import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//  import { initModals } from 'flowbite';
//  import { AuthService } from '../../auth/auth.service';
// import { ShopService } from '../../shop/shop.service';
//  import { UserService } from '../../user/user.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';

// @Component({
//   templateUrl: 'product-new.component.html',
//   styleUrls: ['./product-new.component.css'],
// })

// export class ProductNewComponent {
//   product: IProduct = {
//     _id: '',
//     nameProduct: '',
//     description: '',
//     price: 0,
//     creatorID: '',
//     productImageUrl: '',
//     favorite: false,
//     shopId: '',
//     condition: Conditie.Nieuw,
//   };

//   constructor(
//     private productService: ProductService,
//     private router: Router ,
//     private route: ActivatedRoute,
//   ) {}

//   createProduct(ngForm: NgForm): void {
//     if (ngForm.valid) {
//       this.productService.create(this.product).subscribe({
//         next: (newProduct) => {
//           console.log('Prodcut created:', newProduct);
//           this.goBack();
//         },
//         error: (error) => console.error('Error creating product:', error)
//       });
//     } else {
//       ngForm.form.markAllAsTouched();
//       console.error('Form is not valid');
//     }
//   }

// checkPriceNumber(): boolean {
//   return this.product.price > 0;
// }

//   onCancel(): void {
//     this.goBack();
//   }
//   goBack(): void {
//     this.router.navigate(['../'], { relativeTo: this.route });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { IProduct, IUser } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'nx-emma-indiv-product-edit',
  templateUrl: 'product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent implements OnInit {
  product: IProduct = {} as IProduct;
  selectedUserId: string | null = null;
  users: IUser[] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   // Haal de lijst met gebruikers op
  //   this.userService.list().subscribe((users) => {
  //     this.users = users?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
  //   });

  //   // Haal de ID van de ingelogde gebruiker op
  //   this.authService.currentUser$
  //     .pipe(
  //       switchMap((user) => {
  //         if (user) {
  //           this.userId = user._id;
  //           return this.authService.currentUser$; // Als de gebruiker is ingelogd, geef de huidige gebruiker opnieuw door
  //         } else {
  //           // Als er geen gebruiker is ingelogd, navigeer naar de inlogpagina
  //           this.router.navigate(['/login']);
  //           return new Observable(); // Hier een lege Observable retourneren
  //         }
  //       })
  //     )
  //     .subscribe();
  // }
  ngOnInit(): void {
    // Haal de lijst met gebruikers op
    this.userService.list().subscribe((users) => {
      this.users = users?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    });

    // Haal de ID van de ingelogde gebruiker op
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userId = user._id;
        console.log('User ID:', this.userId)
      } else {
        console.error('No user logged in.');
        // Je kunt ervoor kiezen om hier verdere acties te ondernemen, bijvoorbeeld om de gebruiker naar de inlogpagina te leiden
      }
    });
  }

  createProduct(): void {
    // Controleer of de gebruiker is ingelogd
    if (!this.userId) {
      console.error('No user logged in.');
      return;
    }

    // Stel "favorite" standaard in op false als er geen waarde is geselecteerd
    if (!this.product.favorite) {
      console.log('favorite', this.product.favorite);
      this.product.favorite = false;
    }

    // Maak een nieuw product aan met de ID van de huidige ingelogde gebruiker als de maker
    console.log('userIDDDD', this.userId);
    const newProduct: IProduct = {
      ...this.product,
      creatorID: this.userId,
    };

    this.product.creatorID = this.userId;
    console.log('HOERAAAA ', this.product.creatorID);

    console.log('newProduct', newProduct);
    console.log('userID, thproduct', this.userId, this.product.nameProduct);
    console.log('name', this.product.nameProduct);
    console.log('description', this.product.description);
    console.log('price', this.product.price);
    console.log('creatorID', this.product.creatorID);
    console.log('productImageUrl', this.product.productImageUrl);
    console.log('favorite', this.product.favorite);
    console.log('shopId', this.product.shopId);
    console.log('condition', this.product.condition);

    // Maak het product aan via de ProductService
    this.productService.create(newProduct).subscribe(
      (createdProduct) => {
        console.log('Product created successfully:', createdProduct);
        this.router.navigate(['../../product'], { relativeTo: this.route });
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['../../product']);
  }

  checkPriceNumber(): boolean {
    return this.product.price > 0;
  }
}

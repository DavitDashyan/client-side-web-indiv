// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription, switchMap, tap } from 'rxjs';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { initModals } from 'flowbite';
// import { AuthService } from '../../auth/auth.service';
// import { ShopService } from '../../shop/shop.service';

// @Component({
//   selector: 'avans-nx-workshop-product-detail',
//   templateUrl: './product-edit.component.html',
// })
// export class ProductEditComponent implements OnInit {
//   //OnDestroy
//   product = {} as IProduct;
//   //subscription: Subscription | undefined = undefined;
//   productId: string | null = null;
//   shop: IShop[] = [];
//   selectedShopId: string | null = null;
//   userId: string | null = null;

//   constructor(
//     private productService: ProductService,
//     private route: ActivatedRoute,
//     private shopService: ShopService,
//     private authService: AuthService,
//     private router: Router
//   ) {}
//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       this.productId = params.get('id');

//       if (this.productId) {
//         this.productService.read(this.productId).subscribe((observable) => {
//           this.product = observable;
//         });
//       }

//       this.shopService.list().subscribe((shop) => {
//         this.shop = shop?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
//         console.log('Shop:', this.shop);
//       });
//     });

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

//   updateProduct() {
//     if (this.userId !== this.product?.creatorID) {
//       console.error(
//         'Current user is not the creator of the product. Updating is not allowed.'
//       );
//       return;
//     }

//     this.productService.update(this.product).subscribe({
//       next: (updatedProduct) => {
//         console.log('Product updated successfully:', updatedProduct);
//         this.router.navigate(['../../products', this.product?._id]);
//       },
//       error: (error) => {
//         console.error('Error updating product:', error);
//       },
//     });
//   }

//   goBack(): void {
//     this.router.navigate(['../../products', this.product?._id]);
//   }

//   customSearch(term: string, item: any) {
//     term = term.toLowerCase();
//     return item.schrijvernaam.toLowerCase().includes(term);
//   }

//   checkPriceNumber(): boolean {
//     return this.product!.price > 0;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Conditie } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = {} as FormGroup;
  productId: string | null = null;
  product: IProduct = {} as IProduct;

  // Enum voor de conditie van het product
  conditieEnum = Conditie;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }

    // Initializeer het formulier met FormBuilder
    this.productForm = this.fb.group({
      nameProduct: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      productImageUrl: ['', Validators.required],
      favorite: [false],
      condition: [Conditie, Validators.required],
    });

    // Haal de product ID op uit de URL
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      // Als er een product ID is, haal het product op van de server
      if (this.productId) {
        this.productService.read(this.productId).subscribe((product) => {
          this.product = product;
          // Patch de waarden van het product in het formulier
          this.productForm.patchValue(this.product);
        });
      }
    });
  }

  // Methode om het product bij te werken
  updateProduct() {
    // Als het formulier niet geldig is, stoppen we hier
    if (this.productForm.invalid) {
      return;
    }

    // Update het product met de waarden uit het formulier
    const updatedProduct: IProduct = {
      ...this.product,
      ...this.productForm.value,
    };

    updatedProduct.condition =
      Conditie[updatedProduct.condition as keyof typeof Conditie];

    this.productService.update(updatedProduct).subscribe({
      next: () => {
        console.log('Product updated successfully:', updatedProduct);
        // Navigeer terug naar de productdetails
        this.router.navigate(['../../product', this.productId]);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }

  // Methode om terug te gaan naar de productdetails zonder op te slaan
  goBack(): void {
    this.router.navigate(['../../product', this.productId]);
  }
}

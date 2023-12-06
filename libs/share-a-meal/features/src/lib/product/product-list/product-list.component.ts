
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription, tap } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'avans-nx-workshop-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit, OnDestroy {
//   products: IProduct[] | null = null;
//   subscription: Subscription | undefined = undefined;

//    constructor(private productService: ProductService) {}

//   // constructor(private productService:ProductService, activatedRoute:ActivatedRoute) {
//   //   activatedRoute.params.subscribe((params) => {
//   //     if (params['searchTerm']) {
//   //       this.productService
//   //       .getAllFoodsBySearchTerm(params['searchTerm'])
//   //       .subscribe((searchResults) => {
//   //         this.products = searchResults;
//   //       });
//   //   } else {
//   //     this.subscription = this.productService.list().subscribe((results) => {
//   //       console.log(`results: ${results}`);
//   //       this.products = results;
//   //     });
//   //   }
//   // });
//   // }

//   ngOnInit(): void {
//     this.subscription = this.productService.list().subscribe((results) => {
//       console.log(`results: ${results}`);
//       this.products = results;
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }
// }


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'avans-nx-workshop-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit, OnDestroy {
//   products: IProduct[] | null = null;
//   subscription: Subscription | undefined = undefined;

//   constructor(
//     private productService: ProductService,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe((params) => {
//       if (params['searchTerm']) {
//         // Gebruik de nieuwe searchByName-methode voor het zoeken op naam
//         this.subscription = this.productService
//           .searchByName(params['searchTerm'])
//           .subscribe((searchResults) => {
//             this.products = searchResults;
//           });
//       } else {
//         // Als er geen zoekterm is, haal alle producten op met de bestaande list-methode
//         this.subscription = this.productService.list().subscribe((results) => {
//           console.log(`results: ${results}`);
//           this.products = results;
//         });
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }
// }


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'avans-nx-workshop-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit, OnDestroy {
//   products: IProduct[] | null = null;
//   subscription: Subscription | undefined = undefined;

//   constructor(
//     private productService: ProductService,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // Initialiseer de producten zonder zoekterm
//     this.loadProducts();
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }

//   // Methode om producten te laden op basis van een zoekterm
//   searchProducts(searchTerm: string): void {
//     // Wanneer de zoekterm leeg is, laad alle producten
//     if (!searchTerm.trim()) {
//       this.loadProducts();
//       return;
//     }

//     // Laad producten op basis van de zoekterm
//     this.subscription = this.productService
//       .searchByName(searchTerm)
//       .subscribe((searchResults) => {
//         this.products = searchResults;
//       });
//   }

//   // Methode om alle producten te laden zonder zoekterm
//   private loadProducts(): void {
//     this.subscription = this.productService.list().subscribe((results) => {
//       console.log(`results: ${results}`);
//       this.products = results;
//     });
//   }
// }



import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] | null = null;
  subscription: Subscription | undefined = undefined;
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Initialiseer de producten zonder zoekterm
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // Methode om producten te laden op basis van een zoekterm
  searchProducts(): void {
    // Wanneer de zoekterm leeg is, laad alle producten
    if (!this.searchTerm.trim()) {
      this.loadProducts();
      return;
    }

    // Laad producten op basis van de zoekterm
    this.subscription = this.productService
      .searchByName(this.searchTerm)
      .subscribe((searchResults) => {
        this.products = searchResults;
      });
  }

  // Methode om alle producten te laden zonder zoekterm
  private loadProducts(): void {
    this.subscription = this.productService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.products = results;
    });
  }
}

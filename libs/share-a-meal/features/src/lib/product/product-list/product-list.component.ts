// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IProduct } from '@avans-nx-workshop/shared/api';
// import { ProductService } from '../product.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'avans-nx-workshop-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css'],
// })
// export class ProductListComponent implements OnInit, OnDestroy {
//   products: IProduct[] | null = null;
//   subscription: Subscription | undefined = undefined;
//   searchTerm: string = '';

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     // Initialiseer de producten zonder zoekterm
//     this.loadProducts();
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }

//   // Methode om producten te laden op basis van een zoekterm
//   searchProducts(): void {
//     // Wanneer de zoekterm leeg is, laad alle producten
//     if (!this.searchTerm.trim()) {
//       this.loadProducts();
//       return;
//     }

//     // Laad producten op basis van de zoekterm
//     this.subscription = this.productService
//       .searchByName(this.searchTerm)
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


import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../cart/cart.service';


@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    products: IProduct[] | null = null;
    subscription: Subscription | undefined = undefined;
    searchTerm = '';
    cartService = inject(CartService);

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.subscription = this.productService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            console.log(this.products)
            this.products = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }


    searchBooks(): IProduct[] {
        const term = this.searchTerm.toLowerCase().trim();

        // als de zoekterm leeg is of er geen boeken zijn, geef lege array terug
        if (!term || !this.products) {
          return [];
        }
      
        // Filter boeken gebaseerd op zoekterm
        return this.products.filter(product =>
          product.nameProduct.toLowerCase().includes(term)
        );
    }

    matchesSearch(product: IProduct): boolean {
        const term = this.searchTerm.toLowerCase().trim();
      
        // Check if book titel is inclusief zoekterm
        return product.nameProduct.toLowerCase().includes(term);
      }

}

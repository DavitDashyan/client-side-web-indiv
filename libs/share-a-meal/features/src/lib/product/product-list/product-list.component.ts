import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
//import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] | null = null;
  subscription: Subscription | undefined = undefined;
  searchTerm = '';
  filteredProducts: IProduct[] | null = null;
  //cartService = inject(CartService);

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.currentUser$.getValue()) {
      this.router.navigate(['/login']);
    }

    this.subscription = this.productService.list().subscribe((results) => { //subscribe to the list() observable, haal de producten op
      console.log(`results: ${results}`);
      //   console.log(this.products);
      this.products = results;
      this.filterProducts();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  filterProducts(): void {
    if (!this.products) {
      this.filteredProducts = null;
      return;
    }

    // Als de zoekterm leeg is, toon alle producten
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    // Filter de producten op basis van de zoekterm
    this.filteredProducts = this.products.filter((product) =>
      product.nameProduct.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

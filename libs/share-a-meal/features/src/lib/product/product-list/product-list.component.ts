import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
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
  //cartService = inject(CartService);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      //   console.log(this.products);
      this.products = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  searchProducts(): IProduct[] {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term || !this.products) {
      return [];
    }

    return this.products.filter((product) =>
      product.nameProduct.toLowerCase().includes(term)
    );
  }

  matchesSearch(product: IProduct): boolean {
    const term = this.searchTerm.toLowerCase().trim();
    return product.nameProduct.toLowerCase().includes(term);
  }
}

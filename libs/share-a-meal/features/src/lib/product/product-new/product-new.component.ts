import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initModals } from 'flowbite';
import { AuthService } from '../../auth/auth.service';
import { ShopService } from '../../shop/shop.service';

@Component({
  selector: 'nx-emma-indiv-product-edit',
  templateUrl: 'product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent implements OnInit {
  product = {} as IProduct;
  productId: string | null = null;
  selectedShopId: string | null = null;
  shops: IShop[] = [];
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shopService: ShopService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shopService.list().subscribe((shops) => {
      this.shops = shops?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
      console.log('Shops:', this.shops);
    });

    // Retrieve user ID from AuthService
    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.userId = user._id;
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  createProduct(): void {
    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.userId = user._id;

          const selectedShop = this.shops.find(
            (shop) => shop.id === this.selectedShopId
          );

          if (!selectedShop) {
            console.error('Selected shop not found.');
            return;
          }

          // Creer nieuwe boek with geupdate userID
          const newProduct: IProduct = {
            ...this.product,
            creatorID: this.userId, // Set userID here
          };

          console.log('Product before creation:', newProduct);

          this.productService.create(newProduct).subscribe(
            (createdProduct) => {
              console.log('Product created successfully:', createdProduct);
              this.router.navigate(['../../products'], {
                relativeTo: this.route,
              });
            },
            (error) => {
              console.error('Error creating product:', error);
            }
          );
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  customSearch(term: string, item: any) {
    term = term.toLowerCase();
    return item.schrijvernaam.toLowerCase().includes(term);
  }

  goBack(): void {
    this.router.navigate(['../../products']);
  }

  checkPriceNumber(): boolean {
    return this.product.price > 0;
  }
}

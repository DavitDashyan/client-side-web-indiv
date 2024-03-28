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

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { IProduct, IUser, ICartItem } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-cart-list',
  templateUrl: 'cart-list.component.html',
  styleUrls: ['cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  user: IUser | null = null;
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }

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
        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      },
    });
  }
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
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }
}

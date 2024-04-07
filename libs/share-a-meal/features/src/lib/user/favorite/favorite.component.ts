import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { IProduct, IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-favorite',
  templateUrl: 'favorite.component.html',
  // styleUrls: ['favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  user: IUser | null = null;
  favoriteProducts: IProduct[] = [];

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
          this.loadFavoriteProducts(user._id);
        } else {
          console.log('No user found');
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  loadFavoriteProducts(userId: string): void {
    console.log('Loading favorite products for user:', userId);
    this.userService.read(userId).subscribe({
      next: (user: IUser) => {
        this.favoriteProducts = user.favorite || [];
      },
      error: (error) => {
        console.error('Error loading favorite products:', error);
      },
    });
  }

  removeFromFavorites(productId: string): void {
    if (!this.user) {
      console.error('User is not defined.');
      return;
    }

    // Fetch the current user from the API based on this.userId
    this.userService.read(this.user._id).subscribe({
      next: (user: IUser) => {
        // Find the index of the product in the favorite list
        const index = user.favorite?.findIndex(
          (product) => product._id === productId
        );

        if (index !== undefined && index !== -1) {
          // Remove the product from the user's favorite list
          user.favorite?.splice(index, 1);

          // Update the user's favorite list in the backend
          this.userService.update(user).subscribe({
            next: (updatedUser: IUser) => {
              console.log('Product removed from favorites:', productId);
              console.log('Updated user:', updatedUser);
              // Optionally, you can refresh the favorite products list on the component
              if (this.user) {
                this.loadFavoriteProducts(this.user._id);
              }
            },
            error: (error) => {
              console.error('Error updating user with removed product:', error);
            },
          });
        } else {
          console.log('Product not found in favorites:', productId);
        }
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
  }
}

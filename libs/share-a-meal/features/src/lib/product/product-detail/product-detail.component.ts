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
  showCartFeedback: boolean = false;
  showFavoriteFeedback: boolean = false;
  creatorName: string = '';

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

    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }
    
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

                // Haal de naam van de maker op
                this.userService.read(this.product.creatorID).subscribe(
                  (creator: IUser) => {
                    this.creatorName = creator.name;
                  },
                  (error) => {
                    console.error('Error getting creator details:', error);
                  }
                );
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
        this.showCartFeedback = true;
        setTimeout(() => {
          this.showCartFeedback = false;
        }, 2000);
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
  }

  addToFavorite(): void {
    if (!this.product) {
      console.error('Product is not defined.');
      return;
    }

    // // Controleer of de gebruiker is geladen
    // if (!this.user) {
    //   console.error('User is not defined.');
    //   return;
    // }

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
        // Check of het product al in de favorietenlijst staat
        const isProductInFavorites = user.favorite.some(
          (item) => item._id === this.product._id
        );
        if (isProductInFavorites) {
          console.log('Product is already in favorites.');
          return;
        }

        // Voeg het product toe aan de favorietenlijst van de gebruiker
        user.favorite.push(this.product);

        // Werk de gegevens van de gebruiker bij in de backend
        this.userService.update(user).subscribe({
          next: (updatedUser: IUser) => {
            console.log('Product added to favorites:', this.product);
            console.log('Updated user:', updatedUser);
            // Optioneel: vernieuw de lijst met favoriete producten in de component
          },
          error: (error) => {
            console.error(
              'Error updating user with added product to favorites:',
              error
            );
          },
        });
      },
      error: (error) => {
        console.error('Error fetching user information:', error);
      },
    });
    this.showFavoriteFeedback = true;

    // Verberg de feedback pop-up na een paar seconden
    setTimeout(() => {
      this.showFavoriteFeedback = false;
    }, 2000);
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

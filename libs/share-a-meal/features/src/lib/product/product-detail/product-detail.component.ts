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
  recommendations: IProduct[] = [];

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
            // Haal productdetails op
            this.productService.read(productId).subscribe(
              (result) => {
                this.product = result;
                this.showButton = this.isCurrentUserCreator(); // true of false

                // Haal de details op van de maker van het product
                this.userService.read(this.product.creatorID).subscribe(
                  (creator: IUser) => {
                    this.creatorName = creator.name;
                  },
                  (error) => {
                    console.error('Error getting creator details:', error);
                  }
                );

                // Haal aanbevelingen op voor het product
                this.productService
                  .getRecommendations(productId ?? '')
                  .subscribe(
                    (recommendations) => {
                      this.recommendations = recommendations;
                    },
                    (error) => {
                      console.error(
                        'Error getting product recommendations:',
                        error
                      );
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
    this.userService.read(this.userId).subscribe({ //user ophalen via de id
      next: (user: IUser) => {
        console.log('user.cart BB', user, user._id);
        console.log('user.bday before', user.bday);
        console.log('Product._Id', this.product._id);

        if (typeof user.bday === 'string') {
          user.bday = new Date(user.bday);
        }

        //de cart updaten
        user.cart.push({
          _id: this.product._id,
          productId: this.product._id,
          quantity: 1,
          nameProduct: this.product.nameProduct,
          price: this.product.price,
          productImageUrl: this.product.productImageUrl,
        });
        console.log('user.cart AA', user.cart);
        console.log('USER BDAY', user.bday);

        // Update the user's cart in the backend, opslaan de user in de backend
        this.userService.update(user).subscribe({
          next: (updatedUser: IUser) => {
            console.log('Product added to cart:', this.product);
            console.log('Updated user:', updatedUser);
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
      console.error('user is not defined.');
      return;
    }

    this.userService.read(this.userId).subscribe({
      next: (user: IUser) => {

        console.log('user.cart BB', user, user._id);
        console.log('user.bday before', user.bday);
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

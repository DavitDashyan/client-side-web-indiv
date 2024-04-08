import { Component, OnInit } from '@angular/core';
import { IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ShopService } from '../shop.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'avans-nx-workshop-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
})
export class ShopDetailComponent implements OnInit {
  showDeleteConfirmation = false;
  shop: IShop = {} as IShop;
  shopId: string | null = null;
  userId: string | null = null;
  showButton: boolean | undefined;
  creatorName: string = '';

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
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
      this.shopId = params.get('id');

      this.authService.currentUser$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.userId = user._id;

            this.shopService.read(this.shopId).subscribe(
              (shop: IShop) => {
                this.shop = shop;
                this.showButton = this.isCurrentUserCreator();

                // Haal de naam van de maker op
                this.userService.read(this.shop.creatorID).subscribe(
                  (creator: IUser) => {
                    this.creatorName = creator.name;
                  },
                  (error) => {
                    console.error('Error getting creator details:', error);
                  }
                );
              },
              (error) => {
                console.error('Error getting shop details:', error);
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
    return this.userId === this.shop?.creatorID;
  }

  deleteShop(): void {
    if (this.userId !== this.shop?.creatorID) {
      console.error(
        'Current user is not the creator of the shop. Deletion is not allowed.'
      );
      return;
    }

    if (this.shopId) {
      this.shopService.delete(this.shop).subscribe({
        next: () => {
          console.log('Shop deleted successfully');

          // Sluit de dialog
          this.showDeleteConfirmation = false;
        },
        error: (error) => {
          console.error('Error deleting shop:', error);
        },
      });
    } else {
      console.error('Shop id is missing for deletion.');
    }
  }
  goBack() {
    window.history.back();
  }
}

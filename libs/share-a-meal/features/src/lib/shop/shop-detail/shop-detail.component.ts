import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ShopService } from '../shop.service';
// import { Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css'],
})
export class ShopDetailComponent {

  showDeleteConfirmation = false;
  shop = {} as IShop;
  shops: IShop[] | null = null;
  shopId: string | null = null;
  userId: string | null = null;
  showButton: boolean | undefined;

    constructor( 
      private route: ActivatedRoute, 
      private shopService: ShopService,
      private authService: AuthService,
      private router: Router,
      ) {}

    ngOnInit(): void {
      // Haal boekId van route parameter
      this.route.paramMap.subscribe((params) => {
        this.shopId = params.get('Shopid');

          // Retrieve user ID from AuthService
          this.authService.currentUser$.subscribe({
            next: (user: IUser | null) => {
              if (user) {
                this.userId = user._id;      

                // Haal schrijverdetails op met gebruik van shopId
                this.shopService.read(this.shopId).subscribe((observable) => {
                  this.shop = observable;

                // Als userId van ingelogde account en creatorId niet overheen komen, knoppen niet zichtbaar
                this.showButton = this.isCurrentUserCreator();
                });
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
        console.error('Current user is not the creator of the shop. Deletion is not allowed.');
        return;
      }

      if (this.shopId) {
        this.shopService.delete(this.shop).subscribe({
          next: () => {
            console.log('Shop deleted successfully');

            // Sluit de dialog
            this.showDeleteConfirmation = false;

            this.router.navigate(['../../shops'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error('Error deleting shop:', error);
          }
        });
      } else {
        console.error('Shop id is missing for deletion.');
      }
    }

    goBack() {
      window.history.back();
    }
}

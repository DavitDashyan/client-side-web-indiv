import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IShop, IUser } from '@avans-nx-workshop/shared/api';
import { ShopService } from '../shop.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initModals } from 'flowbite';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'avans-nx-workshop-shop-new',
  templateUrl: './shop-new.component.html',
  styleUrls: ['./shop-new.component.css'],
})
export class ShopNewComponent implements OnInit {
  shop = {} as IShop;
  userId: string | null = null;

    constructor(
      private shopService: ShopService,
      private authService: AuthService,
      private router: Router, 
      ) {}

    ngOnInit(): void {
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

    createShop(): void {
      // Assuming this.userId contains the current user's ID
      if (!this.userId) {
        console.error('User ID is missing. Cannot create shop without a user.');
        return;
      }
    
      // Zet de creatorID (userID) in het schrijver object
      this.shop.creatorID = this.userId;
    
      this.shopService.create(this.shop).subscribe({
        next: (createdShop) => {
          console.log('Shop created successfully:', createdShop);
          this.router.navigate(['../../shops']);
        },
        error: (error) => {
          console.error('Error creating shop:', error);
        }
      });      
    }
    
    goBack(): void {
      this.router.navigate(['../../shops']);
    }
}


import { IShop } from '@avans-nx-workshop/shared/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IUser } from '@avans-nx-workshop/shared/api';
import { ShopService } from '../shop.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initModals } from 'flowbite';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent implements OnInit {
  shop = {} as IShop;
  shops: IShop[] | null = null;
  shopId: string | null = null;
  userId: string | null = null;

    constructor( 
      private route: ActivatedRoute, 
      private shopService: ShopService,
      private authService: AuthService,
      private router: Router,
      ) {}

    ngOnInit(): void {
  
      this.route.paramMap.subscribe((params) => {
        this.shopId = params.get('id');
        
          // Bestaande shop
          this.shopService.read(this.shopId).subscribe((observable) => 
          this.shop = observable);
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

    updateShop() {
      if (this.userId !== this.shop?.creatorID) {
        console.error('Current user is not the creator of the shop. Updating is not allowed.');
        return;
      }
      
      console.log('Updating shop:', this.shop);
      
      this.shopService.update(this.shop).subscribe({
        next: (updatedShop) => {
          console.log('Shop updated successfully:', updatedShop);
          this.router.navigate(['../../shops', this.shop.id]);
        },
        error: (error) => {
          console.error('Error updating shop:', error);
        }
      });
      
    }

    goBack(): void {
      this.router.navigate(['../../shops', this.shop.id]);
    }
}


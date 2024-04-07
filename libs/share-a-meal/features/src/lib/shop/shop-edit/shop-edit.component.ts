import { IShop } from '@avans-nx-workshop/shared/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, IUser } from '@avans-nx-workshop/shared/api';
import { ShopService } from '../shop.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initModals } from 'flowbite';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'avans-nx-workshop-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css'],
})
export class ShopEditComponent implements OnInit {
  shop: IShop = {} as IShop;
  shops: IShop[] | null = null;
  shopId: string | null = null;
  userId: string | null = null;
  shopForm: FormGroup = {} as FormGroup;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.shopForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(1)],
      email: ['', Validators.required, Validators.email],
      telNumber: ['', [Validators.required, Validators.min(0)]],
      shopImgUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }
    
    this.authService.currentUser$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.userId = user._id;
          this.fetchShop();
        }
      },
      error: (error) => {
        console.error('Error getting user information:', error);
      },
    });
  }

  fetchShop(): void {
    this.route.paramMap.subscribe((params) => {
      const shopId = params.get('id');

      if (shopId) {
        this.shopService.read(shopId).subscribe((shop: IShop) => {
          this.shop = shop;
          this.shopForm.patchValue({
            name: this.shop.name,
            email: this.shop.email,
            telNumber: this.shop.telNumber,
            shopImgUrl: this.shop.shopImageUrl,
          });
        });
      }
    });
  }

  updateShop() {
    if (!this.userId || this.userId !== this.shop?.creatorID) {
      console.error(
        'Current user is not the creator of the shop. Updating is not allowed.'
      );
      return;
    }

    console.log('Updating shop:', this.shop);

    this.shopService.update(this.shop).subscribe({
      next: (updatedShop) => {
        console.log('Shop updated successfully:', updatedShop);
        // Navigate to the shop detail page after successful update
        this.router.navigate(['/shop', this.shop._id]);
      },
      error: (error) => {
        console.error('Error updating shop:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/shop', this.shop._id]);
  }
}

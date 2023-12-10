import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { IShop } from '@avans-nx-workshop/shared/api';


@Component({
  selector: 'avans-nx-workshop-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
// export class ShopListComponent {}
export class ShopListComponent implements OnInit, OnDestroy {
  shops: IShop[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
      this.subscription = this.shopService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.shops = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
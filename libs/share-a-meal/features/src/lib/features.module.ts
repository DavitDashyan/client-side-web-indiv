import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MealListComponent } from './meal/meal-list/meal-list.component';
//import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { AboutComponent } from './about/about.component';
//import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user-list/user.component';
import { UserService } from './user/user.service';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RouterLink } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './product/product.service';
import { StarRatingModule } from 'angular-star-rating';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { FormsModule } from '@angular/forms';
//import { SearchComponent } from '../../../ui/src/lib/search/search.component'; // Zorg ervoor dat het juiste pad wordt gebruikt
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
   // MealListComponent,
   // MealDetailComponent,
    AboutComponent,
    UserComponent,
    UserDetailComponent,

    ProductDetailComponent,
    ProductListComponent,

    CartListComponent,
    ShopListComponent,

    // SearchComponent,
    LoginComponent,
  ],
  providers: [UserService, ProductService, AuthService], //MealService
  exports: [
   // MealListComponent,
   // MealDetailComponent,
    AboutComponent,

    UserComponent,
    UserDetailComponent,

    ProductDetailComponent,
    ProductListComponent,

    CartListComponent,

    LoginComponent,
  ],
})
export class FeaturesModule {}

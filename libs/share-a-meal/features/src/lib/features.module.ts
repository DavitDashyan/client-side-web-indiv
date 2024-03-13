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
import { RouterLink, RouterModule } from '@angular/router';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductService } from './product/product.service';
import { StarRatingModule } from 'angular-star-rating';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { FormsModule } from '@angular/forms';
//import { SearchComponent } from '../../../ui/src/lib/search/search.component'; // Zorg ervoor dat het juiste pad wordt gebruikt
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/auth.service';
import { ShopDetailComponent } from './shop/shop-detail/shop-detail.component';
import { ShopNewComponent } from './shop/shop-new/shop-new.component';
import { ShopEditComponent } from './shop/shop-edit/shop-edit.component';
import { UserNewComponent } from './user/user-new/user-new.component';
//import { NgSelectModule } from '@ng-select/ng-select';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ShopService } from './shop/shop.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgSelectModule,
  ],
  declarations: [
    // MealListComponent,
    // MealDetailComponent,
    AboutComponent,
    UserComponent,
    UserDetailComponent,

    // ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductNewComponent,

    CartListComponent,
    ShopListComponent,

    // SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    ShopDetailComponent,
    ShopNewComponent,
    ShopEditComponent,
    UserNewComponent,
    UserEditComponent,
    DashboardComponent,
  ],
  providers: [UserService, ProductService, AuthService, ShopService], //MealService
  exports: [
    // MealListComponent,
    // MealDetailComponent,

    RouterModule,
    AboutComponent,

    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    UserNewComponent,

    ProductDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductNewComponent,

    CartListComponent,
    ShopListComponent,

    LoginComponent,
    RegisterComponent,

    CommonModule,
    FormsModule,
  ],
})
export class FeaturesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { AboutComponent } from './about/about.component';
import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user-list/user.component';
import { UserService } from './user/user.service';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RouterLink } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserComponent,
    UserDetailComponent,

    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
  ],
  providers: [MealService, UserService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserComponent,
    UserDetailComponent,
  ],
})
export class FeaturesModule {}

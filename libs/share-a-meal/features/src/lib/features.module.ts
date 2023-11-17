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

@NgModule({
  imports: [CommonModule, HttpClientModule,RouterLink],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserComponent,
    UserDetailComponent
    
  ],
  providers: [MealService, UserService],
  exports: [MealListComponent, MealDetailComponent, AboutComponent, UserComponent, UserDetailComponent],
})
export class FeaturesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { AboutComponent } from './about/about.component';
import { MealService } from './meal/meal.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user-list/user.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutComponent,
    UserComponent,
    
  ],
  providers: [MealService],
  exports: [MealListComponent, MealDetailComponent, AboutComponent],
})
export class FeaturesModule {}

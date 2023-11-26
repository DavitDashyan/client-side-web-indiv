import { Route } from '@angular/router';
import { AboutComponent } from 'libs/share-a-meal/features/src/lib/about/about.component';
import { MealDetailComponent } from 'libs/share-a-meal/features/src/lib/meal/meal-detail/meal-detail.component';
import { MealListComponent } from 'libs/share-a-meal/features/src/lib/meal/meal-list/meal-list.component';
import { UserComponent } from 'libs/share-a-meal/features/src/lib/user/user-list/user.component';
import { UserEditComponent} from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';
import { UserDetailComponent} from 'libs/share-a-meal/features/src/lib/user/user-detail/user-detail.component';
import { ProductListComponent } from 'libs/share-a-meal/features/src/lib/product/product-list/product-list.component';
import { ProductEditComponent } from 'libs/share-a-meal/features/src/lib/product/product-edit/product-edit.component';
import { ProductDetailComponent } from 'libs/share-a-meal/features/src/lib/product/product-detail/product-detail.component';

export const appRoutes: Route[] = [

{
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
},
{
    path: 'about', pathMatch: 'full', component: AboutComponent
   // redirectTo: 'dashboard',
},
{
    path: 'listmeal',
    pathMatch: 'full',
    component: MealListComponent
},
{
    path: 'listmeal/:id',
    pathMatch: 'full',
    component: MealDetailComponent
},
{
    path: 'user',
    pathMatch: 'full',
    component: UserComponent
},

{
    path: 'user/new',
    pathMatch: 'full',
    component: UserEditComponent
},
{path: 'user/:id',
    pathMatch: 'full',
    component: UserDetailComponent},
{
    path: 'user/:id/edit',
    pathMatch: 'full',
    component: UserEditComponent
},
{
    path: 'product',
    pathMatch: 'full',
    component: ProductListComponent
},
{
    path: 'product/new',
    pathMatch: 'full',
    component: ProductEditComponent
},
{
    path: 'product/:id',
    pathMatch: 'full',
    component: ProductDetailComponent
},
{
    path: 'product/:id/edit',
    pathMatch: 'full',
    component: ProductEditComponent
},
{
    path: '**',
    pathMatch: 'full',
    component: AboutComponent
}
];

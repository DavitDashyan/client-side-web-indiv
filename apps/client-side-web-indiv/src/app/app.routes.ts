import { Route } from '@angular/router';
import { AboutComponent } from 'libs/share-a-meal/features/src/lib/about/about.component';
//import { MealDetailComponent } from 'libs/share-a-meal/features/src/lib/meal/meal-detail/meal-detail.component';
//import { MealListComponent } from 'libs/share-a-meal/features/src/lib/meal/meal-list/meal-list.component';
import { UserComponent } from 'libs/share-a-meal/features/src/lib/user/user-list/user.component';
import { UserEditComponent } from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';
import { UserDetailComponent } from 'libs/share-a-meal/features/src/lib/user/user-detail/user-detail.component';
import { ProductListComponent } from 'libs/share-a-meal/features/src/lib/product/product-list/product-list.component';
import { ProductEditComponent } from 'libs/share-a-meal/features/src/lib/product/product-edit/product-edit.component';
import { ProductDetailComponent } from 'libs/share-a-meal/features/src/lib/product/product-detail/product-detail.component';
import { ShopListComponent } from 'libs/share-a-meal/features/src/lib/shop/shop-list/shop-list.component';
import { LoginComponent } from 'libs/share-a-meal/features/src/lib/auth/login/login.component';
import { RegisterComponent } from 'libs/share-a-meal/features/src/lib/auth/register/register.component';
import { ProductNewComponent } from 'libs/share-a-meal/features/src/lib/product/product-new/product-new.component';
import { ShopNewComponent } from 'libs/share-a-meal/features/src/lib/shop/shop-new/shop-new.component';
import { ShopDetailComponent } from 'libs/share-a-meal/features/src/lib/shop/shop-detail/shop-detail.component';
import { ShopEditComponent } from 'libs/share-a-meal/features/src/lib/shop/shop-edit/shop-edit.component';
import { UserNewComponent } from 'libs/share-a-meal/features/src/lib/user/user-new/user-new.component';
import { DashboardComponent } from 'libs/share-a-meal/features/src/lib/dashboard/dashboard/dashboard.component';
import { CartListComponent } from 'libs/share-a-meal/features/src/lib/cart/cart-list/cart-list.component';
// import { LoginComponent } from 'libs/share-a-meal/features/src/lib/login/login.component';
// import { CommonModule } from '@angular/common';

export const appRoutes: Route[] = [
  //overig
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
    // redirectTo: 'dashboard',
  },

  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },

  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },

  //search
  {
    path: 'product/search/:searchTerm',
    pathMatch: 'full',
    component: ProductListComponent,
  },

  // {
  //   path: 'listmeal',
  //   pathMatch: 'full',
  //   component: MealListComponent,
  // },
  // {
  //   path: 'listmeal/:id',
  //   pathMatch: 'full',
  //   component: MealDetailComponent,
  // },

  //users
  {
    path: 'user',
    pathMatch: 'full',
    component: UserComponent,
  },

  {
    path: 'user/new',
    pathMatch: 'full',
    component: UserNewComponent,
  },
  { path: 'user/:id', pathMatch: 'full', component: UserDetailComponent },
  {
    path: 'user/:id/edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },

  //products
  {
    path: 'product',
    pathMatch: 'full',
    component: ProductListComponent,
  },
  {
    path: 'product/new',
    pathMatch: 'full',
    component: ProductNewComponent,
  },
  {
    path: 'product/:id',
    pathMatch: 'full',
    component: ProductDetailComponent,
  },
  {
    path: 'product/:id/edit',
    pathMatch: 'full',
    component: ProductEditComponent,
  },

  //shop
  {
    path: 'shop',
    pathMatch: 'full',
    component: ShopListComponent,
  },

  {
    path: 'shop/new',
    pathMatch: 'full',
    component: ShopNewComponent,
  },
  {
    path: 'shop/:id',
    pathMatch: 'full',
    component: ShopDetailComponent,
  },
  {
    path: 'shop/:id/edit',
    pathMatch: 'full',
    component: ShopEditComponent,
  },

  // mss component veranderen door home ofzo
  // Cart
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartListComponent,
  },

  {
    path: '**',
    pathMatch: 'full',
    component: DashboardComponent,
  },
];

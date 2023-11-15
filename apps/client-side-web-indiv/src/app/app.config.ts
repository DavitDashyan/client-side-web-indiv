import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation())],
};


// import { Routes } from '@angular/router';
// import { UserComponent } from 'libs/share-a-meal/features/src/lib/user/user.component';
// import { MealListComponent } from 'libs/share-a-meal/features/src/lib/meal/meal-list/meal-list.component';

// export const routes: Routes = [
//   { path: 'listmeal',  component: MealListComponent },
//   { path: 'user', component: UserComponent },
// ];

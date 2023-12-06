import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

//import { SearchComponent } from './search/search.component';

//import { UiRoutingModule } from '../../../../app.routing.ts';
//import {FeaturesModel} from '@avans-nx-workshop/share-a-meal/features'

@NgModule({
  imports: [CommonModule, RouterLink],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class UiModule {}

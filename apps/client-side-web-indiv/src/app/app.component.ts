import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FeaturesModule } from '@avans-nx-workshop/share-a-meal/features';
import { UiModule} from '@avans-nx-workshop/ui'
import { CommonModule } from '@angular/common';
import { initFlowbite} from 'flowbite';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, FeaturesModule, UiModule, RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  selector: 'avans-nx-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client-side-web-indiv';

  ngOnInit(): void {
      initFlowbite();
  }
}

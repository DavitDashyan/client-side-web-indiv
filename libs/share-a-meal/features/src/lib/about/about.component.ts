import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-about',
  templateUrl: './about.component.html',
  styles: [],
})
export class AboutComponent implements OnInit{

  title = 'avans-nx-workshop-about';
  imagePath?: string;
  ngOnInit(): void {
      this.imagePath = '/assets/erd2.png';
  }
}
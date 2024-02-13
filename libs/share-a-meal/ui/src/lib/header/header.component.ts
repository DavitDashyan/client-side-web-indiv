// import {Component} from '@angular/core';

// @Component({
//     selector: 'avans-nx-workshop-header',
//     templateUrl: './header.component.html',
//     styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent{}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { IUser } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../../../features/src/lib/auth/auth.service'; // Replace 'path/to/auth.service' with the actual path to the AuthService file
@Component({
  selector: 'avans-nx-workshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userId: string | null = null;


constructor(
    private authService: AuthService,
    private router: Router
) {}

        ngOnInit(): void {
            this.authService.currentUser$.subscribe({
                next: (user: IUser | null) => {
                    if (user) {
                        this.isLoggedIn = !!user;
                        this.userId = user._id ?? null;
                    }
                },
                error: (error) => {
                    console.error('Error getting user information:', error);
                },
            });
    }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  navigateToEditPage(): void {
    this.router.navigate([`/users/${this.userId}/edit`]);
  }
}

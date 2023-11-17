// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {IUser} from '@avans-nx-workshop/shared/api';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'avans-nx-workshop-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css'],
// })
// export class UserComponent implements OnInit, OnDestroy{
//   users: IUser[] | null = null;

//   constructor(private userService: UserService) {}
//   ngOnDestroy(): void {
//     throw new Error('Method not implemented.');
//   }

//   ngOnInit(): void {
//    this.userService.list().subscribe(users => this.users = users)
  
//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.users = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
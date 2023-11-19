import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription, delay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

//   ngOnInit(): void {
//     this.route.paramMap
//       .pipe(
//         tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
//         switchMap((params: ParamMap) => {
//           if (params.get('id') === null) {
//            return this.userService.create();
//            //this.user = new IUser();
//           }
//           return this.userService.read(params.get('id'));
//         }),
//         tap(console.log)
//       )
//       .subscribe((results) => {
//         this.user = results;
//       });
//   }

// ngOnInit(): void {
//     this.route.paramMap
//       .pipe(
//         tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
//         switchMap((params: ParamMap) => {
//           if (params.get('id') === null) {
//             // You should pass the necessary data to create a new user
//             const newUserData = {
//               // provide the necessary properties for creating a new user
//             };
//             return this.userService.create(newUserData);
//           }
//           return this.userService.read(params.get('id'));
//         }),
//         tap(console.log)
//       )
//       .subscribe((results) => {
//         this.user = results;
//       });
//   }



ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
        switchMap((params: ParamMap) => {
          if (params.get('id') === null) {
            // You should pass the necessary data to create a new user
            const newUserData = {
              // provide the necessary properties for creating a new user
            };
            return this.userService.create(newUserData);
          }
        //   return this.userService.read(params.get('id'));

        return this.userService.read(params.get('id')).pipe(
            tap((user) => {
              // Update the user$ array with the new user data
              // this.userService.updateUserArray(user);
            })
          );
        }),
        tap(console.log)
      )
      .subscribe((results) => {
        this.user = results;
      });
}


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
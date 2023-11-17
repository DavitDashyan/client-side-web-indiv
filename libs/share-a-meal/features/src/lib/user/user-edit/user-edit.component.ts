// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IUser } from '@avans-nx-workshop/shared/api';
// import { UserService } from '../user.service';
// import { Subscription, delay, switchMap, tap } from 'rxjs';
// import { ActivatedRoute, ParamMap } from '@angular/router';

// @Component({
//   selector: 'fitness-management-app-user-detail',
//   templateUrl: './user-edit.component.html',
// })
// export class UserEditComponent implements OnInit, OnDestroy {
//   user: IUser | null = null;
//   subscription: Subscription | undefined = undefined;

//   constructor(
//     private userService: UserService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap
//       .pipe(
//         // delay(1500),
//         tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
//         switchMap((params: ParamMap) => {
//           if (params.get('id') === null) {
//             return this.userService.create();
//           }
//           return this.userService.read(params.get('id'));
//         }),
//         tap(console.log)
//       )
//       .subscribe((results) => {
//         this.user = results;
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.subscription) this.subscription.unsubscribe();
//   }
// }


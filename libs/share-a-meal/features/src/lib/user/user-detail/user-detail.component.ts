import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription, delay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
// export class UserDetailComponent implements OnInit, OnDestroy {
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
        
//         switchMap((params: ParamMap) =>
//           this.userService.read(params.get('id'))
//         ),
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

export class UserDetailComponent implements OnInit {
  showDeleteConfirmation = false;
    user = {} as IUser;
    users: IUser[] | null = null;
    userId: string | null = null;
    showButton: boolean | undefined;

    constructor( 
      private route: ActivatedRoute, 
      private userService: UserService,
      private router: Router, 
      private authService: AuthService,
      ) {}

    ngOnInit(): void {

      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');

          // Retrieve user ID from AuthService
          this.authService.currentUser$.subscribe({
              next: (user: IUser | null) => {
                 if (user) {
                  this.userId = user._id;      

                    // Haal user details op gebaseerd up userId
                    this.userService.read(this.userId).subscribe((observable) => {
                    this.user = observable;
          
                    // Als UserId van account en van aangemaakte user niet hetzelfde zijn, is knop niet zichtbaar
                    this.showButton = this.isCurrentUserCreator();
                  });
                }
              },
                error: (error) => {
                console.error('Error getting user information:', error);
              },
            });
          });
    }  

    isCurrentUserCreator(): boolean {
      return this.userId === this.user?._id;
    }
  

    deleteUser(): void {
      if (this.userId !== this.user?._id) {
        console.error('Current user is not the creator of the user. Deletion is not allowed.');
        return;
      }

      if (this.userId) {
        this.userService.delete(this.user).subscribe({
          next: () => {
            console.log('Book deleted successfully');

            // Sluit de dialoogscherm
            this.showDeleteConfirmation = false;
            
            this.authService.logout();

            this.router.navigate(['/'])
            
          },
          error: (error) => {
            console.error('Error deleting user:', error);
          }
        });
      } else {
        console.error('User id is missing for deletion.');
      }
    }

    goBack(): void {
      window.history.back();
    }
}
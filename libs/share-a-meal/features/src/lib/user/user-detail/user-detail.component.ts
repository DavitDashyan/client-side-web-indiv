// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { IUser } from '@avans-nx-workshop/shared/api';
// import { UserService } from '../user.service';
// import { Subscription, delay, switchMap, tap } from 'rxjs';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';

// @Component({
//   selector: 'avans-nx-workshop-user-detail',
//   templateUrl: './user-detail.component.html',
//   styleUrls: ['./user-detail.component.css'],
// })

// export class UserDetailComponent implements OnInit {
//   showDeleteConfirmation = false;
//     user = {} as IUser;
//     users: IUser[] | null = null;
//     userId: string | null = null;
//     showButton: boolean | undefined;

//     constructor(
//       private route: ActivatedRoute,
//       private userService: UserService,
//       private router: Router,
//       private authService: AuthService,
//       ) {}

//     ngOnInit(): void {
//       this.route.paramMap.subscribe((params) => {
//         this.userId = params.get('id');
//         console.log('user.id = ', this.userId);

//           // Retrieve user ID from AuthService
//           this.authService.currentUser$.subscribe({
//               next: (user: IUser | null) => {
//                  if (user) {
//                     console.log('user:', user);
//                     console.log('user._id:', user._id);
//                   this.userId = user._id;

//                     // Haal user details op gebaseerd up userId
//                     this.userService.read(this.userId).subscribe((observable) => {
//                     this.user = observable;

//                     console.log('userId:', this.userId);

//                     // Als UserId van account en van aangemaakte user niet hetzelfde zijn, is knop niet zichtbaar
//                     this.showButton = this.isCurrentUserCreator();
//                   });
//                 }
//               },
//                 error: (error) => {
//                 console.error('Error getting user information:', error);
//               },
//             });
//           });
//     }

//     isCurrentUserCreator(): boolean {
//       return this.userId === this.user?._id;
//     }

//     deleteUser(): void {
//       if (this.userId !== this.user?._id) {
//         console.error('Current user is not the creator of the user. Deletion is not allowed.');
//         return;
//       }

//       if (this.userId) {
//         this.userService.delete(this.user).subscribe({
//           next: () => {
//             console.log('Book deleted successfully');

//             // Sluit de dialoogscherm
//             this.showDeleteConfirmation = false;

//             this.authService.logout();

//             this.router.navigate(['/'])

//           },
//           error: (error) => {
//             console.error('Error deleting user:', error);
//           }
//         });
//       } else {
//         console.error('User id is missing for deletion.');
//       }
//     }

//     goBack(): void {
//       window.history.back();
//     }
// }

import { Component, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  showDeleteConfirmation = false;
  user: IUser | null = null;
  userId: string | null = null;
  isCurrentUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');

      this.userService.read(this.userId).subscribe(
        (user: IUser) => {
          this.user = user;
          this.checkIsCurrentUser();
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });

    this.authService.currentUser$.subscribe((user: IUser | null) => {
      if (user) {
        this.userId = user._id;
        this.checkIsCurrentUser();
      }
    });
  }

  // Methode om te controleren of de huidige gebruiker dezelfde is als de gebruiker wiens gegevens worden bekeken
  private checkIsCurrentUser(): void {
    if (this.userId && this.user) {
      this.isCurrentUser = this.userId === this.user._id;
    }
  }

  deleteUser(): void {
    if (!this.user) {
      console.error('No user data available.');
      return;
    }

    // Only allow deletion if the current user is viewing their own details
    if (!this.isCurrentUser) {
      console.error('Current user is not authorized to delete this user.');
      return;
    }

    this.userService.delete(this.user).subscribe(
      () => {
        console.log('User deleted successfully');
        // Handle any further actions after deletion
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }
}

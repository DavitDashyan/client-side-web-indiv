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
    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }
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
        // this.authService.logout();

        // Redirect the user to the login page after logout
        this.router.navigate(['/login']);
        
        this.authService.logout();
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

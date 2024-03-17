import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription, delay, switchMap, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { initModals} from 'flowbite';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-edit.component.html',
 // styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user = {} as IUser;
  users: IUser[] | null = null;
  userId: string | null = null;

  constructor( 
    private route: ActivatedRoute, 
    private userService: UserService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      
        // Bestaande user
        this.userService.read(this.userId).subscribe((observable) => 
        this.user = observable);
    });

      // Retrieve user ID from AuthService
      this.authService.currentUser$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.userId = user._id;
          }
        },
        error: (error) => {
          console.error('Error getting user information:', error);
        },
      });
  }

  updateUser() {
    if (this.userId !== this.user?._id) {
      console.error('Current user is not the creator of the user. Updating is not allowed.');
      return;
    }

    console.log('Updating user:', this.user);
    
    this.userService.update(this.user).subscribe({
      next: (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        window.history.back();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
    
  }
  
  goBack(): void {
    window.history.back();
  }


  checkFutureUserDate(): boolean {
    const currentDate = new Date();
    const inputDate = new Date(this.user.bday);
    return inputDate > currentDate && inputDate.getFullYear() > 1900;
  }
  

  isValidEmail(email: string): boolean {
    const regexp = /^[a-zA-Z]+\d*@([a-zA-Z]+\.)+[a-zA-Z]+$/;
    return regexp.test(email);
  }
}
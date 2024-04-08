import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: '@avans-nx-workshop-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true;
  subs: Subscription | null = null;
  submitted = false;
  loginError = false;
  userId: string | null = null;
  invalidCredentials: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      this.validEmail.bind(this),
    ]),
    password: new FormControl(null, [
      Validators.required,
      this.validPassword.bind(this),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: IUser | null) => {
        if (user) {
          console.log('User already logged in > to dashboard', user.email);
          this.router.navigate([`${this.userId}/dashboard`]);
        }
      });
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

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe(
        (user: IUser | null) => {
          if (user) {
            console.log('Logged in');
            console.log('User logged in', user._id, this.userId, user.email);
            this.router.navigate([`/dashboard`]);
          } else {
            // Inloggen mislukt
            this.loginError = true;
          }
          this.submitted = false;
        },
        () => {
          // Fout bij inloggen
          this.loginError = true;
          this.submitted = false;
        }
      );
    } else {
      this.submitted = false;
      this.invalidCredentials = true;
      console.error('loginForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return regexp.test(email) ? null : { invalidEmail: true };
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regexp.test(password) ? null : { invalidPassword: true };
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}

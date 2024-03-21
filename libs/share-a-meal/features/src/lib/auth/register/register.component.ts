import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: '@avans-nx-workshop-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

// name: string;
// address: string;
// number: number;
// email: string;
// password: string;
// bday: Date;
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      this.validEmail.bind(this),
    ]),
    password: new FormControl(null, [
      Validators.required,
      this.validPassword.bind(this),
    ]),
  });

  subs: Subscription | null = null;
  hidePassword = true;
  loginError = false;
  registeredUser: IUser | null = null;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      // address: new FormControl(null, [Validators.required]),
      // number: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      bday: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     this.userService.create(this.registerForm.value).subscribe((user) => {
  //       console.log('Registration succeeded');
  //       this.router.navigate(['/user/login'], { relativeTo: this.route });
  //     });
  //   } else {
  //     this.loginError = true;
  //     console.log('this.registerForm.value', this.registerForm.value);
  //     console.error('Registration returned null user');
  //   }
  // }

  onSubmit(): void {
    if (this.registerForm!.valid) {
      console.log('Form is valid', this.registerForm!.value);
      const user: IUser = this.registerForm!.value;
      user.cart = [];
      this.authService.register(user).subscribe({
        next: (newUser) => {
          console.log('User created:', newUser);
          console.log('User created:', newUser?.email);
          this.router.navigate([`/dashboard`]);
        },
        error: (error) => console.error('Error creating user:', error),
      });
    } else {
      this.registerForm!.markAllAsTouched();
      console.error('Form is not valid');
    }
  }

  goBack(): void {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  // onSubmit(): void {
  //   if (this.registerForm!.valid) {
  //     const user: IUser = this.registerForm!.value;
  //     this.userService.create(this.registerForm.value).subscribe({
  //       next: (newUser: IUser) => {
  //         // Explicitly specify the type of 'newUser' as 'IUser'
  //         console.log('User created:', newUser);
  //       },
  //       error: (error: any) => console.error('Error creating user:', error), // Explicitly specify the type of 'error' as 'any'
  //     });
  //   } else {
  //     this.registerForm!.markAllAsTouched();
  //     console.error('Form is not valid');
  //   }
  // }

  validEmail(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z]+\d*@([a-zA-Z]+\.)+[a-zA-Z]+$/;
    return regexp.test(email) ? null : { invalidEmail: true };
  }

  validPassword(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regexp.test(password) ? null : { invalidPassword: true };
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}

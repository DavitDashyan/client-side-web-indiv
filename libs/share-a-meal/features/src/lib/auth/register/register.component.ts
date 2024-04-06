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
      address: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
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
  onSubmit(): void {
    if (this.registerForm!.valid) {
      console.log('Form is valid', this.registerForm!.value);
      const user: IUser = this.registerForm!.value;
      user.cart = [];
      user.favorite = []; //FAVORITE = [] QWERTY
      this.authService.register(user).subscribe({
        next: (newUser) => {
          console.log('User created:', newUser);
          console.log('User created:', newUser?.email);
          this.router.navigate([`/login`]);
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

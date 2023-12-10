// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
// import { AuthService } from '@avans-nx-workshop/shared/auth'; // Update the path


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginPageComponent implements OnInit {
//   loginForm!: FormGroup;
//   isSubmitted = false;

// //   constructor(private formBuilder: FormBuilder) {}
// constructor(private formBuilder: FormBuilder, private authService: AuthService) {}


//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
//   }

//   get fc() {
//     return this.loginForm.controls;
//   }
// //   submit() {
// //     this.isSubmitted = true;
// //     if (this.loginForm.invalid) return;
// //     alert(`email: ${this.fc['email'].value},
// //          password: ${this.fc['password'].value}`);
// //   }

// submit() {
//     this.isSubmitted = true;

//     if (this.loginForm.invalid) {
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     this.authService.login(email, password).subscribe(
//       (response) => {
//         // Handle successful login (navigate, set token, etc.)
//         console.log('Login successful', response);
//       },
//       (error) => {
//         // Handle login failure (display error, etc.)
//         console.error('Login failed', error);
//       }
//     );
//   }
// }




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

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, this.validEmail.bind(this),]),
    password: new FormControl(null, [Validators.required, this.validPassword.bind(this),]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: IUser | null) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate([`${this.userId}/dashboard`]);
        }
      });
      this.authService.currentUser$.subscribe({
        next: (user: IUser | null) => {
          if (user) {
            this.userId = user.id;
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
      this.authService
        .login(email, password)
        .subscribe(
          (user: IUser | null) => {
            if (user) {
              console.log('Logged in');
              this.router.navigate([`${this.userId}/dashboard`])
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


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../auth/auth.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { IUser } from '@avans-nx-workshop/shared/api';
// import { FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   loginForm!: FormGroup;
//   subs: Subscription | null = null;
//   submitted = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     this.loginForm = new FormGroup({
//       email: new FormControl(null, [
//         Validators.required,
//         this.validEmail.bind(this),
//       ]),
//       password: new FormControl(null, [
//         Validators.required,
//         this.validPassword.bind(this),
//       ]),
//     });

//     this.subs = this.authService
//       .getUserFromLocalStorage()
//       .subscribe((user: IUser) => {
//         if (user) {
//           console.log('User already logged in > to dashboard');
//           this.router.navigate(['/']);
//         }
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.subs) {
//       this.subs.unsubscribe();
//     }
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.submitted = true;
//       const email = this.loginForm.value.email;
//       const password = this.loginForm.value.password;
//       this.authService
//         .login(email, password)
//         .subscribe(
//           (user: IUser | null) => {
//             if (user) {
//               console.log('Logged in');
//               this.router.navigate(['/']);
//             } else {
//               // Inloggen mislukt
//               console.error('Login failed');
//             }
//             this.submitted = false;
//           },
//           () => {
//             // Fout bij inloggen
//             console.error('Login failed');
//             this.submitted = false;
//           }
//         );
//     } else {
//       this.submitted = false;
//       console.error('loginForm invalid');
//     }
//   }

//   validEmail(control: FormControl): { [s: string]: boolean } {
//     const email = control.value;
//     const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     return regexp.test(email) ? null : { email: false };
//   }

//   validPassword(control: FormControl): { [s: string]: boolean } {
//     const password = control.value;
//     const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;
//     return regexp.test(password) ? null : { password: false };
//   }
// }



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../auth/auth.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { IUser } from '@avans-nx-workshop/shared/api';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   loginForm: FormGroup;
//   subs: Subscription | null = null;
//   submitted = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     this.loginForm = new FormGroup({
//       email: new FormControl(null, [
//         Validators.required,
//         Validators.email, // Use the built-in email validator
//       ]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(8), // Adjust the minimum length as needed
//       ]),
//     });

//     this.subs = this.authService
//       .getUserFromLocalStorage()
//       .subscribe((user: IUser) => {
//         if (user) {
//           console.log('User already logged in > navigating to dashboard');
//           this.router.navigate(['/']);
//         }
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.subs) {
//       this.subs.unsubscribe();
//     }
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.submitted = true;
//       const { email, password } = this.loginForm.value;
//       this.authService.login(email, password).subscribe(
//         (user: IUser | null) => {
//           if (user) {
//             console.log('Logged in successfully');
//             this.router.navigate(['/']);
//           } else {
//             console.error('Login failed');
//           }
//           this.submitted = false;
//         },
//         () => {
//           console.error('Login failed');
//           this.submitted = false;
//         }
//       );
//     } else {
//       this.submitted = false;
//       console.error('LoginForm is invalid');
//     }
//   }

//   // Use Angular's built-in email validator
//   validEmail(control: FormControl): { [s: string]: boolean } | null {
//     return Validators.email(control);
//   }

//   // Adjust the password validator as needed
//   validPassword(control: FormControl): { [s: string]: boolean } | null {
//     return Validators.minLength(8)(control);
//   }
// }

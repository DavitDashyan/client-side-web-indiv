// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '/auth/auth.service';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { User } from 'src/app/pages/user/user.model';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['../auth.css'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   loginForm: FormGroup;
//   subs: Subscription;
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
//       .subscribe((user: User) => {
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
//         .subscribe((user) => {
//           if (user) {
//             console.log('Logged in');
//             this.router.navigate(['/']);
//           }
//           this.submitted = false;
//         });
//     } else {
//       this.submitted = false;
//       console.error('loginForm invalid');
//     }
//   }

//   validEmail(control: FormControl): { [s: string]: boolean } {
//     const email = control.value;
//     const regexp = new RegExp(
//       '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
//     );
//     if (regexp.test(email) !== true) {
//       return { email: false };
//     } else {
//       return null;
//     }
//   }

//   validPassword(control: FormControl): { [s: string]: boolean } {
//     const password = control.value;
//     const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
//     const test = regexp.test(password);
//     if (regexp.test(password) !== true) {
//       return { password: false };
//     } else {
//       return null;
//     }
//   }
// }

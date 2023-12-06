// auth/auth.service.ts

// import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UserService) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.usersService.findOneByEmail(email);

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }

//     return null;
//   }
// }

// auth.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://your-api-url/auth'; // Update with your backend API URL

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<any> {
//     const body = { email, password };
//     return this.http.post(`${this.apiUrl}/login`, body);
//   }
// }

// auth.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Login, ApiResponse, User } from '@avans-nx-workshop/shared/api'; // Zorg ervoor dat je de Login-interface importeert

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = '...'; // Voeg je API-URL toe

//   constructor(private http: HttpClient) {}

//   login(loginData: Login): Observable<ApiResponse<User>> {
//     const url = `${this.apiUrl}/login`; // Voeg de juiste endpoint toe voor het inloggen
//     return this.http.post<ApiResponse<User>>(url, loginData);
//   }
// }




// import { Injectable } from '@nestjs/common';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { LoginDto } from './path-to-your-login.dto'; // Update the path

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://your-api-url/auth'; // Update with your backend API URL

//   constructor(private http: HttpClient) {}

//   login(loginDto: LoginDto): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, loginDto);
//   }
// }

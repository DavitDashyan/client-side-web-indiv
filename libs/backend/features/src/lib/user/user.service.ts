import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUser, IUser } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UserService';

    private user$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            name: 'john',
            address: 'Lovensdijkstraat',
            number: 12345678,
            email: 'kaas@gmail.com',
            password: 'password',
            bday: new Date(),
        },
        {
            id: '1',
            name: 'robin',
            address: 'Breda',
            number: 9876543,
            email: 'koffie@gmail.com',
            password: 'password',
            bday: new Date(),
        },
    ]);

    private userSubject = new BehaviorSubject<IUser[]>(this.user$.value);

    getUserObservable(): Observable<IUser[]> {
        return this.userSubject.asObservable();
    }
    
    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.user$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const user = this.user$.value.find((usr) => usr.id === id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

//     create(user: ICreateUser): IUser {
//         Logger.log('create', this.TAG);
//         const current = this.user$.value;
//         // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
//         const newUser: IUser = {
//             ...user,
//             id: `user-${Math.floor(Math.random() * 10000)}`,
//         };
//         // Add it to our list of users
//         this.user$.next([...current, newUser]);
//         return newUser;
//     }
// }

create(user: ICreateUser): IUser {
    Logger.log('create', this.TAG);
    const current = this.user$.value;
    // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
    const newUser: IUser = {
        ...user,
        id: `user-${Math.floor(Math.random() * 10000)}`,
    };
    // Add it to our list of users
    this.user$.next([...current, newUser]);
    this.userSubject.next([...current, newUser]); // Notify subscribers
    return newUser;
    }

    // updateUserArray(updatedUser: IUser): void {
    //     const currentUsers = this.user$.value;
    //     const updatedUsers = currentUsers.map((user) =>
    //       user.id === updatedUser.id ? updatedUser : user
    //     );
    //     this.user$.next(updatedUsers);
    //   }
      
}
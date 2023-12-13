// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ICreateUser, IUser } from '@avans-nx-workshop/shared/api';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Logger } from '@nestjs/common';

// @Injectable()
// export class UserService {
//     TAG = 'UserService';

//     private user$ = new BehaviorSubject<IUser[]>([
//         {
//             id: '0',
//             name: 'john',
//             address: 'Lovensdijkstraat',
//             number: 12345678,
//             email: 'kaas@gmail.com',
//             password: 'password',
//             bday: new Date(),
//         },
//         {
//             id: '1',
//             name: 'robin',
//             address: 'Breda',
//             number: 9876543,
//             email: 'koffie@gmail.com',
//             password: 'password',
//             bday: new Date(),
//         },
//         {
//             id: '2',
//             name: 'kees',
//             address: 'Rotterdam',
//             number: 94567883,
//             email: 'water@gmail.com',
//             password: 'password',
//             bday: new Date(),
//         },
//     ]);

//     private userSubject = new BehaviorSubject<IUser[]>(this.user$.value);

//     getUserObservable(): Observable<IUser[]> {
//         return this.userSubject.asObservable();
//     }

//     getAll(): IUser[] {
//         Logger.log('getAll', this.TAG);
//         return this.user$.value;
//     }

//     getOne(id: string): IUser {
//         Logger.log(`getOne(${id})`, this.TAG);
//         const user = this.user$.value.find((usr) => usr.id === id);
//         if (!user) {
//             throw new NotFoundException(`User could not be found!`);
//         }
//         return user;
//     }

// //     create(user: ICreateUser): IUser {
// //         Logger.log('create', this.TAG);
// //         const current = this.user$.value;
// //         // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
// //         const newUser: IUser = {
// //             ...user,
// //             id: `user-${Math.floor(Math.random() * 10000)}`,
// //         };
// //         // Add it to our list of users
// //         this.user$.next([...current, newUser]);
// //         return newUser;
// //     }
// // }

// create(user: ICreateUser): IUser {
//     Logger.log('create', this.TAG);
//     const current = this.user$.value;
//     // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
//     const newUser: IUser = {
//         ...user,
//         id: `user-${Math.floor(Math.random() * 10000)}`,
//     };
//     // Add it to our list of users
//     this.user$.next([...current, newUser]);
//     this.userSubject.next([...current, newUser]); // Notify subscribers
//     return newUser;
//     }

//     // updateUserArray(updatedUser: IUser): void {
//     //     const currentUsers = this.user$.value;
//     //     const updatedUsers = currentUsers.map((user) =>
//     //       user.id === updatedUser.id ? updatedUser : user
//     //     );
//     //     this.user$.next(updatedUsers);
//     //   }

// }

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.shema';
import { IUser } from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<IUser[]> {
    this.logger.log(`Finding all items`);
    const items = await this.userModel.find();
    return items;
  }

  async getOne(id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${id}`);

    // Check if id is null
    if (id === null || id === 'null') {
      this.logger.debug('ID is null or "null"');
      return null;
    }
    const item = await this.userModel.findOne({ id: id }).exec();
    if (!item) {
      this.logger.debug('Item not found');
    }
    return item;
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    this.logger.log(`Finding user by email ${email}`);
    const item = this.userModel
      .findOne({ emailAddress: email })
      .select('-password')
      .exec();
    return item;
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    this.logger.log(`Create user ${userDto.name}`);
        
    // Sluit id expliciet uit
    const { id, ...userWithoutId } = userDto;

    // Hash het wachtwoord voordat het wordt opgeslagen
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const createdItem = await this.userModel.create({
      ...userWithoutId,
      password: hashedPassword, // Voeg het gehashte wachtwoord toe
    });

    return createdItem;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Update user properties
    Object.assign(existingUser, updateUserDto);

    // Save the updated user
    const updatedUser = await existingUser.save();

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log(`Deleting user with id ${id}`);
    const deletedItem = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      this.logger.debug('User not found for deletion');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.logger.log(`User deleted successfully`);
  }

  async login(email: string, password: string): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      // Log the values for debugging
      console.log('Password passed:', password);
      console.log('User object:', user);

      // Check if the user object has the wachtwoord property set
      if (!user.password) {
        throw new Error(
          'User object does not have the wachtwoord property set'
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      return user;
    } catch (error) {
      throw new Error(`Login failed: ${(error as Error).message}`);
    }
  }
}
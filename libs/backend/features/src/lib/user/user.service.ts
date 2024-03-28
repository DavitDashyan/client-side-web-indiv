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

  async getOne(_id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${_id}`);

    // Check if id is null
    if (_id === null || _id === 'null') {
      this.logger.debug('ID is null or "null"');
      return null;
    }
    const item = await this.userModel.findOne({ _id: _id }).exec(); // Gebruik '_id' in plaats van 'id' in de query
    if (!item) {
      this.logger.debug('id of the item not found', _id);
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

    const { _id, ...userWithoutId } = userDto;

    // wachtwoord hasken
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const createdItem = await this.userModel.create({
      ...userWithoutId,
      password: hashedPassword, // Voeg het gehashte wachtwoord toe
    });

    return createdItem;
  }
  async findOne(_id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${_id}`);
    const item = await this.userModel.findOne({ _id }).exec();
    if (!item) {
      this.logger.debug('Item not found');
    }
    return item;
  }
  async update(_id: string, user: UpdateUserDto): Promise<IUser | null> {
    const userTest = await this.findOne(_id);
    if (userTest) {
      this.logger.log(`Update user ${userTest.name}`);
    }
    console.log('bday:', user.bday);
    return this.userModel.findByIdAndUpdate({ _id }, user);
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

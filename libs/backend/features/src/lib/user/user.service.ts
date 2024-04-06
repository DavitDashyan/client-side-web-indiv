import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.shema';
import { IUser } from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import * as bcrypt from 'bcrypt';
import { RecommendationService } from '../recommendation/recommendation.service';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly recommendationService: RecommendationService
  ) {}

  async getAll(): Promise<IUser[]> {
    this.logger.log(`Finding all items`);
    const items = await this.userModel.find();
    return items;
  }

  async getOne(_id: string): Promise<IUser | null> {
    this.logger.log(`finding user with id ${_id}`);

    if (_id === null || _id === 'null') {
      this.logger.debug('ID is null or "null"');
      return null;
    }
    const item = await this.userModel.findOne({ _id: _id }).exec();
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

    await this.recommendationService.createOrUpdateUser(createdItem);

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
  // async update(_id: string, user: UpdateUserDto): Promise<IUser | null> {
  //   const userTest = await this.findOne(_id);
  //   if (!userTest) {
  //     this.logger.debug(`User with ID ${_id} not found`);
  //     return null;
  //   }
  //   //UpdateNEO4J
  //   this.logger.log(`Update user ${userTest.name}`);

  //   // Voer de standaard update uit in MongoDB
  //   const updatedUser = await this.userModel.findByIdAndUpdate({ _id }, user, {
  //     new: true,
  //   });

  //   // Controleer of er producten zijn toegevoegd aan de winkelwagen
  //   if (user.cart && user.cart.length > 0) {
  //     // Loop door de toegevoegde producten
  //     for (const cartItem of user.cart) {
  //       // Voeg elk product toe aan de winkelwagen van de gebruiker in Neo4j
  //       await this.recommendationService.addProductToUserCart(
  //         _id,
  //         cartItem.productId
  //       );
  //     }
  //   }

  //   return updatedUser;
  // }

  async update(_id: string, user: UpdateUserDto): Promise<IUser | null> {
    const userTest = await this.findOne(_id);
    if (!userTest) {
      this.logger.debug(`User with ID ${_id} not found`);
      return null;
    }

    // Voer de standaard update uit in MongoDB
    const updatedUser = await this.userModel.findByIdAndUpdate(_id, user, {
      new: true,
    });

    // Controleer of er producten zijn toegevoegd aan de winkelwagen
    if (user.cart && user.cart.length > 0) {
      // Loop door de toegevoegde producten
      for (const cartItem of user.cart) {
        // Voeg elk product toe aan de winkelwagen van de gebruiker in Neo4j
        await this.recommendationService.addProductToUserCart(
          _id,
          cartItem.productId
        );
      }
    }

    // Controleer of er producten zijn verwijderd uit de winkelwagen
    if (userTest.cart && userTest.cart.length > 0) {
      // Loop door de oorspronkelijke winkelwagen van de gebruiker
      for (const originalCartItem of userTest.cart) {
        // Zoek het overeenkomende product in de bijgewerkte winkelwagen
        const updatedCartItem = user.cart.find(
          (cartItem) => cartItem.productId === originalCartItem.productId
        );

        // Als het product niet in de bijgewerkte winkelwagen staat, verwijder het dan uit Neo4j
        if (!updatedCartItem) {
          await this.recommendationService.deleteProductFromUserCart(
            _id,
            originalCartItem.productId
          );
        }
      }
    }

    return updatedUser;
  }


  async deleteUser(id: string): Promise<void> {
    this.logger.log(`Deleting user with id ${id}`);
    const deletedItem = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      this.logger.debug('User not found for deletion');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.recommendationService.deleteUserNeo(id);

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

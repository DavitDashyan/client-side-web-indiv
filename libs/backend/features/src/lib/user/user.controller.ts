import { UserService } from './user.service';
// import { Get, Param, Post, Body } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { RecommendationService } from '../recommendation/recommendation.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private recommendationService: RecommendationService
  ) {}

  @Get('')
  async getAll(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') _id: string): Promise<IUser | null> {
    console.log('getOne AAAAA', _id);
    return await this.userService.getOne(_id);
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    const { ...userWithoutId } = createUserDto;
    console.log('create', createUserDto.bday);
    // createUserDto.bday = new Date(createUserDto.bday);
    console.log('create after', createUserDto.bday);

    const createdUser = await this.userService.create(userWithoutId);
    console.log('createdUser', createdUser);
    // Voeg de gebruiker toe aan Neo4j
    await this.recommendationService.createOrUpdateUser(createdUser);

    return await this.userService.create(userWithoutId);
  }

  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    console.log('update', userId, updateUserDto);
    const updatedUser = await this.userService.update(userId, updateUserDto);
    return { message: 'User updated successfully', user: updatedUser };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  @Post('/login')
  async login(@Body() user: IUser): Promise<IUser | { error: string }> {
    const loggedInUser = await this.userService.login(
      user.email,
      user.password
    );
    return await loggedInUser;
  }
}

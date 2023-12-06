// import { Controller } from '@nestjs/common';

// @Controller('user')
// export class UserController {}
// import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
// import { Get, Param, Post, Body } from '@nestjs/common';
import { Controller, Get, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // @Get('')
    // getAll(): IUser[] {
    //     return this.userService.getAll();
    // }

    // @Get(':id')
    // getOne(@Param('id') id: string): IUser {
    //     return this.userService.getOne(id);
    // }

    // @Post('')
    // create(@Body() data: CreateUserDto): IUser {
    //     return this.userService.create(data);
    // } 

    @Get('')
    async getAll(): Promise<IUser[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<IUser | null> {
        return await this.userService.getOne(id);
    }

    @Post('')
    async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
        const {...userWithoutId } = createUserDto;
        return await this.userService.create(userWithoutId);
    }

    @Put(':id')
    async update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
      const updatedUser = await this.userService.update(userId, updateUserDto);
      return { message: 'User updated successfully', user: updatedUser };
    }
    
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUser(id);
    }
    
    @Post('/login')
    async login(@Body() user: IUser): Promise<IUser | { error: string }> {
        const loggedInUser = await this.userService.login(user.email, user.password);
        return await loggedInUser;
    }
}
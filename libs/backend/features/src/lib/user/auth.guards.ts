import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
 

// gebruiker bestaat al? zo niet, dan kan de gebruiker worden aangemaakt
@Injectable()
export class UserExistGuard implements CanActivate {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
 
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest().body;
        return !!this.userModel.findOne({ username: user.username }); // als de gebruiker al bestaat, return true
    }
}
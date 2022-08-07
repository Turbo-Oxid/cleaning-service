import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RecoveryUserDto } from './dto/recovery-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  
  async changePassword(recoveryUserDto: RecoveryUserDto) {
    return this.userModel.findOneAndUpdate({email: recoveryUserDto.email},{password: recoveryUserDto.password})
  }

  async getClients(): Promise<User[]> {
    return this.userModel.find({admin: false});
  }

  async getUserByEmail(email: string): Promise<User> {
    return  this.userModel.findOne({email: email});
  }

  async getUserToRecovery(login: string, email: string): Promise<User> {
    return this.userModel.findOne({login: login, email: email});
  }

}

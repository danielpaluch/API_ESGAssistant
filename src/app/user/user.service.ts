import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { LoginUserInput } from '../auth/dto/login-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserInput: CreateUserInput) {
    const hash = await bcrypt.hash(
      createUserInput.password,
      Number(process.env.SALT),
    );

    const createdUser = new this.userModel({
      ...createUserInput,
      password: hash,
    });

    return createdUser.save();
  }

  async loginUser(loginInput: LoginUserInput) {
    const { email, password } = loginInput;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Password or email address incorrect');
    }

    return user;
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    return await this.userModel.findById(id).exec();
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async updateUser(
    id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec();
  }

  async removeUser(id: MongooseSchema.Types.ObjectId) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}

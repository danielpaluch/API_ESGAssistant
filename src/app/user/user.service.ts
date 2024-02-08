import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Schema as MongooseSchema } from 'mongoose';
import {
  USER_INCORRECT_PASSWORD_OR_EMAIL_EXCEPTION,
  USER_NOT_FOUND_EXCEPTION,
} from '../common/exceptions/user.exception';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

// The @Injectable() decorator marks a class as a provider.
// Nest will instantiate a class only once, and inject that single instance
// wherever it is requested.
// In other words, we are creating a singleton service.
// We can inject this service into other classes using the @Injectable() decorator.
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserInput: CreateUserInput) {
    const hash = await bcrypt.hash(
      createUserInput.password,
      Number(process.env.SALT_ROUNDS),
    );

    const createdUser = new this.userModel({
      ...createUserInput,
      password: hash,
    });

    return createdUser.save();
  }

  async validateUser(loginInput: LoginUserInput) {
    const { email, password } = loginInput;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error(USER_NOT_FOUND_EXCEPTION);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error(USER_INCORRECT_PASSWORD_OR_EMAIL_EXCEPTION);
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
    return await this.userModel.findOne({ email });
  }

  async updateUser(
    id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec();
  }

  async updatePassword(updatePasswordInput: UpdatePasswordInput) {
    return await this.userModel
      .findByIdAndUpdate(updatePasswordInput._id, updatePasswordInput, {
        new: true,
      })
      .exec();
  }

  async removeUser(id: MongooseSchema.Types.ObjectId) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}

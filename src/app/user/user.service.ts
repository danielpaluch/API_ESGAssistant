import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: MongooseSchema.Types.ObjectId) {
    return `This action returns a #${id} user`;
  }

  update(id: MongooseSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: MongooseSchema.Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}

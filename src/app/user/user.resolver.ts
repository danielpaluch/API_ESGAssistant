import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => User, { name: 'userById' })
  getUserById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.getUserById(id);
  }

  @Query(() => User, { name: 'userByEmail' })
  getUserByEmail(@Args('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.removeUser(id);
  }
}

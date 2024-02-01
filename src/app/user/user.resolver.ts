import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  // Because we are using the @Injectable() decorator in the UserService class,
  // we can inject the UserService class into the UserResolver class.
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => User, { name: 'login' })
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.validateUser(loginUserInput);
  }

  @UseGuards(AuthGuard('jwt'))
  @Query(() => [User], { name: 'users' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Query(() => User, { name: 'userById' })
  getUserById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Query(() => User, { name: 'userByEmail' })
  getUserByEmail(@Args('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput._id, updateUserInput);
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => User)
  updatePassword(
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.userService.updatePassword(updatePasswordInput);
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.userService.removeUser(id);
  }
}

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as Chance from 'chance';
import { Schema as MongooSchema } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../common/helpers/mongoose.helper';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './user.service';

// Mocking data
const UPDATED_ROLE_LENGTH = 15;
const ROLE_LENGTH = 20;

const chance = new Chance();
let userId = '';

const createUserInput: CreateUserInput = {
  firstName: chance.name(),
  lastName: chance.name(),
  password: 'FakePassword1?',
  role: chance.string({ length: ROLE_LENGTH }),
  phone: chance.phone(),
  company: chance.company(),
  email: chance.email(),
};

const updateUserInput: UpdateUserInput = {
  _id: new MongooSchema.Types.ObjectId(''),
  firstName: chance.name(),
  role: chance.string({ length: UPDATED_ROLE_LENGTH }),
};

const updatePasswordInput: UpdatePasswordInput = {
  _id: new MongooSchema.Types.ObjectId(''),
  password: 'NewFakePassword1?',
};

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService, ConfigService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    if (module) {
      await module.close();
      await closeInMongodConnection();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.createUser(createUserInput);
    expect(user.id).toBeDefined();
    expect(user.firstName).toBe(createUserInput.firstName);
    expect(user.lastName).toBe(createUserInput.lastName);
    expect(user.role).toBe(createUserInput.role);
    expect(user.phone).toBe(createUserInput.phone);
    expect(user.company).toBe(createUserInput.company);
    expect(user.email).toBe(createUserInput.email);
    expect(user.password).not.toBe(createUserInput.password);
    updateUserInput._id = user.id;
    updatePasswordInput._id = user.id;
    userId = user.id;
  });

  it('should validate a user', async () => {
    const user = await service.validateUser({
      email: createUserInput.email,
      password: createUserInput.password,
    });
    expect(user).toBeDefined();
    expect(user.id).toBe(userId);
  });

  it('should get a list of users', async () => {
    const users = await service.getAllUsers();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0].id).toBeDefined();
    expect(users[0].firstName).toBe(createUserInput.firstName);
    expect(users[0].lastName).toBe(createUserInput.lastName);
    expect(users[0].role).toBe(createUserInput.role);
    expect(users[0].phone).toBe(createUserInput.phone);
    expect(users[0].company).toBe(createUserInput.company);
    expect(users[0].email).toBe(createUserInput.email);
    expect(users[0].password).not.toBe(createUserInput.password);
  });

  it('should get a user by email', async () => {
    const user = await service.getUserByEmail(createUserInput.email);
    expect(user).toBeDefined();
    expect(user.id).toBe(userId);
  });

  it('should update some user fields', async () => {
    const updatedUser = await service.updateUser(
      updateUserInput._id,
      updateUserInput,
    );
    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.role.length).toBe(UPDATED_ROLE_LENGTH);
    expect(updatedUser.firstName).toBe(updateUserInput.firstName);
    // fields that were not updated should remain the same
    expect(updatedUser.lastName).toBe(createUserInput.lastName);
    expect(updatedUser.phone).toBe(createUserInput.phone);
    expect(updatedUser.company).toBe(createUserInput.company);
    expect(updatedUser.email).toBe(createUserInput.email);
    expect(updatedUser.password).not.toBe(createUserInput.password);
  });

  it('should update password', async () => {
    const updatedUser = await service.updatePassword(updatePasswordInput);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.password).not.toBe(createUserInput.password);
    expect(updatedUser.password).toBe(updatePasswordInput.password);
  });

  it('should delete a user', async () => {
    const deletedUser = await service.removeUser(updateUserInput._id);
    expect(deletedUser).toBeDefined();
  });

  it('should not be able to find a deleted user', async () => {
    try {
      await service.getUserById(updateUserInput._id);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });

  it("should not be able to update a user that doesn't exist", async () => {
    try {
      await service.updateUser(updateUserInput._id, updateUserInput);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.response).toBeDefined();
      expect(error.response.statusCode).toBe(404);
    }
  });
});

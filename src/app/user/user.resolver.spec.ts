import { Test, TestingModule } from '@nestjs/testing';
import * as Chance from 'chance';
import { Schema as MongooSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const chance = new Chance();
let userId = new MongooSchema.Types.ObjectId('');

const createUserInput: CreateUserInput = {
  firstName: chance.name(),
  lastName: chance.name(),
  email: chance.email(),
  password: 'FakePassword1?',
  role: chance.string({ length: 20 }),
  phone: chance.phone(),
  company: chance.company(),
};

const updateUserInput: UpdateUserInput = {
  _id: userId,
  firstName: chance.name(),
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            getAllUsers: jest.fn(() => {
              return [
                {
                  _id: userId,
                  ...createUserInput,
                },
              ];
            }),
            getUserById: jest.fn(() => {
              return {
                _id: userId,
                ...createUserInput,
              };
            }),
            updateUser: jest.fn(() => {
              return {
                _id: userId,
                ...updateUserInput,
              };
            }),
            removeUser: jest.fn(() => {
              return {};
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await resolver.createUser(createUserInput);
    expect(user._id).toBeDefined();
    expect(user._id).toBe(userId);
    expect(user.firstName).toBe(createUserInput.firstName);
    expect(user.lastName).toBe(createUserInput.lastName);
    expect(user.email).toBe(createUserInput.email);
    expect(user.role).toBe(createUserInput.role);
    expect(user.phone).toBe(createUserInput.phone);
    expect(user.company).toBe(createUserInput.company);
    userId = user._id;
    updateUserInput._id = user._id;
  });

  it('should return an array of users', async () => {
    const users = await resolver.getAllUsers();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array);
    expect(users[0]._id).toBe(userId);
  });

  it('should return a user by id', async () => {
    const user = await resolver.getUserById(userId);
    expect(user).toBeDefined();
    expect(user._id).toBe(userId);
  });

  it("should update a user's data", async () => {
    const user = await resolver.updateUser(updateUserInput);
    expect(user).toBeDefined();
    expect(user._id).toBe(userId);
    expect(user.firstName).toBe(updateUserInput.firstName);
  });

  it('should remove a user', async () => {
    const removedUser = await resolver.removeUser(userId);
    expect(removedUser).toBeDefined();
  });
});

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as Chance from 'chance';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../common/helpers/mongoose.helper';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const chance = new Chance();
let user: User;

const signupUserInput: CreateUserInput = {
  firstName: chance.name(),
  lastName: chance.name(),
  email: chance.email(),
  password: 'FakePassword1?',
  role: chance.string({ length: 20 }),
  phone: chance.phone(),
  company: chance.company(),
};

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthService, UserService, ConfigService, JwtService],
      imports: [
        UserModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'testSecret',
          signOptions: { expiresIn: '24h' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
    const user = await service.signUp(signupUserInput);

    expect(user).toBeDefined();
    expect(user.firstName).toBe(signupUserInput.firstName);
    expect(user.lastName).toBe(signupUserInput.lastName);
    expect(user.email).toBe(signupUserInput.email);
    expect(user.role).toBe(signupUserInput.role);
    expect(user.phone).toBe(signupUserInput.phone);
    expect(user.company).toBe(signupUserInput.company);
    expect(user.password).not.toBe(signupUserInput.password);
  });

  // Add error expectation
  it('should throw an error if user already exists', async () => {
    try {
      await service.signUp(signupUserInput);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should validate an existing user', async () => {
    const user_ = await service.validateUser({
      email: signupUserInput.email,
      password: signupUserInput.password,
    });

    expect(user_).toBeDefined();
    expect(user_.firstName).toBe(signupUserInput.firstName);
    user = user_;
  });

  it("should return null uf the user credentials don't match", async () => {
    const user_ = await service.validateUser({
      email: signupUserInput.email,
      password: 'IncorrectFakePassword1?',
    });

    expect(user_).toBeNull();
  });

  it("should login a user and return the user's data and a token", async () => {
    const response = service.login(user);

    expect(response).toBeDefined();
    expect(response.authToken).toBeDefined();
    expect(response.user.firstName).toBe(signupUserInput.firstName);
  });
});

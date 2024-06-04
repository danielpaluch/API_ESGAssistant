import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';

describe('AuthController', () => {
  let controller: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthResolver],
    }).compile();

    controller = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EmissionResolver } from './emission.resolver';

describe('EmissionResolver', () => {
  let resolver: EmissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmissionResolver],
    }).compile();

    resolver = module.get<EmissionResolver>(EmissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

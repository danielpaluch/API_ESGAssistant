import { Test, TestingModule } from '@nestjs/testing';
import { EmissionService } from './emission.service';

describe('EmissionService', () => {
  let service: EmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmissionService],
    }).compile();

    service = module.get<EmissionService>(EmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

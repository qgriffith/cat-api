import { Test, TestingModule } from '@nestjs/testing';
import { SubnetsService } from './subnets.service';

describe('SubnetsService', () => {
  let service: SubnetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubnetsService],
    }).compile();

    service = module.get<SubnetsService>(SubnetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

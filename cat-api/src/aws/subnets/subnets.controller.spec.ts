import { Test, TestingModule } from '@nestjs/testing';
import { SubnetsController } from './subnets.controller';

describe('SubnetsController', () => {
  let controller: SubnetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubnetsController],
    }).compile();

    controller = module.get<SubnetsController>(SubnetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

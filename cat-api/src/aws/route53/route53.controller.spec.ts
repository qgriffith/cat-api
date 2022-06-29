import { Test, TestingModule } from '@nestjs/testing';
import { Route53Controller } from './route53.controller';

describe('Route53Controller', () => {
  let controller: Route53Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Route53Controller],
    }).compile();

    controller = module.get<Route53Controller>(Route53Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

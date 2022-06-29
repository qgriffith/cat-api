import { Test, TestingModule } from '@nestjs/testing'
import { Route53Service } from './route53.service'

describe('Route53Service', () => {
  let service: Route53Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Route53Service],
    }).compile()

    service = module.get<Route53Service>(Route53Service)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

import { Controller, Get, Param } from '@nestjs/common'
import { SubnetsService } from './subnets.service'
import { aws_ec2_subnets as AWSSubnetModel } from '@prisma/client'

@Controller('aws/subnets')
export class SubnetsController {
  constructor(private readonly subnetService: SubnetsService) {}

  @Get('/')
  async getAllSubnets(): Promise<AWSSubnetModel[]> {
    return this.subnetService.aws_subnets({
      orderBy: { account_id: 'asc' },
    })
  }

  @Get('/account/:id')
  async getAllSubnetsAccount(@Param('id') id: string): Promise<AWSSubnetModel[]> {
    return this.subnetService.aws_subnets({
      where: { account_id: String(id) },
    })
  }

  @Get('/vpc/:id')
  async getAllSubnetsVPC(@Param('id') id: string): Promise<AWSSubnetModel[]> {
    return this.subnetService.aws_subnets({
      where: { vpc_id: String(id) },
    })
  }

  @Get('/id/:id')
  async getSubnetbyID(@Param('id') id: string): Promise<AWSSubnetModel> {
    return this.subnetService.aws_subnet_findFirst({
      where: {
        id: {
          equals: String(id),
        },
      },
    })
  }
}

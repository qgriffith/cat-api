import { Controller, Get, Param } from '@nestjs/common'
import { ResourcesService } from './resources.service'
import { aws_resources as AWSResourcesModel } from '@prisma/client'

@Controller('aws/resources')
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Get('/account/:id')
  async getAllResourcesAccount(@Param('id') id: string): Promise<AWSResourcesModel[]> {
    return this.resourceService.aws_resources({
      where: { account_id: String(id) },
      orderBy: { cq_table: 'asc' },
    })
  }

  @Get('/account/:id/region/:region')
  async getAllResourcesAccountRegion(
    @Param('id') id: string,
    @Param('region') region: string
  ): Promise<AWSResourcesModel[]> {
    return this.resourceService.aws_resources({
      where: { AND: [{ account_id: String(id) }, { region: String(region) }] },
    })
  }
}

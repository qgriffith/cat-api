import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { aws_resources, Prisma } from '@prisma/client'

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async aws_resources(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_resourcesWhereUniqueInput
    where?: Prisma.aws_resourcesWhereInput
    orderBy?: Prisma.aws_resourcesOrderByWithRelationInput
  }): Promise<aws_resources[] | null> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.aws_resources.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }
}

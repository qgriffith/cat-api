import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { aws_ec2_subnets, Prisma } from '@prisma/client'

@Injectable()
export class SubnetsService {
  constructor(private prisma: PrismaService) {}

  async aws_subnet_findFirst(params: {
    where?: Prisma.aws_ec2_subnetsWhereInput
  }): Promise<aws_ec2_subnets | null> {
    const { where } = params
    return this.prisma.aws_ec2_subnets.findFirst({
      where,
    })
  }

  async aws_subnets(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_ec2_subnetsWhereUniqueInput
    where?: Prisma.aws_ec2_subnetsWhereInput
    orderBy?: Prisma.aws_ec2_subnetsOrderByWithRelationInput
    include?: Prisma.aws_ec2_subnetsInclude
  }): Promise<aws_ec2_subnets[] | null> {
    const { skip, take, cursor, where, orderBy, include } = params
    return this.prisma.aws_ec2_subnets.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    })
  }
}

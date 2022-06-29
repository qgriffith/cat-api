import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import {
  aws_route53_hosted_zones,
  aws_route53_hosted_zone_resource_record_sets,
  aws_route53_domains,
  Prisma,
} from '@prisma/client'

@Injectable()
export class Route53Service {
  constructor(private prisma: PrismaService) {}

  async hosted_zones(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_route53_hosted_zonesWhereUniqueInput
    where?: Prisma.aws_route53_hosted_zonesWhereInput
    orderBy?: Prisma.aws_route53_hosted_zonesOrderByWithRelationInput
    include?: Prisma.aws_route53_hosted_zonesInclude
  }): Promise<aws_route53_hosted_zones[] | null> {
    const { skip, take, cursor, where, orderBy, include } = params
    return this.prisma.aws_route53_hosted_zones.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    })
  }

  async hosted_zone_findFirst(params: {
    where?: Prisma.aws_route53_hosted_zonesWhereInput
  }): Promise<aws_route53_hosted_zones | null> {
    const { where } = params
    return this.prisma.aws_route53_hosted_zones.findFirst({
      where,
    })
  }

  //records
  async hosted_records(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_route53_hosted_zone_resource_record_setsWhereUniqueInput
    where?: Prisma.aws_route53_hosted_zone_resource_record_setsWhereInput
    orderBy?: Prisma.aws_route53_hosted_zone_resource_record_setsOrderByWithRelationInput
    include?: Prisma.aws_route53_hosted_zone_resource_record_setsInclude
  }): Promise<aws_route53_hosted_zone_resource_record_sets[] | null> {
    const { skip, take, cursor, where, orderBy, include } = params
    return this.prisma.aws_route53_hosted_zone_resource_record_sets.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    })
  }

  async hosted_records_findFirst(params: {
    where?: Prisma.aws_route53_hosted_zone_resource_record_setsWhereInput
  }): Promise<aws_route53_hosted_zone_resource_record_sets | null> {
    const { where } = params
    return this.prisma.aws_route53_hosted_zone_resource_record_sets.findFirst({
      where,
    })
  }

  //domains
  async getDomains(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_route53_domainsWhereUniqueInput
    where?: Prisma.aws_route53_domainsWhereInput
    orderBy?: Prisma.aws_route53_domainsOrderByWithRelationInput
    include?: Prisma.aws_route53_domainsInclude
  }): Promise<aws_route53_domains[] | null> {
    const { skip, take, cursor, where, orderBy, include } = params
    return this.prisma.aws_route53_domains.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    })
  }

  async domains_findFirst(params: {
    where?: Prisma.aws_route53_domainsWhereInput
  }): Promise<aws_route53_domains | null> {
    const { where } = params
    return this.prisma.aws_route53_domains.findFirst({
      where,
    })
  }
}

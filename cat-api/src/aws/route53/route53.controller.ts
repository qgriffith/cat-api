import { Controller, Get, Param } from '@nestjs/common'
import { Route53Service } from './route53.service'
import { aws_route53_hosted_zones as AwsHostedZonesModel } from '@prisma/client'
import { aws_route53_hosted_zone_resource_record_sets as AwsReocrdSets } from '@prisma/client'
import { aws_route53_domains as AwsDomainModel } from '@prisma/client'

@Controller('aws/route53')
export class Route53Controller {
  constructor(private readonly route53Service: Route53Service) {}

  @Get('hosted_zones/')
  async getAllZones(): Promise<AwsHostedZonesModel[]> {
    return this.route53Service.hosted_zones({
      orderBy: { name: 'asc' },
    })
  }

  @Get('hosted_zone/:name')
  async getZoneByName(@Param('name') name: string): Promise<AwsHostedZonesModel> {
    return this.route53Service.hosted_zone_findFirst({
      where: {
        name: {
          equals: String(name),
        },
      },
    })
  }

  @Get('hosted_zone/account/:id')
  async getZoneByAccountId(@Param('id') id: string): Promise<AwsHostedZonesModel[]> {
    return this.route53Service.hosted_zones({
      where: { account_id: String(id) },
    })
  }

  //records
  @Get('records')
  async getAllRecords(): Promise<AwsReocrdSets[]> {
    return this.route53Service.hosted_records({
      orderBy: { name: 'asc' },
    })
  }

  @Get('records/account/:id')
  async getAllRecordsAccount(@Param('id') id: string): Promise<AwsReocrdSets[]> {
    return this.route53Service.hosted_records({
      where: { aws_route53_hosted_zones: { account_id: String(id) } },
    })
  }

  @Get('records/zone/:name')
  async getAllRecordsZone(@Param('name') name: string): Promise<AwsReocrdSets[]> {
    return this.route53Service.hosted_records({
      where: { aws_route53_hosted_zones: { name: String(name) } },
    })
  }

  @Get('records/type/:type')
  async getAllRecordsType(@Param('type') type: string): Promise<AwsReocrdSets[]> {
    return this.route53Service.hosted_records({
      where: { type: String(type) },
    })
  }

  @Get('record/name/:name')
  async getRecordByName(@Param('name') name: string): Promise<AwsReocrdSets> {
    return this.route53Service.hosted_records_findFirst({
      where: { name: String(name) },
    })
  }

  //domains
  @Get('domains/')
  async getAllDomains(): Promise<AwsDomainModel[]> {
    return this.route53Service.getDomains({
      orderBy: { domain_name: 'desc' },
    })
  }

  @Get('domains/name/:name')
  async getDomainByName(@Param('name') name: string): Promise<AwsDomainModel> {
    return this.route53Service.domains_findFirst({
      where: { domain_name: String(name) },
    })
  }

  @Get('domains/register/aws')
  async getDomainsAWSRegister(): Promise<AwsDomainModel[]> {
    return this.route53Service.getDomains({
      where: { registrar_name: { contains: String('Amazon') } },
    })
  }
}

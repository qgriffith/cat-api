import { Controller, Get, Param } from '@nestjs/common'
import { S3Service } from './s3.service'
import { aws_s3_buckets as AWSBucketModel } from '@prisma/client'

@Controller('aws/s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('/buckets')
  async getAllBuckets(): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      orderBy: { account_id: 'desc' },
    })
  }

  @Get('/account/:id')
  async getAllBucketsAccount(@Param('id') id: string): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      where: { account_id: String(id) },
      orderBy: { name: 'asc' },
    })
  }

  @Get('/region/:region')
  async getAllBucketsRegion(@Param('region') region: string): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      where: { region: String(region) },
    })
  }

  @Get('/account/:id/region/:region')
  async getAllBucketsAccountRegion(
    @Param('id') id: string,
    @Param('region') region: string
  ): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      where: {
        AND: [
          {
            account_id: String(id),
          },
          {
            region: String(region),
          },
        ],
      },
    })
  }

  @Get('/public')
  async getAllPublicBuckets(): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      where: {
        OR: [
          {
            block_public_acls: false,
          },
          {
            block_public_policy: false,
          },
          {
            ignore_public_acls: false,
          },
          {
            restrict_public_buckets: false,
          },
        ],
      },
    })
  }

  @Get('/encrypted')
  async getAllEncryptedBuckets(): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      orderBy: { account_id: 'asc' },
      include: { aws_s3_bucket_encryption_rules: true },
    })
  }

  @Get('/nonencrypted')
  async getAllNonEncryptedBuckets(): Promise<AWSBucketModel[]> {
    return this.s3Service.aws_buckets({
      orderBy: { account_id: 'asc' },
      include: { aws_s3_bucket_encryption_rules: false },
    })
  }

  @Get('/bucket/name/:name')
  async getBucketByName(@Param('name') name: string): Promise<AWSBucketModel> {
    return this.s3Service.aws_bucket_findFirst({
      where: {
        name: {
          equals: String(name),
        },
      },
    })
  }
}

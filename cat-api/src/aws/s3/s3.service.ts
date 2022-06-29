import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { aws_s3_buckets, Prisma } from '@prisma/client'

@Injectable()
export class S3Service {
  constructor(private prisma: PrismaService) {}

  async aws_bucket_findFirst(params: {
    where?: Prisma.aws_s3_bucketsWhereInput
  }): Promise<aws_s3_buckets | null> {
    const { where } = params
    return this.prisma.aws_s3_buckets.findFirst({
      where,
    })
  }

  async aws_buckets(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_s3_bucketsWhereUniqueInput
    where?: Prisma.aws_s3_bucketsWhereInput
    orderBy?: Prisma.aws_s3_bucketsOrderByWithRelationInput
    include?: Prisma.aws_s3_bucketsInclude
  }): Promise<aws_s3_buckets[] | null> {
    const { skip, take, cursor, where, orderBy, include } = params
    return this.prisma.aws_s3_buckets.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    })
  }
}

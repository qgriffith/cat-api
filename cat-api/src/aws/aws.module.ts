import { Module } from '@nestjs/common'
import { AccountsController } from './accounts/accounts.controller'
import { AccountsService } from './accounts/accounts.service'
import { PrismaService } from 'src/services/prisma/prisma.service'
import { S3Service } from './s3/s3.service'
import { S3Controller } from './s3/s3.controller'
import { Route53Controller } from './route53/route53.controller'
import { Route53Service } from './route53/route53.service'
import { LoggerModule } from 'nestjs-pino'
import { ResourcesService } from './resources/resources.service';
import { ResourcesController } from './resources/resources.controller';
import { SubnetsController } from './subnets/subnets.controller';
import { SubnetsService } from './subnets/subnets.service';

@Module({
  controllers: [AccountsController, S3Controller, Route53Controller, ResourcesController, SubnetsController],
  providers: [AccountsService, PrismaService, S3Service, Route53Service, ResourcesService, SubnetsService],
  imports: [LoggerModule.forRoot(), AwsModule],
})

export class AwsModule {}

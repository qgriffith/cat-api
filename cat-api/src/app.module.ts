import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AwsModule } from './aws/aws.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [LoggerModule.forRoot(), ConfigModule.forRoot(), AwsModule],
})
export class AppModule {}

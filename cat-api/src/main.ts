import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './services/prisma/prisma.service'
import { Logger } from 'nestjs-pino'
import './utils/bigint_to_string'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.useLogger(app.get(Logger))
  await app.listen(process.env.PORT ?? 3000)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
}
bootstrap()

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { aws_accounts, aws_regions, Prisma } from '@prisma/client'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService, private readonly logger: PinoLogger) {
    this.logger.setContext(AccountsService.name)
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      this.logger.info(
        {
          query: event.query,
          duration: event.duration,
        },
        `AccountsService prisma query`
      )
      //console.log('Query: ' + event.query)
      //console.log('Duration: ' + event.duration + 'ms')
    })
  }

  async aws_account(
    accountWhereUniqueInput: Prisma.aws_accountsWhereUniqueInput
  ): Promise<aws_accounts | null> {
    return this.prisma.aws_accounts.findUnique({
      where: accountWhereUniqueInput,
    })
  }

  async aws_accounts(params: {
    skip?: number
    take?: number
    cursor?: Prisma.aws_accountsWhereUniqueInput
    where?: Prisma.aws_accountsWhereInput
    orderBy?: Prisma.aws_accountsOrderByWithRelationInput
  }): Promise<aws_accounts[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.aws_accounts.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async aws_account_region(params: {
    where?: Prisma.aws_regionsWhereInput
    orderBy?: Prisma.aws_regionsOrderByWithRelationInput
  }): Promise<aws_regions[]> {
    const { where, orderBy } = params
    return this.prisma.aws_regions.findMany({
      where,
      orderBy,
    })
  }

  async aws_account_findFirst(params: {
    where?: Prisma.aws_accountsWhereInput
  }): Promise<aws_accounts | null> {
    const { where } = params
    return this.prisma.aws_accounts.findFirst({
      where,
    })
  }
}

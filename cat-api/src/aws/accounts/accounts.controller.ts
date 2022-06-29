import { Controller, Get, Param } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { aws_accounts as AwsAccountModel, aws_regions as AwsRegionModel } from '@prisma/client'

@Controller('aws/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get('/')
  async getAllAccounts(): Promise<AwsAccountModel[]> {
    return this.accountService.aws_accounts({
      orderBy: { account_id: 'desc' },
    })
  }

  @Get('id/:id')
  async getAccountById(@Param('id') id: string): Promise<AwsAccountModel> {
    return this.accountService.aws_account({ account_id: String(id) })
  }

  @Get('alias/:alias')
  async getAccountByAlias(@Param('alias') alias: string): Promise<AwsAccountModel> {
    return this.accountService.aws_account_findFirst({
      where: {
        aliases: {
          equals: String(alias),
        },
      },
    })
  }

  @Get('/regions/:region')
  async getAWSAccountRegion(@Param('region') region: string): Promise<AwsRegionModel[]> {
    return this.accountService.aws_account_region({
      where: {
        AND: [{ region: String(region) }, { enabled: true }],
      },
    })
  }

  @Get('/type/gov')
  async getAWSAccountGov(): Promise<AwsRegionModel[]> {
    return this.accountService.aws_account_region({
      where: {
        AND: [{ partition: 'aws-us-gov' }, { enabled: true }],
      },
    })
  }

  @Get('/type/commercial')
  async getAWSAccountCom(): Promise<AwsRegionModel[]> {
    return this.accountService.aws_account_region({
      where: {
        AND: [{ partition: 'aws' }, { enabled: true }],
      },
    })
  }

  @Get('/regions/search/:query')
  async getAWSAccountRegionQuery(@Param('query') query: string): Promise<AwsRegionModel[]> {
    return this.accountService.aws_account_region({
      where: {
        AND: [{ region: { contains: String(query) } }, { enabled: true }],
      },
    })
  }
}

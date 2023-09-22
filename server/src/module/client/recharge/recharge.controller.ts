import { Controller, Get } from '@nestjs/common'
import { RechargeService } from './recharge.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsRechargeArrayVo } from '@/model/FsRecharge'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'

@Controller('client/recharge')
@ApiTags('客户端充值接口')
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}

  @Get()
  @Roles('client')
  @ApiOperation({ summary: '查询充值' })
  @ApiSuccess(FsRechargeArrayVo)
  async findAll() {
    return ApiResult.success<FsRechargeArrayVo>(
      await this.rechargeService.findAll()
    )
  }
}

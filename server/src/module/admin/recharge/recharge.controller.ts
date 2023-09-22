import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { RechargeService } from './recharge.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsRecharge, FsRechargeArrayVo, FsRechargeVo } from '@/model/FsRecharge'
import ApiResult from '@/utils/apiResult'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'

@Controller('admin/recharge')
@ApiTags('后台充值接口')
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询充值' })
  @ApiSuccess(FsRechargeArrayVo)
  async find() {
    return ApiResult.success<FsRechargeArrayVo>(
      await this.rechargeService.find()
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增充值' })
  @ApiSuccess(FsRechargeVo)
  async save(@Body() label: FsRecharge) {
    return ApiResult.success<FsRechargeVo>(
      await this.rechargeService.save(label)
    )
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除充值' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(
      await this.rechargeService.deleteById(id)
    )
  }
}

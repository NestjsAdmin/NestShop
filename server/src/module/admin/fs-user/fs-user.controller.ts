import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { FsUserService } from './fs-user.service'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsUser, FsUserPageVo } from '@/model/FsUser'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsUserQueryDto } from './dto/fs-user-query.dto'
import { ApiResultVo } from '@/common/vo/apiResult.vo'

@Controller('admin/fsUser')
@ApiTags('后台商城用户接口')
export class FsUserController {
  constructor(private readonly fsUserService: FsUserService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询商城用户' })
  @ApiSuccess(FsUserPageVo)
  async find(@Query() fsUserQueryDto: FsUserQueryDto) {
    return ApiResult.page<FsUserPageVo>(
      await this.fsUserService.findAll(fsUserQueryDto)
    )
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新商城用户' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() user: FsUser) {
    return ApiResult.default<ApiResultVo>(await this.fsUserService.update(user))
  }
}

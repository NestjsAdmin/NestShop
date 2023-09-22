import { Controller, Get, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import ApiResult from '@/utils/apiResult'
import { UserWxloginDto } from './dto/user-wxlogin.dto'
import { UserWxLoginVo } from './vo/user-wxlogin.vo'
import { FsUserVo } from '@/model/FsUser'
import { TokenDto } from '@/common/dto/token.dto'
import { Token } from '@/decorator/token.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { AdUser } from '@/model/AdUser'

@Controller('client/user')
@ApiTags('客户端用户接口')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('wxlogin')
  @ApiOperation({ summary: '获取微信小程序登录信息' })
  @ApiSuccess(UserWxLoginVo)
  async getWxlogin(@Query() userWxloginDto: UserWxloginDto) {
    const userWxLoginDataVo = await this.userService.getWxlogin(userWxloginDto)
    if (!userWxLoginDataVo?.user)
      return ApiResult.warning('微信小程序登录失败！')
    return ApiResult.success<UserWxLoginVo>(userWxLoginDataVo)
  }

  @Get()
  @Roles('client')
  @ApiOperation({ summary: '查询用户信息' })
  @ApiSuccess(FsUserVo)
  async findById(@Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<FsUserVo>(await this.userService.findById(user.id))
  }
}

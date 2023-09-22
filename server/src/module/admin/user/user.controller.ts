import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common'
import { UserService } from './user.service'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CaptchaVo } from './vo/captcha.vo'
import { UserPassDto } from './dto/user-pass.dto'
import { UserLoginVo } from './vo/user-login.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { AdUser, AdUserPageVo, AdUserVo } from '@/model/AdUser'
import { UserQueryDto } from '../user/dto/user-query.dto'
import { Roles } from '@/decorator/roles.decorator'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { TokenDto } from '@/common/dto/token.dto'
import { Token } from '@/decorator/token.decorator'

@Controller('admin/user')
@ApiTags('后台用户接口')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('captcha')
  @ApiOperation({ summary: '获取验证码' })
  @ApiSuccess(CaptchaVo)
  captcha() {
    return ApiResult.success<CaptchaVo>(this.userService.captcha())
  }

  @Get('login')
  @ApiOperation({ summary: '获取登录信息' })
  @ApiSuccess(UserLoginVo)
  async findByUserPass(
    @Query() { username, password, captcha, code }: UserPassDto
  ) {
    if (!this.userService.captchaVerify(captcha, code))
      return ApiResult.warning<UserLoginVo>('验证码不正确')
    const userLoginVo = await this.userService.findByUserPass(
      username,
      password
    )
    if (!userLoginVo.user) return ApiResult.warning('用户名或密码不正确')
    return ApiResult.success<UserLoginVo>(userLoginVo)
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询用户' })
  @ApiSuccess(AdUserPageVo)
  async findAll(
    @Token() { user }: TokenDto<AdUser>,
    @Query() userQueryDto: UserQueryDto
  ) {
    return ApiResult.page<AdUserPageVo>(
      await this.userService.findAll(user, userQueryDto)
    )
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: '查询用户' })
  @ApiSuccess(AdUserVo)
  async findById(@Param('id') id: number) {
    return ApiResult.success<AdUserVo>(await this.userService.findById(id))
  }

  @Get('myself')
  @Roles('admin')
  @ApiOperation({ summary: '查询自己' })
  @ApiSuccess(AdUserVo)
  async findMyself(@Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<AdUserVo>(await this.userService.findMyself(user))
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增用户' })
  @ApiSuccess(AdUserVo)
  async save(@Body() user: AdUser) {
    return ApiResult.success<AdUserVo>(await this.userService.save(user))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新用户' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() user: AdUser) {
    return ApiResult.default<ApiResultVo>(await this.userService.update(user))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除用户' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.userService.deleteById(id))
  }
}

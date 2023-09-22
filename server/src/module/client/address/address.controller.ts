import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { AddressService } from './address.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsAddress, FsAddressArrayVo, FsAddressVo } from '@/model/FsAddress'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { Token } from '@/decorator/token.decorator'
import { TokenDto } from '@/common/dto/token.dto'
import { AdUser } from '@/model/AdUser'

@Controller('client/address')
@ApiTags('客户端地址接口')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @Roles('client')
  @ApiOperation({ summary: '查询地址' })
  @ApiSuccess(FsAddressArrayVo)
  async find(@Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<FsAddressArrayVo>(
      await this.addressService.find(user.id)
    )
  }

  @Get(':id')
  @Roles('client')
  @ApiOperation({ summary: '查询地址' })
  @ApiSuccess(FsAddressArrayVo)
  async findById(@Param('id') id: number, @Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<FsAddressArrayVo>(
      await this.addressService.findById(user.id, id)
    )
  }

  @Post()
  @Roles('client')
  @ApiOperation({ summary: '新增地址' })
  @ApiSuccess(FsAddressVo)
  async save(@Body() address: FsAddress, @Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<FsAddressVo>(
      await this.addressService.save(user.id, address)
    )
  }

  @Put()
  @Roles('client')
  @ApiOperation({ summary: '更新地址' })
  @ApiSuccess(ApiResultVo)
  async update(
    @Body() address: FsAddress,
    @Token() { user }: TokenDto<AdUser>
  ) {
    return ApiResult.default<ApiResultVo>(
      await this.addressService.update(user.id, address)
    )
  }

  @Delete(':id')
  @Roles('client')
  @ApiOperation({ summary: '删除地址' })
  @ApiSuccess(ApiResultVo)
  async deleteById(
    @Param('id') id: number,
    @Token() { user }: TokenDto<AdUser>
  ) {
    return ApiResult.default<ApiResultVo>(
      await this.addressService.deleteById(user.id, id)
    )
  }
}

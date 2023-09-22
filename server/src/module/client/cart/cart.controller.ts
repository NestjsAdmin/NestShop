import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common'
import { CartService } from './cart.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { TokenDto } from '@/common/dto/token.dto'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { Token } from '@/decorator/token.decorator'
import ApiResult from '@/utils/apiResult'
import { CartArrayVo } from './vo/cart.vo'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { CartDto } from './dto/cart.dto'
import { FsUser } from '@/model/FsUser'

@Controller('client/cart')
@ApiTags('客户端购物车接口')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @Roles('client')
  @ApiOperation({ summary: '查询购物车' })
  @ApiSuccess(CartArrayVo)
  async find(
    @Token() { user }: TokenDto<FsUser>,
    @Query('storeId') storeId: number
  ) {
    return ApiResult.success<CartArrayVo>(
      await this.cartService.find(user.id, storeId)
    )
  }

  @Put()
  @Roles('client')
  @ApiOperation({ summary: '更新购物车' })
  @ApiSuccess(ApiResultVo)
  async update(@Token() { user }: TokenDto<FsUser>, @Body() cart: CartDto) {
    return ApiResult.default<ApiResultVo>(
      await this.cartService.update(user.id, cart)
    )
  }

  @Delete()
  @Roles('client')
  @ApiOperation({ summary: '删除购物车' })
  @ApiSuccess(ApiResultVo)
  async deleteById(
    @Query('goodsId') goodsId: number,
    @Query('storeId') storeId: number,
    @Token() { user }: TokenDto<FsUser>
  ) {
    return ApiResult.default<ApiResultVo>(
      await this.cartService.deleteById(user.id, goodsId, storeId)
    )
  }
}

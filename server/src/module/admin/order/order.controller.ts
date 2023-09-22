import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { OrderQueryDto } from './dto/order-query.dto'
import { OrderDetailPageVo } from './vo/order.vo'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { OrderDeliveryDto } from './dto/order-delivery.dto'
import { TokenDto } from '@/common/dto/token.dto'
import { Token } from '@/decorator/token.decorator'
import { AdUser } from '@/model/AdUser'
import { OrderRefuseDto } from './dto/order-refuse.dto'
import { OrderRefundDto } from './dto/order-refund.dto'

@Controller('admin/order')
@ApiTags('后台订单接口')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询订单' })
  @ApiSuccess(OrderDetailPageVo)
  async findAll(
    @Token() { user }: TokenDto<AdUser>,
    @Query() orderQueryDto: OrderQueryDto
  ) {
    return ApiResult.page<OrderDetailPageVo>(
      await this.orderService.findAll(user, orderQueryDto)
    )
  }

  @Patch('delivery')
  @Roles('admin')
  @ApiOperation({ summary: '开始配送' })
  @ApiSuccess(ApiResultVo)
  async delivery(@Body() orderDeliveryDto: OrderDeliveryDto) {
    return ApiResult.default(await this.orderService.delivery(orderDeliveryDto))
  }

  @Patch('receipt/:id')
  @Roles('admin')
  @ApiOperation({ summary: '确认收货' })
  @ApiSuccess(ApiResultVo)
  async receipt(@Param('id') id: number) {
    return ApiResult.default(await this.orderService.receipt(id))
  }

  @Patch('cancel/:id')
  @Roles('admin')
  @ApiOperation({ summary: '取消订单' })
  @ApiSuccess(ApiResultVo)
  async cancel(@Param('id') id: number) {
    return ApiResult.default(await this.orderService.cancel(id))
  }

  @Patch('refuse')
  @Roles('admin')
  @ApiOperation({ summary: '拒绝退款' })
  @ApiSuccess(ApiResultVo)
  async refuse(@Body() orderRefuse: OrderRefuseDto) {
    return ApiResult.default(await this.orderService.refuse(orderRefuse))
  }

  @Patch('refund')
  @Roles('admin')
  @ApiOperation({ summary: '确定退款' })
  @ApiSuccess(ApiResultVo)
  async refund(@Body() orderRefund: OrderRefundDto) {
    return ApiResult.default(await this.orderService.refund(orderRefund))
  }
}

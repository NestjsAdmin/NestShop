import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { TokenDto } from '@/common/dto/token.dto'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { Token } from '@/decorator/token.decorator'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { OrderTotalVo } from './vo/order-total.vo'
import { OrderQueryDto } from './dto/order-query.dto'
import { OrderDetailPageVo, OrderDetailVo, OrderWeixinVo } from './vo/order.vo'
import { OrderDto } from './dto/order.dto'
import { FsOrderVo } from '@/model/FsOrder'
import { FsUser } from '@/model/FsUser'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { OrderReceiptDto } from './dto/order-receipt.dto'
import { TimeVo } from './vo/time.vo'
import { OrderRefund } from './dto/order-refund.dto'
import { OrderChange } from './dto/order-change.dto'

@Controller('client/order')
@ApiTags('客户端订单接口')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('total')
  @Roles('client')
  @ApiOperation({ summary: '查询订单统计' })
  @ApiSuccess(OrderTotalVo)
  async getTotal(@Token() { user }: TokenDto<FsUser>) {
    return ApiResult.success<OrderTotalVo>(
      await this.orderService.getTotal(user.id)
    )
  }

  @Get()
  @Roles('client')
  @ApiOperation({ summary: '我的订单' })
  @ApiSuccess(OrderDetailPageVo)
  async findAll(
    @Token() { user }: TokenDto<FsUser>,
    @Query() orderQueryDto: OrderQueryDto
  ) {
    return ApiResult.page<OrderDetailPageVo>(
      await this.orderService.findAll(user.id, orderQueryDto)
    )
  }

  @Get(':orderNumber')
  @Roles('client')
  @ApiOperation({ summary: '查询订单' })
  @ApiSuccess(OrderDetailVo)
  async findOne(
    @Token() { user }: TokenDto<FsUser>,
    @Param('orderNumber') orderNumber: string
  ) {
    return ApiResult.success<OrderDetailVo>(
      await this.orderService.findOne(user.id, orderNumber)
    )
  }

  @Post()
  @Roles('client')
  @ApiOperation({ summary: '保存订单（商品）' })
  @ApiSuccess(FsOrderVo)
  async save(@Token() { user }: TokenDto<FsUser>, @Body() orderDto: OrderDto) {
    return ApiResult.success<FsOrderVo>(
      await this.orderService.save(user, orderDto)
    )
  }

  @Post('recharge/:rechargeId')
  @Roles('client')
  @ApiOperation({ summary: '保存订单（充值）' })
  @ApiSuccess(FsOrderVo)
  async recharge(
    @Token() { user }: TokenDto<FsUser>,
    @Param('rechargeId') rechargeId: number
  ) {
    return ApiResult.success<FsOrderVo>(
      await this.orderService.recharge(user, rechargeId)
    )
  }

  @Put('receipt')
  @Roles('client')
  @ApiOperation({ summary: '更新收货信息' })
  @ApiSuccess(FsOrderVo)
  async updateReceipt(
    @Token() { user }: TokenDto<FsUser>,
    @Body() orderReceiptDto: OrderReceiptDto
  ) {
    return ApiResult.success<FsOrderVo>(
      await this.orderService.updateReceipt(user.id, orderReceiptDto)
    )
  }

  @Put('cancel/:id')
  @Roles('client')
  @ApiOperation({ summary: '取消订单' })
  @ApiSuccess(ApiResultVo)
  async cancel(@Token() { user }: TokenDto<FsUser>, @Param('id') id: number) {
    return ApiResult.default(await this.orderService.cancel(user.id, id))
  }

  @Put('receipt/:id')
  @Roles('client')
  @ApiOperation({ summary: '确认收货' })
  @ApiSuccess(ApiResultVo)
  async receipt(@Token() { user }: TokenDto<FsUser>, @Param('id') id: number) {
    return ApiResult.default(await this.orderService.receipt(user.id, id))
  }

  @Put('balance/:id')
  @Roles('client')
  @ApiOperation({ summary: '支付订单（余额）' })
  @ApiSuccess(ApiResultVo)
  async balance(@Token() { user }: TokenDto<FsUser>, @Param('id') id: number) {
    return ApiResult.default(await this.orderService.balance(user.id, id))
  }

  @Put('weixin/:id')
  @Roles('client')
  @ApiOperation({ summary: '支付订单（微信）' })
  @ApiSuccess(OrderWeixinVo)
  async weixin(@Token() { user }: TokenDto<FsUser>, @Param('id') id: number) {
    return ApiResult.success<OrderWeixinVo>(
      await this.orderService.weixin(user, id)
    )
  }

  @Put('refund')
  @Roles('client')
  @ApiOperation({ summary: '申请退款' })
  @ApiSuccess(OrderWeixinVo)
  async refund(
    @Token() { user }: TokenDto<FsUser>,
    @Body() orderRefund: OrderRefund
  ) {
    return ApiResult.success<OrderWeixinVo>(
      await this.orderService.refund(user, orderRefund)
    )
  }

  @Put('cancelRefund/:id')
  @Roles('client')
  @ApiOperation({ summary: '取消退款' })
  @ApiSuccess(ApiResultVo)
  async cancelRefund(
    @Token() { user }: TokenDto<FsUser>,
    @Param('id') id: number
  ) {
    return ApiResult.default(await this.orderService.cancelRefund(user, id))
  }

  @Put('change')
  @Roles('client')
  @ApiOperation({ summary: '更改支付方式' })
  @ApiSuccess(ApiResultVo)
  async change(
    @Token() { user }: TokenDto<FsUser>,
    @Body() orderChange: OrderChange
  ) {
    return ApiResult.default(
      await this.orderService.change(user.id, orderChange)
    )
  }

  @Post('wxCallBack')
  @ApiOperation({ summary: '微信支付回调' })
  @ApiSuccess(ApiResultVo)
  async wxCallBack(@Body() { summary, resource }) {
    if (summary !== '支付成功') return ApiResult.success()
    return ApiResult.default(await this.orderService.wxCallBack(resource))
  }

  @Get('time/:storeId')
  @ApiOperation({ summary: '配送时间点' })
  @ApiSuccess(TimeVo)
  async time(@Param('storeId') storeId: number) {
    return ApiResult.success<TimeVo>(await this.orderService.time(storeId))
  }
}

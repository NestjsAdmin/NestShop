import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'
import { FsOrder } from '@/model/FsOrder'
import { FsOrderItem } from '@/model/FsOrderItem'
import { ApiProperty } from '@nestjs/swagger'

export class OrderAndItemVo {
  @ApiProperty({ description: '订单' })
  order: FsOrder

  @ApiProperty({ description: '订单商品', type: [FsOrderItem] })
  orderItem: FsOrderItem[]
}

export class OrderDetailVo extends ApiResultVo {
  @ApiProperty({ description: '订单详情' })
  data: OrderAndItemVo
}

export class OrderDetailPageVo extends ApiResultPageVo {
  @ApiProperty({ description: '订单详情', type: [OrderAndItemVo] })
  data: OrderAndItemVo[]
}

export class OrderWeixinVo extends ApiResultVo {
  @ApiProperty({ description: '微信支付回参' })
  data: {
    appId: string
    timestamp: string
    nonceStr: string
    package: string
    signType: string
  }
}

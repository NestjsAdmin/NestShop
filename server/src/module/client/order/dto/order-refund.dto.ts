import { ApiProperty } from '@nestjs/swagger'

export class OrderRefund {
  @ApiProperty({ description: '订单id' })
  orderId: number

  @ApiProperty({ description: '订单项目id', type: [Number] })
  orderItemIds: number[]

  @ApiProperty({ description: '退款图片（用,分割）' })
  refundImage: string

  @ApiProperty({ description: '退款原因' })
  refundReason: string
}

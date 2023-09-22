import { ApiProperty } from '@nestjs/swagger'

export class OrderChange {
  @ApiProperty({ description: '订单id' })
  orderId: number

  @ApiProperty({ description: '支付方式，如微信支付、现金支付、余额支付等' })
  payType: string
}

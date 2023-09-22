import { ApiProperty } from '@nestjs/swagger'

export class OrderRefundDto {
  @ApiProperty({ description: '订单id' })
  id: number

  @ApiProperty({ description: '退款金额' })
  refundPrice: number
}

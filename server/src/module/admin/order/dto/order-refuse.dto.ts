import { ApiProperty } from '@nestjs/swagger'

export class OrderRefuseDto {
  @ApiProperty({ description: '订单id' })
  id: number

  @ApiProperty({ description: '拒绝退款理由' })
  refundRefuse: string
}

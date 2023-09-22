import { ApiProperty } from '@nestjs/swagger'

export class OrderReceiptDto {
  @ApiProperty({ description: '订单id' })
  id: number

  @ApiProperty({ description: '收货人' })
  consignee: string

  @ApiProperty({ description: '地址' })
  address: string

  @ApiProperty({ description: '联系电话' })
  phone: string
}

import { ApiProperty } from '@nestjs/swagger'

export class OrderItem {
  @ApiProperty({ description: '商品id' })
  id: number

  @ApiProperty({ description: '商品数量' })
  number: number
}

export class OrderDto {
  @ApiProperty({ description: '门店id' })
  storeId: number

  @ApiProperty({ description: '收货人' })
  consignee: string

  @ApiProperty({ description: '地址' })
  address: string

  @ApiProperty({ description: '联系电话' })
  phone: string

  @ApiProperty({ description: '配送时间' })
  distributionTime: Date

  @ApiProperty({
    description: '支付方式，如微信支付、现金支付、余额支付、积分支付等',
  })
  payType: string

  @ApiProperty({ description: '送货方式，1门店配送、2到店自提、3第三方配送' })
  deliveryType: number

  @ApiProperty({
    description: '订单来源，1小程序商城、2人工收银台、3自助收银台',
  })
  origin: number

  @ApiProperty({ required: false, nullable: true, description: '订单备注' })
  mark: string

  @ApiProperty({ description: '订单项目', type: [OrderItem] })
  item: OrderItem[]
}

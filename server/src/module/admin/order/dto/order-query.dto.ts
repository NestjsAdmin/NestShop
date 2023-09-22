import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class OrderQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '关键字' })
  keyword: string

  @ApiProperty({
    required: false,
    nullable: true,
    description: '订单来源，1小程序商城、2人工收银台、3自助收银台',
  })
  origin: number

  @ApiProperty({ required: false, nullable: true, description: '是否已付款' })
  isPaid: boolean

  @ApiProperty({
    required: false,
    nullable: true,
    description:
      '订单状态，1待发货、2待收货、3已完成、4申请退款、5已退款、6已取消',
  })
  status: number

  @ApiProperty({ required: false, nullable: true, description: '开始时间' })
  startTime: Date

  @ApiProperty({ required: false, nullable: true, description: '结束时间' })
  endTime: Date

  @ApiProperty({ required: false, nullable: true, description: '门店id' })
  storeId: number

  @ApiProperty({
    required: false,
    nullable: true,
    description: '订单类型，1商品、2充值',
  })
  orderType: number
}

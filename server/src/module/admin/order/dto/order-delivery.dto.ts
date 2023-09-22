import { ApiProperty } from '@nestjs/swagger'

export class OrderDeliveryDto {
  @ApiProperty({ description: '订单id' })
  id: number

  @ApiProperty({ description: '配送员id' })
  dispatcherId: number

  @ApiProperty({ description: '配送员姓名' })
  dispatcherName: string
}

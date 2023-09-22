import { ApiProperty } from '@nestjs/swagger'

export class GoodsUpDto {
  @ApiProperty({ required: true, description: '商品id', type: [Number] })
  ids: number[]

  @ApiProperty({
    required: false,
    description: '状态，1上架、2下架',
  })
  status: number
}

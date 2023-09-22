import { ApiProperty } from '@nestjs/swagger'

export class GoodsLabelDto {
  @ApiProperty({ description: '商品id' })
  goodsId: number

  @ApiProperty({
    type: [Number],
    description: '标签id集合',
  })
  ids: number[]
}

import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class GoodsLabelQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string

  @ApiProperty({ description: '门店id' })
  storeId: number

  @ApiProperty({ required: false, nullable: true, description: '分类id' })
  cateId: number

  @ApiProperty({ required: true, nullable: true, description: '标签名称' })
  labelName: string

  @ApiProperty({
    required: false,
    nullable: true,
    description: '商品类型，0普通、1积分',
  })
  type: boolean

  @ApiProperty({
    required: false,
    nullable: true,
    description: '状态，1上架、2下架',
  })
  status: number
}

export class GoodsQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string

  @ApiProperty({ description: '门店id' })
  storeId: number

  @ApiProperty({ required: false, nullable: true, description: '分类id' })
  cateId: number

  @ApiProperty({
    required: false,
    nullable: true,
    description: '商品类型，0普通、1积分',
  })
  type: boolean

  @ApiProperty({
    required: false,
    nullable: true,
    description: '状态，1上架、2下架',
  })
  status: number

  @ApiProperty({
    required: false,
    nullable: true,
    description: '是否限制时段',
  })
  isLimitTime: boolean

  @ApiProperty({
    required: false,
    nullable: true,
    description: '销量排序',
  })
  salesSort: 'ASC' | 'DESC'

  @ApiProperty({
    required: false,
    nullable: true,
    description: '价格排序',
  })
  priceSort: 'ASC' | 'DESC'
}

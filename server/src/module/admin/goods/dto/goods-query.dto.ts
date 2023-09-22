import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class GoodsQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string

  @ApiProperty({ required: false, nullable: true, description: '条形码' })
  barcode: string

  @ApiProperty({ required: false, nullable: true, description: '分类id' })
  cateId: number

  @ApiProperty({ required: false, nullable: true, description: '是否售罄' })
  sellOut: boolean

  @ApiProperty({ required: false, nullable: true, description: '是否删除' })
  delFlag: number

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
    description: '门店id',
  })
  storeId: number
}

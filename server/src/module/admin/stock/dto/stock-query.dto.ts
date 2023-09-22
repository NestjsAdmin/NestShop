import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class StockQueryDto extends PageDto {
  @ApiProperty({ description: '商品id' })
  goodsId: number
}

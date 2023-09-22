import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class StoreQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string
}

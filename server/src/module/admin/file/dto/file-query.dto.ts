import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class FileQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true })
  keyword: string
}

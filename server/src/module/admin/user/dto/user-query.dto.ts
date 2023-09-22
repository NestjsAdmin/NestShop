import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UserQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true })
  keyword: string

  @ApiProperty({ required: false, nullable: true })
  status: number
}

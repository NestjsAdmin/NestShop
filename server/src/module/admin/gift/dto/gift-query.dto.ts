import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class GiftQueryDto extends PageDto {
  @ApiProperty({ description: '用户id' })
  userId: number
}

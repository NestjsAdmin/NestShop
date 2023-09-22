import { PageDto } from '@/common/dto/page.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RoleQueryDto extends PageDto {
  @ApiProperty({ required: false, nullable: true, description: '角色名称' })
  name: string
}

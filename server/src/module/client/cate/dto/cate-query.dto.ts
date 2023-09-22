import { ApiProperty } from '@nestjs/swagger'

export class CateQueryDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string

  @ApiProperty({
    required: false,
    nullable: true,
    description: '父id，留空为顶级分类',
  })
  pid: number
}

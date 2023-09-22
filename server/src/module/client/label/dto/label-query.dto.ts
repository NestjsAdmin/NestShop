import { ApiProperty } from '@nestjs/swagger'

export class LabelQueryDto {
  @ApiProperty({ required: false, nullable: true, description: '关键词' })
  keyword: string
}

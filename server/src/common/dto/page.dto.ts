import { ApiProperty } from '@nestjs/swagger'

export class PageDto {
  @ApiProperty({ required: false })
  page: number

  @ApiProperty({ required: false })
  pageSize: number
}

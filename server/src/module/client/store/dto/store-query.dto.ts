import { ApiProperty } from '@nestjs/swagger'

export class StoreQueryDto {
  @ApiProperty({ required: false, nullable: true, description: '关键字' })
  keyword: string

  @ApiProperty({ description: '经度' })
  lng: number

  @ApiProperty({ description: '纬度' })
  lat: number
}

export class StoreQueryDto2 {
  @ApiProperty({ required: false, nullable: true, description: '门店id' })
  id: number

  @ApiProperty({ description: '经度' })
  lng: number

  @ApiProperty({ description: '纬度' })
  lat: number
}

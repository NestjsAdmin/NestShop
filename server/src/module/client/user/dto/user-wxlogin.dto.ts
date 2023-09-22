import { ApiProperty } from '@nestjs/swagger'

export class UserWxloginDto {
  @ApiProperty({ description: '登录code' })
  loginCode: string

  @ApiProperty({ description: '电话code' })
  phoneCode: string
}

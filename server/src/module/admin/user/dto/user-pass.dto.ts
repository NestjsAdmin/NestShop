import { ApiProperty } from '@nestjs/swagger'

export class UserPassDto {
  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: string

  @ApiProperty({ description: '验证码' })
  captcha: string

  @ApiProperty({ description: '验证码code' })
  code: string
}

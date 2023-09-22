import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'

export class Captcha {
  @ApiProperty({ description: '验证码code', required: false })
  code: string

  @ApiProperty({ description: '验证码图片base64', required: false })
  img: string
}

export class CaptchaVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: Captcha
}

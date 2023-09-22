import { AdUser } from '@/model/AdUser'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'

export class UserLoginDataVo {
  @ApiProperty({ required: false })
  user: AdUser

  @ApiProperty({ required: false })
  token: string
}

export class UserLoginVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: UserLoginDataVo
}

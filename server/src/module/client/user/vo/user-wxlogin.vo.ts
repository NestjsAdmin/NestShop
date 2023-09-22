import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'
import { FsUser } from '@/model/FsUser'

export class UserWxLoginDataVo {
  @ApiProperty({ required: false })
  user: FsUser

  @ApiProperty({ required: false })
  token: string
}

export class UserWxLoginVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: UserWxLoginDataVo
}

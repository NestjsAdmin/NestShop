import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'

export class Time {
  [key: string]: string[]
}

export class TimeVo extends ApiResultVo {
  @ApiProperty({ description: '时间点数据' })
  data: Time
}

import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'

export class FileVo extends ApiResultVo {
  @ApiProperty({ description: 'url 数组' })
  data: [string]
}

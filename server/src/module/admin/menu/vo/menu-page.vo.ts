import { ApiResultPageVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'
import { MenuVo } from './menu.vo'

export class MenuPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [MenuVo], required: false })
  data: MenuVo[]
}

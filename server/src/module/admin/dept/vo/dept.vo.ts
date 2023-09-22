import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { AdDept } from '@/model/AdDept'
import { ApiProperty } from '@nestjs/swagger'

export class DeptVo extends AdDept {
  @ApiProperty({ description: '子节点', type: [DeptVo], required: false })
  children: DeptVo[]
}

export class DeptPageVo extends ApiResultVo {
  @ApiProperty({ type: [DeptVo], required: false })
  data: DeptVo[]
}

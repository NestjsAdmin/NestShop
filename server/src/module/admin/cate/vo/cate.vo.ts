import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { FsGoodsCate } from '@/model/FsGoodsCate'
import { ApiProperty } from '@nestjs/swagger'

export class CateVo extends FsGoodsCate {
  @ApiProperty({ description: '子节点', type: [CateVo], required: false })
  children: CateVo[]
}

export class CatePageVo extends ApiResultVo {
  @ApiProperty({ type: [CateVo], required: false })
  data: CateVo[]
}

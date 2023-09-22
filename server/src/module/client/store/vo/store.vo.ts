import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { FsStore } from '@/model/FsStore'
import { ApiProperty } from '@nestjs/swagger'

export class Store extends FsStore {
  @ApiProperty({ description: '距离' })
  distance: number
}

export class StorePageVo extends ApiResultVo {
  @ApiProperty({ description: '门店数据', type: [Store] })
  data: Store[]
}

export class StoreVo extends ApiResultVo {
  @ApiProperty({ description: '门店数据' })
  data: Store
}

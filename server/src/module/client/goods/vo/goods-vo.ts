import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'
import { FsGoods } from '@/model/FsGoods'
import { FsGoodsLabel } from '@/model/FsGoodsLabel'
import { ApiProperty } from '@nestjs/swagger'

export class Goods {
  @ApiProperty({ description: '商品信息' })
  goods: FsGoods

  @ApiProperty({ description: '标签信息', type: [FsGoodsLabel] })
  label: FsGoodsLabel[]
}

export class GoodsVo extends ApiResultVo {
  @ApiProperty({ description: '商品信息' })
  data: Goods
}

export class GoodsArrayVo extends ApiResultPageVo {
  @ApiProperty({ description: '商品信息', type: [Goods] })
  data: Goods[]
}

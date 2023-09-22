import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { FsGoods } from '@/model/FsGoods'
import { ApiProperty } from '@nestjs/swagger'

export class CartVo extends FsGoods {
  @ApiProperty({ description: '商品数量', required: false })
  number: number

  @ApiProperty({
    description: '标签',
    required: false,
  })
  label: string[]
}

export class CartArrayVo extends ApiResultVo {
  @ApiProperty({ description: '购物车数据', required: false, type: [CartVo] })
  data: CartVo[]
}

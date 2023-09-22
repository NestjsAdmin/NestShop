import { FsCart } from '@/model/FsCart'
import { ApiProperty } from '@nestjs/swagger'

export class CartDto {
  @ApiProperty({ description: '购物车数据', required: false, type: [FsCart] })
  cart: FsCart[]
}

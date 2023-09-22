import { FsCart } from '@/model/FsCart'
import { FsGoods } from '@/model/FsGoods'
import { FsGoodsLabel } from '@/model/FsGoodsLabel'
import { FsLabelGoods } from '@/model/FsLabelGoods'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CartDto } from './dto/cart.dto'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(FsCart) private cartModel: Repository<FsCart>,
    @InjectRepository(FsGoods) private goodsModel: Repository<FsGoods>,
    @InjectRepository(FsLabelGoods)
    private labelGoodsModel: Repository<FsLabelGoods>,
    @InjectRepository(FsGoodsLabel)
    private labelModel: Repository<FsGoodsLabel>
  ) {}

  async find(userId: number, storeId: number) {
    const cart = await this.cartModel.find({
      where: {
        userId,
        storeId,
        delFlag: false,
      },
    })

    const goods = await this.goodsModel.findBy({
      id: In(cart.map((item) => item.goodsId)),
      delFlag: false,
    })

    const labelGoods = await this.labelGoodsModel.findBy({
      goodsId: In(goods.map((item) => item.id)),
      delFlag: false,
    })

    const label = await this.labelModel.findBy({
      id: In(labelGoods.map((item) => item.labelId)),
      delFlag: false,
    })

    return goods.map((g) => {
      return {
        ...g,
        number: cart.find((c) => c.goodsId === g.id).number,
        label: label
          .filter((l) =>
            labelGoods.some((lg) => lg.labelId === l.id && lg.goodsId === g.id)
          )
          .map((l) => l.name),
      }
    })
  }

  async update(userId: number, cart: CartDto) {
    let index = 0
    for (const item of cart.cart) {
      const c = await this.cartModel.findOne({
        where: {
          userId,
          goodsId: item.goodsId,
          delFlag: false,
        },
      })
      if (c) {
        c.number = cart.cart[index].number
        cart.cart[index] = c
      }
      item.userId = userId
      index++
    }
    return !!(await this.cartModel.save(cart.cart))
  }

  async deleteById(userId: number, goodsId: number, storeId: number) {
    // const result = await this.cartModel.delete({
    //   userId,
    //   goodsId,
    //   storeId,
    // })
    const result = await OrmUtils.softDeletion(this.cartModel, {
      userId,
      goodsId,
      storeId,
    })
    return result.affected > 0
  }
}

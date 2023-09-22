import { FsGoods } from '@/model/FsGoods'
import { SqlTools } from '@/utils/sqlTools'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, MoreThan, Repository } from 'typeorm'
import { GoodsQueryDto } from './dto/goods-query.dto'
import { GoodsLabelDto } from './dto/goods-label.dto'
import { FsLabelGoods } from '@/model/FsLabelGoods'
import { AdUser } from '@/model/AdUser'
import { FsStore } from '@/model/FsStore'
import ApiResult from '@/utils/apiResult'
import { GoodsUpDto } from './dto/goods-up.dto'
import OrmUtils from '@/utils/OrmUtils'
@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(FsGoods) private goodsModel: Repository<FsGoods>,
    @InjectRepository(FsLabelGoods)
    private labelGoodsModel: Repository<FsLabelGoods>,
    @InjectRepository(FsStore)
    private storeModel: Repository<FsStore>,
    private dataSource: DataSource
  ) {}

  async findAll(user: AdUser, goodsQueryDto: GoodsQueryDto) {
    const condition = {
      where: [{}],
    }
    if (user.roleName !== '系统管理员') {
      const store = await this.storeModel.findOne({
        where: {
          delFlag: false,
          userId: user.id,
        },
        order: {
          createAt: 'DESC',
        },
      })
      if (!store) ApiResult.throw(400, '该用户没有任何门店！')
      condition.where[0] = {
        ...condition.where[0],
        storeId: store.id,
      }
    }
    // condition.where.push({
    //   ...condition.where[0],
    //   delete: 0,
    // })
    condition.where[0] = {
      ...condition.where[0],
      delFlag: false,
    }
    // condition.where[0] = {
    //   ...condition.where[0],
    //   delete: 0,
    // }
    if (goodsQueryDto.barcode) {
      condition.where[0] = {
        ...condition.where[0],
        barcode: goodsQueryDto.barcode,
      }
    }

    if (goodsQueryDto.keyword) {
      condition.where[0] = {
        ...condition.where[0],
        name: Like(`%${goodsQueryDto.keyword}%`),
      }
      condition.where.push({
        introduction: Like(`%${goodsQueryDto.keyword}%`),
      })
    }
    if (goodsQueryDto.status) {
      condition.where[0] = {
        ...condition.where[0],
        status: goodsQueryDto.status,
      }
    }
    if (goodsQueryDto.cateId)
      condition.where[0] = {
        ...condition.where[0],
        cateId: goodsQueryDto.cateId,
      }
    if (goodsQueryDto.type)
      condition.where[0] = {
        ...condition.where[0],
        type: goodsQueryDto.type,
      }
    if (goodsQueryDto.storeId)
      condition.where[0] = {
        ...condition.where[0],
        storeId: goodsQueryDto.storeId,
      }
    if (goodsQueryDto.sellOut.toString() === 'true') {
      condition.where[0] = {
        ...condition.where[0],
        stock: 0,
      }
    } else {
      condition.where[0] = {
        ...condition.where[0],
        stock: MoreThan(0),
      }
    }
    condition.where[0] = {
      ...condition.where[0],
      delFlag: false,
    }
    return await SqlTools.findToPage<FsGoods>(
      this.goodsModel,
      goodsQueryDto,
      condition
    )
  }

  save(goods: FsGoods): any {
    return this.goodsModel.save(goods)
  }

  saveMany(goods: FsGoods[]): any {
    return this.goodsModel.save(goods)
  }

  getLabelGoods(id: number) {
    return this.labelGoodsModel.find({
      where: {
        delFlag: false,
        goodsId: id,
      },
    })
  }

  async saveLabelGoods(goodsLabelDto: GoodsLabelDto) {
    let labelGoodsModels: FsLabelGoods[] = []
    let result = false
    await this.dataSource.transaction(async (manager) => {
      manager.withRepository(this.labelGoodsModel).delete({
        goodsId: goodsLabelDto.goodsId,
      })
      labelGoodsModels = [...new Set(goodsLabelDto.ids)].map((labelId) => {
        const labelGoodsModel = new FsLabelGoods()
        labelGoodsModel.goodsId = goodsLabelDto.goodsId
        labelGoodsModel.labelId = labelId
        return labelGoodsModel
      })
      result = !!(await manager.save(labelGoodsModels))
    })
    return result
  }

  async update(goods: FsGoods) {
    const result = await this.goodsModel.update(goods.id, goods)
    return result.affected > 0
  }

  async deleteById(id: number) {
    const result = await OrmUtils.softDeletion(this.goodsModel, { id })
    return result.affected > 0
    // const result = await this.goodsModel.update(id, {
    //   deleteId: 0,
    // })
    // const result = await this.goodsModel.delete(id)
  }
  //上下架
  async up(goodsUpDto: GoodsUpDto) {
    const result = await this.goodsModel.update(goodsUpDto.ids, {
      status: goodsUpDto.status,
    })
    return result.affected > 0
  }
}

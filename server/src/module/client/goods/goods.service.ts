import { FsGoods } from '@/model/FsGoods'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, MoreThan, Repository, DataSource } from 'typeorm'
import { GoodsLabelQueryDto, GoodsQueryDto } from './dto/goods-query.dto'
import { FsGoodsLabel } from '@/model/FsGoodsLabel'
import { SqlTools } from '@/utils/sqlTools'
import { FsLabelGoods } from '@/model/FsLabelGoods'
import { Goods } from './vo/goods-vo'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(FsGoods) private goodsModel: Repository<FsGoods>,
    @InjectRepository(FsGoodsLabel)
    private labelModel: Repository<FsGoodsLabel>,
    @InjectRepository(FsLabelGoods)
    private labelgoodsModel: Repository<FsLabelGoods>,
    private dataSource: DataSource
  ) {}
  async findAll(goodsQueryDto: GoodsQueryDto) {
    let sql = 'select fg.* from fs_goods fg'
    const condition = {
      where: [
        {
          stock: MoreThan(0),
        } as any,
      ],
      order: {
        createAt: 'DESC',
        limitStartTime: 'ASC',
      } as any,
    }
    if (goodsQueryDto.cateId) {
      sql +=
        ' join ( SELECT DISTINCT fgg.id FROM fs_goods_cate fg JOIN fs_goods_cate fgg ON fg.id = fgg.pid WHERE fg.id = ' +
        goodsQueryDto.cateId +
        ' or fgg.id = ' +
        goodsQueryDto.cateId +
        ' ) t on fg.cateId=t.id'
    }
    if (goodsQueryDto.storeId) {
      sql += ' where fg.storeId = ' + goodsQueryDto.storeId
    }
    if (goodsQueryDto.priceSort) condition.order.price = goodsQueryDto.priceSort
    if (goodsQueryDto.salesSort) condition.order.sales = goodsQueryDto.salesSort
    if (goodsQueryDto.keyword) {
      sql += ' and fg.name like %' + goodsQueryDto.keyword + '%'
    }
    if (goodsQueryDto.status) {
      sql += ' and fg.status = ' + goodsQueryDto.status
    }
    if (goodsQueryDto.type) {
      sql += ' and fg.type = ' + goodsQueryDto.type
    }
    if (goodsQueryDto.isLimitTime) {
      sql += ' and fg.isLimitTime = ' + goodsQueryDto.isLimitTime
    }
    sql += ` limit  ${(goodsQueryDto.page - 1) * goodsQueryDto.pageSize},${
      goodsQueryDto.pageSize
    }`
    const list = await this.dataSource.query(sql)
    const pageResult = await SqlTools.findToPage<FsGoods>(
      this.goodsModel,
      goodsQueryDto,
      condition
    )

    const gs: Goods[] = []
    for (const goods of list) {
      // console.log(">>>>>>>>",goods)
      const labelgoods = await this.labelgoodsModel.find({
        where: {
          goodsId: goods.id,
        },
      })
      const label = await this.labelModel.findBy({
        id: In(labelgoods.map((item) => item.labelId)),
      })
      const g = new Goods()
      g.goods = goods
      g.label = label
      gs.push(g)
    }
    return {
      data: gs,
      page: goodsQueryDto.page,
      pageSize: goodsQueryDto.pageSize,
      totalCount: pageResult.totalCount,
    }
  }

  async findById(id: number) {
    const goods = await this.goodsModel.findOne({
      where: { id },
    })
    const labelgoods = await this.labelgoodsModel.find({
      where: {
        goodsId: goods.id,
      },
    })
    const label = await this.labelModel.findBy({
      id: In(labelgoods.map((item) => item.labelId)),
    })
    const g = new Goods()
    g.goods = goods
    g.label = label
    return g
  }

  async findByLabel(goodsQueryDto: GoodsLabelQueryDto) {
    goodsQueryDto.page = goodsQueryDto.page || 1
    goodsQueryDto.pageSize = goodsQueryDto.pageSize || 10

    const labels = await this.labelModel.find({
      where: {
        name: goodsQueryDto.labelName,
      },
    })

    const labelGoods = await this.labelgoodsModel.findBy({
      labelId: In(labels.map((item) => item.id)),
    })

    const condition = {
      where: [
        {
          id: In(labelGoods.map((item) => item.goodsId)),
          stock: MoreThan(0),
        },
      ],
      order: {
        createAt: 'DESC',
        sort: 'ASC',
      },
    } as any

    if (goodsQueryDto.keyword) {
      condition.where[0] = {
        ...condition.where[0],
        name: Like(`%${goodsQueryDto.keyword}%`),
      }
      condition.where.push({ introduction: Like(`%${goodsQueryDto.keyword}%`) })
    }
    if (goodsQueryDto.status) {
      condition.where[0] = {
        ...condition.where[0],
        status: goodsQueryDto.status,
      }
    }
    if (goodsQueryDto.type)
      condition.where[0] = {
        ...condition.where[0],
        type: goodsQueryDto.type,
      }
    if (goodsQueryDto.cateId)
      condition.where[0] = {
        ...condition.where[0],
        cateId: goodsQueryDto.cateId,
      }
    if (goodsQueryDto.storeId)
      condition.where[0] = {
        ...condition.where[0],
        storeId: goodsQueryDto.storeId,
      }

    const pageResult = await SqlTools.findToPage<FsGoods>(
      this.goodsModel,
      goodsQueryDto,
      condition
    )

    const gs: Goods[] = []
    for (const goods of pageResult.data) {
      const labelgoods = await this.labelgoodsModel.find({
        where: {
          goodsId: goods.id,
        },
      })
      const label = await this.labelModel.findBy({
        id: In(labelgoods.map((item) => item.labelId)),
      })
      const g = new Goods()
      g.goods = goods
      g.label = label
      gs.push(g)
    }

    return {
      data: gs,
      page: pageResult.page,
      pageSize: pageResult.pageSize,
      totalCount: pageResult.totalCount,
    }
  }
}

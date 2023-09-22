import { FsStock } from '@/model/FsStock'
import { SqlTools } from '@/utils/sqlTools'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { StockQueryDto } from './dto/stock-query.dto'
import { FsGoods } from '@/model/FsGoods'
import * as math from 'mathjs'
import ApiResult from '@/utils/apiResult'

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(FsStock) private stockModel: Repository<FsStock>,
    @InjectRepository(FsGoods) private goodsModel: Repository<FsGoods>,
    private dataSource: DataSource
  ) {}

  async findAll(stockQueryDto: StockQueryDto) {
    const condition = {
      where: {
        delFlag: false,
        goodsId: stockQueryDto.goodsId,
      },
    }
    return await SqlTools.findToPage<FsStock>(
      this.stockModel,
      stockQueryDto,
      condition
    )
  }

  async save(stock: FsStock) {
    const goods = await this.goodsModel.findOne({
      where: {
        delFlag: false,
        id: stock.goodsId,
      },
    })
    if (stock.type === 1 && stock.number > goods.stock)
      ApiResult.throw(400, '库存不足，出货失败！')
    if (stock.type === 1) goods.stock = math.subtract(goods.stock, stock.number)
    if (stock.type === 0) goods.stock = math.add(goods.stock, stock.number)
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([
        manager.save(goods),
        manager.withRepository(this.stockModel).save(stock),
      ])
    })
    return true
  }
}

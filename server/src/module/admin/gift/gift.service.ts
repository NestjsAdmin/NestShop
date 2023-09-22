import { FsGift } from '@/model/FsGift'
import { FsUser } from '@/model/FsUser'
import { SqlTools } from '@/utils/sqlTools'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { GiftQueryDto } from './dto/gift-query.dto'
import * as math from 'mathjs'

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(FsGift) private giftModel: Repository<FsGift>,
    @InjectRepository(FsUser) private userModel: Repository<FsUser>,
    private dataSource: DataSource
  ) {}

  async findAll(giftQueryDto: GiftQueryDto) {
    const condition = {
      where: {
        delFlag: false,
        userId: giftQueryDto.userId,
      },
    }
    const pageData = await SqlTools.findToPage<FsGift>(
      this.giftModel,
      giftQueryDto,
      condition
    )
    return pageData
  }

  async save(gift: FsGift) {
    const user = await this.userModel.findOne({
      where: {
        delFlag: false,
        id: gift.userId,
      },
    })
    user.balance = math
      .add(Number(user.balance), Number(gift.balance))
      .toString()
    user.integral = math.add(Number(user.integral), Number(gift.integral))
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([
        manager.save(user),
        manager.withRepository(this.giftModel).save(gift),
      ])
    })
    return true
  }
}

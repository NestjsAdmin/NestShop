import { FsStore } from '@/model/FsStore'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { StoreQueryDto, StoreQueryDto2 } from './dto/store-query.dto'
import { getDistance } from '@/utils/tools'

@Injectable()
export class StoreService {
  @InjectRepository(FsStore) private storeModel: Repository<FsStore>

  async findAll(storeQueryDto: StoreQueryDto) {
    const condition = storeQueryDto.keyword
      ? {
          where: [
            {
              name: Like(`%${storeQueryDto.keyword}%`),
              delFlag: false,
            },
            {
              introduction: Like(`%${storeQueryDto.keyword}%`),
              delFlag: false,
            },
            {
              addressDetail: Like(`%${storeQueryDto.keyword}%`),
              delFlag: false,
            },
            {
              communityName: Like(`%${storeQueryDto.keyword}%`),
              delFlag: false,
            },
          ],
        }
      : {}
    const store = await this.storeModel.find(condition)
    const result = store.map((item) => {
      return {
        ...item,
        distance: getDistance(
          storeQueryDto.lat,
          storeQueryDto.lng,
          item.latitude,
          item.longitude
        ),
      }
    })
    return result.sort((a, b) => a.distance - b.distance)
  }

  async findById(storeQueryDto: StoreQueryDto2) {
    const where = {} as any
    if (storeQueryDto.id) where.id = storeQueryDto.id
    where.delFlag = false
    const result = (
      await this.storeModel.find({
        where,
      })
    ).map((item) => {
      return {
        ...item,
        distance: getDistance(
          storeQueryDto.lat,
          storeQueryDto.lng,
          item.latitude,
          item.longitude
        ),
      }
    })
    if (result.length === 0) return {}
    return result.sort((a, b) => a.distance - b.distance)[0]
  }
}

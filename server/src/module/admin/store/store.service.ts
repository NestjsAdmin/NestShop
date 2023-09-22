import { FsStore } from '@/model/FsStore'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { StoreQueryDto } from './dto/store-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import { AdUser } from '@/model/AdUser'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(FsStore) private storeModel: Repository<FsStore>
  ) {}

  async findAll(user: AdUser, storeQueryDto: StoreQueryDto) {
    const condition = {
      where: [
        {
          delFlag: false,
          name: Like(`%${storeQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          address: Like(`%${storeQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          addressDetail: Like(`%${storeQueryDto.keyword}%`),
        },
      ] as any,
      order: {
        createAt: 'DESC',
      },
    }
    if (user.roleName !== '系统管理员') {
      condition.where[0] = {
        ...condition.where[0],
        userId: user.id,
      }
    }
    return await SqlTools.findToPage<FsStore>(
      this.storeModel,
      storeQueryDto,
      condition
    )
  }

  save(store: FsStore) {
    this.storeModel.save(store)
  }

  async update(store: FsStore) {
    const result = await this.storeModel.update(store.id, store)
    return result.affected > 0
  }

  async deleteById(id: number) {
    // const result = await this.storeModel.delete(id)
    const result = await OrmUtils.softDeletion(this.storeModel, { id })
    return result.affected > 0
  }
}

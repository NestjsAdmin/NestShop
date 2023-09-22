import { FsGoodsCate } from '@/model/FsGoodsCate'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CateVo } from './vo/cate.vo'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class CateService {
  constructor(
    @InjectRepository(FsGoodsCate) private cateModel: Repository<FsGoodsCate>
  ) {}

  async find() {
    const cates: FsGoodsCate[] = await this.findAll()
    const arrayToTree = (
      arr: FsGoodsCate[],
      parent?: CateVo
    ): CateVo[] | CateVo => {
      const result: CateVo[] = []
      arr.forEach((item: CateVo) => {
        const hasParent = !parent && !item.pid
        const notParent = parent && item.pid === parent.id
        if (hasParent || notParent) {
          result.push(arrayToTree(arr, item) as CateVo)
        }
      })
      if (parent) {
        parent.children = result
        return parent
      }
      return result
    }
    return arrayToTree(cates)
  }

  findAll() {
    return this.cateModel.find({
      where: {
        delFlag: false,
      },
      order: {
        createAt: 'ASC',
      },
    })
  }

  save(cate: FsGoodsCate) {
    return this.cateModel.save(cate)
  }

  async update(cate: FsGoodsCate) {
    const result = await this.cateModel.update(cate.id, cate)
    return result.affected > 0
  }

  async deleteById(id: number) {
    // const result = await this.cateModel.delete(id)
    const result = await OrmUtils.softDeletion(this.cateModel, { id })
    return result.affected > 0
  }
}

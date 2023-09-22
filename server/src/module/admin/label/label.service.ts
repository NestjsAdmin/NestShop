import { FsGoodsLabel } from '@/model/FsGoodsLabel'
import { Injectable } from '@nestjs/common'
import { LabelQueryDto } from './dto/label-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(FsGoodsLabel) private labelModel: Repository<FsGoodsLabel>
  ) {}

  async findAll(labelQueryDto: LabelQueryDto) {
    const condition = {
      where: [],
      order: {
        createAt: 'DESC',
      },
    }
    if (labelQueryDto.keyword)
      condition.where.push({
        delFlag: false,
        name: Like(`%${labelQueryDto.keyword}%`),
      })
    return await SqlTools.findToPage<FsGoodsLabel>(
      this.labelModel,
      labelQueryDto,
      condition
    )
  }

  save(label: FsGoodsLabel) {
    return this.labelModel.save(label)
  }

  async deleteById(id: number) {
    // const result = await this.labelModel.delete(id)
    const result = await OrmUtils.softDeletion(this.labelModel, { id })
    return result.affected > 0
  }
}

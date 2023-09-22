import { FsGoodsCate } from '@/model/FsGoodsCate'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Like, Repository } from 'typeorm'
import { CateQueryDto } from './dto/cate-query.dto'

@Injectable()
export class CateService {
  constructor(
    @InjectRepository(FsGoodsCate) private cateModel: Repository<FsGoodsCate>
  ) {}

  find(cateQueryDto: CateQueryDto) {
    const where = {} as any
    if (cateQueryDto.keyword) where.name = Like(`%${cateQueryDto.keyword}%`)
    if (cateQueryDto.pid) where.pid = cateQueryDto.pid
    else where.pid = IsNull()
    where.isShow = 1
    where.delFlag = false
    return this.cateModel.find({
      where,
    })
  }
}

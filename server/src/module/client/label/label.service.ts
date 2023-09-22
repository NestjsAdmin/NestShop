import { FsGoodsLabel } from '@/model/FsGoodsLabel'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { LabelQueryDto } from './dto/label-query.dto'

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(FsGoodsLabel) private labelModel: Repository<FsGoodsLabel>
  ) {}

  async findAll(labelQueryDto: LabelQueryDto) {
    const condition = {
      where: [
        {
          name: Like(`%${labelQueryDto.keyword}%`),
          delFlag: false,
        },
      ],
    }
    return this.labelModel.find(condition)
  }
}

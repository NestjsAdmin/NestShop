import { FsSwiper } from '@/model/FsSwiper'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class SwiperService {
  constructor(
    @InjectRepository(FsSwiper) private swiperModel: Repository<FsSwiper>
  ) {}

  findAll() {
    return OrmUtils.createQueryBuilder(this.swiperModel)
      .orderBy('sort', 'ASC')
      .getMany()
  }
}

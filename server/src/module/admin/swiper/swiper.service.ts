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
    return this.swiperModel.find({
      where: {
        delFlag: false,
      },
      order: {
        createAt: 'DESC',
      },
    })
  }

  save(swiper: FsSwiper) {
    return this.swiperModel.save(swiper)
  }

  update(swiper: FsSwiper) {
    return this.swiperModel.save(swiper)
  }

  async deleteById(id: number) {
    // const result = await this.swiperModel.delete(id)
    const result = await OrmUtils.softDeletion(this.swiperModel, { id })
    return result.affected > 0
  }
}

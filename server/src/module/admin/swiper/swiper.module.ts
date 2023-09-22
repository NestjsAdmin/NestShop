import { Module } from '@nestjs/common'
import { SwiperService } from './swiper.service'
import { SwiperController } from './swiper.controller'

@Module({
  controllers: [SwiperController],
  providers: [SwiperService],
})
export class SwiperModule {}

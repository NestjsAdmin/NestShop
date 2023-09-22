import { Controller, Get } from '@nestjs/common'
import { SwiperService } from './swiper.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import { FsSwiperArrayVo } from '@/model/FsSwiper'
import ApiResult from '@/utils/apiResult'

@Controller('client/swiper')
@ApiTags('客户端轮播图接口')
export class SwiperController {
  constructor(private readonly swiperService: SwiperService) {}

  @Get()
  @ApiOperation({ summary: '查询轮播图' })
  @ApiSuccess(FsSwiperArrayVo)
  async find() {
    return ApiResult.success<FsSwiperArrayVo>(
      await this.swiperService.findAll()
    )
  }
}

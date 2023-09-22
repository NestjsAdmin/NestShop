import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SwiperService } from './swiper.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsSwiper, FsSwiperArrayVo, FsSwiperVo } from '@/model/FsSwiper'
import ApiResult from '@/utils/apiResult'
import { ApiResultVo } from '@/common/vo/apiResult.vo'

@Controller('admin/swiper')
@ApiTags('后台轮播图接口')
export class SwiperController {
  constructor(private readonly swiperService: SwiperService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询轮播图' })
  @ApiSuccess(FsSwiperArrayVo)
  async find() {
    return ApiResult.success<FsSwiperArrayVo>(
      await this.swiperService.findAll()
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增轮播图' })
  @ApiSuccess(FsSwiperVo)
  async save(@Body() swiper: FsSwiper) {
    return ApiResult.success<FsSwiperVo>(await this.swiperService.save(swiper))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '编辑轮播图' })
  @ApiSuccess(FsSwiperVo)
  async update(@Body() swiper: FsSwiper) {
    return ApiResult.success<FsSwiperVo>(await this.swiperService.save(swiper))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除轮播图' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(
      await this.swiperService.deleteById(id)
    )
  }
}

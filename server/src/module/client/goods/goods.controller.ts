import { Controller, Get, Param, Query } from '@nestjs/common'
import { GoodsService } from './goods.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import ApiResult from '@/utils/apiResult'
import { GoodsLabelQueryDto, GoodsQueryDto } from './dto/goods-query.dto'
import { GoodsArrayVo, GoodsVo } from './vo/goods-vo'

@Controller('client/goods')
@ApiTags('客户端商品接口')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  @ApiOperation({ summary: '查询商品' })
  @ApiSuccess(GoodsArrayVo)
  async find(@Query() goodsQueryDto: GoodsQueryDto) {
    return ApiResult.page<GoodsArrayVo>(
      await this.goodsService.findAll(goodsQueryDto)
    )
  }

  @Get(':id')
  @ApiOperation({ summary: '查询商品' })
  @ApiSuccess(GoodsVo)
  async findById(@Param('id') id: number) {
    return ApiResult.success<GoodsVo>(await this.goodsService.findById(id))
  }

  @Get('label')
  @ApiOperation({ summary: '查询商品通过标签' })
  @ApiSuccess(GoodsArrayVo)
  async findByLabel(@Query() goodsQueryDto: GoodsLabelQueryDto) {
    return ApiResult.page<GoodsArrayVo>(
      await this.goodsService.findByLabel(goodsQueryDto)
    )
  }
}

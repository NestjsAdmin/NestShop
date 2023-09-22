import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { GoodsService } from './goods.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsGoodsPageVo, FsGoodsVo, FsGoods } from '@/model/FsGoods'
import ApiResult from '@/utils/apiResult'
import { GoodsQueryDto } from './dto/goods-query.dto'
import { GoodsLabelDto } from './dto/goods-label.dto'
import { FsLabelGoodsArrayVo } from '@/model/FsLabelGoods'
import { TokenDto } from '@/common/dto/token.dto'
import { Token } from '@/decorator/token.decorator'
import { AdUser } from '@/model/AdUser'
import { GoodsUpDto } from './dto/goods-up.dto'

@Controller('admin/goods')
@ApiTags('后台商品接口')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询商品' })
  @ApiSuccess(FsGoodsPageVo)
  async find(
    @Token() { user }: TokenDto<AdUser>,
    @Query() goodsQueryDto: GoodsQueryDto
  ) {
    return ApiResult.page<FsGoodsPageVo>(
      await this.goodsService.findAll(user, goodsQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增商品' })
  @ApiSuccess(FsGoodsVo)
  async save(@Body() goods: FsGoods) {
    return ApiResult.success<FsGoodsVo>(await this.goodsService.save(goods))
  }

  @Post('many')
  @Roles('admin')
  @ApiOperation({ summary: '批量导入商品' })
  @ApiSuccess(ApiResultVo)
  async saveMany(@Body() goods: FsGoods[]) {
    return ApiResult.default<FsGoodsVo>(await this.goodsService.saveMany(goods))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新商品' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() goods: FsGoods) {
    return ApiResult.success<ApiResultVo>(await this.goodsService.update(goods))
  }

  @Get('label/:id')
  @Roles('admin')
  @ApiOperation({ summary: '查询商品标签' })
  @ApiSuccess(FsLabelGoodsArrayVo)
  async getLabelGoods(@Param('id') id: number) {
    return ApiResult.success<FsLabelGoodsArrayVo>(
      await this.goodsService.getLabelGoods(id)
    )
  }

  @Put('label')
  @Roles('admin')
  @ApiOperation({ summary: '更新商品标签' })
  @ApiSuccess(ApiResultVo)
  async saveLabelGoods(@Body() goodsLabelDto: GoodsLabelDto) {
    return ApiResult.default<ApiResultVo>(
      await this.goodsService.saveLabelGoods(goodsLabelDto)
    )
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除商品' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(
      await this.goodsService.deleteById(id)
    )
  }

  @Put('up')
  @Roles('admin')
  @ApiOperation({ summary: '商品上下架' })
  @ApiSuccess(ApiResultVo)
  async upperLowerShelvesGoods(@Body() goodsUpDto: GoodsUpDto) {
    return ApiResult.default<ApiResultVo>(
      await this.goodsService.up(goodsUpDto)
    )
  }
}

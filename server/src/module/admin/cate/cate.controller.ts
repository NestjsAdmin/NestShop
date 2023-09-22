import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CateService } from './cate.service'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsGoodsCate, FsGoodsCateVo } from '@/model/FsGoodsCate'
import ApiResult from '@/utils/apiResult'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CatePageVo } from './vo/cate.vo'

@Controller('admin/cate')
@ApiTags('后台商品分类接口')
export class CateController {
  constructor(private readonly cateService: CateService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询分类' })
  @ApiSuccess(CatePageVo)
  async find() {
    return ApiResult.success<CatePageVo>(await this.cateService.find())
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增分类' })
  @ApiSuccess(FsGoodsCateVo)
  async save(@Body() cate: FsGoodsCate) {
    return ApiResult.success<FsGoodsCateVo>(await this.cateService.save(cate))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新分类' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() cate: FsGoodsCate) {
    return ApiResult.success<ApiResultVo>(await this.cateService.update(cate))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除分类' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.cateService.deleteById(id))
  }
}

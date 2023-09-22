import { Controller, Get, Query } from '@nestjs/common'
import { CateService } from './cate.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsGoodsCateArrayVo } from '@/model/FsGoodsCate'
import { ApiSuccess } from '@/decorator/api.decorator'
import ApiResult from '@/utils/apiResult'
import { CateQueryDto } from './dto/cate-query.dto'

@Controller('client/cate')
@ApiTags('客户端商品分类接口')
export class CateController {
  constructor(private readonly cateService: CateService) {}

  @Get()
  @ApiOperation({ summary: '查询分类' })
  @ApiSuccess(FsGoodsCateArrayVo)
  async find(@Query() cateQueryDto: CateQueryDto) {
    return ApiResult.success<FsGoodsCateArrayVo>(
      await this.cateService.find(cateQueryDto)
    )
  }
}

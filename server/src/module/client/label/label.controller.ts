import { Controller, Get, Query } from '@nestjs/common'
import { LabelService } from './label.service'
import { ApiSuccess } from '@/decorator/api.decorator'
import { FsGoodsLabelArrayVo } from '@/model/FsGoodsLabel'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LabelQueryDto } from './dto/label-query.dto'

@Controller('client/label')
@ApiTags('客户端商品标签接口')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  @ApiOperation({ summary: '查询标签' })
  @ApiSuccess(FsGoodsLabelArrayVo)
  async find(@Query() labelQueryDto: LabelQueryDto) {
    return ApiResult.success<FsGoodsLabelArrayVo>(
      await this.labelService.findAll(labelQueryDto)
    )
  }
}

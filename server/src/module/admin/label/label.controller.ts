import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { LabelService } from './label.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  FsGoodsLabel,
  FsGoodsLabelPageVo,
  FsGoodsLabelVo,
} from '@/model/FsGoodsLabel'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import { LabelQueryDto } from './dto/label-query.dto'

@Controller('admin/label')
@ApiTags('后台商品标签接口')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询标签' })
  @ApiSuccess(FsGoodsLabelPageVo)
  async find(@Query() labelQueryDto: LabelQueryDto) {
    return ApiResult.page<FsGoodsLabelPageVo>(
      await this.labelService.findAll(labelQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增标签' })
  @ApiSuccess(FsGoodsLabelVo)
  async save(@Body() label: FsGoodsLabel) {
    return ApiResult.success<FsGoodsLabelVo>(
      await this.labelService.save(label)
    )
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除标签' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(
      await this.labelService.deleteById(id)
    )
  }
}

import { Controller, Get, Query } from '@nestjs/common'
import { StoreService } from './store.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import ApiResult from '@/utils/apiResult'
import { StoreQueryDto, StoreQueryDto2 } from './dto/store-query.dto'
import { StorePageVo, StoreVo } from './vo/store.vo'

@Controller('client/store')
@ApiTags('客户端门店接口')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiOperation({ summary: '查询门店' })
  @ApiSuccess(StorePageVo)
  async findAll(@Query() storeQueryDto: StoreQueryDto) {
    return ApiResult.success<StorePageVo>(
      await this.storeService.findAll(storeQueryDto)
    )
  }

  @Get('/near')
  @ApiOperation({ summary: '查询距离最近门店' })
  @ApiSuccess(StoreVo)
  async findById(@Query() storeQueryDto: StoreQueryDto2) {
    return ApiResult.success<StoreVo>(
      await this.storeService.findById(storeQueryDto)
    )
  }
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { StockService } from './stock.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FsStock, FsStockPageVo, FsStockVo } from '@/model/FsStock'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import { StockQueryDto } from './dto/stock-query.dto'
import { ApiResultVo } from '@/common/vo/apiResult.vo'

@Controller('admin/stock')
@ApiTags('后台库存接口')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询库存' })
  @ApiSuccess(FsStockPageVo)
  async find(@Query() stockQueryDto: StockQueryDto) {
    return ApiResult.page<FsStockPageVo>(
      await this.stockService.findAll(stockQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增库存' })
  @ApiSuccess(ApiResultVo)
  async save(@Body() stock: FsStock) {
    return ApiResult.default<FsStockVo>(await this.stockService.save(stock))
  }
}

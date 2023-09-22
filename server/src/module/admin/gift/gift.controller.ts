import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { GiftService } from './gift.service'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsGiftPageVo, FsGift, FsGiftVo } from '@/model/FsGift'
import ApiResult from '@/utils/apiResult'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { GiftQueryDto } from './dto/gift-query.dto'

@Controller('admin/gift')
@ApiTags('后台赠送接口')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询赠送' })
  @ApiSuccess(FsGiftPageVo)
  async find(@Query() giftQueryDto: GiftQueryDto) {
    return ApiResult.page<FsGiftPageVo>(
      await this.giftService.findAll(giftQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增赠送' })
  @ApiSuccess(ApiResultVo)
  async save(@Body() gift: FsGift) {
    return ApiResult.default<FsGiftVo>(await this.giftService.save(gift))
  }
}

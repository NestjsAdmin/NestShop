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
import { StoreService } from './store.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import { FsStore, FsStorePageVo, FsStoreVo } from '@/model/FsStore'
import ApiResult from '@/utils/apiResult'
import { StoreQueryDto } from './dto/store-query.dto'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { TokenDto } from '@/common/dto/token.dto'
import { Token } from '@/decorator/token.decorator'
import { AdUser } from '@/model/AdUser'

@Controller('admin/store')
@ApiTags('后台门店接口')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询门店' })
  @ApiSuccess(FsStorePageVo)
  async find(
    @Token() { user }: TokenDto<AdUser>,
    @Query() storeQueryDto: StoreQueryDto
  ) {
    return ApiResult.page<FsStorePageVo>(
      await this.storeService.findAll(user, storeQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增门店' })
  @ApiSuccess(FsStoreVo)
  async save(@Token() { user }: TokenDto<AdUser>, @Body() store: FsStore) {
    if (user.roleName !== '系统管理员')
      return ApiResult.warning('该用户没有新增门店的权限！')
    return ApiResult.success<FsStoreVo>(await this.storeService.save(store))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新门店' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() store: FsStore) {
    return ApiResult.success<ApiResultVo>(await this.storeService.update(store))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除门店' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(
      await this.storeService.deleteById(id)
    )
  }
}

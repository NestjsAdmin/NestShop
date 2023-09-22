import { Body, Controller, Post, Delete, Get, Put, Param } from '@nestjs/common'
import { MenuService } from './menu.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import ApiResult from '@/utils/apiResult'
import { AdMenu, AdMenuVo } from '@/model/AdMenu'
import { Roles } from '@/decorator/roles.decorator'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiSuccess } from '@/decorator/api.decorator'
import { MenuPageVo } from './vo/menu-page.vo'
import { Token } from '@/decorator/token.decorator'
import { TokenDto } from '@/common/dto/token.dto'
import { AdUser } from '@/model/AdUser'

@Controller('admin/menu')
@ApiTags('后台菜单接口')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询菜单' })
  @ApiSuccess(MenuPageVo)
  async find(@Token() { user }: TokenDto<AdUser>) {
    return ApiResult.success<MenuPageVo>(await this.menuService.find(user))
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: '查询菜单' })
  @ApiSuccess(AdMenuVo)
  async findById(@Param('id') id: number) {
    return ApiResult.success<AdMenuVo>(await this.menuService.findById(id))
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增菜单' })
  @ApiSuccess(AdMenuVo)
  async save(@Body() menu: AdMenu) {
    return ApiResult.success<AdMenuVo>(await this.menuService.save(menu))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新菜单' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() menu: AdMenu) {
    return ApiResult.default<ApiResultVo>(await this.menuService.update(menu))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除菜单' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.menuService.deleteById(id))
  }
}

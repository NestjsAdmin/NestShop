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
import { RoleService } from './role.service'
import { Roles } from '@/decorator/roles.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiSuccess } from '@/decorator/api.decorator'
import { AdRole, AdRolePageVo, AdRoleVo } from '@/model/AdRole'
import ApiResult from '@/utils/apiResult'
import { RoleQueryDto } from './dto/role-query.dto'
import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { RoleMenuDto } from './dto/role-menu.dto'
import { AdRoleMenuArrayVo } from '@/model/AdRoleMenu'

@Controller('admin/role')
@ApiTags('后台角色接口')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询角色' })
  @ApiSuccess(AdRolePageVo)
  async findAll(@Query() roleQueryDto: RoleQueryDto) {
    return ApiResult.page<AdRolePageVo>(
      await this.roleService.findAll(roleQueryDto)
    )
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增角色' })
  @ApiSuccess(AdRoleVo)
  async save(@Body() role: AdRole) {
    return ApiResult.success<AdRoleVo>(await this.roleService.save(role))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新角色' })
  @ApiSuccess(ApiResultVo)
  async update(@Body() role: AdRole) {
    return ApiResult.default<ApiResultVo>(await this.roleService.update(role))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除角色' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.roleService.deleteById(id))
  }

  @Get('menu/:id')
  @Roles('admin')
  @ApiOperation({ summary: '查询角色菜单权限' })
  @ApiSuccess([AdRoleMenuArrayVo])
  async getRoleMenu(@Param('id') id: number) {
    return ApiResult.success<AdRoleMenuArrayVo>(
      await this.roleService.getRoleMenu(id)
    )
  }

  @Put('menu')
  @Roles('admin')
  @ApiOperation({ summary: '更新角色菜单权限' })
  @ApiSuccess(ApiResultVo)
  async saveRoleMenu(@Body() roleMenuDto: RoleMenuDto) {
    return ApiResult.default<ApiResultVo>(
      await this.roleService.saveRoleMenu(roleMenuDto)
    )
  }
}

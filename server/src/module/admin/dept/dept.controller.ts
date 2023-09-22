import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { DeptService } from './dept.service'
import { AdDept, AdDeptVo } from '@/model/AdDept'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeptPageVo } from './vo/dept.vo'
import { ApiResultVo } from '@/common/vo/apiResult.vo'

@Controller('admin/dept')
@ApiTags('后台部门接口')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询部门' })
  @ApiSuccess(DeptPageVo)
  async find() {
    return ApiResult.success<DeptPageVo>(await this.deptService.find())
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: '查询部门' })
  @ApiSuccess(AdDeptVo)
  async findById(@Param('id') id: number) {
    return ApiResult.success<AdDeptVo>(await this.deptService.findById(id))
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: '新增部门' })
  @ApiSuccess(AdDeptVo)
  async save(@Body() dept: AdDept) {
    return ApiResult.success<AdDeptVo>(await this.deptService.save(dept))
  }

  @Put()
  @Roles('admin')
  @ApiOperation({ summary: '更新部门' })
  @ApiSuccess(AdDept)
  async update(@Body() dept: AdDept) {
    return ApiResult.success<AdDeptVo>(await this.deptService.update(dept))
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除部门' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.deptService.deleteById(id))
  }
}

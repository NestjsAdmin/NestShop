import { Controller } from '@nestjs/common'
import { FileService } from './file.service'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common/decorators'
import { ApiSuccess } from '@/decorator/api.decorator'
import { Roles } from '@/decorator/roles.decorator'
import ApiResult from '@/utils/apiResult'
import {
  DiskStorage,
  FileInterceptor,
  DiskStorageFile,
  UploadedFiles,
  UploadedFile,
  FilesInterceptor,
} from '@blazity/nest-file-fastify'
import config from '@/config'
import { FileVo } from './vo/fle.vo'
import { AdFilePageVo } from '@/model/AdFile'
import { FileQueryDto } from './dto/file-query.dto'
import { ApiResultVo } from '@/common/vo/apiResult.vo'

@Controller('file')
@ApiTags('后台文件接口')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @Roles('admin', 'client')
  @ApiOperation({ summary: '上传单个文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          required: ['file'],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage: new DiskStorage() }))
  @ApiSuccess(FileVo)
  async upload(@UploadedFile() file: DiskStorageFile) {
    if (file)
      return ApiResult.success<FileVo>(await this.fileService.upload([file]))
    return ApiResult.warning('文件对象不能为空！')
  }

  @Post('multiple')
  @Roles('admin', 'client')
  @ApiOperation({ summary: '上传多个文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'array',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('file', config.upload.maxCount, {
      storage: new DiskStorage(),
    })
  )
  @ApiSuccess(FileVo)
  async uploads(@UploadedFiles() files: DiskStorageFile[]) {
    if (files?.length > 0)
      return ApiResult.success<FileVo>(await this.fileService.upload(files))
    return ApiResult.warning('文件对象不能为空！')
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: '查询文件' })
  @ApiSuccess(AdFilePageVo)
  async findAll(@Query() fileQueryDto: FileQueryDto) {
    return ApiResult.page<AdFilePageVo>(
      await this.fileService.findAll(fileQueryDto)
    )
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: '删除文件' })
  @ApiSuccess(ApiResultVo)
  async deleteById(@Param('id') id: number) {
    return ApiResult.default<ApiResultVo>(await this.fileService.deleteById(id))
  }
}

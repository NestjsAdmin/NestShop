import { ApiProperty } from '@nestjs/swagger'

export abstract class ApiResultVo {
  @ApiProperty({ example: 200, required: false })
  code: number

  @ApiProperty({ example: '成功', required: false })
  msg: string

  abstract data: unknown
}

export abstract class ApiResultPageVo extends ApiResultVo {
  @ApiProperty({ example: 1, required: false })
  page: number

  @ApiProperty({ example: 10, required: false })
  pageSize: number

  @ApiProperty({ example: 100, required: false })
  totalCount: number
}

export abstract class ApiResultFailVo {
  @ApiProperty({ example: 500, required: false })
  code: number

  @ApiProperty({ example: '错误', required: false })
  msg: string
}

export abstract class ApiResultWarningVo {
  @ApiProperty({ example: 400, required: false })
  code: number

  @ApiProperty({ example: '失败', required: false })
  msg: string
}

export abstract class ApiResultUnauthorizedVo {
  @ApiProperty({ example: 401, required: false })
  code: number

  @ApiProperty({ example: '需要身份验证！', required: false })
  msg: string
}

export abstract class ApiResultForbiddenVo {
  @ApiProperty({ example: 403, required: false })
  code: number

  @ApiProperty({ example: '未经授权访问！', required: false })
  msg: string
}

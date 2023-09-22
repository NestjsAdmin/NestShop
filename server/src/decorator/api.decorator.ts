import {
  ApiResultFailVo,
  ApiResultForbiddenVo,
  ApiResultUnauthorizedVo,
  ApiResultWarningVo,
} from '@/common/vo/apiResult.vo'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiResponse } from '@nestjs/swagger'
import {
  IsString,
  IsInt,
  IsDecimal,
  IsNotEmpty,
  ValidateIf,
  IsDateString,
  IsBoolean,
} from 'class-validator'
import * as dayjs from 'dayjs'
import { Column, ValueTransformer } from 'typeorm'

export const ApiSuccess = (type, description?) =>
  ApiResponse({ type, description, status: 200 })

export const ApiWarning = () =>
  ApiResponse({ type: ApiResultWarningVo, status: 400 })

export const ApiUnauthorized = () =>
  ApiResponse({ type: ApiResultUnauthorizedVo, status: 401 })

export const ApiForbiddenVo = () =>
  ApiResponse({ type: ApiResultForbiddenVo, status: 403 })

export const ApiFail = () => ApiResponse({ type: ApiResultFailVo, status: 500 })

class BoolTransformer implements ValueTransformer {
  to(value: boolean | null): number | null {
    return value ? 1 : 0
  }
  from(value: number): boolean | null {
    return value === 1
  }
}

class DateTransformer implements ValueTransformer {
  to(value: string | null): Date | undefined {
    return value ? dayjs(value).toDate() : undefined
  }
  from(value: Date): string | undefined {
    return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : undefined
  }
}

export const ApiColumn = (type?: any, options?: any) => {
  const whiteList = ['id', 'createAt', 'updateAt']

  const decorators = []
  const stringType = [
    'char',
    'varchar',
    'tinytext',
    'text',
    'medlumtext',
    'longtext',
  ]
  const flotType = ['float', 'double', 'real']
  const intType = ['tinyint', 'smallint', 'mediumint', 'int', 'bigint']
  const dateType = ['date', 'datetime', 'time', 'year', 'timestamp']
  if (!whiteList.includes(options.name)) {
    if (stringType.includes(type)) decorators.push(IsString())
    if (intType.includes(type) && options.width !== 1) decorators.push(IsInt())
    if (flotType.includes(type)) decorators.push(IsDecimal())
    if (!options.nullable) decorators.push(IsNotEmpty())
    else
      decorators.push(
        ValidateIf((object, value) => value !== null && value !== undefined)
      )
    if (type === 'tinyint' && options.width === 1) {
      options.transformer = new BoolTransformer()
      decorators.push(IsBoolean())
    }
    if (dateType.includes(type)) {
      decorators.push(IsDateString())
    }
  }
  if (dateType.includes(type)) options.transformer = new DateTransformer()

  return applyDecorators(
    Column(type, options),
    ApiProperty({
      description: options.comment,
      required: whiteList.includes(options.name) ? false : !options.nullable,
      nullable: whiteList.includes(options.name) ? true : options.nullable,
    }),
    ...decorators
  )
}

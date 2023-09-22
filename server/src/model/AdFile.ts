import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 后台附件表 */
@Entity('ad_file', { schema: 'freshshop' })
export class AdFile {
  public static getTableName() {
    return `ad_file`
  }
  /** ID */
  @ApiColumn('int', {
    primary: true,
    name: 'id',
    comment: 'ID',
    unsigned: true,
  })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'ID',
    unsigned: true,
  })
  id: number

  /** 文件名 */

  @ApiColumn('varchar', { name: 'name', comment: '文件名', length: 255 })
  name: string

  /** 路径 */

  @ApiColumn('varchar', { name: 'path', comment: '路径', length: 255 })
  path: string

  /** 类型 */

  @ApiColumn('varchar', { name: 'type', comment: '类型', length: 255 })
  type: string

  /** 大小 */

  @ApiColumn('varchar', { name: 'size', comment: '大小', length: 255 })
  size: string

  /** 后缀 */

  @ApiColumn('varchar', { name: 'suffix', comment: '后缀', length: 255 })
  suffix: string

  /** 域名 */

  @ApiColumn('varchar', { name: 'domain', comment: '域名', length: 255 })
  domain: string

  /** 原文件名 */

  @ApiColumn('varchar', { name: 'realName', comment: '原文件名', length: 255 })
  realName: string

  /** 逻辑删除0正常1删除 */

  @ApiColumn('tinyint', {
    name: 'del_flag',
    comment: '逻辑删除0正常1删除',
    width: 1,
    default: () => "'0'",
  })
  delFlag: boolean

  /** 创建人 */

  @ApiColumn('int', {
    name: 'create_id',
    nullable: true,
    comment: '创建人',
    unsigned: true,
  })
  createId: number | null

  /** 创建时间 */

  @ApiColumn('datetime', {
    name: 'createAt',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date
}

export class AdFileVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdFile
}

export class AdFileArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdFile], required: false })
  data: AdFile[]
}

export class AdFilePageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdFile], required: false })
  data: AdFile[]
}

/** 定义where类型 for 后台附件表 */
export declare type WhereAdFile = FindOptionsWhere<AdFile>
/** 定义Record类型 for 后台附件表 */
export declare type RecAdFile = DeepPartial<AdFile>
/** 定义Select类型 for 后台附件表 */
export declare type SelectAdFile = FindOptionsSelect<AdFile>
/** 定义Order类型 for 后台附件表 */
export declare type OrderAdFile = FindOptionsOrder<AdFile>

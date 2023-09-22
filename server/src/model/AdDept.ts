import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AdUser } from './AdUser'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 后台部门表 */
@Entity('ad_dept', { schema: 'freshshop' })
export class AdDept {
  public static getTableName() {
    return `ad_dept`
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

  /** 名称 */

  @ApiColumn('varchar', { name: 'name', comment: '名称', length: 255 })
  name: string

  /** 部门描述 */

  @ApiColumn('varchar', {
    name: 'remark',
    nullable: true,
    comment: '部门描述',
    length: 255,
  })
  remark: string | null

  /** 负责人 */

  @ApiColumn('varchar', {
    name: 'charge',
    nullable: true,
    comment: '负责人',
    length: 255,
  })
  charge: string | null

  /** 邮箱 */

  @ApiColumn('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 255,
  })
  email: string | null

  /** 联系电话 */

  @ApiColumn('varchar', {
    name: 'phone',
    nullable: true,
    comment: '联系电话',
    length: 255,
  })
  phone: string | null

  /** 上级部门 */

  @ApiColumn('int', { name: 'pid', nullable: true, comment: '上级部门' })
  pid: number | null

  /** 1为正常，2为禁用 */

  @ApiColumn('int', {
    name: 'status',
    comment: '1为正常，2为禁用',
    default: () => "'1'",
  })
  status: number

  /** 逻辑删除 */

  @ApiColumn('tinyint', {
    name: 'del_flag',
    comment: '逻辑删除',
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

  /** 更新时间 */

  @ApiColumn('datetime', {
    name: 'updateAt',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date

  @OneToMany(() => AdUser, (adUser) => adUser.dept)
  adUsers: AdUser[]
}

export class AdDeptVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdDept
}

export class AdDeptArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdDept], required: false })
  data: AdDept[]
}

export class AdDeptPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdDept], required: false })
  data: AdDept[]
}

/** 定义where类型 for 后台部门表 */
export declare type WhereAdDept = FindOptionsWhere<AdDept>
/** 定义Record类型 for 后台部门表 */
export declare type RecAdDept = DeepPartial<AdDept>
/** 定义Select类型 for 后台部门表 */
export declare type SelectAdDept = FindOptionsSelect<AdDept>
/** 定义Order类型 for 后台部门表 */
export declare type OrderAdDept = FindOptionsOrder<AdDept>

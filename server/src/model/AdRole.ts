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

/** 后台角色表 */
@Entity('ad_role', { schema: 'freshshop' })
export class AdRole {
  public static getTableName() {
    return `ad_role`
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

  /** 描述 */

  @ApiColumn('varchar', {
    name: 'remark',
    nullable: true,
    comment: '描述',
    length: 255,
  })
  remark: string | null

  /** 1为正常，2为禁用 */

  @ApiColumn('int', {
    name: 'status',
    comment: '1为正常，2为禁用',
    default: () => "'1'",
  })
  status: number

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

  /** 更新时间 */

  @ApiColumn('datetime', {
    name: 'updateAt',
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date

  @OneToMany(() => AdUser, (adUser) => adUser.role)
  adUsers: AdUser[]
}

export class AdRoleVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdRole
}

export class AdRoleArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdRole], required: false })
  data: AdRole[]
}

export class AdRolePageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdRole], required: false })
  data: AdRole[]
}

/** 定义where类型 for 后台角色表 */
export declare type WhereAdRole = FindOptionsWhere<AdRole>
/** 定义Record类型 for 后台角色表 */
export declare type RecAdRole = DeepPartial<AdRole>
/** 定义Select类型 for 后台角色表 */
export declare type SelectAdRole = FindOptionsSelect<AdRole>
/** 定义Order类型 for 后台角色表 */
export declare type OrderAdRole = FindOptionsOrder<AdRole>

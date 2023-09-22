import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AdDept } from './AdDept'
import { AdRole } from './AdRole'
import { FsOrder } from './FsOrder'
import { FsStore } from './FsStore'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 后台用户表 */
@Index('deptId', ['deptId'], {})
@Index('roleId', ['roleId'], {})
@Entity('ad_user', { schema: 'freshshop' })
export class AdUser {
  public static getTableName() {
    return `ad_user`
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

  /** 用户名 */

  @ApiColumn('varchar', { name: 'username', comment: '用户名', length: 255 })
  username: string

  /** 密码 */

  @ApiColumn('varchar', { name: 'password', comment: '密码', length: 255 })
  password: string

  /** 电话 */

  @ApiColumn('varchar', {
    name: 'phone',
    nullable: true,
    comment: '电话',
    length: 255,
  })
  phone: string | null

  /** 昵称 */

  @ApiColumn('varchar', { name: 'nickname', comment: '昵称', length: 255 })
  nickname: string

  /** 头像地址 */

  @ApiColumn('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '头像地址',
    length: 255,
  })
  avatar: string | null

  /** 邮箱 */

  @ApiColumn('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 255,
  })
  email: string | null

  /** 是否已经删除 */

  @ApiColumn('tinyint', {
    name: 'isDel',
    comment: '是否已经删除',
    width: 1,
    default: () => "'0'",
  })
  isDel: boolean

  /** 部门名称 */

  @ApiColumn('varchar', {
    name: 'deptName',
    nullable: true,
    comment: '部门名称',
    length: 255,
  })
  deptName: string | null

  /** 部门id */

  @ApiColumn('int', {
    name: 'deptId',
    nullable: true,
    comment: '部门id',
    unsigned: true,
  })
  deptId: number | null

  /** 角色id */

  @ApiColumn('int', {
    name: 'roleId',
    nullable: true,
    comment: '角色id',
    unsigned: true,
  })
  roleId: number | null

  /** 角色名称 */

  @ApiColumn('varchar', {
    name: 'roleName',
    nullable: true,
    comment: '角色名称',
    length: 255,
  })
  roleName: string | null

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

  @ManyToOne(() => AdDept, (adDept) => adDept.adUsers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'deptId', referencedColumnName: 'id' }])
  dept: AdDept

  @ManyToOne(() => AdRole, (adRole) => adRole.adUsers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
  role: AdRole

  @OneToMany(() => FsOrder, (fsOrder) => fsOrder.dispatcher)
  fsOrders: FsOrder[]

  @OneToMany(() => FsStore, (fsStore) => fsStore.user)
  fsStores: FsStore[]
}

export class AdUserVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdUser
}

export class AdUserArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdUser], required: false })
  data: AdUser[]
}

export class AdUserPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdUser], required: false })
  data: AdUser[]
}

/** 定义where类型 for 后台用户表 */
export declare type WhereAdUser = FindOptionsWhere<AdUser>
/** 定义Record类型 for 后台用户表 */
export declare type RecAdUser = DeepPartial<AdUser>
/** 定义Select类型 for 后台用户表 */
export declare type SelectAdUser = FindOptionsSelect<AdUser>
/** 定义Order类型 for 后台用户表 */
export declare type OrderAdUser = FindOptionsOrder<AdUser>

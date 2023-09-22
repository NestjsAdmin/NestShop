import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FsUser } from './FsUser'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 用户地址表 */
@Index('userId', ['userId'], {})
@Entity('fs_address', { schema: 'freshshop' })
export class FsAddress {
  public static getTableName() {
    return `fs_address`
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

  /** 商城用户id */

  @ApiColumn('int', {
    name: 'userId',
    nullable: true,
    comment: '商城用户id',
    unsigned: true,
  })
  userId: number | null

  /** 收货人 */

  @ApiColumn('varchar', { name: 'receiver', comment: '收货人', length: 255 })
  receiver: string

  /** 联系电话 */

  @ApiColumn('varchar', { name: 'phone', comment: '联系电话', length: 255 })
  phone: string

  /** 标签 */

  @ApiColumn('varchar', {
    name: 'label',
    nullable: true,
    comment: '标签',
    length: 255,
  })
  label: string | null

  /** 纬度 */

  @ApiColumn('char', { name: 'latitude', comment: '纬度', length: 20 })
  latitude: string

  /** 经度 */

  @ApiColumn('char', { name: 'longitude', comment: '经度', length: 20 })
  longitude: string

  /** 是否默认地址 */

  @ApiColumn('tinyint', {
    name: 'isDefault',
    comment: '是否默认地址',
    width: 1,
    default: () => "'0'",
  })
  isDefault: boolean

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

  /** 地址 */

  @ApiColumn('varchar', { name: 'address', comment: '地址', length: 255 })
  address: string

  /** 详细地址 */

  @ApiColumn('varchar', {
    name: 'addressDetail',
    comment: '详细地址',
    length: 255,
  })
  addressDetail: string

  /** 名称 */

  @ApiColumn('varchar', { name: 'name', comment: '名称', length: 255 })
  name: string

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

  @ManyToOne(() => FsUser, (fsUser) => fsUser.fsAddresses, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: FsUser
}

export class FsAddressVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsAddress
}

export class FsAddressArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsAddress], required: false })
  data: FsAddress[]
}

export class FsAddressPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsAddress], required: false })
  data: FsAddress[]
}

/** 定义where类型 for 用户地址表 */
export declare type WhereFsAddress = FindOptionsWhere<FsAddress>
/** 定义Record类型 for 用户地址表 */
export declare type RecFsAddress = DeepPartial<FsAddress>
/** 定义Select类型 for 用户地址表 */
export declare type SelectFsAddress = FindOptionsSelect<FsAddress>
/** 定义Order类型 for 用户地址表 */
export declare type OrderFsAddress = FindOptionsOrder<FsAddress>

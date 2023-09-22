import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FsAddress } from './FsAddress'
import { FsCart } from './FsCart'
import { FsGift } from './FsGift'
import { FsOrder } from './FsOrder'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商城用户表 */
@Entity('fs_user', { schema: 'freshshop' })
export class FsUser {
  public static getTableName() {
    return `fs_user`
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

  /** openid */

  @ApiColumn('varchar', { name: 'openid', comment: 'openid', length: 255 })
  openid: string

  /** unionId */

  @ApiColumn('varchar', {
    name: 'unionId',
    nullable: true,
    comment: 'unionId',
    length: 255,
  })
  unionId: string | null

  /** appid */

  @ApiColumn('varchar', { name: 'appid', comment: 'appid', length: 255 })
  appid: string

  /** 昵称 */

  @ApiColumn('varchar', { name: 'nickName', comment: '昵称', length: 255 })
  nickName: string

  /** 头像地址 */

  @ApiColumn('varchar', {
    name: 'avatarUrl',
    nullable: true,
    comment: '头像地址',
    length: 255,
  })
  avatarUrl: string | null

  /** 手机号码 */

  @ApiColumn('varchar', {
    name: 'phoneNumber',
    comment: '手机号码',
    length: 255,
  })
  phoneNumber: string

  /** 性别，1为男，0为女 */

  @ApiColumn('int', {
    name: 'gender',
    comment: '性别，1为男，0为女',
    unsigned: true,
    default: () => "'0'",
  })
  gender: number

  /** 积分 */

  @ApiColumn('int', {
    name: 'integral',
    comment: '积分',
    unsigned: true,
    default: () => "'0'",
  })
  integral: number

  /** 余额 */

  @ApiColumn('decimal', {
    name: 'balance',
    comment: '余额',
    precision: 10,
    scale: 2,
  })
  balance: string

  /** 状态，1为正常、2为禁用 */

  @ApiColumn('int', {
    name: 'status',
    comment: '状态，1为正常、2为禁用',
    unsigned: true,
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

  @OneToMany(() => FsAddress, (fsAddress) => fsAddress.user)
  fsAddresses: FsAddress[]

  @OneToMany(() => FsCart, (fsCart) => fsCart.user)
  fsCarts: FsCart[]

  @OneToMany(() => FsGift, (fsGift) => fsGift.user)
  fsGifts: FsGift[]

  @OneToMany(() => FsOrder, (fsOrder) => fsOrder.user)
  fsOrders: FsOrder[]
}

export class FsUserVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsUser
}

export class FsUserArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsUser], required: false })
  data: FsUser[]
}

export class FsUserPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsUser], required: false })
  data: FsUser[]
}

/** 定义where类型 for 商城用户表 */
export declare type WhereFsUser = FindOptionsWhere<FsUser>
/** 定义Record类型 for 商城用户表 */
export declare type RecFsUser = DeepPartial<FsUser>
/** 定义Select类型 for 商城用户表 */
export declare type SelectFsUser = FindOptionsSelect<FsUser>
/** 定义Order类型 for 商城用户表 */
export declare type OrderFsUser = FindOptionsOrder<FsUser>

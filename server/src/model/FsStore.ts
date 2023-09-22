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
import { FsCart } from './FsCart'
import { FsGoods } from './FsGoods'
import { FsOrder } from './FsOrder'
import { AdUser } from './AdUser'
import { FsTimepoint } from './FsTimepoint'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 门店表 */
@Index('phone', ['phone'], {})
@Index('userId', ['userId'], {})
@Entity('fs_store', { schema: 'freshshop' })
export class FsStore {
  public static getTableName() {
    return `fs_store`
  }

  @ApiColumn('int', { primary: true, name: 'id', unsigned: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  /** 店长id */

  @ApiColumn('int', { name: 'userId', comment: '店长id', unsigned: true })
  userId: number

  /** 门店名称 */

  @ApiColumn('varchar', { name: 'name', comment: '门店名称', length: 100 })
  name: string

  /** 简介 */

  @ApiColumn('varchar', { name: 'introduction', comment: '简介', length: 1000 })
  introduction: string

  /** 手机号码 */

  @ApiColumn('char', { name: 'phone', comment: '手机号码', length: 25 })
  phone: string

  /** 省市区 */

  @ApiColumn('varchar', { name: 'address', comment: '省市区', length: 255 })
  address: string

  /** 详细地址 */

  @ApiColumn('varchar', {
    name: 'addressDetail',
    comment: '详细地址',
    length: 255,
  })
  addressDetail: string

  /** 门店图片 */

  @ApiColumn('varchar', { name: 'image', comment: '门店图片', length: 255 })
  image: string

  /** 纬度 */

  @ApiColumn('char', { name: 'latitude', comment: '纬度', length: 25 })
  latitude: string

  /** 经度 */

  @ApiColumn('char', { name: 'longitude', comment: '经度', length: 25 })
  longitude: string

  /** 社区名称（小区名称） */

  @ApiColumn('varchar', {
    name: 'communityName',
    comment: '社区名称（小区名称）',
    length: 255,
  })
  communityName: string

  /** 核销有效日期 */

  @ApiColumn('varchar', {
    name: 'validTime',
    nullable: true,
    comment: '核销有效日期',
    length: 100,
  })
  validTime: string | null

  /** 是否营业 */

  @ApiColumn('tinyint', {
    name: 'isShow',
    comment: '是否营业',
    width: 1,
    default: () => "'0'",
  })
  isShow: boolean

  /** 营业起始时间（HH:mm） */

  @ApiColumn('varchar', {
    name: 'dayTimeEnd',
    comment: '营业起始时间（HH:mm）',
    length: 255,
  })
  dayTimeEnd: string

  /** 营业结束时间（HH:mm） */

  @ApiColumn('varchar', {
    name: 'dayTimeStart',
    comment: '营业结束时间（HH:mm）',
    length: 255,
  })
  dayTimeStart: string

  /** 每星期营业，格式如：0,1（星期天，星期一） */

  @ApiColumn('varchar', {
    name: 'dayWeek',
    comment: '每星期营业，格式如：0,1（星期天，星期一）',
    length: 255,
  })
  dayWeek: string

  /** 核销起始时间 */

  @ApiColumn('datetime', {
    name: 'validTimeStart',
    nullable: true,
    comment: '核销起始时间',
  })
  validTimeStart: Date | null

  /** 核销结束时间 */

  @ApiColumn('datetime', {
    name: 'validTimeEnd',
    nullable: true,
    comment: '核销结束时间',
  })
  validTimeEnd: Date | null

  /** 配送方式，是数组用,分割（1门店配送、2自提、3第三方配送） */

  @ApiColumn('varchar', {
    name: 'distributionWay',
    comment: '配送方式，是数组用,分割（1门店配送、2自提、3第三方配送）',
    length: 255,
  })
  distributionWay: string

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

  @OneToMany(() => FsCart, (fsCart) => fsCart.store)
  fsCarts: FsCart[]

  @OneToMany(() => FsGoods, (fsGoods) => fsGoods.store)
  fsGoods: FsGoods[]

  @OneToMany(() => FsOrder, (fsOrder) => fsOrder.store)
  fsOrders: FsOrder[]

  @ManyToOne(() => AdUser, (adUser) => adUser.fsStores, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: AdUser

  @OneToMany(() => FsTimepoint, (fsTimepoint) => fsTimepoint.store)
  fsTimepoints: FsTimepoint[]
}

export class FsStoreVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsStore
}

export class FsStoreArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsStore], required: false })
  data: FsStore[]
}

export class FsStorePageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsStore], required: false })
  data: FsStore[]
}

/** 定义where类型 for 门店表 */
export declare type WhereFsStore = FindOptionsWhere<FsStore>
/** 定义Record类型 for 门店表 */
export declare type RecFsStore = DeepPartial<FsStore>
/** 定义Select类型 for 门店表 */
export declare type SelectFsStore = FindOptionsSelect<FsStore>
/** 定义Order类型 for 门店表 */
export declare type OrderFsStore = FindOptionsOrder<FsStore>

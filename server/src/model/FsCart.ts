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
import { FsStore } from './FsStore'
import { FsGoods } from './FsGoods'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 购物车表 */
@Index('userId', ['userId'], {})
@Index('storeId', ['storeId'], {})
@Index('goodsId', ['goodsId'], {})
@Entity('fs_cart', { schema: 'freshshop' })
export class FsCart {
  public static getTableName() {
    return `fs_cart`
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

  /** 用户id */

  @ApiColumn('int', {
    name: 'userId',
    nullable: true,
    comment: '用户id',
    unsigned: true,
  })
  userId: number | null

  /** 商品id */

  @ApiColumn('int', { name: 'goodsId', comment: '商品id', unsigned: true })
  goodsId: number

  /** 门店id */

  @ApiColumn('int', { name: 'storeId', comment: '门店id', unsigned: true })
  storeId: number

  /** 购物车来源，1APP商城、2人工收银台、3自助收银台 */

  @ApiColumn('int', {
    name: 'origin',
    comment: '购物车来源，1APP商城、2人工收银台、3自助收银台',
    unsigned: true,
  })
  origin: number

  /** 商品名称 */

  @ApiColumn('varchar', { name: 'name', comment: '商品名称', length: 255 })
  name: string

  /** 商品数量 */

  @ApiColumn('int', { name: 'number', comment: '商品数量', unsigned: true })
  number: number

  /** 商品图片 */

  @ApiColumn('varchar', { name: 'image', comment: '商品图片', length: 255 })
  image: string

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

  @ApiColumn('datetime', {
    name: 'updateAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date

  @ManyToOne(() => FsUser, (fsUser) => fsUser.fsCarts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: FsUser

  @ManyToOne(() => FsStore, (fsStore) => fsStore.fsCarts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: FsStore

  @ManyToOne(() => FsGoods, (fsGoods) => fsGoods.fsCarts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'goodsId', referencedColumnName: 'id' }])
  goods: FsGoods
}

export class FsCartVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsCart
}

export class FsCartArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsCart], required: false })
  data: FsCart[]
}

export class FsCartPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsCart], required: false })
  data: FsCart[]
}

/** 定义where类型 for 购物车表 */
export declare type WhereFsCart = FindOptionsWhere<FsCart>
/** 定义Record类型 for 购物车表 */
export declare type RecFsCart = DeepPartial<FsCart>
/** 定义Select类型 for 购物车表 */
export declare type SelectFsCart = FindOptionsSelect<FsCart>
/** 定义Order类型 for 购物车表 */
export declare type OrderFsCart = FindOptionsOrder<FsCart>

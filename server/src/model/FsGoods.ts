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
import { FsStore } from './FsStore'
import { FsGoodsCate } from './FsGoodsCate'
import { FsLabelGoods } from './FsLabelGoods'
import { FsOrderItem } from './FsOrderItem'
import { FsStock } from './FsStock'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商品表 */
@Index('storeId', ['storeId'], {})
@Index('cateId', ['cateId'], {})
@Entity('fs_goods', { schema: 'freshshop' })
export class FsGoods {
  public static getTableName() {
    return `fs_goods`
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

  /** 门店id */

  @ApiColumn('int', { name: 'storeId', comment: '门店id', unsigned: true })
  storeId: number

  /** 分类id */

  @ApiColumn('int', { name: 'cateId', comment: '分类id', unsigned: true })
  cateId: number

  /** 商品名称 */

  @ApiColumn('varchar', { name: 'name', comment: '商品名称', length: 255 })
  name: string

  /** 商品图片 */

  @ApiColumn('varchar', { name: 'image', comment: '商品图片', length: 255 })
  image: string

  /** 轮播图（用,分割） */

  @ApiColumn('varchar', {
    name: 'swiper',
    comment: '轮播图（用,分割）',
    length: 255,
  })
  swiper: string

  /** 商品简介 */

  @ApiColumn('varchar', {
    name: 'introduction',
    nullable: true,
    comment: '商品简介',
    length: 255,
  })
  introduction: string | null

  /** 规格名称 */

  @ApiColumn('varchar', {
    name: 'unit',
    nullable: true,
    comment: '规格名称',
    length: 255,
  })
  unit: string | null

  /** 排序 */

  @ApiColumn('int', { name: 'sort', comment: '排序', default: () => "'0'" })
  sort: number

  /** 储存方式 */

  @ApiColumn('varchar', {
    name: 'storage',
    nullable: true,
    comment: '储存方式',
    length: 255,
  })
  storage: string | null

  /** 生产日期 */

  @ApiColumn('date', { name: 'pd', nullable: true, comment: '生产日期' })
  pd: string | null

  /** 保质期（天） */

  @ApiColumn('int', {
    name: 'exp',
    nullable: true,
    comment: '保质期（天）',
    unsigned: true,
  })
  exp: number | null

  /** 关键词 */

  @ApiColumn('varchar', {
    name: 'keyword',
    nullable: true,
    comment: '关键词',
    length: 255,
  })
  keyword: string | null

  /** 条形码 */

  @ApiColumn('varchar', {
    name: 'barcode',
    nullable: true,
    comment: '条形码',
    length: 255,
  })
  barcode: string | null

  /** 商品价格 */

  @ApiColumn('decimal', {
    name: 'price',
    comment: '商品价格',
    precision: 10,
    scale: 2,
  })
  price: string

  /** 市场价格 */

  @ApiColumn('decimal', {
    name: 'originPrice',
    comment: '市场价格',
    precision: 10,
    scale: 2,
  })
  originPrice: string

  /** 成本价 */

  @ApiColumn('decimal', {
    name: 'cost',
    nullable: true,
    comment: '成本价',
    precision: 10,
    scale: 2,
  })
  cost: string | null

  /** 销量 */

  @ApiColumn('int', {
    name: 'sales',
    comment: '销量',
    unsigned: true,
    default: () => "'0'",
  })
  sales: number

  /** 库存 */

  @ApiColumn('int', {
    name: 'stock',
    comment: '库存',
    unsigned: true,
    default: () => "'0'",
  })
  stock: number

  /** 状态，1上架、2下架 */

  @ApiColumn('int', {
    name: 'status',
    comment: '状态，1上架、2下架',
    unsigned: true,
    default: () => "'1'",
  })
  status: number

  /** 商品详情 */

  @ApiColumn('text', { name: 'description', comment: '商品详情' })
  description: string

  /** 浏览量 */

  @ApiColumn('int', { name: 'browse', comment: '浏览量', default: () => "'0'" })
  browse: number

  /** 返回积分 */

  @ApiColumn('int', {
    name: 'backIntegral',
    comment: '返回积分',
    unsigned: true,
    default: () => "'0'",
  })
  backIntegral: number

  /** 所需积分 */

  @ApiColumn('int', {
    name: 'needIntegral',
    nullable: true,
    comment: '所需积分',
    unsigned: true,
  })
  needIntegral: number | null

  /** 是否限制时段 */

  @ApiColumn('tinyint', {
    name: 'isLimitTime',
    comment: '是否限制时段',
    unsigned: true,
    default: () => "'0'",
  })
  isLimitTime: number

  /** 限制开始时间 */

  @ApiColumn('datetime', {
    name: 'limitStartTime',
    nullable: true,
    comment: '限制开始时间',
  })
  limitStartTime: Date | null

  /** 限制结束时间 */

  @ApiColumn('datetime', {
    name: 'limitEndTime',
    nullable: true,
    comment: '限制结束时间',
  })
  limitEndTime: Date | null

  /** 商品类型（普通商品，积分商品） */

  @ApiColumn('int', {
    name: 'type',
    comment: '商品类型（普通商品，积分商品）',
    unsigned: true,
    default: () => "'0'",
  })
  type: number

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

  @OneToMany(() => FsCart, (fsCart) => fsCart.goods)
  fsCarts: FsCart[]

  @ManyToOne(() => FsStore, (fsStore) => fsStore.fsGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: FsStore

  @ManyToOne(() => FsGoodsCate, (fsGoodsCate) => fsGoodsCate.fsGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cateId', referencedColumnName: 'id' }])
  cate: FsGoodsCate

  @OneToMany(() => FsLabelGoods, (fsLabelGoods) => fsLabelGoods.goods)
  fsLabelGoods: FsLabelGoods[]

  @OneToMany(() => FsOrderItem, (fsOrderItem) => fsOrderItem.goods)
  fsOrderItems: FsOrderItem[]

  @OneToMany(() => FsStock, (fsStock) => fsStock.goods)
  fsStocks: FsStock[]
}

export class FsGoodsVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsGoods
}

export class FsGoodsArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsGoods], required: false })
  data: FsGoods[]
}

export class FsGoodsPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsGoods], required: false })
  data: FsGoods[]
}

/** 定义where类型 for 商品表 */
export declare type WhereFsGoods = FindOptionsWhere<FsGoods>
/** 定义Record类型 for 商品表 */
export declare type RecFsGoods = DeepPartial<FsGoods>
/** 定义Select类型 for 商品表 */
export declare type SelectFsGoods = FindOptionsSelect<FsGoods>
/** 定义Order类型 for 商品表 */
export declare type OrderFsGoods = FindOptionsOrder<FsGoods>

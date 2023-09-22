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
import { FsOrder } from './FsOrder'
import { FsGoods } from './FsGoods'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 订单项目表 */
@Index('orderId', ['orderId'], {})
@Index('goodsId', ['goodsId'], {})
@Entity('fs_order_item', { schema: 'freshshop' })
export class FsOrderItem {
  public static getTableName() {
    return `fs_order_item`
  }
  /** ID */
  @ApiColumn('int', { primary: true, name: 'id', comment: 'ID' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number

  /** 订单id */

  @ApiColumn('int', { name: 'orderId', comment: '订单id', unsigned: true })
  orderId: number

  /** 商品id */

  @ApiColumn('int', {
    name: 'goodsId',
    nullable: true,
    comment: '商品id',
    unsigned: true,
  })
  goodsId: number | null

  /** 商品名称 */

  @ApiColumn('varchar', { name: 'name', comment: '商品名称', length: 255 })
  name: string

  /** 商品价格 */

  @ApiColumn('decimal', {
    name: 'price',
    comment: '商品价格',
    precision: 10,
    scale: 2,
  })
  price: string

  /** 数量 */

  @ApiColumn('int', { name: 'number', comment: '数量', unsigned: true })
  number: number

  /** 图片地址 */

  @ApiColumn('varchar', { name: 'image', comment: '图片地址', length: 255 })
  image: string

  /** 退款数量 */

  @ApiColumn('int', {
    name: 'refundNumber',
    comment: '退款数量',
    unsigned: true,
    default: () => "'0'",
  })
  refundNumber: number

  /** 退款状态，1未退款、2申请中、3已退款 */

  @ApiColumn('int', {
    name: 'refundStatus',
    comment: '退款状态，1未退款、2申请中、3已退款',
    default: () => "'1'",
  })
  refundStatus: number

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

  @ManyToOne(() => FsOrder, (fsOrder) => fsOrder.fsOrderItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'orderId', referencedColumnName: 'id' }])
  order: FsOrder

  @ManyToOne(() => FsGoods, (fsGoods) => fsGoods.fsOrderItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'goodsId', referencedColumnName: 'id' }])
  goods: FsGoods
}

export class FsOrderItemVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsOrderItem
}

export class FsOrderItemArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsOrderItem], required: false })
  data: FsOrderItem[]
}

export class FsOrderItemPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsOrderItem], required: false })
  data: FsOrderItem[]
}

/** 定义where类型 for 订单项目表 */
export declare type WhereFsOrderItem = FindOptionsWhere<FsOrderItem>
/** 定义Record类型 for 订单项目表 */
export declare type RecFsOrderItem = DeepPartial<FsOrderItem>
/** 定义Select类型 for 订单项目表 */
export declare type SelectFsOrderItem = FindOptionsSelect<FsOrderItem>
/** 定义Order类型 for 订单项目表 */
export declare type OrderFsOrderItem = FindOptionsOrder<FsOrderItem>

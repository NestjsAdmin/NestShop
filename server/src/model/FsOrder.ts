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
import { FsUser } from './FsUser'
import { FsStore } from './FsStore'
import { AdUser } from './AdUser'
import { FsOrderItem } from './FsOrderItem'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 订单表 */
@Index('userId', ['userId'], {})
@Index('storeId', ['storeId'], {})
@Index('dispatcherId', ['dispatcherId'], {})
@Entity('fs_order', { schema: 'freshshop' })
export class FsOrder {
  public static getTableName() {
    return `fs_order`
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

  /** 订单号 */

  @ApiColumn('varchar', { name: 'orderNumber', comment: '订单号', length: 255 })
  orderNumber: string

  /** 额外订单号 */

  @ApiColumn('varchar', {
    name: 'extendNumber',
    nullable: true,
    comment: '额外订单号',
    length: 255,
  })
  extendNumber: string | null

  /** 用户id */

  @ApiColumn('int', {
    name: 'userId',
    nullable: true,
    comment: '用户id',
    unsigned: true,
  })
  userId: number | null

  /** 用户名称 */

  @ApiColumn('varchar', {
    name: 'userName',
    nullable: true,
    comment: '用户名称',
    length: 255,
  })
  userName: string | null

  /** 门店id */

  @ApiColumn('int', {
    name: 'storeId',
    nullable: true,
    comment: '门店id',
    unsigned: true,
  })
  storeId: number | null

  /** 门店名称 */

  @ApiColumn('varchar', {
    name: 'storeName',
    nullable: true,
    comment: '门店名称',
    length: 255,
  })
  storeName: string | null

  /** 配送员id */

  @ApiColumn('int', {
    name: 'dispatcherId',
    nullable: true,
    comment: '配送员id',
  })
  dispatcherId: number | null

  /** 配送员姓名 */

  @ApiColumn('varchar', {
    name: 'dispatcherName',
    nullable: true,
    comment: '配送员姓名',
    length: 255,
  })
  dispatcherName: string | null

  /** 联系电话 */

  @ApiColumn('varchar', {
    name: 'phone',
    nullable: true,
    comment: '联系电话',
    length: 255,
  })
  phone: string | null

  /** 地址 */

  @ApiColumn('varchar', {
    name: 'address',
    nullable: true,
    comment: '地址',
    length: 255,
  })
  address: string | null

  /** 收货人 */

  @ApiColumn('varchar', {
    name: 'consignee',
    nullable: true,
    comment: '收货人',
    length: 255,
  })
  consignee: string | null

  /** 商品总数 */

  @ApiColumn('int', { name: 'totalNum', comment: '商品总数', unsigned: true })
  totalNum: number

  /** 商品总价 */

  @ApiColumn('decimal', {
    name: 'totalPrice',
    comment: '商品总价',
    precision: 10,
    scale: 2,
  })
  totalPrice: string

  /** 是否已支付 */

  @ApiColumn('tinyint', {
    name: 'isPaid',
    comment: '是否已支付',
    width: 1,
    default: () => "'0'",
  })
  isPaid: boolean

  /** 返回积分 */

  @ApiColumn('int', {
    name: 'backIntegral',
    comment: '返回积分',
    unsigned: true,
    default: () => "'0'",
  })
  backIntegral: number

  /** 支付时间 */

  @ApiColumn('datetime', {
    name: 'payTime',
    nullable: true,
    comment: '支付时间',
  })
  payTime: Date | null

  /** 支付方式，如微信支付、现金支付、余额支付、积分支付等 */

  @ApiColumn('varchar', {
    name: 'payType',
    comment: '支付方式，如微信支付、现金支付、余额支付、积分支付等',
    length: 255,
  })
  payType: string

  /** 订单来源，1小程序商城、2人工收银台、3自助收银台 */

  @ApiColumn('int', {
    name: 'origin',
    comment: '订单来源，1小程序商城、2人工收银台、3自助收银台',
  })
  origin: number

  /** 订单状态，1待发货、2待收货、3已完成、4申请退款、5已退款、6已取消 */

  @ApiColumn('int', {
    name: 'status',
    comment: '订单状态，1待发货、2待收货、3已完成、4申请退款、5已退款、6已取消',
    default: () => "'1'",
  })
  status: number

  /** 退款图片（用,分割） */

  @ApiColumn('varchar', {
    name: 'refundImage',
    nullable: true,
    comment: '退款图片（用,分割）',
    length: 255,
  })
  refundImage: string | null

  /** 退款原因 */

  @ApiColumn('varchar', {
    name: 'refundReason',
    nullable: true,
    comment: '退款原因',
    length: 255,
  })
  refundReason: string | null

  /** 拒绝退款理由 */

  @ApiColumn('varchar', {
    name: 'refundRefuse',
    nullable: true,
    comment: '拒绝退款理由',
    length: 255,
  })
  refundRefuse: string | null

  /** 退款时间 */

  @ApiColumn('datetime', {
    name: 'refundTime',
    nullable: true,
    comment: '退款时间',
  })
  refundTime: Date | null

  /** 退款金额 */

  @ApiColumn('decimal', {
    name: 'refundPrice',
    nullable: true,
    comment: '退款金额',
    precision: 10,
    scale: 2,
  })
  refundPrice: string | null

  /** 订单类型，1商品、2充值 */

  @ApiColumn('int', {
    name: 'orderType',
    comment: '订单类型，1商品、2充值',
    unsigned: true,
    default: () => "'1'",
  })
  orderType: number

  /** 充值金额 */

  @ApiColumn('decimal', {
    name: 'chargePrice',
    nullable: true,
    comment: '充值金额',
    precision: 10,
    scale: 2,
  })
  chargePrice: string | null

  /** 订单备注 */

  @ApiColumn('varchar', {
    name: 'mark',
    nullable: true,
    comment: '订单备注',
    length: 255,
  })
  mark: string | null

  /** 送货方式，1门店配送、2到店自提、3第三方配送 */

  @ApiColumn('int', {
    name: 'deliveryType',
    nullable: true,
    comment: '送货方式，1门店配送、2到店自提、3第三方配送',
    unsigned: true,
    default: () => "'1'",
  })
  deliveryType: number | null

  /** 配送时间 */

  @ApiColumn('datetime', {
    name: 'distributionTime',
    nullable: true,
    comment: '配送时间',
  })
  distributionTime: Date | null

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

  @ManyToOne(() => FsUser, (fsUser) => fsUser.fsOrders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: FsUser

  @ManyToOne(() => FsStore, (fsStore) => fsStore.fsOrders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: FsStore

  @ManyToOne(() => AdUser, (adUser) => adUser.fsOrders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'dispatcherId', referencedColumnName: 'id' }])
  dispatcher: AdUser

  @OneToMany(() => FsOrderItem, (fsOrderItem) => fsOrderItem.order)
  fsOrderItems: FsOrderItem[]
}

export class FsOrderVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsOrder
}

export class FsOrderArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsOrder], required: false })
  data: FsOrder[]
}

export class FsOrderPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsOrder], required: false })
  data: FsOrder[]
}

/** 定义where类型 for 订单表 */
export declare type WhereFsOrder = FindOptionsWhere<FsOrder>
/** 定义Record类型 for 订单表 */
export declare type RecFsOrder = DeepPartial<FsOrder>
/** 定义Select类型 for 订单表 */
export declare type SelectFsOrder = FindOptionsSelect<FsOrder>
/** 定义Order类型 for 订单表 */
export declare type OrderFsOrder = FindOptionsOrder<FsOrder>

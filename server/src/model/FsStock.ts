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
import { FsGoods } from './FsGoods'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商品库存表 */
@Index('goodsId', ['goodsId'], {})
@Entity('fs_stock', { schema: 'freshshop' })
export class FsStock {
  public static getTableName() {
    return `fs_stock`
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

  /** 商品id */

  @ApiColumn('int', { name: 'goodsId', comment: '商品id', unsigned: true })
  goodsId: number

  /** 进货、出货量 */

  @ApiColumn('int', { name: 'number', comment: '进货、出货量' })
  number: number

  /** 类型，0进货、1出货 */

  @ApiColumn('int', { name: 'type', comment: '类型，0进货、1出货' })
  type: number

  /** 备注 */

  @ApiColumn('varchar', {
    name: 'remark',
    nullable: true,
    comment: '备注',
    length: 255,
  })
  remark: string | null

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

  @ManyToOne(() => FsGoods, (fsGoods) => fsGoods.fsStocks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'goodsId', referencedColumnName: 'id' }])
  goods: FsGoods
}

export class FsStockVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsStock
}

export class FsStockArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsStock], required: false })
  data: FsStock[]
}

export class FsStockPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsStock], required: false })
  data: FsStock[]
}

/** 定义where类型 for 商品库存表 */
export declare type WhereFsStock = FindOptionsWhere<FsStock>
/** 定义Record类型 for 商品库存表 */
export declare type RecFsStock = DeepPartial<FsStock>
/** 定义Select类型 for 商品库存表 */
export declare type SelectFsStock = FindOptionsSelect<FsStock>
/** 定义Order类型 for 商品库存表 */
export declare type OrderFsStock = FindOptionsOrder<FsStock>

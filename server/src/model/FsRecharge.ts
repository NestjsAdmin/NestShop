import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 充值表 */
@Entity('fs_recharge', { schema: 'freshshop' })
export class FsRecharge {
  public static getTableName() {
    return `fs_recharge`
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

  /** 价格 */

  @ApiColumn('decimal', {
    name: 'price',
    comment: '价格',
    precision: 10,
    scale: 2,
  })
  price: string

  /** 到账余额 */

  @ApiColumn('decimal', {
    name: 'balance',
    comment: '到账余额',
    precision: 10,
    scale: 2,
  })
  balance: string

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
}

export class FsRechargeVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsRecharge
}

export class FsRechargeArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsRecharge], required: false })
  data: FsRecharge[]
}

export class FsRechargePageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsRecharge], required: false })
  data: FsRecharge[]
}

/** 定义where类型 for 充值表 */
export declare type WhereFsRecharge = FindOptionsWhere<FsRecharge>
/** 定义Record类型 for 充值表 */
export declare type RecFsRecharge = DeepPartial<FsRecharge>
/** 定义Select类型 for 充值表 */
export declare type SelectFsRecharge = FindOptionsSelect<FsRecharge>
/** 定义Order类型 for 充值表 */
export declare type OrderFsRecharge = FindOptionsOrder<FsRecharge>

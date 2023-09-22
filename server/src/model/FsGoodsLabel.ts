import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FsLabelGoods } from './FsLabelGoods'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商品标签表 */
@Entity('fs_goods_label', { schema: 'freshshop' })
export class FsGoodsLabel {
  public static getTableName() {
    return `fs_goods_label`
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

  /** 标签名称 */

  @ApiColumn('varchar', { name: 'name', comment: '标签名称', length: 255 })
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

  /** 创建时间 */

  @ApiColumn('datetime', {
    name: 'createAt',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date

  @OneToMany(() => FsLabelGoods, (fsLabelGoods) => fsLabelGoods.label)
  fsLabelGoods: FsLabelGoods[]
}

export class FsGoodsLabelVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsGoodsLabel
}

export class FsGoodsLabelArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsGoodsLabel], required: false })
  data: FsGoodsLabel[]
}

export class FsGoodsLabelPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsGoodsLabel], required: false })
  data: FsGoodsLabel[]
}

/** 定义where类型 for 商品标签表 */
export declare type WhereFsGoodsLabel = FindOptionsWhere<FsGoodsLabel>
/** 定义Record类型 for 商品标签表 */
export declare type RecFsGoodsLabel = DeepPartial<FsGoodsLabel>
/** 定义Select类型 for 商品标签表 */
export declare type SelectFsGoodsLabel = FindOptionsSelect<FsGoodsLabel>
/** 定义Order类型 for 商品标签表 */
export declare type OrderFsGoodsLabel = FindOptionsOrder<FsGoodsLabel>

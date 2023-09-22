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
import { FsGoodsLabel } from './FsGoodsLabel'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商品标签关系表 */
@Index('goodsId', ['goodsId'], {})
@Index('labelId', ['labelId'], {})
@Entity('fs_label_goods', { schema: 'freshshop' })
export class FsLabelGoods {
  public static getTableName() {
    return `fs_label_goods`
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

  /** 标签id */

  @ApiColumn('int', { name: 'labelId', comment: '标签id', unsigned: true })
  labelId: number

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

  @ManyToOne(() => FsGoods, (fsGoods) => fsGoods.fsLabelGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'goodsId', referencedColumnName: 'id' }])
  goods: FsGoods

  @ManyToOne(() => FsGoodsLabel, (fsGoodsLabel) => fsGoodsLabel.fsLabelGoods, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'labelId', referencedColumnName: 'id' }])
  label: FsGoodsLabel
}

export class FsLabelGoodsVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsLabelGoods
}

export class FsLabelGoodsArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsLabelGoods], required: false })
  data: FsLabelGoods[]
}

export class FsLabelGoodsPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsLabelGoods], required: false })
  data: FsLabelGoods[]
}

/** 定义where类型 for 商品标签关系表 */
export declare type WhereFsLabelGoods = FindOptionsWhere<FsLabelGoods>
/** 定义Record类型 for 商品标签关系表 */
export declare type RecFsLabelGoods = DeepPartial<FsLabelGoods>
/** 定义Select类型 for 商品标签关系表 */
export declare type SelectFsLabelGoods = FindOptionsSelect<FsLabelGoods>
/** 定义Order类型 for 商品标签关系表 */
export declare type OrderFsLabelGoods = FindOptionsOrder<FsLabelGoods>

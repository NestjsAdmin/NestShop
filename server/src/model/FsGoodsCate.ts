import {
  DeepPartial,
  Entity,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FsGoods } from './FsGoods'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 商品分类表 */
@Entity('fs_goods_cate', { schema: 'freshshop' })
export class FsGoodsCate {
  public static getTableName() {
    return `fs_goods_cate`
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

  /** 父类id */

  @ApiColumn('int', {
    name: 'pid',
    nullable: true,
    comment: '父类id',
    unsigned: true,
  })
  pid: number | null

  /** 分类名称 */

  @ApiColumn('varchar', { name: 'name', comment: '分类名称', length: 255 })
  name: string

  /** 图标 */

  @ApiColumn('varchar', {
    name: 'icon',
    nullable: true,
    comment: '图标',
    length: 255,
  })
  icon: string | null

  /** 排序 */

  @ApiColumn('int', {
    name: 'sort',
    comment: '排序',
    unsigned: true,
    default: () => "'0'",
  })
  sort: number

  /** 是否在APP显示 */

  @ApiColumn('tinyint', {
    name: 'isShow',
    comment: '是否在APP显示',
    width: 1,
    default: () => "'0'",
  })
  isShow: boolean

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

  @OneToMany(() => FsGoods, (fsGoods) => fsGoods.cate)
  fsGoods: FsGoods[]
}

export class FsGoodsCateVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsGoodsCate
}

export class FsGoodsCateArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsGoodsCate], required: false })
  data: FsGoodsCate[]
}

export class FsGoodsCatePageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsGoodsCate], required: false })
  data: FsGoodsCate[]
}

/** 定义where类型 for 商品分类表 */
export declare type WhereFsGoodsCate = FindOptionsWhere<FsGoodsCate>
/** 定义Record类型 for 商品分类表 */
export declare type RecFsGoodsCate = DeepPartial<FsGoodsCate>
/** 定义Select类型 for 商品分类表 */
export declare type SelectFsGoodsCate = FindOptionsSelect<FsGoodsCate>
/** 定义Order类型 for 商品分类表 */
export declare type OrderFsGoodsCate = FindOptionsOrder<FsGoodsCate>

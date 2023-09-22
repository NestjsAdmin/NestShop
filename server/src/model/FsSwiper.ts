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

/** 轮播图表 */
@Entity('fs_swiper', { schema: 'freshshop' })
export class FsSwiper {
  public static getTableName() {
    return `fs_swiper`
  }

  @ApiColumn('int', { primary: true, name: 'id', unsigned: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number

  /** 排序 */

  @ApiColumn('int', { name: 'sort', comment: '排序' })
  sort: number

  /** 图片地址 */

  @ApiColumn('varchar', { name: 'image', comment: '图片地址', length: 255 })
  image: string

  /** 跳转类型，0为应用、1为外链 */

  @ApiColumn('int', {
    name: 'type',
    comment: '跳转类型，0为应用、1为外链',
    default: () => "'0'",
  })
  type: number

  /** 应用页面地址，或外链 */

  @ApiColumn('varchar', {
    name: 'url',
    nullable: true,
    comment: '应用页面地址，或外链',
    length: 255,
  })
  url: string | null

  /** 标题 */

  @ApiColumn('varchar', {
    name: 'title',
    nullable: true,
    comment: '标题',
    length: 255,
  })
  title: string | null

  /** 1为正常，2为禁用 */

  @ApiColumn('int', {
    name: 'status',
    comment: '1为正常，2为禁用',
    default: () => "'1'",
  })
  status: number

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

export class FsSwiperVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsSwiper
}

export class FsSwiperArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsSwiper], required: false })
  data: FsSwiper[]
}

export class FsSwiperPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsSwiper], required: false })
  data: FsSwiper[]
}

/** 定义where类型 for 轮播图表 */
export declare type WhereFsSwiper = FindOptionsWhere<FsSwiper>
/** 定义Record类型 for 轮播图表 */
export declare type RecFsSwiper = DeepPartial<FsSwiper>
/** 定义Select类型 for 轮播图表 */
export declare type SelectFsSwiper = FindOptionsSelect<FsSwiper>
/** 定义Order类型 for 轮播图表 */
export declare type OrderFsSwiper = FindOptionsOrder<FsSwiper>

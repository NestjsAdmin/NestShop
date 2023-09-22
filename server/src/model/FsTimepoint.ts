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
import { FsStore } from './FsStore'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 时间点表 */
@Index('storeId', ['storeId'], {})
@Entity('fs_timepoint', { schema: 'freshshop' })
export class FsTimepoint {
  public static getTableName() {
    return `fs_timepoint`
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

  /** 配送时间 */

  @ApiColumn('varchar', { name: 'time', comment: '配送时间', length: 255 })
  time: string

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

  @ManyToOne(() => FsStore, (fsStore) => fsStore.fsTimepoints, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
  store: FsStore
}

export class FsTimepointVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsTimepoint
}

export class FsTimepointArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsTimepoint], required: false })
  data: FsTimepoint[]
}

export class FsTimepointPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsTimepoint], required: false })
  data: FsTimepoint[]
}

/** 定义where类型 for 时间点表 */
export declare type WhereFsTimepoint = FindOptionsWhere<FsTimepoint>
/** 定义Record类型 for 时间点表 */
export declare type RecFsTimepoint = DeepPartial<FsTimepoint>
/** 定义Select类型 for 时间点表 */
export declare type SelectFsTimepoint = FindOptionsSelect<FsTimepoint>
/** 定义Order类型 for 时间点表 */
export declare type OrderFsTimepoint = FindOptionsOrder<FsTimepoint>

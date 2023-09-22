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
import { FsUser } from './FsUser'

import { ApiColumn } from '@/decorator/api.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { ApiResultPageVo, ApiResultVo } from '@/common/vo/apiResult.vo'

/** 余额积分赠送表 */
@Index('userId', ['userId'], {})
@Entity('fs_gift', { schema: 'freshshop' })
export class FsGift {
  public static getTableName() {
    return `fs_gift`
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

  /** 用户id */

  @ApiColumn('int', { name: 'userId', comment: '用户id', unsigned: true })
  userId: number

  /** 赠送余额 */

  @ApiColumn('decimal', {
    name: 'balance',
    comment: '赠送余额',
    precision: 10,
    scale: 0,
  })
  balance: string

  /** 赠送积分 */

  @ApiColumn('decimal', {
    name: 'integral',
    comment: '赠送积分',
    precision: 10,
    scale: 0,
  })
  integral: string

  /** 备注 */

  @ApiColumn('varchar', { name: 'remark', comment: '备注', length: 255 })
  remark: string

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

  @ManyToOne(() => FsUser, (fsUser) => fsUser.fsGifts, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: FsUser
}

export class FsGiftVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: FsGift
}

export class FsGiftArrayVo extends ApiResultVo {
  @ApiProperty({ type: [FsGift], required: false })
  data: FsGift[]
}

export class FsGiftPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [FsGift], required: false })
  data: FsGift[]
}

/** 定义where类型 for 余额积分赠送表 */
export declare type WhereFsGift = FindOptionsWhere<FsGift>
/** 定义Record类型 for 余额积分赠送表 */
export declare type RecFsGift = DeepPartial<FsGift>
/** 定义Select类型 for 余额积分赠送表 */
export declare type SelectFsGift = FindOptionsSelect<FsGift>
/** 定义Order类型 for 余额积分赠送表 */
export declare type OrderFsGift = FindOptionsOrder<FsGift>

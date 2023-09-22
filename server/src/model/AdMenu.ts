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

/** 后台菜单表 */
@Entity('ad_menu', { schema: 'freshshop' })
export class AdMenu {
  public static getTableName() {
    return `ad_menu`
  }
  /** ID */
  @ApiColumn('int', { primary: true, name: 'id', comment: 'ID' })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'ID' })
  id: number

  /** 路由名称 */

  @ApiColumn('varchar', { name: 'name', comment: '路由名称', length: 255 })
  name: string

  /** 路由路径 */

  @ApiColumn('varchar', { name: 'path', comment: '路由路径', length: 255 })
  path: string

  /** 组件路径 */

  @ApiColumn('varchar', { name: 'component', comment: '组件路径', length: 255 })
  component: string

  /** 重定向 */

  @ApiColumn('varchar', {
    name: 'redirect',
    nullable: true,
    comment: '重定向',
    length: 255,
  })
  redirect: string | null

  /** 菜单标题 */

  @ApiColumn('varchar', { name: 'title', comment: '菜单标题', length: 255 })
  title: string

  /** 是否外链 */

  @ApiColumn('tinyint', { name: 'isLink', comment: '是否外链', width: 1 })
  isLink: boolean

  /** 是否缓存 */

  @ApiColumn('tinyint', { name: 'isKeepAlive', comment: '是否缓存', width: 1 })
  isKeepAlive: boolean

  /** 是否固定 */

  @ApiColumn('tinyint', { name: 'isAffix', comment: '是否固定', width: 1 })
  isAffix: boolean

  /** 是否内嵌 */

  @ApiColumn('tinyint', { name: 'isIframe', comment: '是否内嵌', width: 1 })
  isIframe: boolean

  /** 是否隐藏 */

  @ApiColumn('tinyint', { name: 'isHide', comment: '是否隐藏', width: 1 })
  isHide: boolean

  /** 菜单图标 */

  @ApiColumn('varchar', {
    name: 'icon',
    nullable: true,
    comment: '菜单图标',
    length: 255,
  })
  icon: string | null

  /** 菜单排序 */

  @ApiColumn('int', { name: 'menuSort', comment: '菜单排序' })
  menuSort: number

  /** 菜单类型 */

  @ApiColumn('varchar', { name: 'menuType', comment: '菜单类型', length: 255 })
  menuType: string

  /** 父节点id */

  @ApiColumn('int', {
    name: 'pid',
    nullable: true,
    comment: '父节点id',
    unsigned: true,
  })
  pid: number | null

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

export class AdMenuVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdMenu
}

export class AdMenuArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdMenu], required: false })
  data: AdMenu[]
}

export class AdMenuPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdMenu], required: false })
  data: AdMenu[]
}

/** 定义where类型 for 后台菜单表 */
export declare type WhereAdMenu = FindOptionsWhere<AdMenu>
/** 定义Record类型 for 后台菜单表 */
export declare type RecAdMenu = DeepPartial<AdMenu>
/** 定义Select类型 for 后台菜单表 */
export declare type SelectAdMenu = FindOptionsSelect<AdMenu>
/** 定义Order类型 for 后台菜单表 */
export declare type OrderAdMenu = FindOptionsOrder<AdMenu>

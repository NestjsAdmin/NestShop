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

/** 后台角色菜单关系表 */
@Entity('ad_role_menu', { schema: 'freshshop' })
export class AdRoleMenu {
  public static getTableName() {
    return `ad_role_menu`
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

  /** 角色id */

  @ApiColumn('int', { name: 'roleId', comment: '角色id' })
  roleId: number

  /** 菜单id */

  @ApiColumn('int', { name: 'menuId', comment: '菜单id' })
  menuId: number

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
}

export class AdRoleMenuVo extends ApiResultVo {
  @ApiProperty({ required: false })
  data: AdRoleMenu
}

export class AdRoleMenuArrayVo extends ApiResultVo {
  @ApiProperty({ type: [AdRoleMenu], required: false })
  data: AdRoleMenu[]
}

export class AdRoleMenuPageVo extends ApiResultPageVo {
  @ApiProperty({ type: [AdRoleMenu], required: false })
  data: AdRoleMenu[]
}

/** 定义where类型 for 后台角色菜单关系表 */
export declare type WhereAdRoleMenu = FindOptionsWhere<AdRoleMenu>
/** 定义Record类型 for 后台角色菜单关系表 */
export declare type RecAdRoleMenu = DeepPartial<AdRoleMenu>
/** 定义Select类型 for 后台角色菜单关系表 */
export declare type SelectAdRoleMenu = FindOptionsSelect<AdRoleMenu>
/** 定义Order类型 for 后台角色菜单关系表 */
export declare type OrderAdRoleMenu = FindOptionsOrder<AdRoleMenu>

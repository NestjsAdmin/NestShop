import { ApiProperty } from '@nestjs/swagger'

export class RoleMenuDto {
  @ApiProperty({ description: '角色id' })
  roleId: number

  @ApiProperty({
    type: [Number],
    description: '菜单id集合',
  })
  ids: number[]
}

import { AdRole } from '@/model/AdRole'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { RoleQueryDto } from './dto/role-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import { RoleMenuDto } from './dto/role-menu.dto'
import { AdRoleMenu } from '@/model/AdRoleMenu'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(AdRole)
    private readonly roleModel: Repository<AdRole>,
    @InjectRepository(AdRoleMenu)
    private readonly roleMenuModel: Repository<AdRoleMenu>
  ) {}

  async findAll(roleQueryDto: RoleQueryDto) {
    const condition = {
      where: [
        {
          delFlag: false,
          name: Like(`%${roleQueryDto.name}%`),
        },
      ],
      order: {
        createAt: 'DESC',
      },
    }
    return await SqlTools.findToPage<AdRole>(
      this.roleModel,
      roleQueryDto,
      condition
    )
  }

  save(role: AdRole) {
    return this.roleModel.save(role)
  }

  async update(role: AdRole) {
    const result = await this.roleModel.update(role.id, role)
    return result.affected > 0
  }

  async deleteById(id: number) {
    // const result = await this.roleModel.delete(id)
    const result = await OrmUtils.softDeletion(this.roleModel, { id })
    return result.affected > 0
  }

  getRoleMenu(id: number) {
    return this.roleMenuModel.find({
      where: {
        roleId: id,
      },
    })
  }

  async saveRoleMenu(roleMenuDto: RoleMenuDto) {
    const roleMenus: AdRoleMenu[] = roleMenuDto.ids.map((menuId) => {
      const roleMenu = new AdRoleMenu()
      roleMenu.menuId = menuId
      roleMenu.roleId = roleMenuDto.roleId
      return roleMenu
    })
    return (await this.roleMenuModel.save(roleMenus)) ? true : false
  }
}

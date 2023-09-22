import { AdMenu } from '@/model/AdMenu'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MenuVo, MetaVo } from './vo/menu.vo'
import { AdRoleMenu } from '@/model/AdRoleMenu'
import { AdUser } from '@/model/AdUser'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(AdMenu) private menuModel: Repository<AdMenu>,
    @InjectRepository(AdRoleMenu) private roleMenuModel: Repository<AdRoleMenu>
  ) {}

  async find(user: AdUser) {
    const menuIds = (
      await this.roleMenuModel.find({
        where: {
          roleId: user.roleId,
        },
        order: {
          createAt: 'DESC',
        },
      })
    ).map((item) => item.menuId)
    const menus: AdMenu[] = (await this.findAll()).filter(
      (item) =>
        (user.roleName !== '系统管理员' && menuIds.includes(item.id)) ||
        !user.isDel
    )
    const arrayToTree = (arr: AdMenu[], parent?: MenuVo): MenuVo[] | MenuVo => {
      const result: MenuVo[] = []
      arr.forEach((item: MenuVo) => {
        const hasParent = !parent && !item.pid
        const notParent = parent && item.pid === parent.id
        if (hasParent || notParent) {
          const index = result.push(arrayToTree(arr, item) as MenuVo) - 1
          result[index].meta = new MetaVo()
          result[index].meta.icon = item.icon
          result[index].meta.isAffix = item.isAffix
          result[index].meta.isHide = item.isHide
          result[index].meta.isIframe = item.isIframe
          result[index].meta.isKeepAlive = item.isKeepAlive
          result[index].meta.isLink = item.isLink
          result[index].meta.title = item.title
        }
      })
      if (parent) {
        parent.children = result
        return parent
      }
      return result
    }
    return arrayToTree(menus)
  }

  findAll() {
    return OrmUtils.createQueryBuilder(this.menuModel)
      .orderBy('menuSort', 'ASC')
      .getMany()
  }

  findById(id: number) {
    return this.menuModel.findOne({
      where: {
        delFlag: false,
        id,
      },
    })
  }

  save(menu: AdMenu) {
    return this.menuModel.save(menu)
  }

  async update(menu: AdMenu) {
    const result = await this.menuModel.update(menu.id, menu)
    return result.affected > 0
  }

  async deleteById(id: number) {
    // const result = await this.menuModel.delete(id)
    const result = await OrmUtils.softDeletion(this.menuModel, { id })
    return result.affected > 0
  }
}

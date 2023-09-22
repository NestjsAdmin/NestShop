import { AdDept } from '@/model/AdDept'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'
import { DeptVo } from './vo/dept.vo'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(AdDept) private deptModel: Repository<AdDept>
  ) {}

  async find() {
    const depts: AdDept[] = await this.findAll()
    const arrayToTree = (arr: AdDept[], parent?: DeptVo): DeptVo[] | DeptVo => {
      const result: DeptVo[] = []
      arr.forEach((item: DeptVo) => {
        const hasParent = !parent && !item.pid
        const notParent = parent && item.pid === parent.id
        if (hasParent || notParent) {
          result.push(arrayToTree(arr, item) as DeptVo)
        }
      })
      if (parent) {
        parent.children = result
        return parent
      }
      return result
    }
    return arrayToTree(depts)
  }

  findAll() {
    return this.deptModel.find({
      where: {
        delFlag: false,
      },
      order: {
        createAt: 'DESC',
      },
    })
  }

  findById(id: number) {
    return this.deptModel.findOne({
      where: {
        delFlag: false,
        id,
      },
    })
  }

  save(dept: AdDept) {
    return this.deptModel.save(dept)
  }

  update(dept: AdDept) {
    return this.deptModel.update(dept.id, dept)
  }

  async deleteById(id: number) {
    // const result = await this.deptModel.delete(id)
    const result = await OrmUtils.softDeletion(this.deptModel, { id })
    return result.affected > 0
  }
}

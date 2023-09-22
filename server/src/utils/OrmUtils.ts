import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm'
import { columnName } from '@zdhsoft/tmg/dist/src/NamingStrategy'

export default class OrmUtils<T> extends Repository<T> {
  /**
   * 逻辑删除
   * @param rep
   * @param data
   */
  public static async softDeletion(rep: Repository<any>, data: object) {
    if (data && Object.keys(data).length < 0) {
      return
    }
    let res = rep.createQueryBuilder()
    Object.keys(data).forEach((key: string) => {
      res = res.where(key + ' = :' + key, { [key]: data[key] })
    })
    return await res.update({ delFlag: true }).execute()
  }

  /**
   * 创建查询构造器，默认过滤了逻辑删除
   * @param rep
   */
  public static createQueryBuilder(rep: Repository<any>) {
    return rep
      .createQueryBuilder()
      .where('del_flag = :delFlag', { delFlag: false })
  }
}

import { PageDto } from '@/common/dto/page.dto'
import * as dayjs from 'dayjs'
import { Between, FindManyOptions, Repository } from 'typeorm'

export interface PageData<T> {
  data: T
  page: number
  pageSize: number
  totalCount: number
}

export class SqlTools {
  // 将数据集转成 PageData 类型
  public static async findToPage<T>(
    model: Repository<T>,
    pageDto: PageDto,
    condition: FindManyOptions
  ): Promise<PageData<T[]>> {
    pageDto.page = pageDto.page || 1
    pageDto.pageSize = pageDto.pageSize || 10
    condition = {
      ...condition,
      skip: (pageDto.page - 1) * pageDto.pageSize,
      take: pageDto.pageSize,
    }
    if (condition.where?.length === 0) delete condition.where
    const data = await model.find(condition)
    const totalCount = await model.count(condition)
    return {
      data: data as T[],
      page: Number(pageDto.page),
      pageSize: Number(pageDto.pageSize),
      totalCount,
    }
  }

  // 转换类型
  public static transformType<T>(value: any, target: T, prefix = ''): T {
    for (const key in target) {
      target[key] = value[prefix + key]
    }
    return target
  }

  // 转换前缀
  public static transformPrefix<T>(value: any[], prefix: string): T[] {
    const result = []
    let obj = {}
    value.forEach((item: any) => {
      for (const key in item) {
        if (key.includes(prefix)) obj[key.replace(prefix, '')] = item[key]
      }
      result.push(obj)
      obj = {}
    })
    return result
  }

  // 指定时间范围
  // public static betweenDates(from: Date | string, to: Date | string) {
  //   if (!from || !to) return
  //   return Between(
  //     dayjs(from).format('YYYY-MM-DD HH:mm:ss'),
  //     dayjs(to).format('YYYY-MM-DD HH:mm:ss')
  //   )
  // }
  public static betweenDates(from: Date | string, to: Date | string) {
    if (!from || !to) return
    let startTime = dayjs(from).format('YYYY-MM-DD HH:mm:ss')
    let endTime = dayjs(to).format('YYYY-MM-DD HH:mm:ss')
    return Between(startTime, endTime)
  }
}

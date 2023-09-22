import { PageData } from './sqlTools'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class ApiResult<T> {
  private code: number
  private msg?: string
  private data?: any
  private page?: number
  private pageSize?: number
  private totalCount?: number

  constructor(code?, msg?, data?, page?, pageSize?, totalCount?) {
    this.code = code || 200
    this.msg = msg
    this.data = data
    this.page = page
    this.pageSize = pageSize
    this.totalCount = totalCount
  }

  public static custom<T>({
    code = 200,
    msg = undefined,
    data = undefined,
    page = undefined,
    pageSize = undefined,
    totalCount = undefined,
  }) {
    return new ApiResult<T>(code, msg, data, page, pageSize, totalCount)
  }

  public static success<T>(
    data?,
    msg = '成功',
    page?: number,
    pageSize?: number,
    totalCount?: number
  ) {
    return this.custom<T>({
      code: 200,
      msg,
      data,
      page,
      pageSize,
      totalCount,
    })
  }

  public static warning<T>(msg = '失败') {
    return this.custom<T>({
      code: 400,
      msg,
    })
  }

  public static fail<T>(msg = '错误') {
    return this.custom<T>({
      code: 500,
      msg,
    })
  }

  public static default<T>(value: boolean) {
    return value ? this.success<T>() : this.warning<T>()
  }

  public static page<T>(pageData: PageData<any>, msg = '查询成功') {
    return this.custom<T>({
      code: 200,
      msg,
      data: pageData.data,
      page: pageData.page,
      pageSize: pageData.pageSize,
      totalCount: pageData.totalCount,
    })
  }

  public static throw(statusCode, message) {
    throw {
      response: {
        statusCode,
        message,
      },
    }
  }
}

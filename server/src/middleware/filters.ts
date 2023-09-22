import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common'
import { Catch } from '@nestjs/common'
import ApiResult from '@/utils/apiResult'
import { FastifyReply, FastifyRequest } from 'fastify'
import config from '@/config'
import jwt from '@/utils/jwt'

const logger = new Logger('NestError')

@Catch()
export default class Filters implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyReply>()

    const token = jwt.getHeaderToken(request)
    logger.error(
      JSON.stringify({
        method: request.method,
        url: request.url,
        token: jwt.getToken(token) || {},
        body: request.body || {},
        err: exception.toString(),
      }),
      ''
    )
    logger.error(exception, '')

    const statusCode = exception?.response?.statusCode
    const message = exception?.response?.message
    if (statusCode === 400)
      response
        .status(statusCode)
        .send(
          ApiResult.warning('提交的数据有误！详情：' + `${message.toString()}`)
        )
    else if (statusCode === 404)
      response.status(statusCode).send(
        ApiResult.custom({
          code: statusCode,
          msg: '所访问的路径不存在！',
        })
      )
    else response.status(500).send(ApiResult.fail('服务器发生错误！'))
  }
}

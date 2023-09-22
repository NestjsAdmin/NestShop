import {
  NestInterceptor,
  CallHandler,
  Logger,
  ExecutionContext,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { FastifyRequest } from 'fastify'
import config from '@/config'
import jwt from '@/utils/jwt'

const logger = new Logger('NestResponse')

export default class Interceptors implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    return next.handle().pipe(
      map((data) => {
        logger.log(
          JSON.stringify({
            method: request.method,
            url: request.url,
            token: jwt.parse(request) || {},
            body: request.body || {},
          })
        )
        return data
      })
    )
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from '@/utils/jwt'
import config from '@/config'
import ApiResult from '@/utils/apiResult'

@Injectable()
export default class Guards implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const response = context.switchToHttp().getResponse<FastifyReply>()
    const token = jwt.getHeaderToken(request)
    const roles =
      new Reflector().get<string[]>('roles', context.getHandler()) || []
    const role = jwt.getToken(token)?.role

    if (roles.length === 0) return true

    if (!role) {
      response.status(401).send(
        ApiResult.custom({
          code: 401,
          msg: '需要身份验证！',
        })
      )
      return false
    }

    if (role && roles.includes(role)) return true

    response.status(403).send(
      ApiResult.custom({
        code: 403,
        msg: '未经授权访问！',
      })
    )
    return false
  }
}

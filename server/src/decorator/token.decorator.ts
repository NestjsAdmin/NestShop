import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import jwt from '@/utils/jwt'
import config from '@/config'
import { TokenDto } from '@/common/dto/token.dto'
import { FsUser } from '@/model/FsUser'
import { AdUser } from '@/model/AdUser'

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenDto<AdUser | FsUser> => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>()
    return jwt.parse(request)
  }
)

import * as jwt from 'jsonwebtoken'
import config from '@/config'
import { FastifyRequest } from 'fastify'

class Jwt {
  public static setToken({
    data,
    role,
    expires,
  }: {
    data: any
    role?: string
    expires?: string | number
  }) {
    data.role = role || ''
    return jwt.sign({ ...data }, config.jwt.secret, {
      expiresIn: expires || config.jwt.expires,
    })
  }

  public static getToken(token: string): any {
    try {
      return jwt.verify(token, config.jwt.secret)
    } catch (err) {}
    return {}
  }

  /**
   * 获取请求头中的token
   * @param req
   * @returns
   */
  public static getHeaderToken(req: FastifyRequest) {
    return (
      req.headers[config.jwt.header] ||
      req.headers[config.jwt.header.toLocaleLowerCase()]
    )
      ?.toString()
      .replace('Bearer ', '')
      .replace('bearer ', '')
  }

  public static parse(req: FastifyRequest) {
    return this.getToken(this.getHeaderToken(req))
  }
}
export default Jwt

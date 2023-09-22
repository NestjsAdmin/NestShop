import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AdUser } from '@/model/AdUser'
import { Like, Repository } from 'typeorm'
import * as svgCaptcha from 'svg-captcha'
import jwt from '@/utils/jwt'
import { Captcha } from './vo/captcha.vo'
// import * as crypto from 'crypto'
import { UserLoginDataVo } from './vo/user-login.vo'
import { UserQueryDto } from '../user/dto/user-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdUser)
    private readonly userModel: Repository<AdUser>
  ) {}

  captcha() {
    const result = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 160,
      ignoreChars: '0oO1ilI',
      background: '#cc9966',
    })
    const captcha = new Captcha()
    captcha.img =
      'data:image/svg+xml;base64,' + Buffer.from(result.data).toString('base64')
    captcha.code = jwt.setToken({
      data: { captcha: result.text.toLowerCase() },
      role: '',
      expires: '5m',
    })
    return captcha
  }

  captchaVerify(captcha: string, code: string) {
    const token = jwt.getToken(code)
    if (
      !token ||
      token.captcha?.toLocaleLowerCase() !== captcha?.toLocaleLowerCase()
    )
      return false
    return true
  }

  async findByUserPass(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: {
        delFlag: false,
        username,
        password,
        status: 1,
      },
    })
    const userLoginDataVo = new UserLoginDataVo()
    userLoginDataVo.user = user
    userLoginDataVo.token = jwt.setToken({
      data: userLoginDataVo,
      role: 'admin',
    })
    return userLoginDataVo
  }

  async findAll(user: AdUser, userQueryDto: UserQueryDto) {
    const condition = {
      where: [],
    }
    if (userQueryDto.keyword)
      condition.where[0] = {
        ...condition.where[0],
        username: Like(`%${userQueryDto.keyword}%`),
      }
    condition.where.push({
      nickname: Like(`%${userQueryDto.keyword}%`),
    })
    if (user.roleName !== '系统管理员') {
      condition.where[0] = {
        ...condition.where[0],
        id: user.id,
      }
    }
    if (userQueryDto.status)
      condition.where.push({
        delFlag: false,
        status: userQueryDto.status,
      })
    return await SqlTools.findToPage<AdUser>(
      this.userModel,
      userQueryDto,
      condition
    )
  }

  findById(id: number) {
    return this.userModel.findOne({
      where: {
        delFlag: false,
        id,
      },
    })
  }

  findMyself(user: AdUser) {
    return this.userModel.findOne({
      where: {
        delFlag: false,
        id: user.id,
      },
    })
  }

  save(user: AdUser) {
    user.isDel = false
    return this.userModel.save(user)
  }

  async update(user: AdUser) {
    const result = await this.userModel.update(user.id, user)
    return result.affected > 0
  }

  async deleteById(id: number) {
    // const result = await this.userModel.delete(id)
    const result = await OrmUtils.softDeletion(this.userModel, { id })
    return result.affected > 0
  }
}

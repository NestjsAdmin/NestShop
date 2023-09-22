import { FsUser } from '@/model/FsUser'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import WxTools from '@/utils/wxTools'
import { UserWxloginDto } from './dto/user-wxlogin.dto'
import { UserWxLoginDataVo } from './vo/user-wxlogin.vo'
import jwt from '@/utils/jwt'
import config from '@/config'
import ApiResult from '@/utils/apiResult'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(FsUser)
    private readonly userModel: Repository<FsUser>
  ) {}

  async getWxlogin(userWxloginDto: UserWxloginDto) {
    const res1 = await WxTools.getAccessToken(config.wx.appid, config.wx.secret)
    const res2 = await WxTools.code2Session(
      config.wx.appid,
      config.wx.secret,
      userWxloginDto.loginCode
    )
    if (!res2.openid) return
    const res3 = await WxTools.getPhoneNumber(
      res1.access_token,
      userWxloginDto.phoneCode
    )
    if (!res3.phone_info.phoneNumber) return
    let user = await this.userModel.findOne({
      where: {
        openid: res2.openid,
        delFlag: false,
      },
    })
    if (!user) {
      user = new FsUser()
      user.appid = config.wx.appid
      user.openid = res2.openid
      user.phoneNumber = res3.phone_info.phoneNumber
      user.unionId = res2.unionid
      user.nickName = res2.openid
      user.delFlag = false
      await this.userModel.save(user)
    }
    if (user.status === 2)
      ApiResult.throw(400, '该用户已被管理员禁用登录，请联系管理员！')
    const userWxLoginDataVo = new UserWxLoginDataVo()
    userWxLoginDataVo.user = user
    userWxLoginDataVo.token = jwt.setToken({
      data: userWxLoginDataVo,
      role: 'client',
    })
    return userWxLoginDataVo
  }

  findById(id: number) {
    return this.userModel.findOne({
      where: {
        id,
        delFlag: false,
      },
    })
  }
}

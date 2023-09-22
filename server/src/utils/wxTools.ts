import axios from 'axios'
import * as dayjs from 'dayjs'
import { Aes, Formatter, Rsa } from 'wechatpay-axios-plugin'
import * as fs from 'fs'

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
}

export interface Code2SessionResponse {
  session_key: string
  unionid: string
  errmsg: string
  openid: string
  errcode: number
}

export interface PhoneNumberResponse {
  errcode: number
  errmsg: string
  phone_info: {
    phoneNumber: string
    purePhoneNumber: string
    countryCode: string
    watermark: {
      timestamp: number
      appid: string
    }
  }
}

export interface PayResponse {
  appId: string
  timestamp: string
  nonceStr: string
  package: string
  signType: string
}

export default class WxTools {
  // 获取接口调用凭据
  public static async getAccessToken(
    appid: string,
    secret: string,
    grant_type = 'client_credential'
  ): Promise<AccessTokenResponse> {
    const { data } = await axios.get(
      'https://api.weixin.qq.com/cgi-bin/token',
      {
        params: {
          appid,
          secret,
          grant_type,
        },
      }
    )
    return data
  }

  // 小程序登录
  public static async code2Session(
    appid: string,
    secret: string,
    js_code: string,
    grant_type = 'authorization_code'
  ): Promise<Code2SessionResponse> {
    const { data } = await axios.get(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        params: {
          appid,
          secret,
          js_code,
          grant_type,
        },
      }
    )
    return data
  }

  // 获取手机号
  public static async getPhoneNumber(
    access_token: string,
    code: string
  ): Promise<PhoneNumberResponse> {
    const { data } = await axios.post(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`,
      {
        code,
      }
    )
    return data
  }

  // 发起支付
  public static async pay(
    appid: string,
    serial: string,
    mchid: string,
    domain: string,
    orderNum: string,
    title: string,
    price: number,
    openid: string
  ): Promise<PayResponse> {
    const privateKey = fs.readFileSync('./pem/apiclient_key.pem')
    const data = {
      appid: appid,
      mchid: mchid,
      out_trade_no: orderNum,
      description: title,
      time_expire: dayjs().add(5, 'minute'),
      notify_url: domain + '/api/client/order/wxCallBack',
      amount: {
        total: parseInt((price * 100).toString()),
        currency: 'CNY',
      },
      payer: {
        openid: openid,
      },
    }
    const payload = JSON.stringify(data)
    const nonce = Formatter.nonce()
    const timestamp = Formatter.timestamp()
    const signature = Rsa.sign(
      Formatter.request(
        'POST',
        '/v3/pay/transactions/jsapi',
        timestamp,
        nonce,
        payload
      ),
      privateKey
    )
    const res = await axios.post(
      'https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi',
      data,
      {
        headers: {
          Authorization: Formatter.authorization(
            mchid,
            nonce,
            signature,
            timestamp,
            serial
          ),
        },
      }
    )
    if (!res.data?.prepay_id) return
    const result = {
      appId: appid,
      timeStamp: timestamp,
      nonceStr: nonce,
      package: 'prepay_id=' + res.data.prepay_id,
      signType: 'RSA',
    } as any
    result.paySign = Rsa.sign(
      Formatter.joinedByLineFeed(
        result.appId,
        result.timeStamp,
        result.nonceStr,
        result.package
      ),
      privateKey
    )
    result.timeStamp = result.timeStamp.toString()
    return result
  }

  // 退款
  public static async refunds(
    mchid: string,
    serial: string,
    out_trade_no: string,
    out_refund_no: string,
    reason: string,
    refund: number,
    total: number,
    currency = 'CNY'
  ): Promise<boolean> {
    const privateKey = fs.readFileSync('./pem/apiclient_key.pem')
    const data = {
      out_trade_no,
      out_refund_no,
      reason,
      amount: {
        refund,
        total,
        currency,
      },
    }
    const payload = JSON.stringify(data)
    const nonce = Formatter.nonce()
    const timestamp = Formatter.timestamp()
    const signature = Rsa.sign(
      Formatter.request(
        'POST',
        '/v3/refund/domestic/refunds',
        timestamp,
        nonce,
        payload
      ),
      privateKey
    )
    const res = await axios.post(
      'https://api.mch.weixin.qq.com/v3/refund/domestic/refunds',
      data,
      {
        headers: {
          Authorization: Formatter.authorization(
            mchid,
            nonce,
            signature,
            timestamp,
            serial
          ),
        },
      }
    )
    return ['PROCESSING', 'SUCCESS'].includes(res?.data?.status)
  }

  // 解密回调信息
  public static decrypt(resource: any, apiv3: string): any {
    const result = Aes.AesGcm.decrypt(
      resource.nonce,
      apiv3,
      resource.ciphertext,
      resource.associated_data
    )
    return JSON.parse(result)
  }
}

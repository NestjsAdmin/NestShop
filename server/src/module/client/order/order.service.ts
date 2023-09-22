import { FsOrder } from '@/model/FsOrder'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Like, Repository } from 'typeorm'
import { TotalVo } from './vo/order-total.vo'
import { OrderQueryDto } from './dto/order-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import { FsOrderItem } from '@/model/FsOrderItem'
import { OrderDetailPageVo } from './vo/order.vo'
import { FsUser } from '@/model/FsUser'
import { OrderDto } from './dto/order.dto'
import { FsStore } from '@/model/FsStore'
import { FsGoods } from '@/model/FsGoods'
import * as math from 'mathjs'
import * as dayjs from 'dayjs'
import { OrderReceiptDto } from './dto/order-receipt.dto'
import { Time } from './vo/time.vo'
import wxTools from '@/utils/wxTools'
import config from '@/config'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { FsRecharge } from '@/model/FsRecharge'
import { OrderRefund } from './dto/order-refund.dto'
import ApiResult from '@/utils/apiResult'
import { OrderChange } from './dto/order-change.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(FsOrder) private orderModel: Repository<FsOrder>,
    @InjectRepository(FsOrderItem)
    private orderItemModel: Repository<FsOrderItem>,
    @InjectRepository(FsStore) private storeModel: Repository<FsStore>,
    @InjectRepository(FsGoods) private goodsModel: Repository<FsGoods>,
    @InjectRepository(FsRecharge) private rechargeModel: Repository<FsRecharge>,
    private dataSource: DataSource,
    @InjectQueue('order') private orderQueue: Queue
  ) {}

  async getTotal(userId: number) {
    const totalVo = new TotalVo()
    totalVo.watingPay = await this.orderModel.count({
      where: {
        userId,
        isPaid: false,
        status: 1,
        delFlag: false,
      },
    })
    totalVo.waitingDeliver = await this.orderModel.count({
      where: {
        userId,
        isPaid: true,
        status: 1,
        delFlag: false,
      },
    })
    totalVo.waitingReceipt = await this.orderModel.count({
      where: {
        userId,
        status: 2,
        delFlag: false,
      },
    })
    totalVo.completed = await this.orderModel.count({
      where: {
        userId,
        status: 3,
        delFlag: false,
      },
    })
    totalVo.refund = await this.orderModel.count({
      where: [
        {
          userId,
          status: 4,
          delFlag: false,
        },
        {
          userId,
          status: 5,
          delFlag: false,
        },
      ],
    })
    return totalVo
  }

  async findOne(userId: number, orderNumber: string) {
    const order = await this.orderModel.findOne({
      where: {
        userId,
        orderNumber,
        delFlag: false,
      },
    })
    if (!order) ApiResult.throw(400, '该订单不存在！')
    const orderItem = await this.orderItemModel.find({
      where: {
        orderId: order.id,
        delFlag: false,
      },
    })
    return {
      order,
      orderItem,
    }
  }

  async findAll(userId: number, orderQueryDto: OrderQueryDto) {
    const condition = {
      where: [{ userId }],
    } as any
    if (orderQueryDto.keyword)
      condition.where.push(
        {
          orderNumber: Like(`%${orderQueryDto.keyword}%`),
          delFlag: false,
        },
        {
          extendNumber: Like(`%${orderQueryDto.keyword}%`),
          delFlag: false,
        },
        {
          phone: Like(`%${orderQueryDto.keyword}%`),
          delFlag: false,
        },
        {
          address: Like(`%${orderQueryDto.keyword}%`),
          delFlag: false,
        },
        {
          mark: Like(`%${orderQueryDto.keyword}%`),
          delFlag: false,
        }
      )
    if (orderQueryDto.startTime && orderQueryDto.endTime)
      condition.where[0].createAt = SqlTools.betweenDates(
        orderQueryDto.startTime,
        orderQueryDto.endTime
      )
    if (orderQueryDto.origin) condition.where[0].origin = orderQueryDto.origin
    if (orderQueryDto.isPaid + '' === 'true') condition.where[0].isPaid = 1
    if (orderQueryDto.orderType)
      condition.where[0].orderType = orderQueryDto.orderType
    else if (orderQueryDto.isPaid + '' === 'false')
      condition.where[0].isPaid = 0
    if (orderQueryDto.status)
      condition.where[0].status = In(
        JSON.parse(orderQueryDto.status.toString())
      )
    const pageData = await SqlTools.findToPage<FsOrder>(
      this.orderModel,
      orderQueryDto,
      condition
    )
    const orderDetailPage = new OrderDetailPageVo()
    orderDetailPage.data = []
    orderDetailPage.page = pageData.page
    orderDetailPage.pageSize = pageData.pageSize
    orderDetailPage.totalCount = pageData.totalCount
    for (const order of pageData.data) {
      const orderItem = await this.orderItemModel.find({
        where: {
          orderId: order.id,
          delFlag: false,
        },
      })
      orderDetailPage.data.push({
        order,
        orderItem,
      })
    }
    return orderDetailPage
  }

  async save(user: FsUser, orderDto: OrderDto) {
    let order = new FsOrder()
    const orderItem: FsOrderItem[] = []
    let totalNum = 0
    let totalPrice = 0
    let backIntegral = 0
    const store = await this.storeModel.findOne({
      where: {
        id: orderDto.storeId,
        delFlag: false,
      },
    })
    if (!store) ApiResult.throw(400, '该门店不存在！')
    const goods = await this.goodsModel.findBy({
      id: In(orderDto.item.map((item) => item.id)),
      delFlag: false,
    })
    if (goods.length !== orderDto.item.length)
      ApiResult.throw(400, '商品不存在！')

    goods.forEach((g) => {
      const number = orderDto.item.find((item) => item.id === g.id).number
      if (number > g.stock) ApiResult.throw(400, g.name + ' 库存不足！')
      const price = math.multiply(Number(g.price), number)
      totalPrice = math.add(totalPrice, price)
      backIntegral += math.chain(Number(g.backIntegral)).multiply(number).done()
      totalNum += number
    })

    order.userId = user.id
    order.userName = user.openid
    order.storeId = store.id
    order.storeName = store.name
    order.phone = orderDto.phone
    order.consignee = orderDto.consignee
    order.address = orderDto.address
    order.distributionTime = orderDto.distributionTime
    order.payType = orderDto.payType
    order.deliveryType = orderDto.deliveryType
    order.origin = orderDto.origin
    order.mark = orderDto.mark
    order.distributionTime = orderDto.distributionTime
    order.backIntegral = backIntegral
    order.totalNum = totalNum
    order.totalPrice = totalPrice.toString()
    order.orderNumber =
      dayjs().format('YYYYMMDDHHmmss') + dayjs().unix() + store.id

    await this.dataSource.transaction(async (manager) => {
      order = await manager.withRepository(this.orderModel).save(order)
      goods.forEach((g) => {
        const number = orderDto.item.find((item) => item.id === g.id).number
        const oi = new FsOrderItem()
        oi.orderId = order.id
        oi.name = g.name
        oi.price = g.price
        oi.number = number
        oi.image = g.image
        oi.refundStatus = 1
        oi.goodsId = g.id
        orderItem.push(oi)
      })
      await manager.withRepository(this.orderItemModel).save(orderItem)
      this.orderQueue.add('cancel', order.id, {
        delay: 900000,
      })
    })
    return order
  }

  async recharge(user: FsUser, rechargeId: number) {
    let order = new FsOrder()
    const recharge = await this.rechargeModel.findOne({
      where: {
        id: rechargeId,
        delFlag: false,
      },
    })
    if (!recharge) ApiResult.throw(400, '该充值选项不存在！')
    order.userId = user.id
    order.userName = user.openid
    order.phone = user.phoneNumber
    order.payType = '微信支付'
    order.payTime = new Date()
    order.origin = 1
    order.backIntegral = 0
    order.totalNum = 1
    order.totalPrice = recharge.price
    order.orderType = 2
    order.chargePrice = recharge.balance
    order.orderNumber =
      dayjs().format('YYYYMMDDHHmmss') + dayjs().unix() + recharge.id
    await this.dataSource.transaction(async (manager) => {
      order = await manager.withRepository(this.orderModel).save(order)
      await this.orderQueue.add('cancel', order.id, {
        delay: 900000,
      })
    })
    return order
  }

  async updateReceipt(userId: number, orderReceiptDto: OrderReceiptDto) {
    const order = await this.orderModel.findOne({
      where: {
        id: orderReceiptDto.id,
        userId,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.status !== 1) ApiResult.throw(400, '此订单不允许修改！')
    order.address = orderReceiptDto.address
    order.phone = orderReceiptDto.phone
    order.consignee = orderReceiptDto.consignee
    return this.orderModel.save(order)
  }

  async receipt(userId: number, id: number) {
    const result = await this.orderModel.update(
      {
        id,
        userId,
        delFlag: false,
      },
      {
        userId,
        status: 3,
      }
    )
    return result.affected > 0
  }

  async cancel(userId: number, id: number) {
    const order = await this.orderModel.findOne({
      where: {
        id,
        userId,
        delFlag: false,
      },
    })
    if (order.isPaid) ApiResult.throw(400, '付款后不能取消订单！')
    order.status = 6
    const result = await this.orderModel.save(order)
    return !!result
  }

  async balance(userId: number, orderId: number) {
    await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(FsUser, {
        where: {
          id: userId,
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      const order = await manager.findOne(FsOrder, {
        where: {
          userId,
          id: orderId,
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      if (!order) ApiResult.throw(400, '订单不存在！')
      if (order.isPaid) ApiResult.throw(400, '该订单已支付，无需再次支付！')
      if (order.payType === '积分支付')
        ApiResult.throw(400, '该订单不支持余额支付！')
      if (order.status === 6) ApiResult.throw(400, '该订单已取消！')
      const balance = math
        .chain(Number(user.balance))
        .subtract(Number(order.totalPrice))
        .done()
      if (balance < 0) ApiResult.throw(400, '余额不足！')
      order.status = 1
      order.isPaid = true
      order.payType = '余额支付'
      order.payTime = new Date()
      user.balance = balance.toString()
      user.integral = math.add(
        Number(user.integral),
        Number(order.backIntegral)
      )
      const orderItem = await manager.find(FsOrderItem, {
        where: {
          orderId: order.id,
          delFlag: false,
        },
      })
      const goods = await manager.find(FsGoods, {
        where: {
          id: In(orderItem.map((item) => item.goodsId)),
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      for (const item of goods) {
        const oi = orderItem.find((i) => i.goodsId === item.id)
        item.stock = math.subtract(item.stock, oi.number)
        item.sales = math.add(item.sales, oi.number)
      }
      await Promise.all([
        manager.save(order),
        manager.save(user),
        manager.save(goods),
      ])
    })
    return true
  }

  async weixin(user: FsUser, orderId: number) {
    const order = await this.orderModel.findOne({
      where: {
        id: orderId,
        userId: user.id,
        delFlag: false,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.isPaid) ApiResult.throw(400, '该订单已付款！')
    const name = order.orderType === 1 ? '购买生鲜产品' : '生鲜钱包充值'
    return await wxTools.pay(
      config.wx.appid,
      config.wx.serial,
      config.wx.mchid,
      config.wx.domain,
      order.orderNumber,
      name,
      Number(order.totalPrice),
      user.openid
    )
  }

  async time(storeId: number) {
    const store = await this.storeModel.findOne({
      where: {
        id: storeId,
        delFlag: false,
      },
    })
    if (!store) ApiResult.throw(400, '门店不存在！')
    const time: Time = {}
    const times: string[] = []
    const length = parseInt(store.dayTimeEnd) - parseInt(store.dayTimeStart) + 1
    new Array(length).fill(null).forEach((item, index) => {
      const hour =
        parseInt(store.dayTimeStart) + index < 10
          ? '0' + (parseInt(store.dayTimeStart) + index)
          : (parseInt(store.dayTimeStart) + index).toString()
      times.push(hour + ':00')
      if (index < length - 1 && !store.dayTimeEnd.includes(':30'))
        times.push(hour + ':30')
    })
    const day = [
      dayjs().format('YYYY-MM-DD'),
      dayjs().add(1, 'day').format('YYYY-MM-DD'),
    ]
    day.forEach((item, index) => {
      const key = index === 0 ? '今日' : '明日'
      time[key] = times
        .map((t) => item + ' ' + t)
        .filter((t) => dayjs().unix() + 9000 < dayjs(t).unix())
    })
    return time
  }

  async wxCallBack(resource: any) {
    await this.dataSource.transaction(async (manager) => {
      const result = wxTools.decrypt(resource, config.wx.apiv3)
      if (!result) return false
      const { out_trade_no: orderNumber, transaction_id: extendNumber } = result
      if (!orderNumber) return false
      const order = await manager.findOne(FsOrder, {
        where: {
          orderNumber,
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      if (!order) return false
      const user = await manager.findOne(FsUser, {
        where: {
          id: order.userId,
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      if (order.status === 6) return false
      if (order.isPaid) return false
      if (order.payType === '积分支付') return false
      user.integral = math.add(
        Number(user.integral),
        Number(order.backIntegral)
      )
      if (order.orderType === 2) {
        const balance = math.add(
          Number(user.balance),
          Number(order.chargePrice)
        )
        user.balance = balance.toString()
      }
      order.status = 1
      order.isPaid = true
      order.extendNumber = extendNumber
      order.payType = '微信支付'
      order.payTime = new Date()
      const orderItem = await manager.find(FsOrderItem, {
        where: {
          orderId: order.id,
          delFlag: false,
        },
      })
      const goods = await manager.find(FsGoods, {
        where: {
          id: In(orderItem.map((item) => item.goodsId)),
          delFlag: false,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      })
      for (const item of goods) {
        const oi = orderItem.find((i) => i.goodsId === item.id)
        item.stock = math.subtract(item.stock, oi.number)
        item.sales = math.add(item.sales, oi.number)
      }
      await Promise.all([
        manager.save(order),
        manager.save(user),
        manager.save(goods),
      ])
    })
    return true
  }

  async refund(user: FsUser, orderRefund: OrderRefund) {
    const order = await this.orderModel.findOne({
      where: {
        userId: user.id,
        id: orderRefund.orderId,
        delFlag: false,
      },
    })
    const orderItem = await this.orderItemModel.find({
      where: {
        id: In(orderRefund.orderItemIds),
        delFlag: false,
      },
    })
    if (!order || orderItem.length === 0) ApiResult.throw(400, '订单不存在！')
    if (!order.isPaid) ApiResult.throw(400, '该订单还未付款！')
    if (order.status === 4) ApiResult.throw(400, '该订单已申请退款！')
    if (order.status === 5) ApiResult.throw(400, '该订单成功退款！')
    if (![2, 3].includes(order.status)) ApiResult.throw(400, '该订单还未完成！')
    order.status = 4
    order.refundReason = orderRefund.refundReason
    order.refundImage = orderRefund.refundImage
    order.refundPrice = orderItem
      .reduce((total, item) => {
        item.refundStatus = 2
        const totalPrice = math.multiply(
          parseFloat(item.price),
          Number(item.number)
        )
        return math.add(total, totalPrice)
      }, 0)
      .toString()
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([manager.save(order), manager.save(orderItem)])
    })
    return true
  }

  async cancelRefund(user: FsUser, id: number) {
    const order = await this.orderModel.findOne({
      where: {
        userId: user.id,
        id,
        delFlag: false,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.status !== 4) ApiResult.throw(400, '该订单未申请退款！')
    order.status = 3
    order.refundImage = null
    order.refundPrice = null
    order.refundReason = null
    const orderItem = await this.orderItemModel.find({
      where: {
        orderId: order.id,
        delFlag: false,
      },
    })
    for (const item of orderItem) {
      item.refundStatus = 1
    }
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([manager.save(order), manager.save(orderItem)])
    })
    return true
  }

  async change(userId: number, orderChange: OrderChange) {
    const order = await this.orderModel.findOne({
      where: {
        userId,
        id: orderChange.orderId,
        delFlag: false,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.payType === '积分支付')
      ApiResult.throw(400, '积分支付的订单不允许更换支付方式')
    if (!['微信支付', '余额支付', '现金支付'].includes(order.payType))
      ApiResult.throw(400, '支付方式不存在')
    order.payType = orderChange.payType
    await this.orderModel.save(order)
    return true
  }
}

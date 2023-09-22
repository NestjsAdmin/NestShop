import { FsOrder } from '@/model/FsOrder'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { OrderQueryDto } from './dto/order-query.dto'
import { SqlTools } from '@/utils/sqlTools'
import { OrderDetailPageVo } from './vo/order.vo'
import { FsOrderItem } from '@/model/FsOrderItem'
import { OrderDeliveryDto } from './dto/order-delivery.dto'
import { AdUser } from '@/model/AdUser'
import { FsStore } from '@/model/FsStore'
import ApiResult from '@/utils/apiResult'
import { OrderRefuseDto } from './dto/order-refuse.dto'
import WxTools from '@/utils/wxTools'
import config from '@/config'
import * as math from 'mathjs'
import { FsUser } from '@/model/FsUser'
import { OrderRefundDto } from './dto/order-refund.dto'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(FsOrder) private orderModel: Repository<FsOrder>,
    @InjectRepository(FsOrderItem)
    private orderItemModel: Repository<FsOrderItem>,
    @InjectRepository(FsUser) private userModel: Repository<FsUser>,
    @InjectRepository(FsStore)
    private storeModel: Repository<FsStore>,
    private dataSource: DataSource
  ) {}

  async findAll(user: AdUser, orderQueryDto: OrderQueryDto) {
    const condition = {
      where: [],
      order: {
        createAt: 'DESC',
      },
    }
    if (orderQueryDto.keyword) {
      condition.where[0] = {
        ...condition.where[0],
        orderNumber: Like(`%${orderQueryDto.keyword}%`),
      }
      condition.where.push(
        {
          delFlag: false,
          extendNumber: Like(`%${orderQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          phone: Like(`%${orderQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          address: Like(`%${orderQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          mark: Like(`%${orderQueryDto.keyword}%`),
        }
      )
    }
    if (user.roleName !== '系统管理员') {
      const store = await this.storeModel.findOne({
        where: {
          delFlag: false,
          userId: user.id,
        },
      })
      if (!store) ApiResult.throw(400, '该用户没有任何门店！')
      condition.where[0] = {
        ...condition.where[0],
        storeId: store.id,
      }
    } else {
      if (orderQueryDto.storeId)
        condition.where[0] = {
          ...condition.where[0],
          storeId: orderQueryDto.storeId,
        }
    }
    if (orderQueryDto.startTime && orderQueryDto.endTime)
      condition.where[0] = {
        ...condition.where[0],
        createAt: SqlTools.betweenDates(
          orderQueryDto.startTime,
          orderQueryDto.endTime
        ),
      }
    if (orderQueryDto.origin)
      condition.where[0] = {
        ...condition.where[0],
        origin: orderQueryDto.origin,
      }

    if (orderQueryDto.isPaid)
      condition.where[0] = {
        ...condition.where[0],
        isPaid: orderQueryDto.isPaid.toString() === 'true',
      }
    if (orderQueryDto.status)
      condition.where[0] = {
        ...condition.where[0],
        status: orderQueryDto.status,
      }
    if (orderQueryDto.orderType)
      condition.where[0] = {
        ...condition.where[0],
        orderType: orderQueryDto.orderType,
      }
    condition.where = condition.where.map((item, index) => {
      if (index == 0) return item
      item = {
        delFlag: false,
        ...item,
        ...condition.where[0],
      }
      delete item.orderNumber
      return item
    })
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
          delFlag: false,
          orderId: order.id,
        },
      })
      orderDetailPage.data.push({
        order,
        orderItem,
      })
    }
    return orderDetailPage
  }

  async delivery(orderDeliveryDto: OrderDeliveryDto) {
    const result = await this.orderModel.update(orderDeliveryDto.id, {
      dispatcherId: orderDeliveryDto.dispatcherId,
      dispatcherName: orderDeliveryDto.dispatcherName,
      status: 2,
    })
    return result.affected > 0
  }

  async receipt(id: number) {
    const result = await this.orderModel.update(id, {
      status: 3,
    })
    return result.affected > 0
  }

  async cancel(id: number) {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.isPaid) {
      const orderItem = await this.orderItemModel.find({
        where: {
          delFlag: false,
          orderId: order.id,
        },
      })
      if (order.status === 4) ApiResult.throw(400, '该订单已申请退款！')
      if (order.status === 5) ApiResult.throw(400, '该订单成功退款！')
      if (![2, 3].includes(order.status))
        ApiResult.throw(400, '该订单还未完成！')
      order.status = 4
      order.refundReason = '商家退款'
      order.refundImage = ''
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
        await this.refund({
          id,
          refundPrice: Number(order.refundPrice),
        })
      })
    } else order.status = 6
    const result = await this.orderModel.save(order)
    return !!result
  }

  async refuse(orderRefuse: OrderRefuseDto) {
    const order = await this.orderModel.findOne({
      where: {
        delFlag: false,
        id: orderRefuse.id,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    const orderItem = await this.orderItemModel.find({
      where: {
        delFlag: false,
        orderId: order.id,
      },
    })
    order.refundRefuse = orderRefuse.refundRefuse
    order.status = 3
    for (const item of orderItem) {
      item.refundStatus = 1
    }
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([manager.save(order), manager.save(orderItem)])
    })
    return true
  }

  async refund(orderRefund: OrderRefundDto) {
    const order = await this.orderModel.findOne({
      where: {
        delFlag: false,
        id: orderRefund.id,
      },
    })
    if (!order) ApiResult.throw(400, '订单不存在！')
    if (order.status !== 4) ApiResult.throw(400, '该订单未申请退款！')
    const user = await this.userModel.findOne({
      where: {
        delFlag: false,
        id: order.userId,
      },
    })
    if (user.integral < order.backIntegral)
      ApiResult.throw(400, '该用户积分不足以返还！')
    order.refundPrice = orderRefund.refundPrice.toString()
    if (order.payType === '微信支付') {
      const result = await WxTools.refunds(
        config.wx.mchid,
        config.wx.serial,
        order.orderNumber,
        order.orderNumber + 'r',
        order.refundReason,
        math.multiply(Number(order.refundPrice), 100),
        math.multiply(Number(order.totalPrice), 100)
      )
      if (!result) ApiResult.throw(400, '退款失败，请检查商户余额是否足够！')
    } else if (order.payType === '余额支付') {
      user.balance = math
        .add(Number(user.balance), Number(order.refundPrice))
        .toString()
    }
    const orderItem = await this.orderItemModel.find({
      where: {
        delFlag: false,
        orderId: order.id,
      },
    })
    for (const item of orderItem) {
      item.refundStatus = 3
    }
    order.status = 5
    order.refundTime = new Date()
    user.integral = math.subtract(
      Number(user.integral),
      Number(order.backIntegral)
    )
    await this.dataSource.transaction(async (manager) => {
      await Promise.all([
        manager.save(user),
        manager.save(order),
        manager.save(orderItem),
      ])
    })
    return true
  }
}

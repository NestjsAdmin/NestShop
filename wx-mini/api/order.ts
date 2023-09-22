import { request } from '@/utils/request'
import { TotalVo } from '@/models/totalVo';
import { FsOrder } from '@/models/fsOrder';
import { OrderItem } from '@/models/orderItem';
import { OrderAndItemVo } from '../models/orderAndItemVo';

const module = '/client/order'

//获取我的订单信息
export const getOrderTotal = () => request<TotalVo>({
	method: 'GET',
	url: `${module}/total`,
	showLoading: false
})

//我的订单
export const getOrder = (data : {
	page : number;
	pageSize : number;
	keyword ?: string;
	origin ?: number;
	isPaid ?: string;
	status ?: number[];
	startTime ?: string;
	endTime ?: string;
	orderType : number,
}, showLoading = true) => request<OrderAndItemVo[]>({
	method: 'GET',
	url: module,
	showLoading,
	data
})

//提交订单
export const postOrder = (data : {
	storeId : number;
	consignee : number;
	address : number;
	phone : number;
	distributionTime : number;
	payType : number;
	deliveryType : number;
	origin : number;
	mark : number;
	item : OrderItem;
}) => request<FsOrder>({
	method: 'POST',
	url: module,
	showLoading: false,
	data
})

//取消订单
export const cancelOrder = (id : number) => request({
	method: 'PUT',
	url: `${module}/cancel/${id}`,
	showLoading: false,
	data: { id }
})

//确认收货
export const receiptOrder = (id : number) => request({
	method: 'PUT',
	url: `${module}/receipt/${id}`,
	showLoading: false,
	data: { id }
})

//支付订单(余额)
export const balanceOrder = (id : number) => request({
	method: 'PUT',
	url: `${module}/balance/${id}`,
	showLoading: false,
	data: { id }
})

//支付订单(微信)
export const weixinOrder = (id : number) => request({
	method: 'PUT',
	url: `${module}/weixin/${id}`,
	showLoading: false,
	data: { id }
})

//获取店铺配送时间点
export const getTime = (storeId : number) => request<{
	今日 : string[];
	明日 : string[];
}>({
	method: 'GET',
	url: `${module}/time/${storeId}`,
	showLoading: false,
})

//查询单个订单
export const getSingleOrder = (orderNumber : string) => request<OrderAndItemVo>({
	method: 'GET',
	url: `${module}/${orderNumber}`,
	showLoading: false,
	data: { orderNumber }
})


//修改订单地址
export const modifyOrder = (data : {
	id : number;
	consignee : string;
	address : string;
	phone : string;
}) => request({
	method: 'PUT',
	url: `${module}/receipt`,
	data
})

//保存订单（充值）
export const Postrecharge = (rechargeId : number) => request<FsOrder>({
	method: 'POST',
	url: `${module}/recharge/${rechargeId}`,
	data: { rechargeId },
	showLoading: false
})


//退款申请
export const putRefund = (data : {
	orderId : number;
	orderItemIds : number[];
	refundImage : string;
	refundReason : string;
}) => request<FsOrder>({
	method: 'PUT',
	url: `${module}/refund`,
	data,
})

//取消退款
export const cancelRefund = (id : number) => request<FsOrder>({
	method: 'PUT',
	url: `${module}/cancelRefund/${id}`,
	data: {
		id
	},
})

//更改支付方式
export const changeOredrPayWay = (data : {
	orderId : number;
	payType : string;
}) => request({
	method: 'PUT',
	url: `${module}/change`,
	data
})
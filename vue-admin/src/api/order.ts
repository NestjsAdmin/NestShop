import { OrderAndItemVo } from '../common/models/order-and-item-vo';
import request from '/@/utils/request';

const module = '/admin/order';

//获取订单列表
export const getOrder = (
	params: {
		page?: number;
		pageSize?: number;
		keyword?: string;
		origin?: number;
		isPaid?: string;
		status?: number;
		startTime?: string;
		endTime?: string;
		orderType: number;
	},
	showLoading: boolean = false
) => {
	return request<Array<OrderAndItemVo>>({
		method: 'get',
		url: module,
		showLoading,
		params,
	});
};

//开始配送
export const OrderDelivery = (data: { id: number; dispatcherId: number; dispatcherName: string }) => {
	return request<Array<OrderAndItemVo>>({
		method: 'patch',
		url: `${module}/delivery`,
		data,
	});
};

//确认收货
export const receiptGoods = (id: number) => {
	return request<Array<OrderAndItemVo>>({
		method: 'patch',
		url: `${module}/receipt/${id}`,
	});
};

//拒绝退款
export const refuseRefund = (data: { id: number; refundRefuse: string }) => {
	return request({
		method: 'patch',
		url: `${module}/refuse`,
		data,
	});
};

//同意退款
export const agreeRefund = (data: { id: number; refundPrice: number }) => {
	return request({
		method: 'patch',
		url: `${module}/refund`,
		data,
	});
};

//取消订单
export const cancelOrder = (id: number) => {
	return request({
		method: 'patch',
		url: `${module}/cancel/${id}`,
		data: {
			id,
		},
	});
};

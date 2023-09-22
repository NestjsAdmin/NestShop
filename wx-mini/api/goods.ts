import { request } from '@/utils/request'
import { Goods } from '@/models/goods'

const module = '/client/goods'

//查询商品
export const getGoods = (data: {
	page?: number,
	pageSize?: number,
	keyword?: string,
	cateId?: number,
	type?: string,
	status?: number,
	isLimitTime?: string,
	salesSort?: string,
	priceSort?: string,
	storeId?: number,
}, showLoading = false) => request<Goods[]>({
	method: 'GET',
	url: module,
	showLoading,
	data
})

//查询商品(根据标签)
export const getGoodsByLabel = (data: {
	page?: number,
	pageSize?: number,
	keyword?: string,
	cateId?: number,
	type?: string,
	status?: number,
	storeId?: number,
	labelName?: string,
}) => request<Goods[]>({
	method: 'GET',
	url: `${module}/label`,
	showLoading: false,
	data
})

//查询单个商品
export const getGood = (id: number) => request<Goods>({
	method: 'GET',
	url: `${module}/${id}`,
	showLoading: false,
})
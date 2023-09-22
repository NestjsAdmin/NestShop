import { request } from '@/utils/request'
import { Store } from '../models/store'

const module = '/client/store'

//查询门店
export const getStore = (data: {
	keyword?: string;
	lng?: number;
	lat?: number;
}) => request<Store[]>({
	method: 'GET',
	url: module,
	data,
	showLoading: false
})

//查询最近门店
export const getStoreNear = (data: {
	lng?: number;
	lat?: number;
}) => request<Store>({
	method: 'GET',
	url: `${module}/near`,
	showLoading: false,
	data
})
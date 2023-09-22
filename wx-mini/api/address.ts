import { request } from '@/utils/request'
import { FsAddress } from '../models/FsAddress'

const module = '/client/address'

//查询地址
export const getAddressList = (showLoading = false) => request<FsAddress[]>({
	method: 'GET',
	url: module,
	showLoading,
})

//查询地址
export const getAddress = (id: number) => request<FsAddress>({
	method: 'GET',
	url: `${module}/${id}`,
})

//新增地址
export const postAddress = (data: FsAddress) => request({
	method: 'POST',
	url: module,
	data
})

//更新地址
export const putAddress = (data: FsAddress) => request({
	method: 'PUT',
	url: module,
	data
})

//删除地址
export const deleteAddress = (id: number) => request({
	method: 'DELETE',
	url: `${module}/${id}`,
})
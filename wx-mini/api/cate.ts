import { request } from '@/utils/request'
import { FsGoodsCate } from '../models/fsGoodsCate'
const module = '/client/cate'

//查询分类
export const getCate = (data: {
	keyword?: string,
	pid?: number
}) => request<FsGoodsCate[]>({
	method: 'GET',
	url: module,
	data,
	showLoading: false
})
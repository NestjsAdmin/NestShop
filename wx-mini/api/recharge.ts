import { request } from '@/utils/request'
import { FsRecharge } from '@/models/fsRecharge'

const module = '/client/recharge'

//查询商品
export const getRecharge = () => request<FsRecharge[]>({
	method: 'GET',
	url: module,
})
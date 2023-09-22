import { request } from '@/utils/request'
import { CartVo } from '@/models/cartVo'

const module = '/client/cart'


//查询购物车
export const getCart = (data : {
	storeId : number
}, showLoading = false) => request<CartVo[]>({
	method: 'GET',
	url: module,
	showLoading,
	data
})

//更新购物车
export const postCart = (data : {
	cart : {
		userId : number,
		storeId : number,
		origin : number,
		name : string,
		number : number,
		image : string,
		goodsId : number
	}[]
}, showLoading = false) => request({
	method: 'PUT',
	url: module,
	data,
	showLoading
})


//删除购物车
export const deleteCard = (params : {
	goodsId : number;
	storeId : number;
}, showLoading = false) => request<CartVo[]>({
	method: 'DELETE',
	url: `${module}`,
	showLoading,
	params,
	data:{...params}
})
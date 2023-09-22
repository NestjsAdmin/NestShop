import { FsGoods } from '../common/models/fs-goods';
import { FsLabelGoods } from '../common/models/fs-label-goods';
import request from '/@/utils/request';

const module = '/admin/goods';

//获取商品列表
export const getGoods = (params: {
	page?: number;
	pageSize?: number;
	keyword?: string;
	cateId?: number;
	status?: number | null;
	sellOut?: boolean | null;
	storeId?: number;
}) => {
	return request<FsGoods[]>({
		method: 'get',
		url: module,
		showLoading: false,
		params,
	});
};

//新增商品
export const postGoods = (data: FsGoods) => {
	return request<FsGoods>({
		method: 'post',
		url: module,
		showLoading: true,
		data,
	});
};

//更新商品
export const putGoods = (data: FsGoods) => {
	return request({
		method: 'put',
		url: module,
		showLoading: true,
		data,
	});
};

//删除商品
export const deleteGoods = (id: number) => {
	return request({
		method: 'delete',
		url: `${module}/${id}`,
	});
};

//查询商品标签
export const getGoodsLabel = (id: number) => {
	return request<FsLabelGoods[]>({
		method: 'get',
		url: `${module}/label/${id}`,
	});
};

//更新商品标签
export const putGoodsLabel = (data: { ids: number[]; goodsId: number }) => {
	return request({
		method: 'put',
		url: `${module}/label`,
		data,
	});
};

//批量更新商品
export const postManyGoods = (data: FsGoods[]) => {
	return request({
		method: 'post',
		url: `${module}/many`,
		data,
	});
};
//批量上下架
export const upperLowerShelvesGoods = (data: Array<number>) => {
	return request({
		method: 'put',
		url: `${module}/up`,
		data,
	});
};

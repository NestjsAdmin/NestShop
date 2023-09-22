import { FsStock } from '../common/models/fs-stock';
import request from '/@/utils/request';

const module = '/admin/stock';

//获取库存记录
export const getStock = (data: { page: number; pageSize: number; goodsId?: number }) =>
	request<FsStock[]>({
		method: 'get',
		url: module,
		data,
	});

//修改库存
export const postStock = (data: { goodsId: number; number: number; type: number; remark?: string }) =>
	request({
		method: 'post',
		url: module,
		data,
	});

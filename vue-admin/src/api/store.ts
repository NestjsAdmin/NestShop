import { FsStore } from '../common/models/fs-store';
import request from '/@/utils/request';

const module = '/admin/store';

//获取门店列表
export const getStore = (params: { page: number; pageSize: number; keyword?: string }, showLoading: boolean = false) => {
	return request<FsStore[]>({
		method: 'get',
		url: module,
		showLoading,
		params,
	});
};

//新增门店
export const postStore = (data: FsStore) => {
	return request<FsStore>({
		method: 'post',
		url: module,
		data,
	});
};

//更新门店
export const putStore = (data: FsStore) => {
	return request({
		method: 'put',
		url: module,
		data,
	});
};

//删除门店
export const deleteStore = (id: number) => {
	return request({
		method: 'delete',
		url: `${module}/${id}`,
	});
};

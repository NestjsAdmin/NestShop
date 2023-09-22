import { FsGoodsLabel } from '/@/common/models/fs-goods-label';
import request from '/@/utils/request';

const module = '/admin/label';

//获取标签列表
export const getLabel = (params: { page: number; pageSize: number; keyword?: string }) =>
	request<FsGoodsLabel[]>({
		method: 'get',
		url: module,
		showLoading: false,
		params,
	});

//新增标签
export const postLabel = (data: FsGoodsLabel) =>
	request<FsGoodsLabel[]>({
		method: 'post',
		url: module,
		data,
	});
//新增标签
export const deleteLabel = (id: number) =>
	request<FsGoodsLabel[]>({
		method: 'delete',
		url: `${module}/${id}`,
	});

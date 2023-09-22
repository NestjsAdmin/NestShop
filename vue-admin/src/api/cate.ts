import { CateVo } from '../common/models/cate-vo';
import { FsGoodsCate } from '../common/models/fs-goods-cate';
import request from '/@/utils/request';

const module = '/admin/cate';

//查询分类
export const getCate = (showLoading: boolean = false) =>
	request<CateVo[]>({
		method: 'get',
		url: module,
		showLoading,
	});

//新增分类
export const postCate = (data: FsGoodsCate) =>
	request<FsGoodsCate>({
		method: 'post',
		url: module,
		data,
	});

//删除分类
export const deleteCate = (id: number) =>
	request<FsGoodsCate>({
		method: 'delete',
		url: `${module}/${id}`,
	});

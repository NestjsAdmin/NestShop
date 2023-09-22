import { FsUser } from '../common/models/fs-user';
import request from '/@/utils/request';

const module = '/admin/fsUser';

//查询商城用户
export const getFsuser = (params: { page: number; pageSize: number; keyword?: string }, showLoading: boolean = false) => {
	return request<FsUser[]>({
		method: 'get',
		url: module,
		showLoading,
		params,
	});
};

//查询商城用户
export const putFsuser = (data: FsUser) => {
	return request({
		method: 'put',
		url: module,
		data,
	});
};

import { FsRecharge } from '../common/models/fs-recharge';
import request from '/@/utils/request';

const module = '/admin/recharge';

//查询充值
export const getRecharge = () =>
	request<FsRecharge[]>({
		method: 'get',
		url: module,
		showLoading: false,
	});

//新增充值
export const postRecharge = (data: FsRecharge) =>
	request<FsRecharge>({
		method: 'post',
		url: module,
		data,
	});

//删除充值
export const deleteRecharge = (id: number) =>
	request({
		method: 'delete',
		url: `${module}/${id}`,
	});

import { FsGift } from '../common/models/fs-gift';
import request from '/@/utils/request';

const module = '/admin/gift';

//获取积分记录
export const getGift = (params: { userId: number; pageSize?: number; page?: number }) =>
	request<FsGift[]>({
		url: module,
		method: 'get',
		params,
	});

//赠送积分
export const postGift = (data: { userId: number; balance?: string; integral?: string; remark: string }) =>
	request({
		url: module,
		method: 'post',
		data,
	});

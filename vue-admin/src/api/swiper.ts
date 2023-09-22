import { FsSwiper } from '../common/models/fs-swiper';
import request from '/@/utils/request';

const module = '/admin/swiper';

//获取轮播图
export const getSwiper = (showLoading: boolean = false) => {
	return request<FsSwiper[]>({
		method: 'get',
		url: module,
		showLoading,
	});
};

//新增轮播图
export const postSwiper = (data: FsSwiper) => {
	return request<FsSwiper>({
		method: 'post',
		url: module,
		data,
	});
};

//删除轮播图
export const deleteSwiper = (id: number) => {
	return request<FsSwiper>({
		method: 'delete',
		url: `${module}/${id}`,
	});
};

//修改轮播图
export const putSwiper = (data: FsSwiper) => {
	return request<FsSwiper>({
		method: 'put',
		url: `${module}`,
		data,
	});
};

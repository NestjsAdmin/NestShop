import { Captcha } from '../common/models/captcha';
import { UserLoginDataVo } from '../common/models/user-login-data-vo';
import { AdUser } from '../common/models/ad-user';
import request from '/@/utils/request';

const module = '/admin/user';

// 获取验证码
export function getCaptcha() {
	return request<Captcha>({
		url: `${module}/captcha`,
		method: 'get',
	});
}

// 获取用户信息
export function getLogin(params: { captcha: string; code: string; username: string; password: string }) {
	return request<UserLoginDataVo>({
		url: `${module}/login`,
		method: 'get',
		params,
	});
}

// 查询用户
export function getUser(params: { page: number; pageSize: number; keyword?: string; status: 1 | 2 }) {
	return request<AdUser[]>({
		url: `${module}`,
		method: 'get',
		showLoading: false,
		params,
	});
}

//新增用户
export function postUser(data: AdUser) {
	return request<AdUser[]>({
		url: `${module}`,
		method: 'post',
		data,
	});
}

//更新用户
export function putUser(data: AdUser) {
	return request<AdUser[]>({
		url: `${module}`,
		method: 'post',
		data,
	});
}

// 删除用户
export function deleteUser(id: number) {
	return request({
		url: `${module}/${id}`,
		method: 'delete',
	});
}

// 删除用户
export function myself() {
	return request<AdUser>({
		url: `${module}/myself`,
		method: 'get',
	});
}

import { request } from '@/utils/request'
import {
	UserWxLoginDataVo
} from '@/models/UserWxLoginDataVo'
import { FsUser } from '@/models/fsUser'

const module = '/client/user'

// 获取登录信息
export function getWxLogin(data: {
	loginCode: string
	phoneCode: string
}) {
	return request<UserWxLoginDataVo>({
		url: `${module}/wxlogin`,
		method: 'GET',
		data
	})
}

// 获取用户信息
export function getUserInfo() {
	return request<FsUser>({
		url: module,
		method: 'GET',
		showLoading: false
	})
}

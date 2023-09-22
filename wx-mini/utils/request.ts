import url from '@/config/net'
import {
	useUser
} from '@/stores/user'

export interface RequestConfig extends UniNamespace.RequestOptions {
	showLoading?: boolean
	loadingTitle?: string
	showToast?: boolean
	params?: AnyObject
}

export interface Response<T> {
	code: number
	msg: string
	data: T
	page: number
	pageSize: number
	totalCount: number
}

interface SuccessResult extends UniNamespace.RequestSuccessCallbackResult {
	data: Response<any>
}

const defaultConfig = {
	showLoading: true,
	loadingTitle: '加载中',
	showToast: true
}

export async function request<T>(config: RequestConfig): Promise<Response<T>> {
	config = {
		...defaultConfig,
		...config,
	}

	config.url = url + config.url
	
	if (config.params) {
		Object.keys(config.params).forEach((key, index) => {
			if (index === 0) config.url += `?${key}=${config.params[key]}`
			else config.url += `&${key}=${config.params[key]}`
		})
	}

	if (config.showLoading)
		uni.showLoading({
			title: config.loadingTitle,
			mask: true
		})

	config.header = {
		...config.header,
		Authorization: uni.getStorageSync('token')
	}
	
	if (config.data) {
		for (const key in config.data as any) {
			if (config.data[key] === undefined) delete config.data[key]
		}
	}

	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			success(result: SuccessResult) {
				const { code, msg } = result.data
				const success = (code >= 200 && code <= 299) || (result.statusCode >= 200 && result.statusCode <= 299)
				const warning = (code >= 400 && code <= 499) || (result.statusCode >= 400 && result.statusCode <= 499)
				if (!success && warning && config.showToast)
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				if ((code === 401 || code === 403) || (result.statusCode === 401 || result.statusCode === 403)) {
					useUser().logout()
					uni.switchTab({
						url: '/pages/mine/mine'
					})
					uni.showToast({
						title: '请登录',
						icon: 'none',
						mask: true
					})
				}
				resolve(result.data)
			},
			fail(result) {
				uni.showToast({
					title: '服务器发生错误！',
					icon: 'error',
					mask: true
				})
				reject(result.errMsg)
			},
			complete() {
				config.showLoading && uni.hideLoading()
			}
		})
	})
}

export default request

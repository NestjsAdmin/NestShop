import { defineStore } from 'pinia'
import {
	getUserInfo,
	getWxLogin
} from '@/api/user'
import {
	FsUser
} from '@/models/fsUser'
import {
	useCart
} from '@/stores/cart'
import {
	useAddress
} from '@/stores/address'

export const useUser = defineStore('user', {
	state: () => ({
		userinfo: uni.getStorageSync('userinfo') as FsUser,
		loggedIn: uni.getStorageSync('userinfo') ? true : false,
		token: uni.getStorageSync('token') as string
	}),
	getters: {},
	actions: {
		// 微信登录
		async wxLogin(phoneCode: string) {
			if (!phoneCode) return
			return new Promise((resolve, reject) => {
				uni.login({
					success: async ({
						code: loginCode
					}) => {
						if (!loginCode || !phoneCode) {
							reject()
							return
						}
						const { code, data } = await getWxLogin({
							loginCode,
							phoneCode
						})
						if (code !== 200) {
							reject()
							return
						}
						uni.setStorageSync('userinfo', data.user)
						uni.setStorageSync('token', data.token)
						this.userinfo = data.user
						this.token = data.token
						this.loggedIn = true
						resolve(data)
					}
				})
			})
		},

		// 退出登录
		logout() {
			uni.removeStorageSync('userinfo')
			uni.removeStorageSync('token')
			this.userinfo = {}
			this.token = ''
			this.loggedIn = false
			useCart().clearCart()
			useAddress().clearAddress()
			uni.showToast({
				title: '退出成功',
				icon: 'none',
				mask: true
			})
		},

		//更新用户信息
		async updateUser() {
			if (!this.loggedIn || !this.userinfo.id) return Promise.resolve()
			const { code, data } = await getUserInfo()
			if (code !== 200) return Promise.reject()
			uni.setStorageSync('userinfo', data)
			this.userinfo = data
			this.loggedIn = true
			return Promise.resolve()
		}
	}
})

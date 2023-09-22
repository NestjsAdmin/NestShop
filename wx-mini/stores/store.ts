import { defineStore } from 'pinia'

import { Store } from '@/models/Store'
import { getStoreNear, getStore } from '../api/store'
import { useCart } from '@/stores/cart'
import { useFootprint } from '@/stores/footprint'


export const useStore = defineStore('store', {
	state: () => ({
		currentStore: uni.getStorageSync('store') as Store,
		storeList: []
	}),
	getters: {},
	actions: {
		async getStoreList(queryForm = {
			keyword: '',
			lng: 113.75179,
			lat: 23.02067
		}) {
			const {
				data,
				code
			} = await getStore(queryForm)
			if (code !== 200) return Promise.reject()
			this.storeList.length = 0
			this.storeList.push(...data)
			return Promise.resolve()
		},
		//设置店铺
		setCurrentStore(store : Store) {
			uni.setStorageSync('store', store)
			this.currentStore = store
			useCart().getCartList()
			useFootprint().clearFootprint()
		},
		//设置默认店铺
		setDefaultStore() {
			if (this.currentStore.id) return Promise.resolve()
			const queryForm = {
				lng: 0,
				lat: 0
			}
			const queryStoreNear = async (query : {
				lng : number,
				lat : number
			}) => {
				const {
					data,
					code
				} = await getStoreNear(query)
				if (code !== 200) return Promise.reject()
				this.setCurrentStore(data)
				return Promise.resolve()
			}
			return new Promise((resolve) => {
				if (this.currentStore?.id) return resolve('')
				uni.getLocation({
					success: (res : any) => {
						queryForm.lat = res.latitude
						queryForm.lng = res.longitude
					},
					fail: () => {
						uni.showToast({
							title: '获取位置失败'
						})
					},
					complete: () => {
						console.log(123);
						queryStoreNear(queryForm).finally(() => resolve(''))
					}
				})
			})

		}
	}
})
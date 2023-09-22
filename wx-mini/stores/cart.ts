import { defineStore } from 'pinia'
import { deleteCard, getCart, postCart } from '@/api/cart'
import {
	useUser
} from '@/stores/user'
import {
	useStore
} from '@/stores/store'
import { CartVo2 } from '@/models/cartVo2'

export const useCart = defineStore('cart', {
	state: () => ({ carts: [], timer: undefined, awaitUpdate: [] }),
	getters: {
		getTotal(state : any) : string {
			let count = 0.00
			state.carts.forEach((item : CartVo2) => {
				if (item.choosed) count += (parseFloat(item.price) * item.number)
			})
			return count.toFixed(2)
		},

		getGoodTotal(state : any) {
			let count = 0
			state.carts.forEach((item : CartVo2) => {
				if (item.choosed) count += item.number
			})
			return count
		},

		getIntegralTotal(state : any) {
			let count = 0
			state.carts.forEach((item : CartVo2) => {
				if (item.choosed) count += (item.backIntegral * item.number)
			})
			return count
		},

		getAllNumber(state : any) {
			let count = 0
			state.carts.forEach((item : CartVo2) => {
				count += item.number
			})
			return count
		},
	},
	actions: {
		//向后端查询购物车
		async getCartList() {
			if (!useUser().loggedIn) return
			if (this.awaitUpdate.length > 0) {
				setTimeout(() => {
					this.getCartList()
				}, 5000)
				return Promise.resolve()
			}
			const { data, code } = await getCart({
				storeId: useStore().currentStore.id
			})
			if (code !== 200) return Promise.reject()
			this.carts = data.map(item => {
				return {
					...item,
					choosed: this.carts.find((item2 : any) => {
						return item2.id === item.id
					})?.choosed || false
				}
			})
			this.setTabBarBadge()
			// if (data.length > 0) {
			// 	let count = 0
			// 	data.forEach((item : CartVo2) => {
			// 		count += item.number
			// 	})
			// 	uni.setTabBarBadge({
			// 		index: 2,
			// 		text: count.toString()
			// 	})
			// } else {
			// 	uni.removeTabBarBadge({
			// 		index: 2
			// 	})
			// }
		},
		//更新购物车
		updataCart(good : CartVo2) {
			this.timer && clearTimeout(this.timer)
			const index = this.carts.findIndex((item : CartVo2) => item.id === good.id)
			if (index > -1) {
				this.carts[index].number = good.number
			} else {
				this.carts.push({ ...good, choosed: false })
			}
			const index2 = this.awaitUpdate.findIndex((item : CartVo2) => item.id === good.id)
			if (index2 > -1) {
				this.awaitUpdate[index2].number = good.number
			} else {
				this.awaitUpdate.push(good)
			}
			this.setTabBarBadge()
			this.commitCarts()
		},

		//正式提交购物车
		commitCarts() {
			this.timer = setTimeout(async () => {
				if (this.awaitUpdate.length === 0) return Promise.resolve()
				const queryForm = []
				this.awaitUpdate.forEach((itme : CartVo2) => {
					queryForm.push({
						userId: useUser().userinfo.id,
						storeId: useStore().currentStore.id,
						origin: 1,
						name: itme.name,
						number: itme.number,
						image: itme.image,
						goodsId: itme.id
					})
				})
				const { code } = await postCart({
					cart: queryForm
				})
				if (code !== 200) return Promise.reject()
				this.awaitUpdate.length = 0
				return Promise.resolve()
			}, 5000)
		},

		//删除购物车
		async deleCart(good : CartVo2) {
			console.log(good,233);
			this.timer && clearTimeout(this.timer)
			const index = this.carts.findIndex((item : CartVo2) => item.id === good.id)
			if (index > -1) {
				this.carts.splice(index, 1)
			}
			const index2 = this.awaitUpdate.findIndex((item : CartVo2) => item.id === good.id)
			if (index2 > -1) {
				this.awaitUpdate.splice(index2, 1)
			}
			this.setTabBarBadge()
			const { code } = await deleteCard({
				goodsId: good.id,
				storeId: useStore().currentStore.id
			}).finally(() => this.commitCarts())
			if (code !== 200) return Promise.reject()
			return Promise.resolve()
		},

		async clearCart() {
			this.carts = []
			uni.removeTabBarBadge({
				index: 2
			})
		},

		//设置购物车角标
		setTabBarBadge() {
			if (this.carts.length > 0) {
				let count = 0
				this.carts.forEach((item : CartVo2) => {
					count += item.number
				})
				uni.setTabBarBadge({
					index: 2,
					text: count.toString()
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	}
})
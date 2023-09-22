<script setup lang="ts">
	import {
		onLaunch,
		onShow,
		onHide,
	} from "@dcloudio/uni-app"
	import {
		useUser
	} from '@/stores/user'
	import {
		useStore
	} from '@/stores/store'
	import {
		useCart
	} from '@/stores/cart'
	import {
		useAddress
	} from '@/stores/address'


	onLaunch(() => {
		// 设置默认门店
		useStore().setDefaultStore()
		
		// 读取用户信息
		if (useUser().loggedIn) {
			useUser().updateUser()
			useAddress().getAddress()
			useCart().getCartList()
		}
		console.log('App Launch')
	})

	onShow(() => {
		console.log('App Show')
	})

	onHide(() => {
		console.log('App Hide')
	})
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/vk-uview-ui/index.scss';
	@import '@/static/css/uview.scss';
	@import '@/static/css/common.scss';
</style>

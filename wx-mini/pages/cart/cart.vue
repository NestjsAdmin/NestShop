<template>
	<view class="content">
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
			padding="30" margin="0 30rpx 30rpx 30rpx">
			<view slot="body">
				<u-checkbox-group>
					<view v-for="item in carts" :key="item.id+ 'carts'" class="goods-item">
						<view class="goods-checkbox" @click.stop>
							<u-checkbox v-model="item.choosed" shape="circle" active-color="rgb(64, 174, 54)"
								@change="selectChange()" />
						</view>
						<view class="goods-content">
							<Goods imgWidth="170rpx" imgHeight="170rpx" direction="horizontal" :goods="item"
								fontSize="26rpx" color="black" :showBorder="false" showNumberBox :showOrigin="false" />
						</view>
					</view>
				</u-checkbox-group>
				<view class="empty" v-if="carts.length === 0">
					<view>购物车空空如也</view>
					<view class="mt-20" style="color: #999999;">赶紧去慰劳一下自己吧</view>
					<view class="mt-30" style="width: 180rpx;">
						<u-button type="primary" plain shape="circle" @click="swtToHome()">去逛逛</u-button>
					</view>
				</view>
			</view>
		</u-card>

		<view class="footer">
			<view class="flex pl-20" style="flex: 1;">
				<u-checkbox v-model="allChoosed" shape="circle" active-color="rgb(64, 174, 54)" @change="selectAll">
					<text class="ml-10">全选</text>
				</u-checkbox>
			</view>
			<view class="flex pr-20" style="color: #333333;">
				<text style="font-size: 24rpx;">合计：</text>
				<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
				<text class="mr-30" style="font-size: 34rpx;">{{getTotal}}</text>
				<u-button type="primary" shape="circle" @click.stop="navToOrderConfrim()">去结算</u-button>
			</view>
		</view>

		<Recommend ref="$Recommend" />

		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import Recommend from '@/components/recommend/index.vue'
	import Goods from '@/components/goods/index.vue'
	import {
		useCart
	} from '@/stores/cart'
	import { useUser } from '@/stores/user'
	import {
		storeToRefs
	} from 'pinia'
	import {
		onPullDownRefresh,
		onReachBottom,
		onShow
	} from '@dcloudio/uni-app'
	import {
		CartVo2
	} from '@/models/CartVo2'

	const {
		carts,
		getTotal,
	} = storeToRefs(useCart())

	const loading = ref(true)
	const allChoosed = ref(false)

	const navToOrderConfrim = () => {
		if (carts.value.some((item : CartVo2) => item.choosed)) {
			uni.navigateTo({
				url: '/subPages/orderConfrim/orderConfrim'
			})
		} else {
			uni.showToast({
				title: '未选择商品!',
				mask: true,
				icon: 'error'
			})
		}
	}

	//全选改变
	const selectAll = ({
		value
	} : {
		value : boolean
	}) => {
		if (!useUser().loggedIn) {
			uni.showToast({
				title: '请先登录！',
				icon: 'error',
				mask: true
			})
			setTimeout(() => {
				allChoosed.value = false
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			}, 1200)
			return
		}
		if (carts.value.length === 0) {
			uni.showToast({
				title: '购物车为空！',
				icon: 'error',
				mask: true
			})
			setTimeout(() => {
				allChoosed.value = false
			}, 500)
		}
		if (value) {
			carts.value.forEach((item : CartVo2) => {
				item.choosed = true
			})
		} else {
			carts.value.forEach((item : CartVo2) => {
				item.choosed = false
			})
		}
	}

	//选择的商品改变
	const selectChange = () => {
		setTimeout(() => {
			if (carts.value.some((item : CartVo2) => item.choosed === false)) {
				allChoosed.value = false
			} else {
				allChoosed.value = true
			}
		}, 300)
	}
	const $Recommend = ref()

	const swtToHome = () => {
		uni.switchTab({
			url: '/pages/home/home'
		})
	}

	//触底加载更多
	onReachBottom(() => {
		$Recommend.value.getMoreList()
	})

	onShow(() => {
		useCart().getCartList().finally(() => loading.value = false)
	})

	onPullDownRefresh(() => {
		useCart().getCartList().finally(() => uni.stopPullDownRefresh())
	})
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 30rpx;
		padding-bottom: 100rpx;

		.goods-item {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.goods-content {
				flex: 1;
			}
		}

		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.footer {
			display: flex;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100vw;
			height: 100rpx;
			background-color: white;
			border-top: 1px solid #ECECEC;
			z-index: 999;
			box-sizing: border-box;
		}
	}
</style>
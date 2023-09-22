<template>
	<view class="content-topbg" :style="`padding-top: ${useSystem().statusBarHeight}px;`">
		<!-- 头部 -->
		<view class="header flex pl-30 pr-30">
			<u-avatar :src="userinfo?.avatarUrl || ''" size="110" @click="logout()" />
			<view class="header-info ml-30" v-if="loggedIn">
				<text>微信用户</text>
				<text>{{ userinfo.phoneNumber|| '' }}</text>
			</view>
			<view class="header-info ml-30" v-else>
				<text class="pb-10" style="font-size: 24rpx; text-align: center;">未登录</text>
				<u-button type="primary" size="mini" open-type="getPhoneNumber" @getphonenumber="wxLogin">授权登录
				</u-button>
			</view>
		</view>

		<!-- 数据统计 -->
		<view class="data-info">
			<view class="data-info-item" @tap="navTo('/subPages/recharge/recharge')">
				<text style="font-size: 36rpx; font-weight: bold;">{{userinfo?.balance || 0}}</text>
				<text style="font-size: 24rpx;">余额(元)</text>
			</view>
			<view class="data-info-item" @tap="noServer">
				<text style="font-size: 36rpx; font-weight: bold;">0</text>
				<text style="font-size: 24rpx;">优惠券</text>
			</view>
			<view class="data-info-item" @tap="noServer">
				<text style="font-size: 36rpx; font-weight: bold;">0</text>
				<text style="font-size: 24rpx;">会员卡</text>
			</view>
			<view class="data-info-item">
				<text style="font-size: 36rpx; font-weight: bold;">{{userinfo?.integral || 0}}</text>
				<text style="font-size: 24rpx;">积分</text>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="mt-40">
			<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
				padding="0">
				<view class="mb-20" slot="body">
					<navigator hover-class="none" @tap="navTo('/subPages/order/order')">
						<view class="flex-between pd-30">
							<text style="font-size: 30rpx; margin-right: 15rpx;">我的订单</text>
							<view class="flex">
								<text class="mr-10" style="font-size: 24rpx; color: #666666;">查看全部
								</text>
								<u-icon name="arrow-right" color="#666666" size="20"></u-icon>
							</view>
						</view>
					</navigator>
					<u-grid :col="5" :border="false" hover-class="none">
						<navigator hover-class="none" @tap.stop="navTo('/subPages/order/order?tabsId=1')">
							<u-grid-item hover-class="none">
								<u-image width="52rpx" height="52rpx" src="/static/imgs/pingjia.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">全部订单</view>
							</u-grid-item>
						</navigator>
						<navigator hover-class="none" @tap.stop="navTo('/subPages/order/order?tabsId=2')">
							<u-grid-item hover-class="none">
								<u-image width="52rpx" height="52rpx" src="/static/imgs/fukuan.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">待付款</view>
								<u-badge type="error" v-if="myOrder.watingPay > 0" :count="myOrder.watingPay"
									:offset="[15, 35]" absolute size="mini" />
							</u-grid-item>
						</navigator>
						<navigator hover-class="none" @tap.stop="navTo('/subPages/order/order?tabsId=3')">
							<u-grid-item hover-class="none">
								<u-image width="52rpx" height="52rpx" src="/static/imgs/fahuo.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">待收货</view>
								<u-badge type="error" v-if="(myOrder.waitingDeliver + myOrder.waitingReceipt) > 0"
									:count="myOrder.waitingDeliver + myOrder.waitingReceipt" :offset="[15, 35]" absolute
									size="mini" />
							</u-grid-item>
						</navigator>
						<navigator hover-class="none" @tap.stop="navTo('/subPages/order/order?tabsId=4')">
							<u-grid-item hover-class="none">
								<u-image width="52rpx" height="52rpx" src="/static/imgs/shouhuo.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">已完成</view>
								<u-badge type="error" v-if="myOrder.completed > 0" :count="myOrder.completed"
									:offset="[15, 35]" absolute size="mini" />
							</u-grid-item>
						</navigator>
						<navigator hover-class="none" @tap.stop="navTo('/subPages/order/order?tabsId=5')">
							<u-grid-item hover-class="none">
								<u-image width="52rpx" height="52rpx" src="/static/imgs/tuikuan.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">售后</view>
								<u-badge type="error" v-if="myOrder.refund > 0" :count="myOrder.refund"
									:offset="[15, 35]" absolute size="mini" />
							</u-grid-item>
						</navigator>
					</u-grid>
				</view>
			</u-card>
		</view>

		<!-- 我的服务 -->
		<view class="mt-30">
			<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
				padding="0">
				<view class="mb-20" slot="body">
					<view class="flex-between pd-30 pb-20">
						<text style="font-size: 30rpx; margin-right: 15rpx;">我的服务</text>
					</view>
					<u-grid :col="5" :border="false" hover-class="none">
						<navigator hover-class="none" @tap="navTo('/subPages/address/address')">
							<u-grid-item hover-class="none">
								<u-image width="70rpx" height="70rpx" src="/static/imgs/shouhuodizhi.svg"
									mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">收货地址</view>
							</u-grid-item>
						</navigator>
						<navigator @click="navTo('/subPages/footprint/footprint')" hover-class="none">
							<u-grid-item hover-class="none">
								<u-image width="70rpx" height="70rpx" src="/static/imgs/zuji.svg" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">足迹</view>
							</u-grid-item>
						</navigator>
						<navigator @click="noServer" hover-class="none">
							<u-grid-item hover-class="none">
								<u-image width="70rpx" height="70rpx" src="/static/imgs/wodeshoucang.svg"
									mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">我的收藏</view>
							</u-grid-item>
						</navigator>
						<navigator @click="noServer" hover-class="none">
							<u-grid-item hover-class="none">
								<u-image width="70rpx" height="70rpx" src="/static/imgs/fuwuzhongxin.svg"
									mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
								<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">服务中心</view>
							</u-grid-item>
						</navigator>
						<navigator hover-class="none">
							<u-grid-item hover-class="none">
								<button open-type="contact" type="default" style="width: 100%;height: 100%;"
									class="button">
									<u-image width="70rpx" height="70rpx" src="/static/imgs/zaixiankefu.svg"
										mode="aspectFit">
										<template #loading>
											<u-loading mode="circle" color="rgb(64, 174, 54)" />
										</template>
									</u-image>
									<view style="color: #666666; margin-top: 15rpx; font-size: 22rpx;">在线客服</view>
								</button>
							</u-grid-item>
						</navigator>
					</u-grid>
				</view>
			</u-card>
		</view>

		<Recommend ref="$Recommend" />

		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		nextTick,
		onMounted,
		ref
	} from 'vue'
	import {
		useUser
	} from '@/stores/user'
	import {
		useSystem
	} from '@/stores/system'
	import {
		storeToRefs
	} from 'pinia'
	import Recommend from '@/components/recommend/index.vue'
	import {
		getOrderTotal
	} from '../../api/order'
	import {
		onPullDownRefresh,
		onReachBottom,
		onShow
	} from '@dcloudio/uni-app'
	import {
		useCart
	} from '@/stores/cart'
	import {
		useAddress
	} from '@/stores/address'

	const loading = ref(true)

	//用户信息
	const {
		userinfo,
		loggedIn
	} = storeToRefs(useUser())

	//我的订单信息
	const myOrder = ref({
		watingPay: 0,
		waitingDeliver: 0,
		waitingReceipt: 0,
		completed: 0,
		refund: 0,
	})

	const initPage = () => {
		if (!loggedIn.value) {
			loading.value = false
			return
		}
		Promise.all([useUser().updateUser(), getMyOrder()]).finally(() => {
			loading.value = false
			uni.stopPullDownRefresh()
			uni.hideLoading()
		})
	}

	//微信登陆
	const wxLogin = async ({
		detail: {
			code: phoneCode
		}
	}) => {
		if (await useUser().wxLogin(phoneCode)) {
			getMyOrder()
			useAddress().getAddress()
			useCart().getCartList()
		}
	}

	//退出登陆
	const logout = () => {
		if (!loggedIn.value) return
		uni.showModal({
			title: '提示',
			content: '是否确认退出登录？',
			success: ({
				confirm
			}) => {
				if (confirm) {
					useUser().logout()
					myOrder.value = {
						watingPay: 0,
						waitingDeliver: 0,
						waitingReceipt: 0,
						completed: 0,
						refund: 0
					}
				}
			}
		})
	}

	//获取我的订单列表
	const getMyOrder = async () => {
		const {
			data,
			code
		} = await getOrderTotal()
		if (code !== 200) return Promise.reject()
		myOrder.value = data
	}
	
	//暂无服务
	const noServer = () => {
		uni.showToast({
			title: '敬请期待!',
			icon: 'error',
			mask: true
		})
	}
	//推荐组件的ref
	const $Recommend = ref()
	//跳转到某页
	const navTo = (url : string) => {
		uni.navigateTo({
			url
		})
	}

	//触底加载更多
	onReachBottom(() => {
		$Recommend.value.getMoreList()
	})

	onPullDownRefresh(() => {
		uni.showLoading({
			title: '刷新中',
			mask: true
		})
		initPage()
	})

	onMounted(() => {
		initPage()
	})

	onShow(() => {
		if (!loading.value) {
			initPage()
		}
	})
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 30rpx;
		padding-bottom: 150rpx;
	}

	.content-topbg {
		box-sizing: border-box;

		.button::after {
			content: '';
			border: none;
		}

		.button {
			border: none;
			background-color: inherit;
			padding: 0;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			line-height: normal;
		}

		:deep(.u-avatar) {
			box-sizing: border-box;
			border: 2px solid white;
		}

		.header {
			align-items: center;

			.header-info {
				display: flex;
				flex-direction: column;
				color: white;

				text {
					z-index: 99;

					&:first-child {
						font-size: 32rpx;
						margin-bottom: 5rpx;
					}

					&:last-child {
						font-size: 24rpx;
						margin-bottom: 5rpx;
					}
				}
			}
		}

		.data-info {
			width: 100vw;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 40rpx;
			margin-top: 30rpx;


			.data-info-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: white;
				z-index: 99;
			}
		}
	}
</style>
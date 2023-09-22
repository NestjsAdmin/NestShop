<template>
	<view class="rechange">
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="mybalance">
				<view class="balance">
					<view>
						<text decode="">&nbsp;总资产(元)</text>
					</view>
					<view>
						{{userinfo.balance || 0}}
					</view>
				</view>
				<view class="arrow" @click="navToRechargeDetail">
					<view>
						<text decode="">充值明细&nbsp;</text>
						<u-icon name="arrow-right-double" size="24rpx"></u-icon>
					</view>
				</view>
			</view>
		</u-card>

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="selectCount">
				<view>
					选择充值金额
				</view>
				<view class="selectItem">
					<view v-for="(item,index) in rechangeList" :key="item.id+'rechange'" :class="{
							'mr0':(index+1)%3 === 0,
							'current': item.id === current.id
						}" @click="setCurrent(item)">
						<view class="rechangeCount">
							{{item.price}}
						</view>
						<view class="trueCount">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</u-card>

		<view class="bottomBtn">
			<u-button type="success" @click="commit">充值</u-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		getRecharge
	} from '@/api/recharge';
	import {
		FsRecharge
	} from '@/models/fsRecharge';
	import {
		useUser
	} from '@/stores/user'
	import {
		storeToRefs
	} from 'pinia'
	import {
		Postrecharge,
		weixinOrder
	} from '../../api/order';
	import {
		weixinPayment
	} from '../../utils/weixinPay';

	const {
		userinfo
	} = storeToRefs(useUser())


	const rechangeList = ref<FsRecharge[]>([])

	const current = ref<FsRecharge>()

	const getList = async () => {
		const {
			data,
			code
		} = await getRecharge()
		if (code !== 200) return Promise.reject()
		if (data.length > 0) current.value = data[0]
		rechangeList.value = data
		return Promise.resolve()
	}

	const setCurrent = (item : FsRecharge) => {
		current.value = item
	}

	const commit = async () => {
		uni.showLoading({
			title: '充值中...',
			mask: true
		})
		await change().finally(() => {
			uni.hideLoading()
		})
		uni.showToast({
			title: '充值成功！',
			icon: 'success',
			mask: true
		})
		// setTimeout(() => {
		// 	uni.showLoading({
		// 		title: ' 更新中...',
		// 		mask: true
		// 	})
		// 	useUser().updateUser().finally(() => {
		// 		uni.hideLoading()
		// 	})
		// }, 1200)
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
	}
	//充值
	const change = async () => {
		const {
			data,
			code
		} = await Postrecharge(current.value.id)
		if (code !== 200) return Promise.reject()
		const {
			data: data2,
			code: code2
		} = await weixinOrder(data.id)
		if (code2 !== 200) return Promise.reject()
		return weixinPayment(data2)
	}
	//打开充值记录页面
	const navToRechargeDetail = () => {
		uni.navigateTo({
			url: '/subPages/rechargeDetail/rechargeDetail'
		})
	}

	onMounted(() => {
		getList()
	})
</script>

<style scoped lang="scss">
	.rechange {
		background-color: #f8f9fa;
		padding: 0 0 30rpx;
		box-sizing: border-box;
		height: 100vh;

		.mybalance {
			background-color: $theme-color;
			display: flex;
			justify-content: space-between;
			padding: 40rpx;

			.arrow {
				color: $u-border-color;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;

				>view {
					display: flex;
				}
			}

			.balance {
				>view:first-child {
					color: $u-border-color;
					font-size: 26rpx;
				}

				>view:last-child {
					margin-top: 20rpx;
					color: white;
					font-size: 80rpx;
				}
			}
		}

		.selectCount {
			background-color: white;
			padding: 30rpx;

			.selectItem {
				display: flex;
				flex-wrap: wrap;

				.mr0 {
					margin-right: 0;
				}

				>view {
					width: 30%;
					margin-right: 5%;
					border: 3rpx $u-border-color solid;
					padding: 30rpx 0;
					margin-top: 30rpx;
					text-align: center;

					.rechangeCount {
						font-size: 40rpx;
						color: black;
					}

					.trueCount {
						margin-top: 10rpx;
						color: $theme-color;
						font-size: 20rpx;
					}
				}

				.current {
					border: 3rpx $theme-color solid;
				}
			}
		}

		.bottomBtn {
			width: 100%;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx 60rpx;
		}
	}
</style>
<template>
	<view class="content">
		<view class="paySuccessIcon">
			<view>
				<view class="pay-checkbox">
					<u-icon name="checkbox-mark" color="#fff" size="55"></u-icon>
				</view>
				<view class="pay-tip-name">
					<text>付款成功</text>
				</view>
			</view>
		</view>
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body">
				<u-cell-group :border="false">
					<u-cell-item :arrow="false">
						<template #title>
							<view class="title">接收方</view>
						</template>
						<template>
							<view class="value">生鲜</view>
						</template>
					</u-cell-item>
					<u-cell-item :arrow="false">
						<template #title>
							<view class="title">订单编号</view>
						</template>
						<template>
							<view class="value">{{order.orderNumber}}</view>
						</template>
					</u-cell-item>
					<u-cell-item :arrow="false">
						<template #title>
							<view class="title">支付方式</view>
						</template>
						<template>
							<view class="value">{{order.payType}}</view>
						</template>
					</u-cell-item>
					<u-cell-item :arrow="false">
						<template #title>
							<view class="title">积分券奖励</view>
						</template>
						<template>
							<view class="value">{{order.backIntegral}}</view>
						</template>
					</u-cell-item>
				</u-cell-group>
			</view>
		</u-card>


		<LoadingPage :show="loading" />
	</view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	const loading = ref(true)

	onMounted(() => {
		setTimeout(() => {
			loading.value = false
		}, 1000)
	})
	const order = ref({
		orderNumber: 0,
		payType: '',
		backIntegral: 0,
	})

	onLoad(({
		orderInfo
	}) => {
		if (orderInfo) {
			order.value = JSON.parse(decodeURI(orderInfo))
		}
	})
</script>

<style lang="scss" scoped>
	.paySuccessIcon {
		display: flex;
		justify-content: center;

		.pay-checkbox {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 120rpx;
			height: 120rpx;
			background-color: #40ae36;
			border-radius: 120rpx;
		}

		.pay-tip-name {
			font-weight: 500;
			font-size: 30rpx;
			color: #333333;
			margin-top: 30rpx;
		}

		padding: 160rpx 0 45rpx;
	}

	.orderDetail {

		.title {
			color: #999999;
		}

		.value {
			color: #333333;
		}
	}
</style>

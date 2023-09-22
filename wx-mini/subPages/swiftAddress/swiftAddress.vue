<template>
	<view class="content">
		<view>
			<view v-for="item in addressList" :key="item.id+'address'" class="addressitem"
				@click="setDefaultAddr(item)">
				<view>
					<view>
						<u-tag v-if="item.label" :text="item.label" type="success" />
						<text decode style="font-size: 30rpx;">&nbsp;{{item.receiver}}&ensp;{{item.phone}}</text>
					</view>
					<view class="addressDetail">
						<text>{{item.address}} {{item.addressDetail}}</text>
					</view>
				</view>
				<view>
					<u-icon v-if="selectAddress?.id === item.id" name="checkbox-mark" color="#40ae36"></u-icon>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button type="warning" shape="circle" @click="addressEdit">
				确定
			</u-button>
		</view>

		<view class="btn" style="margin-top: 20rpx;">
			<u-button type="success" shape="circle" @click="newAddress">
				添加新地址
			</u-button>
		</view>
		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		useAddress
	} from '@/stores/address'
	import {
		storeToRefs
	} from 'pinia'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		FsAddress
	} from '@/models/FsAddress';
	import {
		modifyOrder
	} from '../../api/order';

	const {
		addressList
	} = storeToRefs(useAddress())

	const selectAddress = ref < FsAddress > ()

	//确定
	const addressEdit = () => {
		if (!selectAddress.value) {
			uni.showToast({
				title: '请选择一个地址!',
				mask: true,
				icon: 'error'
			})
			return
		}
		modifyOrderAddress()
	}

	const modifyOrderAddress = async () => {
		const {
			code
		} = await modifyOrder({
			id,
			consignee: selectAddress.value.receiver,
			address: selectAddress.value.addressDetail,
			phone: selectAddress.value.phone
		})
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '修改成功!',
			icon: 'success',
			mask: true
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
	}

	//新增地址
	const newAddress = () => {
		uni.navigateTo({
			url: '/subPages/addressEdit/addressEdit'
		})
	}

	//设置默认地址
	const setDefaultAddr = async (row: FsAddress) => {
		selectAddress.value = row
	}


	const loading = ref(true)
	let id = 0

	onShow(() => {
		useAddress().getAddress && useAddress().getAddress().finally(() => loading.value = false)
		selectAddress.value = undefined
	})

	onLoad(({
		orderId
	}) => {
		if (orderId) {
			id = orderId
		}
	})
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f8f9fa;
		padding: 30rpx;
		box-sizing: border-box;
		height: 100vh;

		.btn {
			margin-top: 60rpx;
			padding: 0 40rpx;
		}

		.addressitem {
			background-color: white;
			display: flex;
			padding: 40rpx 30rpx;
			border-radius: 10rpx;
			min-height: 152rpx;
			align-items: center;
			box-sizing: border-box;
			margin-bottom: 30rpx;

			>view:first-child {
				flex-grow: 1;
				width: 300rpx;

				.addressDetail {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: $u-content-color;
				}
			}

			>view:not(:first-child) {
				flex-grow: 0;
				width: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
	}
</style>

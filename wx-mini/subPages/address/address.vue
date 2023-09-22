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
						<text>{{item.addressDetail}}</text>
					</view>
				</view>
				<view>
					<u-icon v-if="item.isDefault" name="checkbox-mark" color="#40ae36"></u-icon>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button type="warning" shape="circle" @click="addressEdit">
				编辑地址
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
		onMounted,
		ref
	} from 'vue'
	import {
		useAddress
	} from '@/stores/address'
	import {
		storeToRefs
	} from 'pinia'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		FsAddress
	} from '../../models/FsAddress';
	import {
		putAddress
	} from '../../api/address';

	const {
		addressList
	} = storeToRefs(useAddress())


	//编辑地址
	const addressEdit = () => {
		const row = useAddress().currentAddress
		if (row?.id) {
			uni.navigateTo({
				url: "/subPages/addressEdit/addressEdit?type=修改&addr=" + encodeURI(JSON.stringify(row))
			})
		} else {
			uni.showToast({
				title: '未选择地址',
				mask: true,
				icon: 'error'
			})
		}
	}

	//新增地址
	const newAddress = () => {
		uni.navigateTo({
			url: '/subPages/addressEdit/addressEdit'
		})
	}

	//设置默认地址
	const setDefaultAddr = async (row : FsAddress) => {
		const row2 = JSON.parse(JSON.stringify(row))
		row2.isDefault = true
		delete row2.createAt
		delete row2.updateAt
		const {
			code,
		} = await putAddress(row2)
		if (code !== 200) return Promise.reject()
		useAddress().getAddress()
		return Promise.resolve()
	}


	const loading = ref(true)

	onMounted(() => {
		// setTimeout(() => {
		// 	loading.value = false
		// }, 1000)
	})

	onShow(() => {
		useAddress().getAddress && useAddress().getAddress().finally(() => loading.value = false)
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
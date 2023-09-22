<template>
	<view class="storeSelect">
		<view class="mg-30 mb-30">
			<u-search placeholder="搜索门店" :show-action="false" v-model="keyWord" @search="startFilter" />
		</view>

		<view v-if="storeList2.length === 0" style="min-height: 400rpx;" class="flex-center">
			<u-empty text="商品为空" mode="search"></u-empty>
		</view>

		<u-card v-for="item in storeList2" :key="item.id + 'store'" :showHead="false" :showFoot="false"
			:head-border-bottom="false" borderRadius="25" padding="0" :border="false">
			<view slot="body" class="storeItem" @click="storeClick(item)">
				<view class="img">
					<u-image width="150rpx" height="150rpx" :src="item.image">
						<template #loading>
							<u-loading mode="circle" color="rgb(64, 174, 54)" />
						</template>
					</u-image>
				</view>
				<view class="text">
					<view class="desc">
						<text>{{item.name}} ({{item.communityName}})</text>
					</view>
					<view>
						<view class="addr">
							<text>{{item.address}}{{item.addressDetail}}</text>
						</view>
						<view class="addr" style="margin-top: 10rpx;">
							<text>距离: {{(item.distance/1000).toFixed(2)}}km</text>
						</view>
					</view>
				</view>
				<view>
					<u-icon v-if="currentStore.id === item.id" name="checkbox-mark" color="#40ae36"></u-icon>
				</view>
			</view>
		</u-card>

		<view class="bottomBtn">
			<u-button type="success" @click="back">确定</u-button>
		</view>
		<LoadingPage :show="loading" />
	</view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {
		Store
	} from '@/models/store';
	import {
		useStore
	} from '@/stores/store'
	import {
		storeToRefs
	} from 'pinia'

	const loading = ref(true)

	const {
		currentStore
	} = storeToRefs(useStore())

	const queryForm = reactive({
		keyword: '',
		lng: 113.75179,
		lat: 23.02067
	})

	const keyWord = ref('')


	//获取定位
	const getLoca = () => {
		loading.value = true
		uni.getLocation({
			success: (res : any) => {
				queryForm.lat = res.latitude
				queryForm.lng = res.longitude
			},
			fail: () => {
				uni.showToast({
					title: '获取位置失败!',
					icon: 'error'
				})
			},
			complete: () => {
				useStore().getStoreList(queryForm).finally(() => {
					loading.value = false
					startFilter()
				})
			}
		})
	}

	//点击后切换店铺
	const storeClick = (store : Store) => {
		useStore().setCurrentStore(store)
	}

	const storeList2 = ref([])

	//店铺搜索
	const startFilter = () => {
		storeList2.value = useStore().storeList.filter((item : Store) => item.communityName.includes(keyWord.value))
	}

	const back = () => {
		uni.navigateBack()
	}

	onMounted(() => {
		getLoca()
	})
</script>

<style scoped lang="scss">
	.storeSelect {
		background-color: #f8f9fa;
		padding: 30rpx 0;
		box-sizing: border-box;
		height: 100vh;

		.storeItem {
			display: flex;
			padding: 20rpx;

			>.img {
				flex-grow: 0;
			}

			>.text {
				flex-grow: 1;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				>.desc {
					font-size: 28rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.addr {
					margin-top: 15rpx;
					color: $u-tips-color;
					font-size: 24rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}

			>view:last-child {
				flex-grow: 0;
				width: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

		.selectItem {
			border: 2rpx $theme-color solid;
		}

		.bottomBtn {
			width: 100%;
			position: fixed;
			bottom: 0;
			padding: 0 20rpx 60rpx;
		}
	}
</style>
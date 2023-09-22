<template>
	<scroll-view class="topCateList" scroll-x>
		<view class="itemcontent">
			<view v-for="item in props.list" :key="item.id" @click="itemClick(item)"
				:class="[currentItem.id === item.id ? 'currentItem' : '','item']">
				<u-image width="108rpx" height="108rpx" :src="item.icon" mode="aspectFit" shape="circle" class="image">
					<template #loading>
						<u-loading mode="circle" color="rgb(64, 174, 54)" />
					</template>
				</u-image>
				<text class="text">{{item.name}}</text>
			</view>
		</view>
		<!-- <u-grid :col="5" :border="false" hover-class="none">
			<u-grid-item bg-color="#F8F9FA" hover-class="none" :custom-style="{padding: '10rpx 0 0 0'}">
			</u-grid-item>
		</u-grid> -->
	</scroll-view>
</template>

<script lang="ts" setup>
	import {
		defineProps,
		ref,
		watch
	} from 'vue'
	import {
		FsGoodsCate
	} from '../../models/fsGoodsCate';

	interface Props {
		list: FsGoodsCate[]
	}

	const props = defineProps < Props > ()

	const currentItem = ref < FsGoodsCate > ({
		pid: 0,
		name: "",
		icon: "",
		sort: 0,
		isShow: true,
	})
	watch(() => props.list, (newValue) => {
		if (newValue.length > 0) {
			currentItem.value = newValue[0]
		}
	}, {
		immediate: true
	})

	const emits = defineEmits < {
		(e: 'itemChange', value: number): void
	} > ()
	const itemClick = (item: FsGoodsCate) => {
		currentItem.value = item
		emits('itemChange', item.id)
	}

	const setTabs = (item: FsGoodsCate) => {
		currentItem.value = item
	}
	
	defineExpose({
		setTabs
	})
</script>

<style scoped lang="scss">
	.topCateList {
		width: 100%;

		.text {
			color: rgb(102, 102, 102);
			margin-top: 15rpx;
			font-size: 24rpx;
			display: inline-block;
		}

		.itemcontent {
			display: flex;
			flex-wrap: nowrap;
		}

		.item {
			width: 20vw;
			box-sizing: border-box;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 4rpx solid #f8f9fa;
		}

		.image {
			:deep(image) {
				border: 4rpx solid #f8f9fa;
			}
		}

		.currentItem {
			.text {
				background-color: $theme-color;
				color: white;
				padding: 0 15rpx;
				border-radius: 20rpx;
			}

			.image {
				:deep(image) {
					border: 4rpx solid $theme-color !important;
				}
			}
		}
	}
</style>

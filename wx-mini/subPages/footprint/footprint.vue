<template>
	<scroll-view scroll-y class="footprintcontent">
		<u-empty mode="favor" v-if="footprintList.length === 0" text="暂无浏览记录"></u-empty>
		<view v-for="item in footprintList" :key="item.id + 'footprintList'" class="goodItems">
			<Goods img-width="180rpx" img-height="180rpx" :goods="item" font-size="26rpx" color="black" hideRight />
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import { useFootprint } from '@/stores/footprint'
	import { storeToRefs } from 'pinia'
	import Goods from '@/components/goods/index.vue'
	const { footprintList } = storeToRefs(useFootprint())
</script>

<style scoped lang="scss">
	.footprintcontent {
		height: 100vh;

		:deep(.u-empty) {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.goodItems {
		width: 100vw;
		padding: 35rpx 15rpx;
	}
</style>
<template>
	<view class="flex-between">
		<scroll-view class="mr-30" scroll-x style="width: 400rpx;">
			<view class="flex mr-20">
				<view v-for="item in props.goodList" :key="item.id + 'goodTatal'" class="mr-30"
					@tap.stop="navToGoods(item.id)">
					<u-image width="110rpx" height="110rpx" :src="item.image" mode="aspectFit" border-radius="20"
						bgColor="#ECECEC">
						<template #loading>
							<u-loading mode="circle" color="rgb(64, 174, 54)" />
						</template>
					</u-image>
				</view>
			</view>
		</scroll-view>
		<view style="text-align: right;">
			<view style="font-size: 22rpx; color: #999999;">共{{props?.goodTotal || 0}}件</view>
			<view class="mt-10">
				<text style="font-size: 24rpx;">合计：</text>
				<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
				<text style="font-size: 34rpx;">{{props?.total || '0.00'}}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		defineProps
	} from 'vue'
	import {
		CartVo2
	} from '@/models/CartVo2'
	const props = defineProps < {
		goodList: CartVo2[];
		goodTotal: number;
		total: string
	} > ()

	const navToGoods = (id: number) => {
		uni.navigateTo({
			url: '/subPages/goodsDetail/goodsDetail?goodId=' + id
		})
	}
</script>

<style lang="scss" scoped>
</style>

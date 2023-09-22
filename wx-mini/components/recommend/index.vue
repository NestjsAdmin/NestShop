<template>
	<view class="recommend">
		<view v-if="props.topShow" class="flex-center">
			<image src="/static/imgs/tit-icon-l.svg" mode="aspectFit" style="width: 40rpx; height: 20rpx;" />
			<text class="ml-20 mr-20" style="font-size: 30rpx;">为你推荐</text>
			<image src="/static/imgs/tit-icon-r.svg" mode="aspectFit" style="width: 40rpx; height: 20rpx;" />
		</view>
		<view v-if="goodsList.length === 0" style="min-height: 400rpx;" class="flex-center">
			<u-empty text="商品为空" mode="search"></u-empty>
		</view>

		<u-waterfall v-else v-model="goodsList">
			<template v-slot:left="{leftList}">
				<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
					:border="false" v-for="item in leftList" :key="item.id" margin="30rpx 14rpx 30rpx 30rpx">
					<view slot="body">
						<Goods imgWidth="274rpx" imgHeight="274rpx" direction="vertical" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" fontSize="26rpx" color="black" :showOrigin="false" />
					</view>
				</u-card>
			</template>
			<template v-slot:right="{rightList}">
				<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
					:border="false" v-for="item in rightList" :key="item.id" margin="30rpx 30rpx 30rpx 14rpx">
					<view slot="body">
						<Goods imgWidth="274rpx" imgHeight="274rpx" direction="vertical" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" fontSize="26rpx" color="black" :showOrigin="false" />
					</view>
				</u-card>
			</template>
		</u-waterfall>
		<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
			<u-loading mode="circle"></u-loading>
			<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onMounted,
		ref,
	} from 'vue'
	import {
		GoodsModel
	} from '@/models/goods-model'
	import Goods from '@/components/goods/index.vue'
	import {
		getGoodsByLabel
	} from '@/api/goods';
	import {
		useStore
	} from '@/stores/store';

	const props = withDefaults(defineProps < {
		topShow: boolean
	} > (), {
		topShow: true
	})

	const goodsList = ref < GoodsModel[] > ([])

	const page = ref(1)

	const labelName = ref('推荐')

	//获取商品列表
	const getGoodList = async () => {
		const {
			data,
			code
		} = await getGoodsByLabel({
			page: page.value,
			pageSize: 10,
			storeId: useStore().currentStore.id,
			labelName: labelName.value,
			type: '0',
			status: 1
		})
		if (code !== 200) return Promise.reject()
		if (data.length === 0) noGet = true
		else noGet = false
		if (page.value === 1) {
			goodsList.value = data
		} else {
			goodsList.value.push(...data)
		}
		return Promise.resolve()
	}

	//切换查询标签
	const siwftGoodList = async (name: string, showLoading: boolean = true) => {
		page.value = 1
		labelName.value = name
		showLoading && uni.showLoading({
			title: '查询中',
			mask: true
		})
		goodsList.value.length = 0
		return await getGoodList().finally(() => uni.hideLoading())
	}

	const showMore = ref(false)
	let noGet = false
	//触底加载下一页
	const getMoreList = async () => {
		if (noGet) return
		showMore.value = true
		page.value++
		await getGoodList().finally(() => {
			showMore.value = false
		})

	}

	onMounted(() => {
		getGoodList()
	})

	defineExpose({
		siwftGoodList,
		getMoreList
	})
</script>

<style lang="scss" scoped>
	.recommend {
		width: 100vw;
		overflow-y: hidden;
	}
</style>

<template>
	<view class="shopList">
		<u-dropdown duration="10">
			<u-dropdown-item v-model="value1" title="价格" :options="options1"></u-dropdown-item>
			<u-dropdown-item v-model="value1" title="销量" :options="options2"></u-dropdown-item>
			<u-dropdown-item v-model="value2" title="筛选" :options="options3"></u-dropdown-item>
		</u-dropdown>
		<scroll-view v-if="goodsList.length !== 0" scroll-y="true" class="goodContent" @scrolltolower="scollBottom">
			<view style="padding: 1rpx;">
				<view v-for="item in goodsList" :key="item.id + 'goodsList'" class="goodItems">
					<Goods img-width="220rpx" img-height="220rpx" :goods="{
								...item.goods,
								label: item.label.map((item:any)=>item.name)
							}" font-size="26rpx" color="black" />
				</view>
				<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
					<u-loading mode="circle"></u-loading>
					<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
				</view>
			</view>
		</scroll-view>


		<u-empty v-else text="抱歉, 没有找到商品哦" mode="search" icon-size="240" margin-top="-150"></u-empty>
		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import Goods from '@/components/goods/index.vue'
	import {
		ref,
		reactive,
		watch
	} from "vue"
	import {
		GoodsModel
	} from '@/models/goods-model'
	import {
		useStore
	} from '@/stores/store';
	import {
		getGoods
	} from '@/api/goods'

	const keyword = ref('')


	const value1 = ref(0)

	const value2 = ref(0)

	const page = ref(1)

	const goodsList = ref < GoodsModel[] > ([])

	const loading = ref(true)

	const options1 = ref([{
		label: "全部",
		value: 0
	}, {
		label: "价格升序",
		value: 1
	}, {
		label: "价格倒序",
		value: 2
	}])

	const options2 = ref([{
		label: "销量升序",
		value: 3
	}, {
		label: "销量倒序",
		value: 4
	}])

	const options3 = ref([{
		label: "全部",
		value: 0
	}, {
		label: "限时秒杀",
		value: 1
	}, {
		label: "积分商品",
		value: 2
	}])

	interface searchModel {
		page: number;
		pageSize: number;
		storeId: number;
		keyword: string;
		type ? : string;
		status ? : number;
		isLimitTime ? : string;
		salesSort ? : string;
		priceSort ? : string;
		cateId ? : number;
	}
	const search = async () => {
		const queryForm: searchModel = {
			page: page.value,
			pageSize: 10,
			keyword: keyword.value,
			type: '0',
			status: 1,
			storeId: useStore().currentStore.id,
		}
		if (value1.value === 1) {
			queryForm.priceSort = 'ASC'
		} else if (value1.value === 2) {
			queryForm.priceSort = 'DESC'
		} else if (value1.value === 3) {
			queryForm.salesSort = 'ASC'
		} else if (value1.value === 4) {
			queryForm.salesSort = 'DESC'
		}
		if (value2.value === 1) {
			queryForm.isLimitTime = '1'
		} else if (value2.value === 2) {
			queryForm.type = '1'
		}
		const {
			data,
			code
		} = await getGoods(queryForm).finally(() => loading.value = false)
		if (code !== 200) return Promise.reject()
		if (data.length === 0) noGet = true
		else noGet = false
		if (page.value === 1) {
			goodsList.value = data
		} else {
			goodsList.value.push(...data)
		}
		return Promise.resolve(data)
	}

	const initSearch = (name: string = undefined) => {
		if (!loading.value) {
			uni.showLoading({
				title: '查询中',
				mask: true
			})
		}
		if (name) {
			keyword.value = name
		} else {
			keyword.value = ''
		}
		page.value = 1
		search().finally(() => uni.hideLoading())
	}
	const showMore = ref(false)
	let noGet = false
	//滚动到底部加载更多
	const scollBottom = async () => {
		if (noGet) return
		showMore.value = true
		page.value++
		search().finally(() => showMore.value = false)
	}

	watch(() => value1.value, () => {
		initSearch(keyword.value)
	})
	watch(() => value2.value, () => {
		initSearch(keyword.value)
	})

	defineExpose({
		initSearch
	})
</script>

<style scoped lang="scss">
	.shopList {
		height: 100%;

		.goodContent {
			height: calc(100% - 82rpx);

			.goodItems {
				width: 100%;
				padding: 0 20rpx;
				margin: 35rpx 15rpx;
			}
		}
	}
</style>

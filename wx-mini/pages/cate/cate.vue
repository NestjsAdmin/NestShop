<template>
	<view class="content">
		<view class="header">
			<u-search v-model="keywork" placeholder="吃出美好生活" :show-action="false" @search="navatoSearch" />
		</view>

		<view class="mt-10 firstCate">
			<topCateList :list="cateList1" @itemChange="cate1Change" ref="$topCateList" />
		</view>

		<view class="cateContent">
			<view class="left">
				<cateList :data="cateList2" @item-click="cate2Click" />
			</view>
			<view class="right">
				<!-- <subCateList :list="specificCate" /> -->
				<u-empty v-if="goodsList.length === 0" text="商品为空" mode="search"></u-empty>
				<scroll-view v-else scroll-y="true" class="right-goods" @scrolltolower="scrollBottom">
					<view v-for="item in goodsList" :key="item.id + 'goodsList'" class="goodItems">
						<Goods img-width="180rpx" img-height="180rpx" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" font-size="26rpx" color="black" />
					</view>
					<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
						<u-loading mode="circle"></u-loading>
						<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
					</view>
				</scroll-view>

			</view>
		</view>
		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import cateList from '@/components/cateList/index.vue'
	import {
		FsDictionary
	} from '@/models/fs-dictionary';
	// import subCateList from '@/components/subCateList/index.vue'
	import {
		GoodsModel
	} from '@/models/goods-model'
	import Goods from '@/components/goods/index.vue'
	import topCateList from '@/components/topCateList/index.vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		FsGoodsCate
	} from '@/models/fsGoodsCate';
	import {
		getCate
	} from '@/api/cate'
	import {
		getGoods
	} from '@/api/goods';
	import {
		useStore
	} from '@/stores/store';

	const loading = ref(true)

	const keywork = ref('')

	const navatoSearch = () => {
		uni.navigateTo({
			url: '/subPages/search/search?key=' + keywork.value
		})
	}

	const cateList2 = ref<FsDictionary[]>([])

	const page = ref(1)

	//一级分类改变
	const cate1Change = (id : number) => {
		currentCateId.value = id
		uni.showLoading({
			title: '查询中',
			mask: true
		})
		getCateList2().finally(() => uni.hideLoading())
	}

	//二级分类改变
	const cate2Click = (id : number) => {
		page.value = 1
		currentCateId.value = id
		getGoodList(true)
	}

	const goodsList = ref<GoodsModel[]>([])

	const currentCateId = ref(0)

	//获取一级分类
	const cateList1 = ref<FsGoodsCate[]>([])
	const getCateList = async (
		contin = true) => {
		const {
			data,
			code
		} = await getCate({})
		if (code !== 200) return Promise.reject()
		cateList1.value = data.filter(item => item.isShow)
		if (data.length > 0 && contin) {
			currentCateId.value = data[0].id
			await getCateList2()
		}
		return Promise.resolve()
	}

	//获取二级分类
	const getCateList2 = async () => {
		page.value = 1
		const {
			data,
			code
		} = await getCate({
			pid: currentCateId.value
		})
		if (code !== 200) return Promise.reject()
		cateList2.value = data.map(item => {
			return {
				name: item.name,
				id: item.id
			}
		})
		cateList2.value.unshift({
			name: '全部',
			id: currentCateId.value
		})
		await getGoodList()
		return Promise.resolve()
	}

	//获取商品列表
	const getGoodList = async (showLoading = false) => {
		if (page.value === 1) goodsList.value.length = 0
		const {
			data,
			code
		} = await getGoods({
			page: page.value,
			pageSize: 10,
			storeId: useStore().currentStore.id,
			cateId: currentCateId.value
		}, showLoading)
		if (code !== 200) return Promise.reject()
		if (data.length === 0) {
			noGet = true
		} else noGet = false
		if (page.value === 1) {
			goodsList.value = data
		} else {
			goodsList.value.push(...data)
		}
		return Promise.resolve()
	}

	const showMore = ref(false)

	let noGet = false

	//滚动到底部
	const scrollBottom = () => {
		if (noGet) return
		page.value++
		showMore.value = true
		getGoodList().finally(() => {
			showMore.value = false
		})

	}

	const $topCateList = ref()

	onShow(() => {
		const cate = getApp().globalData.cate
		console.log(cate);
		if (!loading.value && cate?.name) {
			uni.showLoading({
				title: '查询中',
				mask: true
			})
		}
		if (cate?.name) {
			currentCateId.value = cate.id
			getCateList(false).then(() => {
				$topCateList.value.setTabs(cate)
				getCateList2()
			}).finally(() => {
				loading.value = false
				uni.hideLoading()
				getApp().globalData.cate = undefined
			})
			return
		}
		if (loading.value && !cate?.name) {
			getCateList().finally(() => {
				loading.value = false
				uni.hideLoading()
			})
		}

	})
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.header {
			padding: 20rpx 20rpx 0 20rpx;
			flex-grow: 0
		}

		.firstCate {
			margin-top: 20rpx;
			flex-grow: 0
		}

		.cateContent {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			overflow: hidden;
			flex: 1;

			.left {
				width: 180rpx;
				height: 100%;
			}

			.right {
				flex-grow: 1;
				width: 100rpx;
				background-color: #fff;
				height: 100%;

				.right-goods {
					// height: calc(100% - 92rpx);
					height: 100%;
				}

				.goodItems {
					width: 100%;
					padding: 35rpx 15rpx;
				}
			}
		}
	}
</style>
<template>
	<scroll-view scroll-y refresher-enabled class="content" @refresherrefresh="onRefresh" :refresher-triggered="refresh"
		@scrolltolower="scrollBottom">
		<!-- 轮播图 -->
		<view class="mg-30" style="margin-top: 0;">
			<u-swiper :list="swiper.map(item=>item.image)" @click="swiperClick" />
		</view>
		<view class="mt-10">
			<u-waterfall v-model="goodsList">
				<template v-slot:left="{leftList}">
					<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25"
						padding="30" :border="false" v-for="item in leftList" :key="item.id"
						margin="30rpx 15rpx 30rpx 30rpx">
						<view slot="body">
							<Goods imgWidth="274rpx" imgHeight="274rpx" direction="vertical" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" fontSize="26rpx" color="black" :showOrigin="false" />
						</view>
					</u-card>
				</template>
				<template v-slot:right="{rightList}">
					<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25"
						padding="30" :border="false" v-for="item in rightList" :key="item.id"
						margin="30rpx 30rpx 30rpx 15rpx">
						<view slot="body">
							<Goods imgWidth="274rpx" imgHeight="274rpx" direction="vertical" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" fontSize="26rpx" color="black" :showOrigin="false" />
						</view>
					</u-card>
				</template>
			</u-waterfall>
		</view>
		<LoadingPage :show="loading" />
		<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
			<u-loading mode="circle"></u-loading>
			<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import {
		getSwiper
	} from '../../api/swiper'
	import {
		FsGoods
	} from '../../models/fsGoods';
	import {
		getGoods
	} from '../../api/goods'
	import {
		useStore
	} from '@/stores/store'
	import Goods from '@/components/goods/index.vue'

	const goodsList = ref<FsGoods[]>([])

	const refresh = ref<boolean | 'restore'>(false)
	const loading = ref(true)
	const swiper = ref([])
	const onRefresh = () => {
		refresh.value = true
		page.value = 1
		loading.value = true
		Promise.all([querySwiper(), getGoodList()]).finally(() => {
			refresh.value = false
			loading.value = false
		})
	}
	//查询轮播图
	const querySwiper = async () => {
		const {
			data,
			code
		} = await getSwiper()
		if (code !== 200) return Promise.reject()
		swiper.value = data
		return Promise.resolve()
	}
	let noGet = false
	const page = ref(1)
	//获取限时商品
	const getGoodList = async () => {
		const {
			data,
			code
		} = await getGoods({
			page: page.value,
			pageSize: 10,
			isLimitTime: '1',
			storeId: useStore().currentStore.id
		})
		if (code !== 200) return Promise.reject().finally(() => showMore.value = false)
		if (data.length === 0) noGet = true
		else noGet = false
		if (page.value === 1) {
			goodsList.value = data
		} else {
			goodsList.value.push(...data)
		}
		return Promise.resolve()
	}
	const showMore = ref(false)

	const scrollBottom = () => {
		if (noGet) return
		showMore.value = true
		page.value++
		getGoodList()
	}
	
	//点击轮播图
	const swiperClick = (index : number) => {
		if (swiper.value[index].type === 1 && swiper.value[index].url) {
			uni.navigateTo({
				url: '/subPages/outPage/outPage?url=' + swiper.value[index].url
			})
		} else if (swiper.value[index].type === 0 && swiper.value[index].url) {
			uni.navigateTo({
				url: swiper.value[index].url
			})
		}
	}

	onMounted(() => {
		Promise.all([querySwiper(), getGoodList()]).finally(() => loading.value = false)
	})
</script>

<style scoped lang="scss">
	.content {
		height: 100vh;

		:deep(.u-card) {
			margin-top: 10rpx !important;
		}

		goods {
			width: 100%;
		}
	}
</style>
<template>
	<scroll-view scroll-y refresher-enabled class="content" @refresherrefresh="refreshPage"
		:refresher-triggered="refresh" @scrolltolower="scrollBottom">
		<!-- 头部 -->
		<view class="header" :style="`height: ${useSystem().customBarHeight}px;`">
			<view class="shop-selector" @click="storeClick">
				<u-icon name="map" color="white" size="48rpx" />
				<text style="margin: 0 15rpx 0 5rpx;">{{currentStore?.name}}</text>
				<u-icon name="arrow-down-fill" color="white" size="14rpx" />
			</view>
		</view>

		<!-- 搜索栏 -->
		<view class="mg-30 mb-30">
			<u-search v-model="keywork" placeholder="吃出美好生活" :show-action="false" @search="navatoSearch" />
		</view>

		<!-- 轮播图 -->
		<view class="mg-30" style="margin-top: 0;">
			<u-swiper :list="swiper.map(item=>item.image)" @click="swiperClick" />
		</view>

		<!-- 导航栏 -->
		<view class="mt-10 mr-10 ml-10">
			<u-grid :col="5" :border="false" hover-class="none">
				<u-grid-item v-for="item in cateList" :key="item.id+'cate'" bg-color="#F8F9FA" hover-class="none"
					@click="navToCate(item)">
					<u-image width="108rpx" height="108rpx" :src="item.icon" mode="aspectFit" shape="circle">
						<template #loading>
							<u-loading mode="circle" color="rgb(64, 174, 54)" />
						</template>
					</u-image>
					<view style="color: rgb(102, 102, 102); margin-top: 15rpx; font-size: 24rpx;">{{item.name}}</view>
				</u-grid-item>
			</u-grid>
		</view>

		<!-- 限时推荐 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false" v-if="chaohuasuan.length > 0">
			<view slot="body">
				<view class="flex-between pd-30">
					<view class="flex">
						<text style="font-size: 33rpx; margin-right: 15rpx;">限时推荐</text>
						<u-tag text="折扣商品" type="warning" mode="dark" />
					</view>
					<text style="color: rgb(64, 174, 54); font-size: 30rpx;" @click="seeAll">查看全部</text>
				</view>
				<view class="mb-30">
					<u-grid :col="3" :border="false" hover-class="none">
						<u-grid-item v-for="item in chaohuasuan" :key="item.id" :custom-style="{padding: 0}">
							<Goods imgWidth="170rpx" imgHeight="170rpx" direction="vertical" :goods="{
							...item.goods,
							label: item.label.map((item:any)=>item.name)
						}" fontSize="24rpx" color="rgb(124, 124, 124)" :showLabels="false" :showOrigin="false" :showUnit="false" />
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</u-card>

		<!-- <view class="two-card mt-30"> -->
		<!-- 吃好点 -->
		<!-- <u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
				:border="false">
				<view slot="body">
					<view class="flex-between">
						<view class="flex">
							<text style="font-size: 33rpx; margin-right: 15rpx;">吃好点</text>
						</view>
					</view>
					<view class="mt-10" style="color: #999999; font-size: 25rpx;">
						美国小木瓜尝鲜
					</view>
					<view class="mt-20">
						<u-grid :col="2" :border="false" hover-class="none">
							<u-grid-item :custom-style="{padding: 0}">
								<u-image width="130rpx" height="130rpx" src="/static/temp/xilanhua.png"
									mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
							</u-grid-item>
							<u-grid-item :custom-style="{padding: 0}">
								<u-image width="130rpx" height="130rpx" src="/static/temp/niuyouguo.png"
									mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
			</u-card> -->
		<!-- 产地量贩 -->
		<!-- <u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
				:border="false">
				<view slot="body">
					<view class="flex-between">
						<view class="flex">
							<text style="font-size: 33rpx; margin-right: 15rpx;">产地量贩</text>
						</view>
					</view>
					<view class="mt-10" style="color: #999999; font-size: 25rpx;">
						核桃19.9一箱
					</view>
					<view class="mt-20">
						<u-grid :col="2" :border="false" hover-class="none">
							<u-grid-item :custom-style="{padding: 0}">
								<u-image width="130rpx" height="130rpx" src="/static/temp/hetao.png" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
							</u-grid-item>
							<u-grid-item :custom-style="{padding: 0}">
								<u-image width="130rpx" height="130rpx" src="/static/temp/pangxie.png" mode="aspectFit">
									<template #loading>
										<u-loading mode="circle" color="rgb(64, 174, 54)" />
									</template>
								</u-image>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
			</u-card>
		</view> -->

		<!-- 瀑布流商品 -->
		<view class="mt-30 mb-30">
			<Tabs ref="$Tabs" :data="tabsData" @tabsChange="tabsChange" />
		</view>
		<view class="mt-10">
			<Recommend ref="$Recommend" :top-show="false" />
		</view>
		<LoadingPage :show="loading" />
	</scroll-view>
</template>

<script setup lang="ts">
	import {
		reactive,
		ref,
		watch
	} from 'vue'
	import {
		useSystem
	} from '@/stores/system'
	import {
		GoodsModel
	} from '@/models/goods-model'
	import Goods from '@/components/goods/index.vue'
	import Tabs from '@/components/tabs/index.vue'
	import {
		getSwiper
	} from '@/api/swiper'
	import {
		FsSwiper
	} from '@/models/fsSwiper'
	import {
		storeToRefs
	} from 'pinia'
	import {
		getGoods
	} from '@/api/goods'
	import {
		useStore
	} from '@/stores/store'
	import {
		FsGoodsCate
	} from '@/models/fsGoodsCate'
	import {
		getCate
	} from '@/api/cate'
	import Recommend from '@/components/recommend/index.vue'
	// import {
	// 	onPullDownRefresh
	// } from '@dcloudio/uni-app'

	const {
		currentStore
	} = storeToRefs(useStore())

	const loading = ref(true)

	const swiper = reactive<FsSwiper[]>([])

	const chaohuasuan = ref<GoodsModel[]>([])

	const tabsData = reactive([{
		name: '全部',
		desc: '猜你喜欢'
	},
	{
		name: '时令',
		desc: '当季优选'
	},
	{
		name: '进口',
		desc: '国际直采'
	},
	{
		name: '人气',
		desc: '大家在买'
	},
	])

	const seeAll = () => {
		uni.navigateTo({
			url: '/subPages/limitGoods/limitGoods'
		})
	}

	const cateList = ref<FsGoodsCate[]>([])

	const storeClick = () => {
		uni.navigateTo({
			url: '/subPages/storeSelect/storeSelect'
		})
	}

	const getCateList = async () => {
		const {
			data,
			code
		} = await getCate({})
		if (code !== 200) return Promise.reject()
		cateList.value = data.filter(item => item.isShow)
		return Promise.resolve()
	}

	//获取超划算
	const getCaoHuaShuan = async () => {
		const {
			data,
			code
		} = await getGoods({
			page: 1,
			pageSize: 3,
			isLimitTime: '1',
			storeId: useStore().currentStore.id
		})
		if (code !== 200) return Promise.reject()
		chaohuasuan.value = data
		return Promise.resolve()
	}
	const refresh = ref<boolean | 'restore'>(false)
	//初始化页面
	const initPage = () => {
		useStore().setDefaultStore().finally(() => {
			Promise.all([querySwiper(), getCaoHuaShuan(), getCateList(), $Recommend.value.siwftGoodList('推荐',
				false)])
				.finally(() => {
					loading.value = false
					refresh.value = false
					uni.hideLoading()
				})
		})
	}
	const $Tabs = ref()
	const refreshPage = () => {
		if (!loading.value) {
			uni.showLoading({
				title: '刷新中',
				mask: true
			})
		}
		$Tabs.value.setTabs(0)
		refresh.value = true
		initPage()
	}

	watch(currentStore, (value) => {
		if (value && refresh.value === false) initPage()
	}, {
		immediate: true
	})

	//查询轮播图
	const querySwiper = async () => {
		const {
			data,
			code
		} = await getSwiper()
		if (code !== 200) return Promise.reject()
		swiper.length = 0
		swiper.push(...data)
		return Promise.resolve()
	}

	const keywork = ref('')

	const navatoSearch = () => {
		uni.navigateTo({
			url: '/subPages/search/search?key=' + keywork.value
		})
	}

	const $Recommend = ref()

	//切换标签页
	const tabsChange = (item : {
		name : string;
		des : string;
	}) => {
		if (item.name === '全部') {
			$Recommend.value.siwftGoodList('推荐')
		} else {
			$Recommend.value.siwftGoodList(item.name)
		}
	}

	//触底加载更多
	const scrollBottom = () => {
		$Recommend.value.getMoreList()
	}

	const navToCate = (item : FsGoodsCate) => {
		getApp().globalData.cate = item
		uni.switchTab({
			url: '/pages/cate/cate'
		})
	}

	//点击轮播图
	const swiperClick = (index : number) => {
		if (swiper[index].type === 1 && swiper[index].url) {
			uni.navigateTo({
				url: '/subPages/outPage/outPage?url=' + swiper[index].url
			})
		} else if (swiper[index].type === 0 && swiper[index].url) {
			uni.navigateTo({
				url: swiper[index].url
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;

		.header {
			background-color: $theme-color;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: flex-end;
			position: sticky;
			left: 0;
			top: 0;
			z-index: 999;

			.shop-selector {
				display: flex;
				align-items: center;
				color: white;

				u-icon {
					display: flex;
					align-items: center;
				}
			}
		}

		.two-card {
			display: flex;

			u-card {
				flex: 1;

				&:first-child {
					:deep(.u-card) {
						margin-right: 15rpx !important;
					}
				}

				&:last-child {
					:deep(.u-card) {
						margin-left: 15rpx !important;
					}
				}
			}

			:deep(.u-card) {
				margin-top: 0 !important;
				margin-bottom: 10rpx !important;
			}
		}

		:deep(.u-card) {
			margin-top: 10rpx !important;
		}

		goods {
			width: 100%;
		}
	}
</style>
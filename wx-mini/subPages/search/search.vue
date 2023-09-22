<template>
	<view class="search">
		<view class="flex-between header">
			<view>
				<u-search v-model="keyword" placeholder="吃出美好生活" focus :show-action="false" @search="search" />
			</view>
			<view>
				<text v-if="state === 0" @click="navBack">取消</text>
				<view v-else @click="navtoCart">
					<u-icon name="shopping-cart" color="#bbbbbb" size="40rpx"></u-icon>
					<u-badge size="mini" type="error" :count="useCart().getAllNumber" :offset="[20,10]"></u-badge>
				</view>
			</view>
		</view>
		<view v-if="state === 0">
			<view class="historySearch">
				<view class="flex-between">
					<text>历史搜索</text>
					<u-icon name="trash" color="#bbbbbb" size="40rpx"></u-icon>
				</view>
				<view class="historySearch-content">
					<view v-for="(item, index) in historyList" :key="index+'his'">
						{{item}}
					</view>
				</view>
			</view>

			<view class="realtime">
				<view>
					<text>实时热搜</text>
				</view>
				<view class="historySearch-content">
					<view v-for="(item, index) in realList" :key="index+'his'">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<view v-else class="contentList">
			<shopList ref="$shopList" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {
		nextTick,
		ref
	} from 'vue'
	import shopList from './components/shopList.vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCart
	} from '@/stores/cart'


	const keyword = ref('')

	const historyList = ref(['果冻橙', '芒果', '有机水果卷心菜', '水果萝卜', '熟冻帝王蟹', '赣南脐橙', ])
	const realList = ref(['1 车厘子', '2 草莓', '3 火锅到家', '4 精选红酒', '5 馋嘴零食暖热饮', '6 精美平安果', '7 高颜值好口味', '8 生菜', '9 新鲜大虾仁',
		'10 冬季小食'
	])

	const state = ref(1)

	const $shopList = ref()

	const search = () => {
		state.value = 1
		nextTick(() => {
			$shopList.value.initSearch(keyword.value)
		})
	}

	const navBack = () => {
		uni.navigateBack()
	}

	const navtoCart = () => {
		uni.switchTab({
			url: '/pages/cart/cart'
		})
	}

	onLoad(({
		key
	}) => {
		if (key) {
			keyword.value = key
		}
		search()
	})
</script>

<style scoped lang="scss">
	.search {
		padding: 20rpx 0;

		.header {
			padding: 0 20rpx;

			>view:first-child {
				flex-grow: 1;
				padding-right: 20rpx;
			}
		}

		.contentList {
			height: calc(100vh - 106rpx);
		}

		.historySearch,
		.realtime {
			color: $u-content-color;
			padding: 0 20rpx;


			>view:first-child {
				padding: 40rpx 0;

				text {
					font-size: 30rpx;
					font-weight: 500;
					font-family: PingFangSC;
					color: black;
				}
			}

			.historySearch-content {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				>view {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					height: 56rpx;
					padding: 0 30rpx;
					margin: 0 30rpx 30rpx 0;
					border-radius: 30rpx;
					background-color: $u-bg-color;
				}
			}
		}

		.historySearch {
			margin-bottom: 40rpx;
		}
	}
</style>

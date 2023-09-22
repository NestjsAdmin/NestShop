<template>
	<view class="content">
		<view class="fs-swiper">
			<u-swiper :list="list" height="550" indicator-pos="bottomRight" mode="number"></u-swiper>
		</view>

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="pd-30 title">
				<view class="price">
					<view>
						<text class="goods-desc-price" style="font-size: 24rpx;">￥</text>
						<text class="goods-desc-price">{{ goods.price }}</text>
						<text class="goods-desc-unit">/{{ goods.unit }}</text>
						<text class="goods-desc-origin ml-10">{{ goods.originPrice }}/{{ goods.unit }}</text>
					</view>
					<view>
						<u-tag v-for="(item,index) in goods.label" :key="index+'label'" :text="item" size="mini"
							type="primary" />
					</view>
				</view>
				<view class="name">
					<text>{{goods.name}}</text>
				</view>
				<view class="label">
					<u-tag text="商品简介" bg-color="#40AE36" color="#fff" borderColor="#40AE36" />
					<text>{{goods.introduction}}</text>
				</view>
			</view>
		</u-card>


		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="xinxi pd-30">
				<view>
					<text>商品类型</text>
					<text decode="true">&emsp;{{goods.type === 0 ? '普通商品':''}}</text>
				</view>
				<view>
					<text>销量</text>
					<text decode="true">&emsp;{{goods.sales}}</text>
				</view>
				<view>
					<text>返回积分</text>
					<text decode="true">&emsp;{{goods.backIntegral}}</text>
				</view>
			</view>
		</u-card>

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="select">
				<u-cell-item @click="show = true">
					<template #title>
						<text class="select-title" decode="">已选&ensp;{{goods.unit}}</text>
					</template>
				</u-cell-item>
			</view>
		</u-card>

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="0"
			:border="false">
			<view slot="body" class="guige pd-30">
				<view class="guige-title">
					<text>规格信息</text>
				</view>

				<view class="table">
					<view>
						<text>规格</text>
						<text>{{goods.unit}}</text>
					</view>
					<view>
						<text>生产日期</text>
						<text>{{getDate(goods.pd)}}</text>
					</view>
					<view>
						<text>保质期</text>
						<text>{{goods.exp ? `${goods.exp}天` : '无'}}</text>
					</view>
					<view>
						<text>存储方式</text>
						<text>{{goods.storage || '无'}}</text>
					</view>
				</view>
			</view>
		</u-card>

		<view style="margin: 30rpx;">
			<u-parse :html="goods.description"></u-parse>
		</view>


		<u-popup v-model="show" mode="bottom" closeable>
			<view class="selectPop">
				<view class="pop-title">
					选择规格
				</view>
				<view class="pop-name">
					选择重量
				</view>
				<view class="pop-guige">
					<view class="current">
						<text>{{goods.unit}}</text>
					</view>
				</view>

				<view class="pop-name">
					选择数量
				</view>

				<view class="pop-number">
					<u-number-box v-model="goods.number" :min="1" :max="goods.stock"></u-number-box>
				</view>
				<view style="margin-top: 100rpx;">
					<u-button type="success" shape="circle" @click="selectClick">添加到购物车</u-button>
				</view>
			</view>
		</u-popup>

		<view class="shoppingAdd">
			<view class="kefu">
				<view>
					<u-icon name="kefu-ermai" size="45"></u-icon>
				</view>
				<text>客服</text>
			</view>
			<view class="kefu" @click="navtoCart">
				<u-icon name="shopping-cart" size="45"></u-icon>
				<u-badge size="mini" type="error" :count="useCart().getAllNumber" :offset="[11,550]"></u-badge>
				<text>购物车</text>
			</view>
			<view>
				<u-button type="primary" shape="circle" @click="show = true">加入购物车</u-button>
			</view>
		</view>

		<LoadingPage :show="loading" />
	</view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		onShareAppMessage,
		onShareTimeline,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCart
	} from '@/stores/cart'
	import {
		getGood
	} from "@/api/goods";
	import { useFootprint } from '@/stores/footprint'
	import dayjs from 'dayjs'

	onShareAppMessage(() => {
		return {
			title: '',
			path: ''
		}
	})

	onShareTimeline(() => {
		return {
			title: '社区生鲜',
			path: '',
			imageUrl: '',
		}
	})

	const list = ref([])

	const navtoCart = () => {
		uni.switchTab({
			url: '/pages/cart/cart'
		})
	}

	const goods = ref({
		id: 0,
		storeId: 0,
		cateId: 0,
		name: '',
		image: '',
		swiper: '',
		introduction: '',
		unit: '',
		sort: 0,
		storage: '',
		pd: '',
		exp: 0,
		keyword: '',
		barcode: '',
		price: '',
		originPrice: '',
		cost: '',
		sales: 0,
		stock: 0,
		status: 0,
		description: '',
		browse: 0,
		backIntegral: 0,
		needIntegral: 0,
		isLimitTime: 0,
		limitStartTime: '',
		limitEndTime: '',
		type: 0,
		number: 1,
		label: [],
	})

	const show = ref(false)
	const loading = ref(true)

	const selectClick = () => {
		useCart().updataCart(goods.value)
		show.value = false
	}

	const getDate = (row : string) => {
		if (row) {
			return dayjs(row).format('YYYY-MM-DD')
		}
	}

	const getGoodDetail = async (id : number) => {
		const {
			data,
			code
		} = await getGood(id).finally(() => loading.value = false)
		if (code !== 200) return Promise.reject()
		goods.value = data.goods
		goods.value.number = 1
		goods.value.label = data.label.map(item => item.name)
		useFootprint().addFootprint(goods.value)
		list.value = data.goods.swiper.split(',')
	}

	onLoad(({
		goodId
	}) => {
		if (goodId) {
			getGoodDetail(goodId)
		}
	})
</script>



<style scoped lang="scss">
	.content {
		padding-bottom: 180rpx;
	}

	.fs-swiper {
		background-color: #fff;
	}


	.title {
		.price {
			display: flex;
			justify-content: space-between;

			.goods-desc-price {
				font-size: 34rpx;
				color: #F55726;
			}

			.goods-desc-unit {
				color: #999999;
				font-size: 24rpx;
			}

			.goods-desc-origin {
				font-size: 20rpx;
				color: rgb(204, 204, 204);
				text-decoration: line-through;
			}
		}

		.name {
			margin-top: 20rpx;
			font-size: 36rpx;
			line-height: 55rpx;
		}

		.label {
			margin-top: 10rpx;

			text {
				font-size: 22rpx;
				color: #666666;
			}
		}
	}

	.xinxi {
		>view {
			font-size: 24rpx;
			margin-top: 30rpx;

			text:first-child {
				color: #999999;
			}

			text:last-child {
				color: #333333;
			}
		}

		>view:first-child {
			margin-top: 0;
		}
	}

	.select {
		.select-title {
			color: #333333;
			font-size: 26rpx;
		}
	}

	.guige {
		font-size: 26rpx;

		.guige-title {
			color: #333333;
			font-weight: 500;
		}

		.table {
			margin-top: 30rpx;
			overflow: hidden;

			>view {
				display: flex;
				text-align: left;
				font-size: 24rpx;
				border: #ECECEC 2rpx solid;

				text:first-child {
					width: 156rpx;
					padding: 20rpx 0 20rpx 30rpx;
					background-color: #F8F9FA;
					color: #666666;
				}

				text:last-child {
					flex-grow: 1;
					padding: 20rpx 0 20rpx 30rpx;
					color: #333333;
				}
			}

			>view:first-child {
				border-radius: 20rpx 20rpx 0 0;
			}

			>view:last-child {
				border-radius: 0 0 20rpx 20rpx;
			}
		}
	}

	.selectPop {
		padding: 30rpx 40rpx 50rpx 40rpx;
		color: #333333;

		.pop-title {
			text-align: center;
			color: 32rpx;
			font-weight: 500;
		}

		.pop-name {
			margin-top: 40rpx;
			color: 28rpx;
		}

		.pop-guige {
			display: flex;
			flex-wrap: wrap;

			.current {
				color: $theme-color !important;
			}

			>view {
				text-align: center;
				width: 23%;
				margin: 20rpx 2% 0 0;
				background-color: #F8F9FA;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 64rpx;
				border-radius: 20rpx;

				text {
					max-width: 80%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}

		.pop-number {
			margin-top: 30rpx;
		}
	}

	.shoppingAdd {
		width: 100vw;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		padding: 10rpx 20rpx 70rpx;

		.kefu {
			flex-grow: 1;
			font-size: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		>view:last-child {
			width: 500rpx;
		}
	}
</style>
<template>
	<view v-if="props.goods?.name" class="goods"
		:style="props.direction === 'vertical' ? 'flex-direction: column;' : 'flex-direction: row;'">
		<u-image :width="props.imgWidth" :height="props.imgHeight" :src="props.goods.image" mode="aspectFit"
			@tap.stop="navToGoods(props.goods.id)">
			<template #loading>
				<u-loading mode="circle" color="rgb(64, 174, 54)" />
			</template>
		</u-image>
		<view class="goods-content" :class="props.direction === 'vertical' ? '' : 'goods-content-horizontal'"
			:style="props.direction === 'vertical' ? '' : `height:${props.imgHeight}`">
			<view class="goods-name mt-10"
				:style="[`font-size: ${props.fontSize};`, `color: ${props.color};`, `width: ${props.direction === 'vertical' ? props.imgWidth : '100%'};`]">
				{{ props.goods.name }}
			</view>
			<view class="goods-labels mt-10" v-if="props.showLabels && props.goods.label">
				<u-tag :text="item" type="primary" size="mini" bgColor="white"
					v-for="(item, index) in props.goods.label" :key="index" />
			</view>
			<view class="goods-footer" :class="props.direction === 'vertical' ? 'mt-20' : 'mt-10'"
				:style="[`width: ${props.direction === 'vertical' ? props.imgWidth : '100%'};`]">
				<view class="goods-desc">
					<text class="goods-desc-price" style="font-size: 24rpx;">￥</text>
					<text class="goods-desc-price">{{ props.goods.price }}</text>
					<text class="goods-desc-unit" v-if="props.showUnit">/{{ props.goods.unit }}</text>
					<text class="goods-desc-origin ml-10"
						v-if="props.showOrigin">{{ props.goods.originPrice }}/{{ props.goods.unit }}</text>
				</view>
				<view v-if="!props.showNumberBox && !props.hideRight" style="position: relative;"
					:style="props.direction === 'vertical' ? '' : 'margin-right: 40rpx;'" @tap.stop="addCart">
					<u-icon name="shopping-cart" color="white" size="33rpx"
						:custom-style="{'background-color': 'rgb(64, 174, 54)', 'border-radius': '50%', 'padding': '8rpx'}"
						@click.stop />
					<u-badge v-show="number > 0" type="error" :count="number" :offset="[-15, -15]" size="mini" />
				</view>
				<view v-else-if="props.showNumberBox && !props.hideRight" style="position: relative;">
					<u-number-box v-model="props.goods.number" :size="32" :min="0" :max="props.goods.stock"
						disabled-input @minus="numberChange" @plus="numberChange" />
				</view>
			</view>
			<view :style="props.direction === 'vertical' ? '' : 'margin-right: 40rpx;'">
				<u-divider v-if="props.showBorder && props.direction === 'horizontal'" :use-slot="false"
					half-width="100%" margin-top="20" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		defineProps,
		withDefaults,
		computed,
	} from 'vue'
	import {
		useCart
	} from '@/stores/cart'
	import {
		CartVo
	} from '@/models/cartVo'
	import {
		useUser
	} from '@/stores/user'
	import {
		storeToRefs
	} from 'pinia'

	const {
		loggedIn
	} = storeToRefs(useUser())

	interface Props {
		// 排列方向
		direction ?: 'vertical' | 'horizontal'
		// 图片宽度
		imgWidth ?: string | number
		// 图片高度
		imgHeight ?: string | number
		// 商品实体
		goods : CartVo
		// 是否显示标签
		showLabels ?: boolean
		// 是否显示价格
		showPrice ?: boolean
		// 是否显示原价
		showOrigin ?: boolean
		// 是否显示数量输入组件
		showNumberBox ?: boolean
		// 是否显示单位
		showUnit ?: boolean
		// 是否显示底边
		showBorder ?: boolean
		// 标题字体大小
		fontSize ?: string
		// 标题字体颜色
		color ?: string
		hideRight : boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		direction: 'horizontal',
		imgWidth: '200rpx',
		imgHeight: '200rpx',
		showLabels: true,
		showPrice: true,
		showOrigin: true,
		showUnit: true,
		showNumberBox: false,
		showBorder: true,
		fontSize: '26rpx',
		color: 'black',
		hideRight: false
	})

	const number = computed(() => {
		return useCart().carts.find((item : CartVo) => item.id === props.goods.id)?.number || 0
	})


	const isNotLogin = () => {
		if (!loggedIn.value) {
			uni.showToast({
				title: '请登录',
				mask: true,
				icon: 'none'
			})
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			}, 1500)
			return false
		}
		return true
	}

	const addCart = () => {
		if (!isNotLogin()) return
		if (number.value + 1 > props.goods.stock) {
			uni.showToast({
				title: '库存不足!',
				mask: true,
				icon: 'error'
			})
			return
		}

		useCart().updataCart({
			...props.goods,
			number: number.value + 1
		})
	}


	const numberChange = ({
		value
	}) => {
		if (!isNotLogin()) return
		if (value === 0) {
			setTimeout(() => {
				uni.showModal({
					title: '提示',
					content: '确定要删除该商品吗?',
					cancelText: '再想想',
					cancelColor: '#40ae36',
					success: ({
						confirm
					}) => {
						if (confirm) {
							useCart().deleCart(props.goods)
						} else {
							props.goods.number = 1
						}
					},
				})
			}, 100)
		} else {
			useCart().updataCart({
				...props.goods,
				number: value
			})
		}
	}

	const navToGoods = () => {
		uni.navigateTo({
			url: '/subPages/goodsDetail/goodsDetail?goodId=' + props.goods.id
		})
	}
</script>

<style lang="scss" scoped>
	.goods {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.goods-content-horizontal {
			display: flex;
			flex-direction: column;
			padding-left: 30rpx;
			box-sizing: border-box;
			flex: 1;

			.goods-name {
				flex: 1;
			}
		}

		.goods-labels {
			display: flex;
			justify-content: flex-start;
			width: 100%;
		}

		.goods-name {
			width: 100%;
			text-align: left;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.goods-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-desc {
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
	}
</style>
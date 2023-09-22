<template>
	<view class="content">
		<view class="mb-20">
			<u-notice-bar mode="horizontal" :list="['本店只配送' + useStore().currentStore.communityName]"></u-notice-bar>
		</view>
		<!-- 地址 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<Address
					:address="useStore().currentStore.communityName + (useAddress().currentAddress.addressDetail || '')"
					:name="useAddress().currentAddress.receiver" :phone="useAddress().currentAddress.phone"
					@navClick="addressClick" />
			</view>
		</u-card>

		<!-- 商品列表 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<GoodsTotal :goodList="carts.filter(item => item.choosed)" :goodTotal="getGoodTotal"
					:total="getTotal" />
			</view>
		</u-card>

		<!-- 配送方式 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false" v-if="useStore().currentStore.distributionWay !== ''">
			<view slot="body">
				<view class="mb-20">配送方式</view>
				<u-radio-group v-model="deliveryType">
					<u-radio v-for="item in deliveryTypes" :key="item.name" :name="item.id"
						active-color="rgb(43, 162, 69)" size="30" label-size='30'>
						{{item.name}}
					</u-radio>
				</u-radio-group>
				<view class="mb-20"></view>
				<u-cell-item v-if="deliveryType === 1" title="配送范围" :value="useStore().currentStore.communityName"
					:border-bottom="false" :arrow="false"></u-cell-item>
				<u-cell-item v-else-if="deliveryType === 2" title="门店" :value="useStore().currentStore.name"
					:border-bottom="false" :arrow="false"></u-cell-item>
			</view>
		</u-card>

		<!-- 配送时间 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<u-cell-item :title="deliveryType === 1? '配送时间':'自提时间'" :value="distributionTime || '请选择'"
					@click="show = true" :border-bottom="false"></u-cell-item>
			</view>
		</u-card>



		<!-- 支付方式 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<u-radio-group v-model="payway" slot="body" class="pay">
				<view class="flex-between" v-for="(item, index) in payways" :key="item.name"
					:class="index !== 0 ? 'mt-20' : ''" @click="changePayway(item.name)">
					<view class="flex">
						<u-icon :name="item.icon" size="50rpx" :color="item.color" />
						<text class="ml-20" style="font-size: 28rpx;">{{ item.name }}</text>
					</view>
					<u-radio :ref="item.name" :name="item.name" active-color="rgb(43, 162, 69)" size="35" />
				</view>
			</u-radio-group>
		</u-card>

		<!-- 订单备注 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<view class="flex-between">
					<view style="font-size: 28rpx;">订单备注</view>
					<view>
						<u-input v-model="mark" :border="false" placeholder="请输入订单备注" height="30" input-align="right" />
					</view>
				</view>
			</view>
		</u-card>

		<!-- 底部 -->
		<view class="footer flex-end pd-20 pr-30">
			<view style="font-size: 24rpx;">共{{getGoodTotal}}件，合计</view>
			<view class="mr-20">
				<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
				<text style="font-size: 34rpx;">{{getTotal}}</text>
			</view>
			<view class="mr-20">
				<text class="mr-30" style="font-size: 24rpx;">获得积分:</text>
				<text class="mr-30" style="font-size: 34rpx;">{{getIntegralTotal}}</text>
			</view>
			<u-button type="primary" size="mini" shape="circle" @click="navToPayResult()">提交订单
			</u-button>
		</view>

		<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted,
		reactive,
		getCurrentInstance
	} from 'vue'
	import Address from '@/components/address/index.vue'
	import GoodsTotal from '@/components/goodsTotal/index.vue'
	import {
		useCart
	} from '@/stores/cart'
	import {
		storeToRefs
	} from 'pinia'
	import {
		useStore
	} from '@/stores/store'
	import {
		useAddress
	} from '@/stores/address'
	import {
		balanceOrder,
		getTime,
		postOrder,
		weixinOrder
	} from '../../api/order'
	import {
		CartVo2
	} from '../../models/cartVo2'
	import {
		FsOrder
	} from '../../models/fsOrder'
	import {
		useUser
	} from '../../stores/user'
	import {
		weixinPayment
	} from '../../utils/weixinPay'

	const {
		carts,
		getTotal,
		getGoodTotal,
		getIntegralTotal
	} = storeToRefs(useCart())

	const {
		proxy
	} = getCurrentInstance()
	const loading = ref(true)
	const mark = ref('')

	// let orderNumber = undefined

	const navToPayResult = () => {
		if(useStore().currentStore.distributionWay === '') {
			uni.showToast({
				title: '该门店已停止下单！',
				mask: true,
				icon: 'error'
			})
			return
		}
		if (!useStore().currentStore.id) {
			uni.showToast({
				title: '请选择门店!',
				mask: true,
				icon: 'error'
			})
			return
		}
		if (!useAddress().currentAddress?.addressDetail) {
			uni.showToast({
				title: '请选择收货地址!',
				mask: true,
				icon: 'error'
			})
			return
		}
		if (!distributionTime.value) {
			uni.showToast({
				title: '请选择' + (deliveryType.value === 1 ? '配送时间' : '自提时间'),
				mask: true,
				icon: 'error'
			})
			return
		}
		if (payway.value === '余额支付' && parseFloat(useUser().userinfo.balance) < getTotal) {
			uni.showToast({
				title: '余额不足',
				mask: true,
				icon: 'error'
			})
			return
		}
		const queryForm = {
			storeId: useStore().currentStore.id,
			consignee: useAddress().currentAddress.receiver,
			address: useAddress().currentAddress.addressDetail,
			phone: useAddress().currentAddress.phone,
			distributionTime: distributionTime.value,
			payType: payway.value,
			deliveryType: deliveryType.value,
			origin: 1,
			mark: mark.value,
			item: useCart().carts.filter((item : CartVo2) => item.choosed).map((item : CartVo2) => {
				return {
					id: item.id,
					number: item.number
				}
			})
		}
		uni.showLoading({
			title: '提交中',
			mask: true
		})
		commitOrder(queryForm).finally(() => {
			uni.hideLoading()
		})
		console.log(queryForm);

	}

	const commitOrder = async (queryForm : any) => {
		const {
			data,
			code
		} = await postOrder(queryForm)
		if (code !== 200) return Promise.reject()
		await payOrder(data).then(() => {
			uni.redirectTo({
				url: `/subPages/payResult/payResult?orderInfo=${encodeURI(JSON.stringify(data))}`
			})
		}).catch(() => {
			uni.redirectTo({
				url: `/subPages/orderDetail/orderDetail?id=${data.orderNumber}`
			})
		}).finally(() => {
			//删除购物车中的已提交商品
			queryForm.item.forEach((item : any) => {
				useCart().deleCart(item)
			})
		})
		return Promise.resolve()
	}

	const payOrder = async (order : FsOrder) => {
		if (order.payType === '余额支付') {
			const {
				msg,
				code
			} = await balanceOrder(order.id)
			if (code !== 200) return Promise.reject()
			uni.showToast({
				title: msg,
				icon: 'success',
				mask: true
			})
			return Promise.resolve()
		} else if (order.payType === '微信支付') {
			const {
				data,
				code
			} = await weixinOrder(order.id)
			if (code !== 200) return Promise.reject()
			return weixinPayment(data)
		} else return Promise.reject()
	}

	// const weixinPay = async (weixinCallback: any) => {
	// 	console.log(weixinCallback);
	// 	return Promise.resolve()
	// }

	const payways = reactive([{
		name: '余额支付',
		icon: 'rmb-circle-fill',
		color: '#ff9900',
	},
	{
		name: '微信支付',
		icon: 'weixin-fill',
		color: 'rgb(43, 162, 69)'
	},
	])
	const payway = ref('余额支付')

	const deliveryType = ref(1)
	const deliveryTypes = reactive([{
		name: '门店配送',
		id: 1,
	}, {
		name: '到店自提',
		id: 2,
	}])



	const changePayway = (way : string) => {
		proxy.$refs[way][0].toggle()
	}

	const addressClick = () => {
		uni.navigateTo({
			url: '/subPages/address/address'
		})
	}

	const distributionTime = ref('')
	const show = ref(false)

	const list = ref([])

	const getDataList = async () => {
		const {
			data,
			code
		} = await getTime(useStore().currentStore.id)
		if (code !== 200) return
		const arr = []
		if (data.今日.length > 0) {
			arr.push({
				value: '今日',
				label: '今日',
				children: data.今日.map(item => {
					return {
						value: item,
						label: item
					}
				})
			})
		}
		if (data.明日.length > 0) {
			arr.push({
				value: '明日',
				label: '明日',
				children: data.明日.map(item => {
					return {
						value: item,
						label: item
					}
				})
			})
		}
		list.value = arr
		distributionTime.value = arr[0].children[0].label
		return Promise.resolve()
	}

	const confirm = (e : any[]) => {
		distributionTime.value = e[1].label
	}

	onMounted(() => {
		getDataList().finally(() => {
			loading.value = false
			deliveryTypes.length = 0
			if (useStore().currentStore.distributionWay.includes('1')) {
				deliveryTypes.push({
					name: '门店配送',
					id: 1,
				})
			}
			if (useStore().currentStore.distributionWay.includes('2')) {
				deliveryTypes.push({
					name: '到店自提',
					id: 2,
				})
			}
		})
	})
</script>

<style lang="scss" scoped>
	.content {
		box-sizing: border-box;
		padding-bottom: calc(90rpx + env(safe-area-inset-bottom));

		:deep(.u-card) {
			&:first-child {
				margin-top: 0 !important;
			}
		}

		:deep(.pay .u-radio) {
			display: unset;
		}

		:deep(.u-cell) {
			padding: 0;
		}

		.footer {
			width: 100vw;
			background-color: white;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		}
	}
</style>
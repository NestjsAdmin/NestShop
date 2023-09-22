<template>
	<view v-if="orderInfo.order.id" class="content-topbg" :style="`padding-top: ${useSystem().customBarHeight}px;`">
		<Back />

		<!-- 订单状态 -->
		<view class="flex-column" style="margin: 60rpx 0 90rpx">
			<view class="flex">
				<u-icon name="clock" size="36" color="white" />
				<text class="ml-10"
					style="color: white; font-size: 36rpx; z-index: 1;">{{getOrderName(orderInfo.order)}}</text>
			</view>
			<view v-if="!orderInfo.order.isPaid && orderInfo.order.status !== 6" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">
				提交订单15分钟后订单自动关闭，请及时付款哦</view>
			<view v-else-if="orderInfo.order.status === 1" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">包裹整装待发!</view>
			<view v-else-if="orderInfo.order.status === 2" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">商品已发货，配送员正在送货</view>
			<view v-else-if="orderInfo.order.status === 3" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">订单已完成，期待下次光临!</view>
			<view v-else-if="orderInfo.order.status === 6" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">订单已取消，期待下次光临!</view>
			<view v-else-if="orderInfo.order.status === 4" class="mt-20"
				style="font-size: 24rpx; color: white; z-index: 1;">退款申请已提交,等待商家审核</view>
		</view>

		<!-- 地址 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<Address :address="orderInfo.order.address" :name="orderInfo.order.consignee"
					:phone="orderInfo.order.phone" @navClick="addressClick" />
			</view>
		</u-card>

		<!-- 商品信息 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
			padding="30">
			<view slot="body">
				<GoodsTotal :goodList="orderInfo.orderItem" :goodTotal="orderInfo.order.totalNum"
					:total="orderInfo.order.totalPrice" />
			</view>
		</u-card>

		<!-- 订单金额明细 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<view class="flex-between">
					<view style="font-size: 24rpx; color: #666666;">商品小计</view>
					<view>
						<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
						<text style="font-size: 34rpx;">{{orderInfo.order.totalPrice}}</text>
					</view>
				</view>
				<!-- <view class="flex-between mt-10">
					<view style="font-size: 24rpx; color: #666666;">积分抵扣</view>
					<view>
						<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">700积分，-￥7</text>
					</view>
				</view> -->
				<u-divider color="#979797" margin-top="30" margin-bottom="30" :use-slot="false" half-width="100%" />
				<view class="flex-between">
					<view style="font-size: 24rpx;">应付金额合计</view>
					<view style="color: #F55726;">
						<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
						<text style="font-size: 34rpx;">{{orderInfo.order.totalPrice}}</text>
					</view>
				</view>
				<view
					v-if="orderInfo.order.status === 4 || orderInfo.order.status === 5 || orderInfo.order.refundRefuse">
					<u-divider color="#979797" margin-top="30" margin-bottom="30" :use-slot="false" half-width="100%" />
					<view class="flex-between">
						<view style="font-size: 24rpx;">申请退款金额</view>
						<view style="color: #F55726;">
							<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
							<text style="font-size: 34rpx;">{{orderInfo.order.refundPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</u-card>

		<!-- 订单详情 -->
		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" padding="30"
			:border="false">
			<view slot="body">
				<view class="flex-between">
					<view style="font-size: 24rpx; color: #999999;">下单时间</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.createAt}}</view>
				</view>
				<view class="flex-between mt-20">
					<view style="font-size: 24rpx; color: #999999;">订单编号</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.orderNumber}}</view>
				</view>
				<view class="flex-between mt-20">
					<view style="font-size: 24rpx; color: #999999;">支付方式</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.payType}}</view>
				</view>
				<view class="flex-between mt-20">
					<view style="font-size: 24rpx; color: #999999;">返回积分</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.backIntegral}}</view>
				</view>
				<view class="flex-between mt-20" v-if="orderInfo.order.status === 5">
					<view style="font-size: 24rpx; color: #999999;">退款时间</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.refundTime}}</view>
				</view>
				<view class="flex-between mt-20"
					v-if="orderInfo.order.status === 4 || orderInfo.order.status === 5 || orderInfo.order.refundRefuse">
					<view style="font-size: 24rpx; color: #999999;">退款原因</view>
					<view style="font-size: 24rpx;">{{orderInfo.order.refundReason}}</view>
				</view>
				<view class="flex-between mt-20" v-if="orderInfo.order.refundRefuse">
					<view style="font-size: 24rpx; color: #999999;">客服反馈</view>
					<view style="font-size: 24rpx;color: red;">{{orderInfo.order.refundRefuse}}</view>
				</view>
			</view>
		</u-card>

		<!-- 底部按钮 -->
		<view class="footer flex-end pd-20 pr-30">
			<u-button v-if="!orderInfo.order.isPaid && orderInfo.order.status !== 6" type="warning" plain size="mini"
				shape="circle" @click="removeOrder">
				取消订单</u-button>
			<u-button v-if="!orderInfo.order.isPaid && orderInfo.order.status !== 6" type="warning" plain size="mini"
				shape="circle" :custom-style="{marginLeft: '20rpx'}" @click="openChangePayWay">更改支付方式
			</u-button>
			<u-button v-if="!orderInfo.order.isPaid && orderInfo.order.status !== 6" type="success" plain size="mini"
				shape="circle" :custom-style="{marginLeft: '20rpx'}" @click="payOrder(orderInfo.order)">去支付
			</u-button>
			<u-button v-if="orderInfo.order.isPaid && orderInfo.order.status === 2" type="primary" plain size="mini"
				shape="circle" :custom-style="{marginLeft: '20rpx'}" @click="receiveClick">确认收货
			</u-button>
			<u-button v-if="orderInfo.order.isPaid && orderInfo.order.status === 3 && isLessThreeDay(orderInfo)"
				type="warning" plain size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}"
				@click="navtoRefund">申请退款
			</u-button>
			<u-button v-if="orderInfo.order.isPaid && orderInfo.order.status === 4" type="primary" plain size="mini"
				shape="circle" :custom-style="{marginLeft: '20rpx'}" @click.stop="cancelRefundClick">取消退款
			</u-button>
		</view>
		<u-modal v-model="showSwiftPayWay" title="更改支付方式" :show-cancel-button="true" @cancel="showSwiftPayWay = false"
			@confirm="changePayWay">
			<view class="modal_content">
				<u-radio-group v-model="payway" class="pay">
					<view class="flex-between" v-for="(item, index) in payways" :key="item.name"
						:class="index !== 0 ? 'mt-20' : ''" @click="changePayway(item.name)">
						<view class="flex">
							<u-icon :name="item.icon" size="50rpx" :color="item.color" />
							<text class="ml-20" style="font-size: 28rpx;">{{ item.name }}</text>
						</view>
						<u-radio :ref="item.name" :name="item.name" active-color="rgb(43, 162, 69)" size="35" />
					</view>
				</u-radio-group>
			</view>
		</u-modal>
		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
		watchEffect,
		getCurrentInstance
	} from "vue";
	import {
		useSystem
	} from '@/stores/system'
	import Back from '@/components/back/index.vue'
	import Address from '@/components/address/index.vue'
	import GoodsTotal from '@/components/goodsTotal/index.vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		getSingleOrder,
		weixinOrder,
		balanceOrder,
		cancelOrder,
		receiptOrder,
		cancelRefund,
		changeOredrPayWay
	} from "@/api/order";
	import {
		FsOrder
	} from "@/models/fsOrder";
	import {
		weixinPayment
	} from "@/utils/weixinPay";
	import dayjs from "dayjs";
	import {
		OrderAndItemVo
	} from "@/models/orderAndItemVo";

	const orderInfo = ref({
		order: {
			id: 0,
			orderNumber: '',
			extendNumber: '',
			userId: 0,
			userName: '',
			storeId: 0,
			storeName: '',
			dispatcherId: 0,
			dispatcherName: '',
			phone: '',
			address: '',
			consignee: '',
			totalNum: 0,
			totalPrice: '',
			isPaid: true,
			backIntegral: 0,
			payTime: '',
			payType: '',
			origin: 0,
			status: 0,
			refundImage: '',
			refundReason: '',
			refundRefuse: '',
			refundTime: '',
			refundPrice: '',
			mark: '',
			deliveryType: 0,
			distributionTime: '',
			createAt: '',
		},
		orderItem: [{
			id: 0,
			orderId: 0,
			goodsId: 0,
			name: '',
			price: '',
			number: 0,
			image: '',
			refundStatus: 0,
		}],
	})

	const loading = ref(true)

	//获取订单信息
	const getOrderInfo = async (orderNumber : string) => {
		const {
			data,
			code
		} = await getSingleOrder(orderNumber)
		if (code !== 200) return Promise.reject()
		orderInfo.value = data
		return Promise.resolve()
	}

	//订单支付
	const payOrder = async (order : FsOrder) => {
		if (orderInfo.value.order.payType === '余额支付') {
			uni.showLoading({
				title: '支付中',
				mask: true
			})
			const {
				msg,
				code
			} = await balanceOrder(order.id).finally(() => uni.hideLoading())
			if (code !== 200) return Promise.reject()
			uni.showToast({
				title: msg,
				icon: 'success',
				mask: true
			})
			setTimeout(() => {
				uni.redirectTo({
					url: `/subPages/payResult/payResult?orderInfo=${encodeURI(JSON.stringify(orderInfo.value.order))}`
				})
			}, 1500)
			return Promise.resolve()
		} else if (orderInfo.value.order.payType === '微信支付') {
			uni.showLoading({
				title: '支付查询中',
				mask: true
			})
			const {
				data,
				code
			} = await weixinOrder(order.id).finally(() => uni.hideLoading())
			if (code !== 200) return Promise.reject()
			return weixinPayment(data).then(() => setTimeout(() => {
				uni.redirectTo({
					url: `/subPages/payResult/payResult?orderInfo=${encodeURI(JSON.stringify(orderInfo.value.order))}`
				})
			}, 1500))
		} else return Promise.reject()
	}

	//取消订单前确定
	const removeOrder = () => {
		uni.showModal({
			title: '提示',
			content: '您确定要取消该订单吗?',
			cancelText: '考虑一下',
			cancelColor: '#40ae36',
			success: ({
				confirm
			}) => {
				if (confirm) {
					commitRemoveOrder()
				}
			}
		})
	}

	//取消订单
	const commitRemoveOrder = async () => {
		const {
			code
		} = await cancelOrder(orderInfo.value.order.id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '取消成功!',
			icon: 'success',
			mask: true
		})
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/mine/mine'
			})
		}, 1500)
		return Promise.resolve()
	}

	//点击地址后 未支付的订单可以更改地址
	const addressClick = () => {
		if (orderInfo.value.order.status !== 6 && !orderInfo.value.order.isPaid) {
			uni.navigateTo({
				url: `/subPages/swiftAddress/swiftAddress?orderId=${orderInfo.value.order.id}`
			})
		}
	}

	//获取状态中文名称
	const getOrderName = (row : FsOrder) => {
		if (row.status === 6) return '已取消'
		if (!row.isPaid) return '待支付'
		return ['待发货', '待收货', '已完成', '申请退款', '已退款'][row.status - 1]
	}

	//退款
	const navtoRefund = () => {
		uni.navigateTo({
			url: '/subPages/refundApply/refundApply?id=' + orderInfo.value.order.orderNumber
		})
	}

	//确认收货点击
	const receiveClick = () => {
		uni.showModal({
			title: '提示',
			content: '确定收货？',
			success({ confirm }) {
				if (confirm) {
					receive()
				}
			},
		})
	}

	//收货
	const receive = async () => {
		const {
			code
		} = await receiptOrder(orderInfo.value.order.id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '收货成功！',
			mask: true,
			icon: 'success'
		})
		setTimeout(() => {
			getOrderInfo(orderInfo.value.order.orderNumber)
		}, 1500)
	}

	//取消退款点击
	const cancelRefundClick = () => {
		uni.showModal({
			title: '提示',
			content: '确定取消退款？',
			success({ confirm }) {
				if (confirm) {
					cancelRefunds()
				}
			},
		})
	}

	//取消退款
	const cancelRefunds = async () => {
		const {
			code
		} = await cancelRefund(orderInfo.value.order.id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '取消退款成功！',
			mask: true,
			icon: 'success'
		})
		setTimeout(() => {
			getOrderInfo(orderInfo.value.order.orderNumber)
		}, 1500)
	}

	const { proxy } = getCurrentInstance()

	const payway = ref('')

	watchEffect(() => {
		if (orderInfo.value.order.payType === '余额支付') payway.value = '余额支付'
		else payway.value = '微信支付'
	})

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

	const changePayway = (way : string) => {
		proxy.$refs[way][0].toggle()
	}
	const showSwiftPayWay = ref(false)
	//打开更改支付方式弹窗
	const openChangePayWay = () => {
		showSwiftPayWay.value = true
	}
	//更改支付方式
	const changePayWay = async () => {
		const { code } = await changeOredrPayWay({
			orderId: orderInfo.value.order.id as number,
			payType: payway.value
		})
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '更改成功！',
			icon: 'success',
			mask: true
		})
		setTimeout(() => {
			uni.showLoading({
				title: '更新中！'
			})
			getOrderInfo(orderInfo.value.order.orderNumber).finally(() => {
				uni.hideLoading()
			})
		}, 1200)
	}

	const isLessThreeDay = (item : OrderAndItemVo) => {
		return dayjs().diff(dayjs(item.order.payTime), 'day') < 3
	}

	onLoad(({
		id
	}) => {
		if (id) {
			getOrderInfo(id).finally(() => loading.value = false)
		}
	})
	onShow(() => {
		if (!loading.value) {
			uni.showLoading({
				title: '更新中！'
			})
			getOrderInfo(orderInfo.value.order.orderNumber).finally(() => {
				uni.hideLoading()
			})
		}
	})
</script>

<style lang="scss" scoped>
	.content-topbg {
		box-sizing: border-box;
		position: relative;
		padding-bottom: calc(90rpx + env(safe-area-inset-bottom));

		.footer {
			width: 100vw;
			background-color: white;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		}

		.modal_content {
			padding: 20rpx;
		}
	}
</style>
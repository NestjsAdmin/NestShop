<template>
	<view class="content">
		<!-- 选项卡 -->
		<u-tabs-swiper ref="tabsRef" :list="tabsList" :current="tabsCurrent" @change="tabsChange" :is-scroll="false"
			active-color="rgb(64, 174, 54)" swiperWidth="750" />

		<!-- 订单列表 -->
		<!-- <swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
      style="height: calc(100vh - 80rpx)">
      <swiper-item class="swiper-item" v-for="(item, index) in tabsList" :key="index">
        <u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
          padding="30">
          <view slot="body">
            <navigator url="/subPages/orderDetail/orderDetail" hover-class="none">
              <view class="flex-between">
                <text style="font-size: 24rpx; color: #999999;">2023-12-01 12:33</text>
                <text style="font-size: 24rpx;" :style="getOrderStatusColor()">待付款</text>
              </view>
              <u-divider color="#979797" margin-top="30" margin-bottom="30" :use-slot="false" half-width="100%" />
              <view class="flex-between">
                <scroll-view class="mr-30" scroll-x style="width: 400rpx;">
                  <view class="flex mr-20">
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/bocai.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/niurou.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/juzi.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/juzi.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                  </view>
                </scroll-view>
                <view style="text-align: right;">
                  <view style="font-size: 22rpx; color: #999999;">共2件</view>
                  <view class="mt-10">
                    <text style="font-size: 24rpx;">合计：</text>
                    <text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
                    <text style="font-size: 34rpx;">76.1</text>
                  </view>
                </view>
              </view>
              <view class="flex-end mt-20">
                <u-button type="warning" plain size="mini" shape="circle">取消订单</u-button>
                <u-button type="primary" plain size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}">去支付
                </u-button>
              </view>
            </navigator>
          </view>
        </u-card>
        <u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
          padding="30">
          <view slot="body">
            <navigator url="/subPages/orderDetail/orderDetail" hover-class="none">
              <view class="flex-between">
                <text style="font-size: 24rpx; color: #999999;">2023-12-01 12:33</text>
                <text style="font-size: 24rpx;" :style="getOrderStatusColor()">待付款</text>
              </view>
              <u-divider color="#979797" margin-top="30" margin-bottom="30" :use-slot="false" half-width="100%" />
              <view class="flex-between">
                <scroll-view class="mr-30" scroll-x style="width: 400rpx;">
                  <view class="flex mr-20">
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/bocai.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/niurou.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/juzi.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                    <view class="mr-30">
                      <u-image width="110rpx" height="110rpx" src="/static/temp/juzi.png" mode="aspectFit"
                        border-radius="20" bgColor="#ECECEC">
                        <template #loading>
                          <u-loading mode="circle" color="rgb(64, 174, 54)" />
                        </template>
                      </u-image>
                    </view>
                  </view>
                </scroll-view>
                <view style="text-align: right;">
                  <view style="font-size: 22rpx; color: #999999;">共2件</view>
                  <view class="mt-10">
                    <text style="font-size: 24rpx;">合计：</text>
                    <text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
                    <text style="font-size: 34rpx;">76.1</text>
                  </view>
                </view>
              </view>
              <view class="flex-end mt-20">
                <u-button type="warning" plain size="mini" shape="circle">取消订单</u-button>
                <u-button type="primary" plain size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}">去支付
                </u-button>
              </view>
            </navigator>
          </view>
        </u-card>
      </swiper-item>
    </swiper> -->

		<scroll-view v-if="orderList.length !== 0" scroll-y style="height: calc(100vh - 120rpx)"
			@scrolltolower="scrollBottom">
			<view style="padding: 1rpx;">
				<u-card v-for="item in orderList" :key="item.order.id + 'order'" :showHead="false" :showFoot="false"
					:head-border-bottom="false" borderRadius="25" :border="false" padding="30">
					<view slot="body">
						<navigator :url="`/subPages/orderDetail/orderDetail?id=${item.order.orderNumber}`"
							hover-class="none">
							<view class="flex-between">
								<text style="font-size: 24rpx; color: #999999;"
									decode="">订单号:&ensp;{{item.order.orderNumber}}</text>
								<text style="font-size: 24rpx;"
									:style="getOrderStatusColor(item.order)">{{getOrderName(item.order)}}</text>
							</view>
							<u-divider color="#979797" margin-top="30" margin-bottom="30" :use-slot="false"
								half-width="100%" />
							<view class="flex-between">
								<scroll-view class="mr-30" scroll-x style="width: 400rpx;">
									<view class="flex mr-20">
										<view v-for="item2 in item.orderItem" :key="item2.id+ 'orderItem'"
											class="mr-30">
											<u-image width="110rpx" height="110rpx" :src="item2.image" mode="aspectFit"
												border-radius="20" bgColor="#ECECEC">
												<template #loading>
													<u-loading mode="circle" color="rgb(64, 174, 54)" />
												</template>
											</u-image>
										</view>
									</view>
								</scroll-view>
								<view style="text-align: right;">
									<view style="font-size: 22rpx; color: #999999;">共{{item.order.totalNum}}件
									</view>
									<view class="mt-10">
										<text style="font-size: 24rpx;">合计：</text>
										<text
											style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
										<text style="font-size: 34rpx;">{{item.order.totalPrice}}</text>
									</view>
								</view>
							</view>
							<view class="flex-between mt-20">
								<view>
									<text style="font-size: 24rpx; color: #999999;">{{item.order.createAt}}</text>
								</view>
								<view class="flex-end">
									<u-button v-if="!item.order.isPaid && item.order.status !== 6" type="warning" plain
										size="mini" shape="circle" @click.stop="removeOrder(item.order.id)">取消订单
									</u-button>
									<u-button v-if="!item.order.isPaid && item.order.status !== 6" type="primary" plain
										size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}"
										@click.stop="navtoOrderDetail(item)">去支付
									</u-button>
									<u-button v-if="item.order.isPaid && item.order.status===2" type="primary" plain
										size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}"
										@click.stop="receiveClick(item.order.id)">确认收货
									</u-button>
									<u-button
										v-if="item.order.isPaid && item.order.status === 3 && isLessThreeDay(item)"
										type="warning" plain size="mini" shape="circle"
										:custom-style="{marginLeft: '20rpx'}" @click.stop="navtoOrderDetail(item)">申请退款
									</u-button>
									<u-button v-if="item.order.isPaid && item.order.status === 4" type="primary" plain
										size="mini" shape="circle" :custom-style="{marginLeft: '20rpx'}"
										@click.stop="cancelRefundClick(item)">取消退款
									</u-button>
								</view>
							</view>
						</navigator>
					</view>
				</u-card>
			</view>
			<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
				<u-loading mode="circle"></u-loading>
				<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
			</view>
		</scroll-view>

		<!-- 订单为空 -->
		<view class="empty" v-else>
			<u-image src="/static/imgs/order.svg" width="220rpx" height="250rpx">
				<template #loading>
					<u-loading mode="circle" color="rgb(64, 174, 54)" />
				</template>
			</u-image>
			<text class="mt-40" style="font-size: 32rpx; color: #999999;">抱歉，没有找到订单哦</text>
		</view>

		<LoadingPage :show="loading" />
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
	} from "vue"
	import {
		getOrder,
		cancelOrder,
		receiptOrder,
		cancelRefund
	} from '@/api/order'
	import {
		FsOrder
	} from "@/models/fsOrder";
	import {
		OrderAndItemVo
	} from "@/models/orderAndItemVo";
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import dayjs from "dayjs";

	const loading = ref(true)

	const getOrderStatusColor = (row : FsOrder) => {
		if (row.status === 6) return 'color: #fa3534;'
		if (!row.isPaid) return 'color: #F55726;'
		return ['color: #2979ff;', 'color: #40ae36;', 'color: #40ae36;', 'color: #fa3534;', 'color: #fa3534;'][row
			.status - 1
		]
	}

	const getOrderName = (row : FsOrder) => {
		if (row.status === 6) return '已取消'
		if (!row.isPaid) return '待支付'
		return ['待发货', '待收货', '已完成', '申请退款', '已退款'][row.status - 1]
	}


	const tabsList = reactive([{
		name: '全部',
	},
	{
		name: '待付款'
	},
	{
		name: '待收货'
	},
	{
		name: '已完成'
	},
	{
		name: '售后'
	}
	])

	const queryForm = reactive({
		page: 1,
		pageSize: 10,
		isPaid: undefined as string,
		status: undefined as number[],
		origin: 1,
		orderType: 1,
	})
	const orderList = ref<OrderAndItemVo[]>([])
	const tabsRef = ref()
	const tabsCurrent = ref(0)

	//tabs页切换
	const tabsChange = async (index : number) => {
		orderList.value.length = 0
		tabsCurrent.value = index
		queryForm.page = 1
		queryForm.isPaid = undefined
		if (index === 0) {
			queryForm.status = undefined
		} else if (index === 1) {
			queryForm.isPaid = 'false'
			queryForm.status = [1]
		} else if (index === 2) {
			queryForm.isPaid = 'true'
			queryForm.status = [1, 2]
		} else if (index === 3) {
			queryForm.status = [3]
		} else if (index === 4) {
			queryForm.status = [4, 5]
		}
		getOrderList(!loading.value)
	}

	//获取订单列表
	const getOrderList = async (loading2 = true) => {
		const {
			data,
			code
		} = await getOrder(queryForm, loading2).finally(() => loading.value = false)
		if (code !== 200) return Promise.reject()

		if (data.length === 0) {
			noGet = true
			return Promise.resolve()
		} else noGet = false

		if (queryForm.page === 1) orderList.value = data
		else orderList.value.push(...data)
		return Promise.resolve()
	}

	const showMore = ref(false)
	let noGet = false

	const scrollBottom = () => {
		if (noGet) return
		showMore.value = true
		queryForm.page++
		getOrderList().finally(() => {
			showMore.value = false
		})
	}

	//取消订单前确定
	const removeOrder = (id : number) => {
		uni.showModal({
			title: '提示',
			content: '您确定要取消该订单吗?',
			cancelText: '考虑一下',
			cancelColor: '#40ae36',
			success: ({
				confirm
			}) => {
				if (confirm) {
					commitRemoveOrder(id)
				}
			}
		})
	}

	//取消订单
	const commitRemoveOrder = async (id : number) => {
		const {
			code
		} = await cancelOrder(id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '取消成功!',
			icon: 'success',
			mask: true
		})
		setTimeout(() => {
			refresh()
		}, 1500)
		return Promise.resolve()
	}

	//跳转到订单详情页面
	const navtoOrderDetail = (item : OrderAndItemVo) => {
		uni.navigateTo({
			url: `/subPages/orderDetail/orderDetail?id=${item.order.orderNumber}`
		})
	}

	//确认收货点击
	const receiveClick = (id : number) => {
		uni.showModal({
			title: '提示',
			content: '确定收货？',
			success({ confirm }) {
				if (confirm) {
					receive(id)
				}
			},
		})
	}

	//收货
	const receive = async (id : number) => {
		const {
			code
		} = await receiptOrder(id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '收货成功！',
			mask: true,
			icon: 'success'
		})
		setTimeout(() => {
			refresh()
		}, 1500)
	}


	//取消退款点击
	const cancelRefundClick = (item : OrderAndItemVo) => {
		uni.showModal({
			title: '提示',
			content: '确定取消退款？',
			success({ confirm }) {
				if (confirm) {
					cancelRefunds(item.order.id)
				}
			},
		})
	}

	//取消退款
	const cancelRefunds = async (id : number) => {
		const {
			code
		} = await cancelRefund(id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '取消退款成功！',
			mask: true,
			icon: 'success'
		})
		setTimeout(() => {
			refresh()
		}, 1500)
	}

	const refresh = () => {
		orderList.value = []
		queryForm.page = 1
		getOrderList()
	}

	const isLessThreeDay = (item : OrderAndItemVo) => {
		return dayjs().diff(dayjs(item.order.payTime), 'day') < 3
	}

	onLoad(({
		tabsId
	}) => {
		if (tabsId) {
			tabsChange(tabsId - 1)
		} else {
			getOrderList(false)
		}
	})

	onShow(() => {
		if (!loading.value) {
			refresh()
		}
	})
</script>

<style lang="scss" scoped>
	.content {
		:deep(.u-scroll-bar) {
			transition: left 0.01s;
		}

		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
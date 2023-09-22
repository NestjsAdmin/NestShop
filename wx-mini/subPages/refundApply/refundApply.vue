<template>
	<view class="content">

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
			padding="30" margin="0 30rpx 30rpx 30rpx">
			<view slot="body">
				<u-checkbox-group>
					<view v-for="item in orderItem" :key="item.id+ 'orderItem'" class="goods-item">
						<view class="goods-checkbox" @click.stop>
							<u-checkbox v-model="item.choosed" shape="circle" active-color="rgb(64, 174, 54)"
								@change="selectChange()" />
						</view>
						<view class="goods-content">
							<view>
								<u-image width="150rpx" height="150rpx" :src="item.image"></u-image>
							</view>
							<view class="good-desc">
								<view style="color: black;">
									{{item.name}}
								</view>
								<view class="flex-between">
									<view>
										<text decode="">￥{{item.price}}&emsp;</text>
									</view>
									<view>数量：<text>{{item.number}}件</text></view>
								</view>
								<view>
									合计：￥
									<text style="font-size: 34rpx;">
										{{(parseFloat(item.price) *item.number).toFixed(2)}}
									</text>
								</view>
							</view>
						</view>
					</view>
				</u-checkbox-group>
			</view>
		</u-card>

		<u-card :showHead="false" :showFoot="false" :head-border-bottom="false" borderRadius="25" :border="false"
			padding="30" margin="0 30rpx 30rpx 30rpx">
			<view slot="body">
				<u-form :model="form" ref="$form" label-position="top">
					<u-form-item label="退款原因" prop="refundReason">
						<u-input v-model="form.refundReason" type="textarea" placeholder="请输入退款原因" />
					</u-form-item>
					<u-form-item label="相关图片" prop="refundImage">
						<uni-file-picker v-model="form.refundImage" :auto-upload="false" limit="5" title=""
							fileMediatype="image" mode="grid" @select="selectImage"></uni-file-picker>
					</u-form-item>
				</u-form>
			</view>
		</u-card>
		<view class="footer">
			<view class="flex pl-20" style="flex: 1;">
				<u-checkbox v-model="allChoosed" shape="circle" active-color="rgb(64, 174, 54)" @change="selectAll">
					<text class="ml-10">全选</text>
				</u-checkbox>
			</view>
			<view class="flex pr-20" style="color: #333333;">
				<text style="font-size: 24rpx;">合计退款：</text>
				<text style="font-size: 20rpx; align-self: flex-end; padding-bottom: 30rpx;">￥</text>
				<text class="mr-30" style="font-size: 34rpx;color: red">{{getTotal}}</text>
				<u-button type="primary" shape="circle" @click.stop="refundCommit()">退款申请</u-button>
			</view>
		</view>

		<LoadingPage :show="loading" />
	</view>
</template>

<script lang="ts" setup>
	import {
		computed,
		reactive,
		ref
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'
	import {
		getSingleOrder, putRefund,
	} from "@/api/order";
	import { FsOrder } from '@/models/fsOrder';
	import { FsOrderItem } from '@/models/fsOrderItem';

	const allChoosed = ref(false)
	const loading = ref(true)

	const form = reactive({
		refundImage: [],
		refundReason: ''
	})

	const rules = reactive({
		refundReason: [{
			required: true,
			message: '请输入退款原因',
			trigger: 'blur',
			type: 'string'
		}]
	})


	const order = ref<FsOrder>()

	interface orderItemChoose extends FsOrderItem {
		choosed : boolean
	}

	const orderItem = ref<orderItemChoose[]>([])

	//选择的商品改变
	const selectChange = () => {
		setTimeout(() => {
			if (orderItem.value.some((item) => item.choosed === false)) {
				allChoosed.value = false
			} else {
				allChoosed.value = true
			}
		}, 300)
	}

	//全选按钮点击
	const selectAll = ({
		value
	} : {
		value : boolean
	}) => {
		if (orderItem.value.length === 0) {
			allChoosed.value = false
		}
		if (value) {
			orderItem.value.forEach((item) => {
				item.choosed = true
			})
		} else {
			orderItem.value.forEach((item) => {
				item.choosed = false
			})
		}
	}

	//退款按钮点击
	const refundCommit = () => {
		if (getTotal.value === (0).toFixed(2)) {
			uni.showToast({
				title: '请选择商品！',
				mask: true,
				icon: 'error'
			})
			return
		}
		$form.value.validate((valid : boolean) => {
			if (valid) {
				refund()
			}
		})
	}

	//退款
	const refund = async () => {
		const queryFrom = {
			orderId: order.value.id,
			orderItemIds: orderItem.value.filter(item => item.choosed).map(item => item.id),
			refundImage: form.refundImage.map(item => item.url).join(','),
			refundReason: form.refundReason
		}
		const { code } = await putRefund(queryFrom)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: '申请已提交',
			icon: 'success',
			mask: true
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
		return Promise.resolve()
	}

	//获取退款总金额
	const getTotal = computed(() => {
		let count = 0
		orderItem.value.forEach(item => {
			if (item.choosed) count += (parseFloat(item.price) * item.number)
		})
		return count.toFixed(2)
	})

	const selectImage = (e : any) => {
		uploadImages(e.tempFilePaths)
	}


	//提交图片
	const uploadImages = async (list : any[]) => {
		list.forEach((item) => {
			uni.uploadFile({
				url: 'https://freshshop.ppjun.cn/api/file',
				filePath: item,
				name: 'file',
				header: {
					Authorization: uni.getStorageSync('token'),
					"Content-Type": "application/json",
				},
				success: (res) => {
					const data = JSON.parse(res.data).data
					form.refundImage.push({
						name: data[0],
						extname: 'png',
						url: data[0],
					})
				}
			})
		})

		return Promise.resolve()
	}

	//获取订单信息
	const getOrderInfo = async (orderNumber : string) => {
		const {
			data,
			code
		} = await getSingleOrder(orderNumber)
		if (code !== 200) return Promise.reject()
		order.value = data.order
		orderItem.value = data.orderItem.filter(item => item.refundStatus === 1).map((item) => {
			return {
				...item,
				choosed: false
			}
		})
		return Promise.resolve()
	}


	const $form = ref()
	onReady(() => {
		$form.value.setRules(rules);
	})

	onLoad(({
		id
	}) => {
		if (id) {
			getOrderInfo(id).finally(() => loading.value = false)
		}
	})
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 30rpx;
		padding-bottom: 100rpx;

		.goods-item {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			&:last-child {
				margin-bottom: 0;
			}

			.goods-content {
				flex: 1;
				display: flex;

				.good-desc {
					color: $u-tips-color;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					text {
						color: $theme-color;
					}
				}
			}
		}

		.footer {
			display: flex;
			position: fixed;
			left: 0;
			bottom: 50rpx;
			width: 100vw;
			height: 100rpx;
			background-color: white;
			border-top: 1px solid #ECECEC;
			z-index: 999;
			box-sizing: border-box;
		}
	}
</style>
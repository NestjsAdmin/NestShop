<template>
	<scroll-view class="rechargeDetail" @scrolltolower="getMore" scroll-y>
		<u-empty mode="favor" v-if="rechargeList.length === 0" text="暂无充值记录"></u-empty>

		<u-cell-group v-else>
			<u-cell-item v-for="item in rechargeList" :key="item.order.id" :title="`积分：+${item.order.chargePrice}`"
				:value="`价格：$${item.order.totalPrice}`" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view v-if="showMore" class="flex-center" style="padding-bottom: 50rpx;">
			<u-loading mode="circle"></u-loading>
			<text style="font-size: 22rpx;" decode>&ensp;加载更多中...</text>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { getOrder } from '../../api/order';
	const rechargeList = ref([])
	const queryForm = reactive({ page: 1, pageSize: 10, orderType: 2 })
	let noGet = false
	const showMore = ref(false)

	const getRechargeList = async () => {
		const { data, code } = await getOrder(queryForm)
		if (code !== 200) return Promise.reject()
		if (data.length === 0) {
			noGet = true
			return Promise.resolve()
		} else noGet = false
		if (queryForm.page === 1) rechargeList.value = data
		else rechargeList.value.push(...data)
		return Promise.resolve()
	}

	const getMore = () => {
		if (noGet) return
		else {
			queryForm.page++
			showMore.value = true
			getRechargeList().finally(() => {
				showMore.value = false
			})
		}
	}


	onMounted(() => {
		getRechargeList()
	})
</script>

<style scoped lang="scss">
	.rechargeDetail {
		min-height: 100vh;

		:deep(.u-empty) {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
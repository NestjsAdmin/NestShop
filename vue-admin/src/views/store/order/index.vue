<!-- 订单管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-form :model="form" class="mb15">
				<el-space wrap>
					<el-form-item label="关键字:">
						<el-input v-model="form.keyword" size="default" placeholder="请输入关键字" @keyup.enter="getTableData"></el-input>
					</el-form-item>
					<el-form-item label="所属门店: " prop="storeId">
						<el-select v-model="form.storeId" placeholder="请选择所属门店" filterable clearable>
							<el-option v-for="item in storeDcitonary" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单类型:">
						<el-select v-model="form.orderType" placeholder="请选择类型">
							<el-option label="商品" :value="1"></el-option>
							<el-option label="充值" :value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单状态:">
						<el-select v-model="form.status" placeholder="请选择状态" clearable filterable>
							<el-option v-for="item in statusDic" :key="item.id + 'status'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单来源:">
						<el-select v-model="form.origin" placeholder="请选择来源" clearable filterable>
							<el-option v-for="item in originDic" :key="item.id + 'status'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-date-picker
							v-model="dateTimeRange"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							range-separator="-"
							value-format="YYYY-MM-DD HH:mm:ss"
							:unlink-panels="true"
							type="datetimerange"
						></el-date-picker>
					</el-form-item>
					<el-checkbox v-model="form.isPaid" true-label="true" false-label="false">是否付款</el-checkbox>
					<div>
						<el-button @click="getTableData" size="default" type="primary">
							<el-icon>
								<ele-Search />
							</el-icon>
							查询
						</el-button>
						<el-button @click="exportExcel" size="default" type="primary"> 导出 </el-button>
					</div>
				</el-space>
			</el-form>
			<el-table :data="table" v-loading="tableLoading" style="width: 100%" :row-class-name="getRowClassName">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="orderType" label="订单类型" width="120">
					<template #default="{ row }">
						<span style="color: black; font-weight: 400">{{ row.order.orderType === 1 ? '商品' : '充值' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="order.storeName" label="门店" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="order.status" label="订单状态" show-overflow-tooltip min-width="160px">
					<template #default="{ row }">
						<span :style="getStatusColor(row)">{{ formatStatus(row) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="order.orderNumber" label="订单号" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="order.consignee" label="收货人" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="order.phone" label="联系电话" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="order.dispatcherName" label="配送员" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="order.address" label="地址" show-overflow-tooltip min-width="200px"></el-table-column>
				<el-table-column prop="order.totalNum" label="商品总数" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="order.totalPrice" label="商品总价" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="order.isPaid" label="是否支付" show-overflow-tooltip min-width="150px">
					<template #default="{ row }">
						<span v-if="row.order.isPaid" style="color: #40ae36">是</span>
						<span v-else style="color: #f55726">否</span>
					</template>
				</el-table-column>
				<el-table-column prop="order.userName" label="用户名称" show-overflow-tooltip min-width="150px" />
				<el-table-column prop="order.backIntegral" label="返回积分" show-overflow-tooltip min-width="150px" />
				<el-table-column prop="order.payTime" label="支付时间" show-overflow-tooltip width="160px"></el-table-column>
				<el-table-column prop="order.payType" label="支付方式" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.origin" label="订单来源" show-overflow-tooltip min-width="160px" :formatter="formatOrigin"></el-table-column>

				<el-table-column prop="order.mark" label="订单备注" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column
					prop="order.deliveryType"
					label="送货方式"
					show-overflow-tooltip
					min-width="160px"
					:formatter="formatdeliveryType"
				></el-table-column>
				<el-table-column prop="order.distributionTime" label="配送时间" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.refundPrice" label="退款金额" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.refundReason" label="退款原因" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.refundRefuse" label="客服反馈" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.refundTime" label="退款时间" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="order.createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="220" fixed="right">
					<template #default="{ row }">
						<el-button type="primary" size="small" text @click="viewDetail(row)" v-if="row.order.orderType === 1">查看商品</el-button>
						<el-button
							v-if="row.order.isPaid && row.order.status === 1 && row.order.orderType === 1"
							size="small"
							text
							type="success"
							@click="startDelivery(row)"
							>开始配送</el-button
						>
						<el-button
							v-if="row.order.isPaid && row.order.status === 2 && row.order.orderType === 1"
							size="small"
							text
							type="success"
							@click="confirmReceive(row)"
							>确认收货</el-button
						>
						<el-button
							v-if="row.order.isPaid && row.order.status === 4 && row.order.orderType === 1"
							size="small"
							text
							type="warning"
							@click="refundDetail(row)"
							>退款详情</el-button
						>
						<el-button
							v-if="[1, 2].includes(row.order.status) && row.order.orderType === 1"
							size="small"
							text
							type="warning"
							@click="cancelOrderClick(row)"
							>取消订单</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="getTableData"
				@current-change="getTableData"
				class="mt15"
				:pager-count="5"
				:page-sizes="[15, 20, 30]"
				v-model:current-page="form.page"
				background
				v-model:page-size="form.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
		<delivery ref="$delivery" @success="getTableData" />
		<goodsItem ref="$goodsItem" />
		<refundDetailCom ref="$refundDetail" @refresh="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElMessage, dayjs } from 'element-plus';
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';
import { receiptGoods, getOrder, cancelOrder } from '/@/api/order';
import { dictModel } from '/@/common/models/dictionary';
import { OrderAndItemVo } from '/@/common/models/order-and-item-vo';
import { formatTime } from '/@/utils/dateFormatter';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { getStore } from '/@/api/store';

const delivery = defineAsyncComponent(() => import('/@/views/store/order/delivery.vue'));
const goodsItem = defineAsyncComponent(() => import('/@/views/store/order/goodsItem.vue'));
const refundDetailCom = defineAsyncComponent(() => import('/@/views/store/order/refundDetail.vue'));

const form = reactive({
	page: 1,
	pageSize: 15,
	keyword: '',
	status: null as unknown as number,
	origin: null as unknown as number,
	isPaid: '',
	orderType: 1,
	storeId: '',
});

const dateTimeRange = ref<string[]>([]);

const total = ref(0);
const tableLoading = ref(false);

const table = ref<OrderAndItemVo[]>([]);

//获取商品列表
const getTableData = async () => {
	const queryFrom = {
		...form,
		endTime: '' as undefined | string,
		startTime: '' as undefined | string,
	};
	if (dateTimeRange.value && dateTimeRange.value.length > 0) {
		queryFrom.endTime = dateTimeRange.value[1];
		queryFrom.startTime = dateTimeRange.value[0];
	} else {
		delete queryFrom.endTime;
		delete queryFrom.startTime;
	}
	tableLoading.value = true;
	const { code, data, totalCount } = await getOrder(queryFrom).finally(() => {
		tableLoading.value = false;
	});
	if (code !== 200) return Promise.reject();
	table.value = data;
	total.value = totalCount;
};

//取消订单
const cancelOrderClick = async (row: OrderAndItemVo) => {
	const { code } = await cancelOrder(row.order.id as number);
	if (code !== 200) return Promise.reject();
	ElMessage.success('取消成功');
	getTableData();
};

const $goodsItem = ref();
//查看商品
const viewDetail = (row: OrderAndItemVo) => {
	$goodsItem.value.open(row.orderItem);
	console.log(row);
};

const $delivery = ref();
//开始配送
const startDelivery = (row: OrderAndItemVo) => {
	$delivery.value.open(row.order.id);
};

//确认收货
const confirmReceive = async (row: OrderAndItemVo) => {
	const { code, msg } = await receiptGoods(row.order.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

const $refundDetail = ref();
//打开退款详情页面
const refundDetail = (row: OrderAndItemVo) => {
	$refundDetail.value.open(row);
	console.log(row);
};

//门店字典
const storeDcitonary = ref<dictModel[]>([]);
//获取门店字典
const getStoreList = async () => {
	const { code, data } = await getStore({ page: 1, pageSize: 999, keyword: '' });
	if (code !== 200) return Promise.reject();
	storeDcitonary.value = data.map((item) => {
		return {
			name: item.name,
			id: item.id as number,
		};
	});
};

//格式化时间
const formattercreateAt = (row: OrderAndItemVo) => formatTime(row.order.createAt);

//来源字典
const originDic = reactive<dictModel[]>([
	{
		id: 1,
		name: '小程序商城',
	},
	{
		id: 2,
		name: '工收银台',
	},
	{
		id: 3,
		name: '自助收银台',
	},
]);

//状态字典
const statusDic = reactive<dictModel[]>([
	{
		id: 1,
		name: '待发货',
	},
	{
		id: 2,
		name: '待收货',
	},
	{
		id: 3,
		name: '已完成',
	},
	{
		id: 4,
		name: '申请退款',
	},
	{
		id: 5,
		name: '已退款',
	},
	{
		id: 6,
		name: '已取消',
	},
]);

//送货方式字典
const deliverDic = reactive<dictModel[]>([
	{
		id: 1,
		name: '门店配送',
	},
	{
		id: 2,
		name: '到店自提',
	},
	{
		id: 3,
		name: '第三方配送',
	},
]);

//通过状态码字典获取颜色类名
const getRowClassName = ({ row }: { row: OrderAndItemVo }) => {
	if (row.order.status === 5) return 'redText';
	else if (row.order.status === 2) return 'blueText';
	else if (row.order.status === 4) return 'yellowText';
	else if (row.order.status === 3) return 'greenText';
	else if (row.order.status === 6) return 'grayText';
	else return '';
};

//转换状态为中文
const formatStatus = (row: OrderAndItemVo) => {
	if (row.order.status === 6) return '已取消';
	if (!row.order.isPaid) return '待付款';
	return statusDic.find((item) => row.order.status === item.id)?.name;
};

//通过状态码字典获取颜色
const getStatusColor = (row: OrderAndItemVo) => {
	if (row.order.status === 6) return 'color: #fa3534;';
	if (!row.order.isPaid) return 'color: #F55726;';
	return ['color: #2979ff;', 'color: #40ae36;', 'color: #40ae36;', 'color: #fa3534;', 'color: #fa3534;'][row.order.status - 1];
};

//转换来源为中文
const formatOrigin = (row: OrderAndItemVo) => originDic.find((item) => row.order.origin === item.id)?.name;

//转换送货方式为中文
const formatdeliveryType = (row: OrderAndItemVo) => deliverDic.find((item) => row.order.origin === item.id)?.name;

const exportExcel = async () => {
	const queryFrom = {
		...form,
		page: 1,
		pageSize: 999999999,
		endTime: '' as undefined | string,
		startTime: '' as undefined | string,
	};
	if (dateTimeRange.value && dateTimeRange.value.length > 0) {
		queryFrom.endTime = dateTimeRange.value[1];
		queryFrom.startTime = dateTimeRange.value[0];
	} else {
		delete queryFrom.endTime;
		delete queryFrom.startTime;
	}
	const { code, data } = await getOrder(queryFrom, true).finally(() => {
		tableLoading.value = false;
	});
	if (code !== 200) return;
	const arr = data.map((item) => ({
		订单类型: item.order.orderType === 1 ? '商品' : '充值',
		门店: item.order.storeName,
		订单状态: formatStatus(item),
		订单号: item.order.orderNumber,
		收货人: item.order.consignee,
		联系电话: item.order.phone,
		配送员: item.order.dispatcherName,
		地址: item.order.address,
		商品总数: item.order.totalNum,
		商品总价: item.order.totalPrice,
		是否支付: item.order.isPaid ? '是' : '否',
		用户名称: item.order.userName,
		返回积分: item.order.backIntegral,
		支付时间: item.order.payTime,
		支付方式: item.order.payType,
		订单来源: item.order.origin,
		订单备注: item.order.mark,
		送货方式: formatdeliveryType(item),
		配送时间: item.order.distributionTime,
		退款金额: item.order.refundPrice,
		退款原因: item.order.refundReason,
		客服反馈: item.order.refundRefuse,
		退款时间: item.order.refundTime,
		创建时间: item.order.createAt,
	}));
	const excelData = XLSX.utils.json_to_sheet(arr);
	var wb = XLSX.utils.book_new();
	/* get binary string as output */
	XLSX.utils.book_append_sheet(wb, excelData, '订单数据');
	var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });

	try {
		FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `店铺订单截止${dayjs().format('YYYY-MM-DD HH点mm分ss秒')}.xlsx`);
	} catch (e) {
		if (typeof console !== 'undefined') console.log(e, wbout);
	}
	return wbout;
};

onMounted(() => {
	getStoreList();
	getTableData();
});
</script>
<style scoped lang="scss">
.system-role-container {
	:deep() {
		.redText {
			.cell {
				color: #f56c6c;
			}
		}
		.blueText {
			.cell {
				color: #409eff;
			}
		}
		.yellowText {
			.cell {
				color: #e6a23c;
			}
		}
		.grayText {
			.cell {
				color: #909399;
			}
		}
		.greenText {
			.cell {
				color: #67c23a;
			}
		}
	}
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>

<!-- 退款详情 -->
<template>
	<el-dialog v-model="isShow" title="退款详情">
		<el-descriptions :column="3" border>
			<el-descriptions-item label="订单号">
				{{ order.orderNumber }}
			</el-descriptions-item>
			<el-descriptions-item label="配送员">
				{{ order.dispatcherName }}
			</el-descriptions-item>
			<el-descriptions-item label="送件地址">
				{{ order.address }}
			</el-descriptions-item>
			<el-descriptions-item label="收货人">
				{{ order.consignee }}
			</el-descriptions-item>
			<el-descriptions-item label="电话">
				{{ order.phone }}
			</el-descriptions-item>
			<el-descriptions-item label="订单备注">
				{{ order.mark }}
			</el-descriptions-item>
			<el-descriptions-item label="商品总数">
				{{ order.totalNum }}
			</el-descriptions-item>
			<el-descriptions-item label="商品总价"> ￥{{ order.totalPrice }} </el-descriptions-item>
			<el-descriptions-item label="退款金额">
				<span class="red">￥{{ order.refundPrice }}</span>
			</el-descriptions-item>
			<el-descriptions-item label="客服反馈" span="3">
				{{ order.refundReason }}
			</el-descriptions-item>
		</el-descriptions>
		<p class="hftitle">退款商品</p>
		<el-table :data="table" max-height="300px">
			<el-table-column label="ID" prop="id"></el-table-column>
			<el-table-column label="商品名称" prop="name"></el-table-column>
			<el-table-column label="商品价格" prop="price"></el-table-column>
			<el-table-column label="数量" prop="number"></el-table-column>
			<el-table-column label="图片" prop="image">
				<template #default="{ row }">
					<el-image style="width: 40px; height: 40px" :src="row.image" fit="contain" />
				</template>
			</el-table-column>
			<el-table-column label="状态" prop="refundStatus">
				<template #default="{ row }">
					{{ row.refundStatus === 1 ? '未退款' : row.refundStatus === 2 ? '申请中' : row.refundStatus === 3 ? '已退款' : '' }}
				</template>
			</el-table-column>
			<el-table-column label="订单id" prop="orderId"></el-table-column>
		</el-table>
		<p class="hftitle" v-if="order.refundImage">退款图片</p>
		<div style="display: flex; flex-wrap: wrap" v-if="order.refundImage">
			<div style="margin-right: 20px" v-for="(item, index) in order.refundImage?.split(',')" :key="index + 'img'">
				<el-image style="width: 200px; height: 200px" :src="item" fit="contain" :preview-src-list="[item]" />
			</div>
		</div>
		<el-form :model="form" label-width="120px" style="margin-top: 15px" ref="$form">
			<el-form-item
				prop="refundPrice"
				label="退款金额"
				:rules="[
					{
						required: true,
						message: '请填写退款金额',
						trigger: 'blur',
					},
				]"
			>
				<el-input-number
					v-model="form.refundPrice"
					placeholder="请输入退款金额"
					:controls="false"
					:min="0.01"
					:max="order.refundPrice"
					:precision="2"
				></el-input-number>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button type="warning" @click="refuseShow = true">拒绝退款</el-button>
			<el-button type="success" @click="agreeRefundClick">确认退款</el-button>
		</template>
		<el-dialog v-model="refuseShow" title="拒绝退款">
			<el-form :model="form" ref="$form2">
				<el-form-item
					prop="refundRefuse"
					label="客服反馈"
					:rules="[
						{
							required: true,
							message: '请填写客服反馈',
							trigger: 'blur',
							type: 'string',
						},
					]"
				>
					<el-input v-model="form.refundRefuse" placeholder="请输入客服反馈" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" @click="refuseRefundClick">确定</el-button>
			</template>
		</el-dialog>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';
import { agreeRefund, refuseRefund } from '/@/api/order';
import { FsOrder } from '/@/common/models/fs-order';
import { FsOrderItem } from '/@/common/models/fs-order-item';
import { OrderAndItemVo } from '/@/common/models/order-and-item-vo';

const isShow = ref(false);
const refuseShow = ref(false);
const form = reactive({
	refundPrice: undefined as unknown as number | string,
	refundRefuse: '',
});
const table = ref<FsOrderItem[]>([]);
const order = reactive<FsOrder>({
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
	orderType: 0,
	mark: '',
	deliveryType: 0,
	distributionTime: '',
});

const emits = defineEmits<{
	(e: 'refresh'): void;
}>();

const $form2 = ref();
//拒绝退款点击
const refuseRefundClick = async () => {
	$form2.value.validateField('refundRefuse', (isValid: boolean) => {
		if (isValid) {
			refuseRefundCommit();
		}
	});
};

//拒绝退款
const refuseRefundCommit = async () => {
	const { code } = await refuseRefund({
		id: order.id as number,
		refundRefuse: form.refundRefuse,
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success('已拒绝退款！');
	emits('refresh');
	isShow.value = false;
	refuseShow.value = false;
};

const $form = ref();
//同意退款点击
const agreeRefundClick = async () => {
	await $form.value.clearValidate();
	$form.value.validateField('refundPrice', (isValid: boolean) => {
		if (isValid) {
			agreeRefundCommit();
		}
	});
};

//同意退款
const agreeRefundCommit = async () => {
	const { code } = await agreeRefund({
		id: order.id as number,
		refundPrice: parseFloat(form.refundPrice.toString()),
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success('已同意退款！');
	emits('refresh');
	isShow.value = false;
};

const open = (row: OrderAndItemVo) => {
	table.value = row.orderItem.filter((item) => item.refundStatus === 2);
	Object.assign(order, row.order);
	form.refundPrice = undefined as unknown as number;
	form.refundRefuse = '';
	isShow.value = true;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss">
.hftitle {
	margin: 15px 0;
	font-size: 20px;
	font-weight: 600;
}
</style>

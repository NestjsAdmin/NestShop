<!-- 商品列表 -->
<template>
	<el-dialog v-model="isShow" title="商品列表">
		<el-table :data="table" height="600px" :row-class-name="getRowClassName">
			<el-table-column label="商品ID" prop="id"></el-table-column>
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
			<el-table-column prop="order.createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
		</el-table>
		<template #footer>
			<el-button type="warning" @click="isShow = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FsOrderItem } from '/@/common/models/fs-order-item';
import { formatTime } from '/@/utils/dateFormatter';

const isShow = ref(false);

const open = (arr: FsOrderItem[]) => {
	table.value = arr;
	isShow.value = true;
};

const table = ref<FsOrderItem[]>([]);

const getRowClassName = (row: FsOrderItem) => {
	if (row.refundStatus === 3) return 'redText';
	else if (row.refundStatus === 2) return 'yellowText';
	else return '';
};

//格式化时间
const formattercreateAt = (row: FsOrderItem) => formatTime(row.createAt);

defineExpose({ open });
</script>
<style scoped lang="scss"></style>

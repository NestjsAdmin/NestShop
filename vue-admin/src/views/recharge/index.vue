<!-- 充值管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-space wrap class="mb15" size="normal">
				<div>
					<el-button @click="getTableData" size="default" type="primary">
						<el-icon>
							<ele-Search />
						</el-icon>
						刷新
					</el-button>
					<el-button size="default" type="success" @click="addRecharge">
						<el-icon>
							<ele-FolderAdd />
						</el-icon>
						新增充值
					</el-button>
				</div>
			</el-space>

			<el-table :data="table" v-loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="名称" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="balance" label="到账余额" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="80" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="danger" @click="deleteCharge(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<rechargeDialog ref="$rechargeDialog" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { deleteRecharge, getRecharge } from '/@/api/recharge';
import { FsRecharge } from '/@/common/models/fs-recharge';
import { formatTime } from '/@/utils/dateFormatter';

const rechargeDialog = defineAsyncComponent(() => import('/@/views/recharge/dialog.vue'));

const tableLoading = ref(false);

const table = ref<FsRecharge[]>([]);

//获取充值列表
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data } = await getRecharge().finally(() => (tableLoading.value = false));
	if (code !== 200) return Promise.reject();
	table.value = data;
};

//删除充值
const deleteCharge = async (row: FsRecharge) => {
	const { code, msg } = await deleteRecharge(row.id as number);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	getTableData();
};

const $rechargeDialog = ref();
//打开新增充值界面
const addRecharge = () => {
	$rechargeDialog.value?.open();
};

const formattercreateAt = (row: FsRecharge) => {
	return formatTime(row.createAt);
};

onMounted(() => {
	getTableData();
});
</script>
<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>

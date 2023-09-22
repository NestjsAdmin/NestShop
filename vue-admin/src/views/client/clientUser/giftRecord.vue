<!--  赠送记录 -->
<template>
	<el-dialog v-model="isShow" title="赠送记录" width="700">
		<el-descriptions :column="2" border class="mb20">
			<el-descriptions-item label="用户id">
				{{ userId }}
			</el-descriptions-item>

			<el-descriptions-item label="手机号">
				{{ phoneNumber }}
			</el-descriptions-item>
		</el-descriptions>
		<el-table :data="table" height="500px" size="mini">
			<el-table-column label="赠送余额" prop="balance"></el-table-column>
			<el-table-column label="赠送积分" prop="integral"></el-table-column>
			<el-table-column label="操作时间" prop="createAt"></el-table-column>
			<el-table-column label="备注" prop="remark"></el-table-column>
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
			:total="form.totalCount"
		>
		</el-pagination>
		<template #footer>
			<el-button type="warning" @click="isShow = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FsUser } from '/@/common/models';
import { getGift } from '/@/api/gift';
import { FsGift } from '/@/common/models/fs-gift';

const isShow = ref(false);
const userId = ref(0);
const phoneNumber = ref('');
const table = ref<FsGift[]>([]);

const form = reactive({
	page: 1,
	pageSize: 10,
	totalCount: 0,
});

const getTableData = async () => {
	const { code, data, totalCount } = await getGift({
		page: form.page,
		pageSize: form.pageSize,
		userId: userId.value,
	});
	if (code !== 200) return;
	table.value = data;
	form.totalCount = totalCount;
	isShow.value = true;
};

const open = (row: FsUser) => {
	userId.value = row.id as number;
	phoneNumber.value = row.phoneNumber;
	form.page = 1;
	getTableData();
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

<!--  -->
<template>
	<el-dialog v-model="isShow" title="积分记录" width="700">
		<el-descriptions :column="2" border class="mb20">
			<el-descriptions-item label="商品名称">
				{{ name }}
			</el-descriptions-item>

			<el-descriptions-item label="二维码">
				{{ barcode }}
			</el-descriptions-item>
		</el-descriptions>
		<el-table :data="table" height="500px" size="mini">
			<el-table-column label="商品id" prop="goodsId" width="100px"></el-table-column>
			<el-table-column label="类型" prop="type" width="100px">
				<template #default="{ row }">
					{{ row.type === 0 ? '进货' : '出货' }}
				</template>
			</el-table-column>
			<el-table-column label="数量" prop="number"></el-table-column>
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
import { getStock } from '/@/api/stock';
import { FsGoods } from '/@/common/models/fs-goods';
import { FsStock } from '/@/common/models/fs-stock';

const isShow = ref(false);
const name = ref('');
const barcode = ref('');
const table = ref<FsStock[]>([]);

const form = reactive({
	page: 1,
	pageSize: 10,
	goodsId: 0,
	totalCount: 0,
});

const getTableData = async () => {
	const { code, data, totalCount } = await getStock({
		page: form.page,
		pageSize: form.pageSize,
		goodsId: form.goodsId,
	});
	if (code !== 200) return;
	table.value = data;
	form.totalCount = totalCount;
	isShow.value = true;
};

const open = (row: FsGoods) => {
	name.value = row.name;
	barcode.value = row.barcode as string;
	form.goodsId = row.id as number;
	form.page = 1;
	getTableData();
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

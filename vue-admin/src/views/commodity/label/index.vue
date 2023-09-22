<!-- 商品标签管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-space>
				<el-input v-model="form.keyword" placeholder="过滤" @keyup.enter="getTableData"></el-input>
				<el-button @click="getTableData" size="default" type="primary">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" @click="onOpenAddLable('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增
				</el-button>
			</el-space>

			<el-table :data="table" v-loading="tableLoading" style="width: 100%" row-key="id">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="标签名称" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="danger" @click="delLabel(row)">删除</el-button>
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
		<labelDialog ref="$labelDialog" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { deleteLabel, getLabel } from '/@/api/menu/label';
import { FsGoodsLabel } from '/@/common/models/fs-goods-label';

//引入组件
const labelDialog = defineAsyncComponent(() => import('/@/views/commodity/label/dialog.vue'));

const form = reactive({
	page: 1,
	pageSize: 15,
	keyword: '',
});

const tableLoading = ref(false);

const table = ref<FsGoodsLabel[]>([]);

const total = ref(0);

//获取标签数据
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data, totalCount } = await getLabel(form).finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	total.value = totalCount;
	table.value = data;
};

//删除标签
const delLabel = async (row: FsGoodsLabel) => {
	const { code, msg } = await deleteLabel(row.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

const $labelDialog = ref();
//打开新增标签弹窗
const onOpenAddLable = (type: string) => {
	$labelDialog.value.open(type);
};

onMounted(() => {
	getTableData();
});
</script>
<style scoped lang="scss">
.system-role-container {
	:deep() {
		.el-main {
			padding: 0;
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

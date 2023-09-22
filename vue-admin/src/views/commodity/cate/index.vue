<!-- 商品分类管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div>
				<el-button @click="getTableData" size="default" type="primary">
					<el-icon>
						<ele-Search />
					</el-icon>
					刷新
				</el-button>
				<el-button size="default" type="success" @click="onOpenAddCate('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增分类
				</el-button>
			</div>

			<el-table
				:data="table"
				v-loading="tableLoading"
				style="width: 100%"
				row-key="id"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				default-expand-all
			>
				<!-- <el-table-column type="index" label="序号" width="60" /> -->
				<el-table-column prop="image" label="图片" show-overflow-tooltip min-width="150px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.icon" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="分类名称" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="isShow" label="是否在app显示" show-overflow-tooltip min-width="100px">
					<template #default="{ row }">
						<el-switch v-model="row.isShow" :active-value="true" :inactive-value="false" disabled></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="sort" label="排序" show-overflow-tooltip min-width="60px"></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="primary" @click="modifyCate(row)">修改</el-button>
						<el-button size="small" text type="danger" @click="delCate(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<cateDialog ref="$cateDialog" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { deleteCate, getCate } from '/@/api/cate';
import { CateVo } from '/@/common/models/cate-vo';

//引入组件
const cateDialog = defineAsyncComponent(() => import('/@/views/commodity/cate/dialog.vue'));

const tableLoading = ref(false);

const table = ref<CateVo[]>([]);

//获取分类数据
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data } = await getCate().finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	table.value = data;
};

//删除分类
const delCate = async (row: CateVo) => {
	const { code, msg } = await deleteCate(row.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

//打开修改分类弹窗
const modifyCate = (row: CateVo) => {
	const row2 = JSON.parse(JSON.stringify(row));
	delete row2.children;
	$cateDialog.value.open('edit', row2);
};

const $cateDialog = ref();
//打开新增分类弹窗
const onOpenAddCate = (type: string) => {
	$cateDialog.value.open(type);
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

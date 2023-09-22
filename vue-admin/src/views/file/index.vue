<!-- 文件管理 -->
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
						新增文件
					</el-button>
				</div>
			</el-space>

			<el-table :data="table" v-loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="文件名" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="path" label="路径" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="type" label="类型" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column label="预览" show-overflow-tooltip min-width="130px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.domain + row.path" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="80" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="danger" @click="deleteCharge(row)">删除</el-button>
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
		<fileDialog ref="$fileDialog" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref, reactive, defineAsyncComponent } from 'vue';
import { deleteFile, getFile } from '/@/api/file';
import { AdFile } from '/@/common/models/ad-file';
import { formatTime } from '/@/utils/dateFormatter';

const fileDialog = defineAsyncComponent(() => import('/@/views/file/dialog.vue'));

const form = reactive({
	page: 1,
	pageSize: 15,
	keyword: '',
});
const total = ref(0);
const tableLoading = ref(false);

const table = ref<AdFile[]>([]);

//获取文件列表
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data, totalCount } = await getFile(form).finally(() => (tableLoading.value = false));
	if (code !== 200) return Promise.reject();
	table.value = data;
	total.value = totalCount;
};

//删除文件
const deleteCharge = async (row: AdFile) => {
	const { code, msg } = await deleteFile(row.id as number);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	getTableData();
};

const $fileDialog = ref();
//打开新增文件界面
const addRecharge = () => {
	$fileDialog.value?.open();
};

const formattercreateAt = (row: AdFile) => {
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

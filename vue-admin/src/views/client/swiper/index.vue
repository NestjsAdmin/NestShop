<!-- 门店管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-space wrap class="mb15">
				<div>
					<el-button @click="getTableData" size="default" type="primary">
						<el-icon>
							<ele-Search />
						</el-icon>
						刷新
					</el-button>
					<el-button size="default" type="success" @click="addStore">
						<el-icon>
							<ele-FolderAdd />
						</el-icon>
						新增轮播图
					</el-button>
				</div>
			</el-space>

			<el-table :data="table" v-loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="image" label="图片" show-overflow-tooltip min-width="150px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.image" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="image" label="图片地址" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="type" label="图片类型" show-overflow-tooltip min-width="80px">
					<template #default="{ row }">
						{{ row.type === 0 ? '外链' : '应用' }}
					</template>
				</el-table-column>
				<el-table-column prop="url" label="页面/外链地址" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="status" label="启用" show-overflow-tooltip width="80px">
					<template #default="{ row }">
						<el-switch v-model="row.status" :active-value="1" :inactive-value="2" disabled></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="排序" show-overflow-tooltip width="60px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="primary" @click="edit(row)">编辑</el-button>
						<el-button size="small" text type="danger" @click="deStore(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<swiperDialog ref="$swiperDialog" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { formatTime } from '/@/utils/dateFormatter';
import { FsSwiper } from '/@/common/models/fs-swiper';
import { deleteSwiper, getSwiper } from '/@/api/swiper';
import { ElMessage } from 'element-plus';

const swiperDialog = defineAsyncComponent(() => import('/@/views/client/swiper/dialog.vue'));

const tableLoading = ref(false);

const table = ref<FsSwiper[]>([]);

//获取轮播图列表
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data } = await getSwiper().finally(() => (tableLoading.value = false));
	if (code !== 200) return Promise.reject();
	table.value = data;
};

//删除轮播图
const deStore = async (row: FsSwiper) => {
	console.log(row);
	const { code, msg } = await deleteSwiper(row.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

const $swiperDialog = ref();
//新增轮播图
const addStore = () => {
	$swiperDialog.value.open();
};

//编辑轮播图
const edit = (row: FsSwiper) => {
	$swiperDialog.value.open(row, 'edit');
};

const formattercreateAt = (row: FsSwiper) => {
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

<!-- 门店管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-form :model="form" class="mb15">
				<el-container>
					<el-aside width="180px">
						<el-form-item>
							<el-input v-model="form.keyword" size="default" placeholder="请输入店铺名称" @keyup.enter="getTableData"></el-input>
						</el-form-item>
					</el-aside>
					<el-main class="ml10">
						<el-button @click="getTableData" size="default" type="primary">
							<el-icon>
								<ele-Search />
							</el-icon>
							查询
						</el-button>
						<el-button size="default" type="success" @click="addStore('add')">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							新增门店
						</el-button>
					</el-main>
				</el-container>
			</el-form>
			<el-table :data="table" v-loading="tableLoading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="门店名称" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="image" label="门店照片" show-overflow-tooltip width="130px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.image" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="店长" show-overflow-tooltip min-width="100px" :formatter="formatUserId"></el-table-column>
				<el-table-column prop="phone" label="手机号码" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="address" label="省市区" show-overflow-tooltip min-width="200px"></el-table-column>
				<el-table-column prop="addressDetail" label="详细地址" show-overflow-tooltip min-width="200px" />
				<el-table-column prop="communityName" label="社区名称" show-overflow-tooltip width="160px"></el-table-column>
				<el-table-column prop="isShow" label="是否营业" show-overflow-tooltip min-width="90px">
					<template #default="{ row }">
						{{ row.isShow ? '是' : '否' }}
					</template>
				</el-table-column>
				<el-table-column prop="dayTimeStart" label="营业起始时间" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="dayTimeEnd" label="营业结束时间" show-overflow-tooltip min-width="160px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="primary" @click="addStore('edit', row)">修改</el-button>
						<el-button size="small" text type="danger" @click="deStore(row)">删除</el-button>
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
		<storeDialog ref="$storeDialog" @success="getTableData" :userList="userList" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineAsyncComponent } from 'vue';
import { FsStore } from '/@/common/models/fs-store';
import { deleteStore, getStore } from '/@/api/store';
import { formatTime } from '/@/utils/dateFormatter';
import { ElLoading, ElMessage } from 'element-plus';
import { getUser } from '/@/api/user';
import { AdUser } from '/@/common/models/ad-user';

//引入组件
const storeDialog = defineAsyncComponent(() => import('/@/views/store/store/dialog.vue'));

const form = reactive({
	page: 1,
	pageSize: 15,
	keyword: '',
});
const total = ref(0);
const tableLoading = ref(false);

const table = ref<FsStore[]>([]);

//获取店铺列表
const getTableData = async () => {
	const { code, data, totalCount } = await getStore(form, true);
	if (code !== 200) return Promise.reject();
	table.value = data;
	total.value = totalCount;
};

//删除店铺
const deStore = async (row: FsStore) => {
	const { code, msg } = await deleteStore(row.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

const $storeDialog = ref();
//新增/修改店铺
const addStore = async (type: string, row?: FsStore) => {
	if (row) $storeDialog.value.open(type, JSON.parse(JSON.stringify(row)));
	else $storeDialog.value.open(type);
};

const formattercreateAt = (row: FsStore) => {
	return formatTime(row.createAt);
};

const formatUserId = (row: FsStore) => {
	return userList.value.find((item) => item.id === row.userId)?.username;
};

const userList = ref<AdUser[]>([]);
//获取员工列表
const getUserList = async () => {
	const Loaidng = ElLoading.service({
		lock: true,
		text: '查询中',
	});
	const { data, code } = await getUser({
		page: 1,
		pageSize: 9999,
		keyword: '',
		status: 1,
	}).finally(() => Loaidng.close());
	if (code !== 200) return Promise.reject();
	userList.value = data;
	return Promise.resolve();
};

onMounted(() => {
	getTableData();
	getUserList();
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

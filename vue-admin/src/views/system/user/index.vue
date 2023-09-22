<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search mb15">
				<el-input size="default" v-model="state.username" placeholder="请输入用户名称" style="max-width: 180px" @keyup.enter="getTableData">
				</el-input>
				<el-button size="default" type="primary" class="ml10" @click="getTableData">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="username" label="用户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleName" label="关联角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="deptName" label="部门" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.username === 'admin'" size="small" text type="primary" @click="onOpenEditUser('edit', scope.row)"
							>修改</el-button
						>
						<el-button :disabled="scope.row.username === 'admin'" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.page"
				background
				v-model:page-size="state.tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</el-card>
		<UserDialog ref="userDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { AdUser } from '/@/common/models/ad-user';
import { getUser, deleteUser } from '/@/api/user';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/system/user/dialog.vue'));

// 定义变量内容
const userDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as AdUser[],
		total: 0,
		loading: false,
		param: {
			page: 1,
			pageSize: 10,
		},
	},
	username: '',
});

// 初始化表格数据
const getTableData = async () => {
	state.tableData.loading = true;
	const { code, data } = await getUser({
		page: state.tableData.param.page,
		pageSize: state.tableData.param.pageSize,
		status: 1,
		keyword: state.username,
	}).finally(() => (state.tableData.loading = false));
	if (code !== 200) return;
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增用户弹窗
const onOpenAddUser = (type: string) => {
	userDialogRef.value.openDialog(type);
};
// 打开修改用户弹窗
const onOpenEditUser = (type: string, row: RowUserType) => {
	userDialogRef.value.openDialog(type, { ...row });
};
//查询用户
// const searchUser = async () => {
// 	state.tableData.loading = true;
// 	const keyword = state.username;
// 	const { code, data } = await getUserByName(keyword).finally(() => (state.tableData.loading = false));
// 	if (code !== 200) return;
// 	state.tableData.data = data;
// 	state.tableData.total = state.tableData.data.length;
// 	setTimeout(() => {
// 		state.tableData.loading = false;
// 	}, 500);
// };
// 删除用户
const onRowDel = async (row: AdUser) => {
	await ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.username}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await DeleteUser(Number(row.id));
			getTableData();
		})
		.catch(() => {});
};
//删除当前用户
const DeleteUser = async (id: number) => {
	const { code } = await deleteUser(id).finally(() => (state.tableData.loading = false));
	if (code !== 200) return;
	ElMessage.success('删除成功');
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.page = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		.el-table {
			flex: 1;
		}
	}
}
</style>

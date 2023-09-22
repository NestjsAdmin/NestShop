<template>
	<div class="system-dept-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-dept-search mb15">
				<el-input v-model="state.filterInput" size="default" placeholder="请输入部门名称" style="max-width: 180px" @input="filterTable"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddDept('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增部门
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="id"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="name" label="部门名称" show-overflow-tooltip> </el-table-column>
				<!-- <el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.$index }}
					</template>
				</el-table-column> -->
				<el-table-column prop="status" label="部门状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="部门描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="charge" label="负责人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddDept('add')">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditDept('edit', scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<DeptDialog ref="deptDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemDept">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getDept, deleteDept } from '/@/api/dept';
import { DeptVo } from '/@/common/models/dept-vo';
import { AdDept } from '/@/common/models/ad-dept';

// 引入组件
const DeptDialog = defineAsyncComponent(() => import('/@/views/system/dept/dialog.vue'));

// 定义变量内容
const deptDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as DeptVo[],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
	filterInput: '',
});

// 初始化表格数据
const getTableData = async () => {
	state.tableData.loading = true;
	const { code, data } = await getDept();
	if (code !== 200) return;
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	state.tableData.loading = false;
};
// 打开新增菜单弹窗
const onOpenAddDept = (type: string) => {
	deptDialogRef.value.openDialog(type);
};
// 打开编辑菜单弹窗
const onOpenEditDept = (type: string, row: DeptTreeType) => {
	deptDialogRef.value.openDialog(type, JSON.parse(JSON.stringify(row)));
};

// 删除当前行
const onTabelRowDel = (row: AdDept) => {
	ElMessageBox.confirm(`此操作将永久删除部门：${row.name}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await DeleteDept(Number(row.id));
			getTableData();
		})
		.catch(() => {});
};

//删除当前部门
const DeleteDept = async (id: number) => {
	const { code } = await deleteDept(id).finally(() => (state.tableData.loading = false));
	if (code !== 200) return;
	ElMessage.success('删除成功');
	getTableData();
};

//过滤数据
const filterTable = async (input: string) => {
	if (input.length === 0) {
		getTableData();
	} else {
		state.tableData.data = filterTree(state.tableData.data, input);
	}
};

const filterTree = (data: any, name: string) => {
	// 深拷贝一份数据，以免影响原数据
	data = JSON.parse(JSON.stringify(data));
	const result = [];
	for (const item of data) {
		//如果当前节点名称匹配，加入到结果中
		if (item.name.includes(name)) result.push(item);
		//如果当前节点存在子节点，继续递归
		if (item.children.length > 0) item.children = filterTree(item.children, name); //如果当前节点名称不匹配，但子节点匹配，则加入到结果中
		if (!item.name.includes(name) && item.children.length > 0) result.push(item);
	}
	return result;
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

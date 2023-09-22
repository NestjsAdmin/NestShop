<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input v-model="filterInput" clearable size="default" placeholder="请输入菜单名称" style="max-width: 180px" @keyup.enter="filterStart">
				</el-input>
				<el-button @click="filterStart" size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				v-loading="state.tableData.loading"
				style="width: 100%"
				row-key="id"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
				default-expand-all
			>
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml10">{{ $t(scope.row.title) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="路由名称" show-overflow-tooltip />
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column prop="component" label="组件路径" show-overflow-tooltip />
				<!-- <el-table-column label="权限标识" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.meta.roles }}</span>
					</template>
				</el-table-column> -->
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.menuSort }}
					</template>
				</el-table-column>
				<!-- <el-table-column label="类型" show-overflow-tooltip width="80">
					<template #default="scope">
						<el-tag type="success" size="small">{{ scope.row.xx }}菜单</el-tag>
					</template>
				</el-table-column> -->
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenAddMenu('add')">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditMenu('edit', scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<MenuDialog ref="menuDialogRef" @refresh="getTableData()" :routesList="state.tableData.data" />
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
// import { storeToRefs } from 'pinia';
import { MenuVo } from '/@/common/models/menu-vo';
import { deleteMenu, getMenu } from '/@/api/menu';
// import { useRoutesList } from '/@/stores/routesList';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

// 引入组件
const MenuDialog = defineAsyncComponent(() => import('/@/views/system/menu/dialog.vue'));

// 定义变量内容
// const stores = useRoutesList();
// const { routesList } = storeToRefs(stores);
const menuDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as MenuVo[],
		loading: true,
	},
});

const orginData = ref<MenuVo[]>([]);
// 获取路由数据
const getTableData = async () => {
	state.tableData.loading = true;
	const { code, data } = await getMenu().finally(() => (state.tableData.loading = false));
	if (code !== 200) return;
	data.forEach((item) => deleteChildren(item));
	orginData.value = data;
	state.tableData.data = data;
};

//删除空的children属性
const deleteChildren = (item: MenuVo) => {
	if (item.children && item.children.length === 0) {
		delete item.children;
	} else if (item.children && item.children.length !== 0) {
		item.children.forEach((item2) => {
			deleteChildren(item2);
		});
	}
};

const filterInput = ref('');
const filterData = (data: MenuVo[]) => {
	const arr: MenuVo[] = [];
	const inData: MenuVo[] = JSON.parse(JSON.stringify(data));
	inData.forEach((item, index) => {
		if (item.name.includes(filterInput.value) || item.title.includes(filterInput.value)) {
			arr.push(item);
			if (item.children && item.children?.length > 0) {
				arr[index].children = filterData(item.children);
			}
		}
	});
	return arr;
};

const filterStart = () => {
	state.tableData.data = filterData(orginData.value);
};

// 打开新增菜单弹窗
const onOpenAddMenu = (type: string) => {
	menuDialogRef.value.openDialog(type);
};

type RouteRecordRaw2 = RouteRecordRaw & {
	id: number;
};

// 打开编辑菜单弹窗
const onOpenEditMenu = (type: string, row: RouteRecordRaw2) => {
	menuDialogRef.value.openDialog(type, JSON.parse(JSON.stringify(row)));
};

// 删除当前行
const onTabelRowDel = async (row: RouteRecordRaw2) => {
	await ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	});
	await DeleteMenu(row.id);
	getTableData();
	//await setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
};

//删除当前菜单
const DeleteMenu = async (id: number) => {
	const { code } = await deleteMenu(id).finally(() => (state.tableData.loading = false));
	if (code !== 200) return;
	ElMessage.success('删除成功');
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

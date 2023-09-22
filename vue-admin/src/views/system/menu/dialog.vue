<template>
	<div class="system-menu-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="menuDialogFormRef" :model="state.ruleForm" size="default" label-width="80px" :rules="rules">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级菜单">
							<el-cascader
								:options="state.menuData"
								:props="{ checkStrictly: true, value: 'id', label: 'title', multiple: false }"
								placeholder="请选择上级菜单"
								clearable
								class="w100"
								v-model="state.ruleForm.pid"
							>
								<template #default="{ node, data }">
									<span>{{ data.title }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单类型">
							<el-radio-group v-model="state.ruleForm.menuType">
								<el-radio label="menu">菜单</el-radio>
								<el-radio label="btn">按钮</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称" prop="title">
							<el-input v-model="state.ruleForm.title" placeholder="格式：message.router.xxx" clearable></el-input>
						</el-form-item>
					</el-col>
					<template v-if="state.ruleForm.menuType === 'menu'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由名称" prop="name">
								<el-input v-model="state.ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="路由路径" prop="path">
								<el-input v-model="state.ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="重定向" prop="redirect">
								<el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="菜单图标" prop="icon">
								<IconSelector placeholder="请输入菜单图标" v-model="state.ruleForm.icon" />
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="组件路径" prop="component">
								<el-input v-model.trim="state.ruleForm.component" placeholder="组件路径" clearable></el-input>
							</el-form-item>
						</el-col>
					</template>
					<!-- <template v-if="state.ruleForm.menuType === 'btn'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="权限标识">
								<el-input v-model="state.ruleForm.btnPower" placeholder="请输入权限标识" clearable></el-input>
							</el-form-item>
						</el-col>
					</template> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序" prop="menuSort">
							<el-input-number v-model="state.ruleForm.menuSort" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<template v-if="state.ruleForm.menuType === 'menu'">
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否外链">
								<el-radio-group v-model="state.ruleForm.isLink">
									<el-radio :label="true">是</el-radio>
									<el-radio :label="false">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否隐藏">
								<el-radio-group v-model="state.ruleForm.isHide">
									<el-radio :label="true">隐藏</el-radio>
									<el-radio :label="false">不隐藏</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="页面缓存">
								<el-radio-group v-model="state.ruleForm.isKeepAlive">
									<el-radio :label="true">缓存</el-radio>
									<el-radio :label="false">不缓存</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否固定">
								<el-radio-group v-model="state.ruleForm.isAffix">
									<el-radio :label="true">固定</el-radio>
									<el-radio :label="false">不固定</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
							<el-form-item label="是否内嵌">
								<el-radio-group v-model="state.ruleForm.isIframe" @change="onSelectIframeChange">
									<el-radio :label="true">是</el-radio>
									<el-radio :label="false">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</template>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemMenuDialog">
import { defineAsyncComponent, reactive, ref } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useRoutesList } from '/@/stores/routesList';
import { i18n } from '/@/i18n/index';
import { postMenu, putMenu } from '/@/api/menu';
import { ElMessage } from 'element-plus';
import { MenuVo } from '/@/common/models/menu-vo';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));

// 定义变量内容
const menuDialogFormRef = ref();
// const stores = useRoutesList();
// const { routesList } = storeToRefs(stores);

const props = defineProps<{
	routesList: RouteItems;
}>();

const state = reactive({
	// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
	ruleForm: {
		name: '',
		path: '',
		component: '',
		title: '',
		isLink: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		isHide: false,
		menuSort: 0,
		menuType: 'menu',
		pid: [],
		redirect: null,
		icon: '',
	},
	menuData: [] as RouteItems, // 上级菜单数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const rules = {
	title: [
		{
			required: true,
			message: '请填写菜单名称',
			trigger: 'blur',
		},
	],
	name: [
		{
			required: true,
			message: '请填写路由名称',
			trigger: 'blur',
		},
	],
	path: [
		{
			required: true,
			message: '请填写路由路径',
			trigger: 'blur',
		},
	],
	component: [
		{
			required: true,
			message: '请填写组件路径',
			trigger: 'blur',
		},
	],
};
// 获取 pinia 中的路由
const getMenuData = (routes: RouteItems) => {
	const arr: RouteItems = [];
	routes.map((val: RouteItem) => {
		val['title'] = i18n.global.t(val?.title as string);
		arr.push({ ...val });
		if (val.children) getMenuData(val.children);
	});
	console.log(arr);
	return arr;
};
// 打开弹窗
const openDialog = (type: string, row?: any) => {
	state.ruleForm = {
		name: '',
		path: '',
		component: '',
		title: '',
		isLink: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		isHide: false,
		menuSort: 0,
		menuType: 'menu',
		pid: [],
		redirect: null,
		icon: '',
	};
	if (type === 'edit') {
		delete row.children;
		row.menuType = 'menu';
		// row.menuSort = Math.random();
		row.component = `${row.component}`;
		// .match(/\'(.+)\'/g)
		// ?.join('')
		// .replace(/\'/g, '');
		row.pid = [row.pid];
		Object.assign(state.ruleForm, JSON.parse(JSON.stringify(row)));
		state.dialog.title = '修改菜单';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增菜单';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	menuDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.type = type;
	//设置上级菜单字典
	state.menuData = getMenuData(props.routesList);
	state.dialog.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 是否内嵌下拉改变
const onSelectIframeChange = () => {
	if (state.ruleForm.isIframe) state.ruleForm.isLink = true;
	else state.ruleForm.isLink = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = async () => {
	if (state.dialog.type === 'edit') {
		await menuDialogFormRef.value.validate();
		modifyMenu();
	} else {
		await menuDialogFormRef.value.validate();
		commitMenu();
	}
	// if (state.dialog.type === 'add') { }
	// setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
};

//新增菜单提交
const commitMenu = async () => {
	const queryFrom = { ...state.ruleForm, pid: state.ruleForm.pid.length > 0 ? parseInt(state.ruleForm.pid[state.ruleForm.pid.length - 1]) : 0 };
	const { code, msg } = await postMenu(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};

//修改菜单
const modifyMenu = async () => {
	const queryFrom: MenuVo = {
		...state.ruleForm,
		pid: state.ruleForm.pid.length > 0 ? parseInt(state.ruleForm.pid[state.ruleForm.pid.length - 1]) : 0,
	};
	delete queryFrom.createAt;
	delete queryFrom.updateAt;
	delete queryFrom.meta;
	const { code, msg } = await putMenu(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};
// 页面加载时
// onMounted(() => {
// 	state.menuData = getMenuData(routesList.value);
// });

// 暴露变量
defineExpose({
	openDialog,
});
</script>

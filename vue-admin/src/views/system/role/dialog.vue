<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" destroy-on-close v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" label-width="90px" :rules="rule">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色名称" prop="name">
							<el-input v-model="state.ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色标识">
							<template #label>
								<el-tooltip effect="dark" content="用于 `router/route.ts` meta.roles" placement="top-start">
									<span>角色标识</span>
								</el-tooltip>
							</template>
							<el-input v-model="state.ruleForm.roleSign" placeholder="请输入角色标识" clearable></el-input>
						</el-form-item>
					</el-col> -->
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="排序">
							<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="角色状态">
							<el-switch
								v-model="state.ruleForm.status"
								inline-prompt
								active-text="启"
								inactive-text="禁"
								:active-value="1"
								:inactive-value="2"
							></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入角色描述" maxlength="150"></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单权限">
							<el-tree
								ref="$tree"
								:data="state.menuData"
								:default-checked-keys="defaultCheckTreeId"
								node-key="id"
								:props="state.menuProps"
								show-checkbox
								class="menu-data-tree"
								default-expand-all
							/>
						</el-form-item>
					</el-col>
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

<script setup lang="ts" name="systemRoleDialog">
import { ElLoading, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { getMenu } from '/@/api/menu';
import { getRoleMenu, postRole, putRole, putRoleMenu } from '/@/api/role';
import { AdRole } from '/@/common/models/ad-role';
import { MenuVo } from '/@/common/models/menu-vo';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		name: '', // 角色名称
		status: 1, // 角色状态
		remark: '', // 角色描述
	} as AdRole,
	menuData: [] as menuModel[],
	menuProps: {
		children: 'children',
		label: 'title',
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

const rule = {
	name: [
		{
			required: true,
			message: '请填写角色名称',
			trigger: 'blur',
		},
	],
};

// 打开弹窗
const openDialog = async (type: string, row: AdRole) => {
	if (type === 'edit') {
		const Loading = ElLoading.service({
			lock: true,
			text: '查询中...',
			background: 'rgba(0, 0, 0, .7)',
		});
		await Promise.all([getRoleMenuData(row.id as number), getMenuData()]).finally(() => Loading.close());
		state.ruleForm = JSON.parse(JSON.stringify(row));
		state.dialog.title = '修改角色';
		state.dialog.submitTxt = '修 改';
	} else {
		const Loading = ElLoading.service({
			lock: true,
			text: '查询中...',
			background: 'rgba(0, 0, 0, .7)',
		});
		await getMenuData().finally(() => Loading.close());
		state.ruleForm = {
			name: '', // 角色名称
			status: 1, // 角色状态
			remark: '', // 角色描述
		};
		defaultCheckTreeId.value.length = 0;
		state.dialog.title = '新增角色';
		state.dialog.submitTxt = '新 增';
	}
	state.dialog.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const $tree = ref();

// 提交
const onSubmit = async () => {
	await roleDialogFormRef.value.validate();
	const Loading = ElLoading.service({
		lock: true,
		text: '提交中...',
		background: 'rgba(0, 0, 0, .7)',
	});
	if ((state.dialog.title = '新增角色')) {
		await commitRole().finally(() => Loading.close());
	} else {
		await modeifyRole().finally(() => Loading.close());
	}
	ElMessage.success('操作成功!');
	closeDialog();
	emit('refresh');
};

//修改角色
const modeifyRole = async () => {
	const { code, data } = await putRole(state.ruleForm);
	if (code !== 200) throw new Error('提交出错');
	const code2 = await commitMenu(data.id as number);
	if (code2 !== 200) throw new Error('提交出错');
};

//新增角色
const commitRole = async () => {
	const { code, data } = await postRole(state.ruleForm);
	if (code !== 200) throw new Error('提交出错');
	const code2 = await commitMenu(data.id as number);
	if (code2 !== 200) throw new Error('提交出错');
};

//更新角色菜单权限
const commitMenu = async (roleId: number) => {
	const arr = {
		ids: $tree.value.getCheckedKeys(),
		roleId,
	};
	const { code } = await putRoleMenu(arr);
	return code;
};

// 获取菜单结构数据
const getMenuData = async () => {
	const { code, data } = await getMenu();
	if (code !== 200) return;
	state.menuData = getMenuList(data);
	console.log(state.menuData, 111);
};

//菜单列表模型
interface menuModel {
	title: string;
	id?: number | null;
	children?: menuModel[];
}

//计算菜单格式
const getMenuList = (data: MenuVo[]) => {
	const arr: menuModel[] = [];
	data.forEach((item, index) => {
		arr.push({
			title: item.title,
			id: item.id,
		});
		if (item.children && item.children.length !== 0) {
			arr[index].children = getMenuList(item.children);
		}
	});
	return arr;
};

//默认选中的TreeId
const defaultCheckTreeId = ref<number[]>([]);
//获取角色已有权限
const getRoleMenuData = async (id: number) => {
	const { code, data } = await getRoleMenu(id);
	if (code !== 200) return;
	defaultCheckTreeId.value = data.map((item) => item.menuId);
	console.log(JSON.stringify(defaultCheckTreeId.value));
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>

<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="100px" :rules="userRules">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="state.ruleForm.username" placeholder="请输入用户名" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户昵称" prop="nickname">
							<el-input v-model="state.ruleForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="关联角色">
							<el-select v-model="state.ruleForm.roleId" placeholder="请选择" clearable class="w100">
								<el-option v-for="item in state.roleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门">
							<el-cascader
								:options="state.deptData"
								:props="{ checkStrictly: true, value: 'id', label: 'name' }"
								placeholder="请选择部门"
								class="w100"
								v-model="state.deptIdArr"
								:show-all-levels="false"
								emitPath
							>
								<template #default="{ node, data }">
									<span>{{ data.name }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="手机号">
							<el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="邮箱">
							<el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="性别">
							<el-select v-model="state.ruleForm.sex" placeholder="请选择" clearable class="w100">
								<el-option label="男" value="男"></el-option>
								<el-option label="女" value="女"></el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户密码" prop="password">
							<el-input v-model="state.ruleForm.password" placeholder="请输入" type="password"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="账户过期">
							<el-date-picker v-model="state.ruleForm.overdueTime" type="date" placeholder="请选择" class="w100"> </el-date-picker>
						</el-form-item>
					</el-col> -->
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="用户状态">
							<el-switch
								v-model="state.ruleForm.status"
								inline-prompt
								active-text="启"
								:active-value="1"
								inactive-text="禁"
								:inactive-value="2"
							></el-switch>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否能删除">
							<el-switch
								v-model="state.ruleForm.isDel"
								inline-prompt
								active-text="是"
								:active-value="true"
								inactive-text="否"
								:inactive-value="false"
							></el-switch>
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

<script setup lang="ts" name="systemUserDialog">
import { reactive, ref, onMounted } from 'vue';
import { postUser, putUser } from '/@/api/user';
import { ElMessage } from 'element-plus';
import { getRole } from '/@/api/role';
import { AdRole } from '/@/common/models/ad-role';
import { getDept } from '/@/api/dept';
import { DeptVo } from '/@/common/models/dept-vo';
import { AdUser } from '/@/common/models/ad-user';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		username: '', //账户名称
		password: '', //账户密码
		nickname: '', //昵称
		isDel: true, //是否能够删除
		status: 1, //用户状态
		email: '', //邮箱
		roleName: '', //关联角色
		avatar: '', //头像地址
		createAt: '', //创建时间
		deptId: null, //部门id
		deptName: '', //部门名称
		phone: '', //手机
		roleId: null, //角色id
	} as AdUser,
	deptData: [] as DeptVo[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	roleData: [] as AdRole[],
	deptIdArr: [] as number[],
});

//校验规则
const userRules = {
	username: [
		{
			required: true,
			message: '请填写用户名',
			trigger: 'blur',
		},
	],
	password: [
		{
			required: true,
			message: '请填写密码',
			trigger: 'blur',
		},
	],
	nickname: [
		{
			required: true,
			message: '请填写昵称',
			trigger: 'blur',
		},
	],
};

// 打开弹窗
const openDialog = (type: string, row: AdUser) => {
	state.ruleForm = {
		username: '', //账户名称
		password: '', //账户密码
		nickname: '', //昵称
		isDel: true, //是否能够删除
		status: 1, //用户状态
		email: '', //邮箱
		roleName: '', //关联角色
		avatar: '', //头像地址
		createAt: '', //创建时间
		deptId: null, //部门id
		deptName: '', //部门名称
		phone: '', //手机
		roleId: null, //角色id
	};
	state.deptIdArr = [];
	if (type === 'edit') {
		delete row.createAt;
		delete row.updateAt;
		state.ruleForm = row;
		state.dialog.title = '修改用户';
		state.dialog.submitTxt = '修 改';
		state.dialog.type = 'edit';
		setDeptIdArr(row.deptId as number);
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
		state.dialog.type = 'add';
	}
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = async () => {
	state.ruleForm.deptId = state.deptIdArr.at(-1);
	setDeptName(state.deptData);
	setRoleName();
	if (state.dialog.type === 'add') {
		await userDialogFormRef.value.validate();
		commitUser();
	} else {
		await userDialogFormRef.value.validate();
		modifyUser();
	}
};

//新增用户提交
const commitUser = async () => {
	const queryFrom = { ...state.ruleForm };
	const { code, msg } = await postUser(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};

//修改用户
const modifyUser = async () => {
	const queryFrom: AdUser = {
		...state.ruleForm,
	};
	const { code, msg } = await putUser(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};

//查询角色名称
const setRoleName = () => {
	state.ruleForm.roleName =
		state.roleData.find((item) => {
			return item.id === state.ruleForm.roleId;
		})?.name || '';
};

//查询部门名称
const setDeptName = (arr: DeptVo[]) => {
	arr.forEach((item) => {
		if (item.id === state.ruleForm.deptId) {
			state.ruleForm.deptName = item.name;
		} else if (item.children && item.children.length > 0) {
			setDeptName(item.children);
		}
	});
};

// 初始化部门数据
const getMenuData = async () => {
	const { code, data } = await getDept();
	if (code !== 200) return;
	state.deptData = data;
};

//初始化关联角色数据
const getRoleData = async () => {
	const { code, data } = await getRole({
		page: 1,
		pageSize: 999,
		name: '',
	});
	if (code !== 200) return;
	state.roleData = data;
};

//设置科室
const setDeptIdArr = (id: number) => {
	if (id) {
		const arr = findTree(state.deptData, id);
		setDeptIdArr2(arr);
	}
};

const setDeptIdArr2 = (arr: DeptVo[]) => {
	arr.forEach((item) => {
		state.deptIdArr.push(item.id as number);
		if (item.children && item.children.length > 0) {
			setDeptIdArr2(item.children);
		}
	});
};

//查找id为key的数据
const findTree = (tree: DeptVo[], key: number) => {
	const arr = tree.filter((item) => {
		if (item.id === key) {
			delete item.children;
			return true;
		} else if (item.children && item.children.length > 0) {
			const arr2 = findTree(item.children, key);

			if (arr2 && arr2.length > 0) {
				item.children = arr2;
				return true;
			} else return false;
		} else return false;
	});
	return arr;
};

onMounted(() => {
	getRoleData();
	getMenuData();
});

// 暴露变量
defineExpose({
	openDialog,
});
</script>

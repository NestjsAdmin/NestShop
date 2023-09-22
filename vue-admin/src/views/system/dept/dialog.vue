<template>
	<div class="system-dept-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="deptDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级部门">
							<el-cascader
								:options="state.deptData"
								:props="{ checkStrictly: true, value: 'id', label: 'name' }"
								placeholder="请选择部门"
								clearable
								class="w100"
								v-model="state.upDeptId"
							>
								<!-- <template #default="{ node, data }">
									<span>{{ data.name }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template> -->
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门名称">
							<el-input v-model="state.ruleForm.name" placeholder="请输入部门名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="负责人">
							<el-input v-model="state.ruleForm.charge" placeholder="请输入负责人" clearable></el-input>
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
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="部门状态">
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
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="部门描述">
							<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入部门描述" maxlength="150"></el-input>
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

<script setup lang="ts" name="systemDeptDialog">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { AdDept } from '/@/common/models/ad-dept';
import { postDept, putDept } from '/@/api/dept';
import { getDept } from '/@/api/dept';
import { DeptVo } from '/@/common/models/dept-vo';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const deptDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		name: '',
		status: 1,
		email: '',
		charge: '',
		remark: null,
		pid: 0,
		phone: '',
	} as AdDept,
	deptData: [] as DeptVo[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
	upDeptId: [] as number[],
});

// 打开弹窗
const openDialog = (type: string, row: AdDept) => {
	state.ruleForm = {
		name: '',
		status: 1,
		email: '',
		charge: '',
		remark: null,
		pid: 0,
		phone: '',
	};
	if (type === 'edit') {
		if (row.pid) {
			setDeptIdArr(row.pid);
		}
		state.ruleForm = row;
		state.dialog.title = '修改部门';
		state.dialog.submitTxt = '修 改';
		state.dialog.type = 'edit';
	} else {
		state.dialog.title = '新增部门';
		state.dialog.submitTxt = '新 增';
		state.dialog.type = 'add';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	deptDialogFormRef.value.resetFields();
		// });
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

// 提交
const onSubmit = async () => {
	state.ruleForm.pid = state.upDeptId.at(-1);
	await deptDialogFormRef.value.validate();
	if (state.dialog.type === 'add') {
		commitDept();
	} else {
		modifyDept();
	}
};

//新增部门提交
const commitDept = async () => {
	const queryFrom = { ...state.ruleForm };
	const { code, msg } = await postDept(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};

//修改部门
const modifyDept = async () => {
	const queryFrom: AdDept = {
		...state.ruleForm,
	};
	delete queryFrom.createAt;
	delete queryFrom.updateAt;
	const { code, msg } = await putDept(queryFrom);
	if (code !== 200) return;
	ElMessage({
		type: 'success',
		message: msg,
	});
	closeDialog(); // 关闭弹窗
	emit('refresh');
};

// 初始化部门数据
const getMenuData = async () => {
	const { code, data } = await getDept();
	if (code !== 200) return Promise.reject();
	state.deptData = data;
	return Promise.resolve();
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
		state.upDeptId.push(item.id as number);
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

// 暴露变量
defineExpose({
	openDialog,
});

onMounted(() => {
	getMenuData();
});
</script>

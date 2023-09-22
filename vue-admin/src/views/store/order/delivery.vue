<!-- 选择配送员 -->
<template>
	<el-dialog v-model="isShow" title="选择配送员" width="320px">
		<el-form-item label="配送员">
			<el-select v-model="form.dispatcherId" placeholder="请选择配送员">
				<el-option v-for="item in userList" :key="item.id + 'user'" :label="item.nickname" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<template #footer>
			<el-button type="primary" @click="commit">确定</el-button>
			<el-button type="warning" @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElLoading, ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { OrderDelivery } from '/@/api/order';
import { getUser } from '/@/api/user';
import { AdUser } from '/@/common/models/ad-user';

const isShow = ref(false);
const form = reactive({
	id: 0,
	dispatcherId: null as unknown as number,
});

const open = async (id: number) => {
	form.id = id;
	form.dispatcherId = null as unknown as number;
	await getUserList();
	isShow.value = true;
};

const emits = defineEmits<{ (e: 'success'): void }>();

const commit = async () => {
	const queryForm = {
		...form,
		dispatcherName: '',
	};
	queryForm.dispatcherName = userList.value.find((item) => item.id === form.dispatcherId)?.username || '';
	const { code, msg } = await OrderDelivery(queryForm);
	if (code !== 200) return;
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
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
		pageSize: 99999,
		status: 1,
	}).finally(() => Loaidng.close());
	if (code !== 200) return Promise.reject();
	userList.value = data;
	return Promise.resolve();
};

defineExpose({ open });
</script>
<style scoped lang="scss"></style>

<!-- 新增充值 -->
<template>
	<el-dialog v-model="isShow" title="新增充值">
		<el-form :model="form" ref="$form" :rules="rule" label-width="80px">
			<el-row :gutter="35">
				<el-col :span="24" class="mb20">
					<el-form-item label="名称" prop="name">
						<el-input v-model="form.name" placeholder=""></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="价格" prop="price">
						<el-input-number
							v-model="form.price"
							placeholder="价格"
							:min="0"
							:max="9999"
							:precision="2"
							style="width: 100%"
							:controls="false"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="到账余额" prop="balance">
						<el-input-number
							v-model="form.balance"
							placeholder="到账余额"
							:min="0"
							:max="9999"
							style="width: 100%"
							:controls="false"
							:precision="2"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="备注" prop="remark">
						<el-input v-model="form.remark" placeholder="请输入备注" type="textarea"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="commit">确定</el-button>
			<el-button @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { postRecharge } from '/@/api/recharge';
import { FsRecharge } from '/@/common/models/fs-recharge';
const isShow = ref(false);

const form = ref<FsRecharge>({
	name: '',
	price: '0',
	balance: '0',
	remark: '',
});

const rule = ref<FormRules>({
	name: [
		{
			required: true,
			message: '请输入充值名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	price: [
		{
			required: true,
			message: '请输入充值金额',
			trigger: 'blur',
			type: 'number',
		},
	],
	balance: [
		{
			required: true,
			message: '请输入充值到账余额',
			trigger: 'blur',
			type: 'number',
		},
	],
});

const open = () => {
	form.value = {
		name: '',
		price: '0',
		balance: '0',
		remark: '',
	};
	isShow.value = true;
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

const $form = ref<FormInstance>();
const commit = async () => {
	console.log(form.value);
	await $form.value?.validate();
	const { code, msg } = await postRecharge({
		name: form.value.name,
		price: form.value.price.toString(),
		balance: form.value.balance.toString(),
		remark: form.value.remark,
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

defineExpose({ open });
</script>
<style scoped lang="scss"></style>

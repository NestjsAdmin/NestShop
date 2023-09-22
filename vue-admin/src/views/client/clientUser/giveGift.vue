<!-- 赠送积分/余额 -->
<template>
	<el-dialog v-model="isShow" title="赠送" width="1000px" :destroy-on-close="true">
		<el-form :model="form" label-width="100px" ref="$form">
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="昵称">
						<el-input v-model="nickName" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="手机号码">
						<el-input v-model="phoneNumber" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item
						label="积分"
						:rules="[
							{
								required: true,
								message: `请输入赠送积分`,
								trigger: 'blur',
							},
						]"
						prop="integral"
					>
						<el-input-number v-model="form.integral" style="width: 100%" :controls="false" :min="1" :max="99999" :precision="0"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item
						label="余额"
						:rules="[
							{
								required: true,
								message: `请输入赠送余额`,
								trigger: 'blur',
							},
						]"
						prop="balance"
					>
						<el-input-number v-model="form.balance" style="width: 100%" :controls="false" :min="0.01" :max="99999" :precision="2"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mt20">
					<el-form-item
						label="备注"
						prop="remark"
						:rules="[
							{
								required: true,
								message: `请输入备注`,
								trigger: 'blur',
								type: 'string',
							},
						]"
					>
						<el-input v-model="form.remark" placeholder="请输入备注" type="textarea"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="commit">提交</el-button>
			<el-button type="warning" @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref, reactive, defineExpose } from 'vue';
import { FsUser } from '/@/common/models';
import { postGift } from '/@/api/gift';

const form = reactive({
	userId: 0,
	balance: undefined,
	integral: undefined,
	remark: '',
});

const isShow = ref(false);
const nickName = ref('');
const phoneNumber = ref('');

const $form = ref();
const commit = () => {
	$form.value.validateField('remark', (isValid: boolean) => {
		console.log(isValid);
		if (isValid) {
			if (!form.balance && !form.integral) {
				ElMessage.warning('请填写赠送积分或余额！');
			} else {
				updateStock();
			}
		}
	});
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();
const updateStock = async () => {
	const { code } = await postGift({
		userId: form.userId,
		balance: form.balance ? String(form.balance) : '0',
		integral: form.integral ? String(form.integral) : '0',
		remark: form.remark,
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success(`赠送成功!`);
	emits('success');
	isShow.value = false;
	return Promise.resolve();
};

const open = (row: FsUser) => {
	Object.assign(form, {
		userId: 0,
		balance: undefined,
		integral: undefined,
		remark: '',
	});
	nickName.value = row.nickName;
	phoneNumber.value = row.phoneNumber;
	form.userId = row.id as number;
	isShow.value = true;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

<!-- 进货/出货 -->
<template>
	<el-dialog v-model="isShow" :title="type" width="500px">
		<el-form :model="form" label-width="90px" ref="$form">
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品名称">
						<el-input v-model="name" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="条码" label-width="50">
						<el-input v-model="barcode" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item
						:label="`${type}数量`"
						:rules="[
							{
								required: true,
								message: `请输入${type}数量`,
								trigger: 'blur',
							},
						]"
						prop="number"
					>
						<el-input-number v-model="form.number" style="width: 100%" :controls="false" :min="1" :max="99999" :precision="0"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mt20">
					<el-form-item label="备注">
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
import { postStock } from '/@/api/stock';
import { FsGoods } from '/@/common/models';

const form = reactive({
	goodsId: 0,
	number: undefined as unknown as number,
	type: 0,
	remark: '',
});

const isShow = ref(false);
const type = ref('进货');
const name = ref('');
const barcode = ref('');

const $form = ref();
const commit = () => {
	$form.value.validate((valid: boolean) => {
		if (valid) {
			updateStock();
		}
	});
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();
const updateStock = async () => {
	const { code } = await postStock({
		...form,
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success(`${type.value}成功!`);
	emits('success');
	isShow.value = false;
	return Promise.resolve();
};

const open = (row: FsGoods, t: 'add' | 'substrck') => {
	form.number = undefined as unknown as number;
	form.remark = '';
	form.goodsId = row.id as number;
	name.value = row.name;
	barcode.value = row.barcode as string;
	if (t === 'add') {
		type.value = '进货';
		form.type = 0;
	} else {
		type.value = '出货';
		form.type = 1;
	}
	isShow.value = true;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

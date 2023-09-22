<!-- 商品分类管理 新增修改弹窗 -->
<template>
	<el-dialog v-model="isShow" :title="`${title}标签`" width="769px">
		<el-form :model="form" ref="$form" :rules="rule" @submit.prevent>
			<el-row :gutter="35">
				<el-col :span="24" class="mb20">
					<el-form-item label="标签名称: " prop="name">
						<el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="commit">确定</el-button>
			<el-button type="warning" @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue';
import { FsGoodsLabel } from '/@/common/models/fs-goods-label';
import { postLabel } from '/@/api/menu/label';
import { ElMessage } from 'element-plus';

const title = ref('新增');

const isShow = shallowRef(false);

const form = reactive({
	id: '',
	name: '',
});

const rule = {
	name: [
		{
			required: true,
			message: '请输入标签名称',
			trigger: 'blur',
			type: 'string',
		},
	],
};

//打开页面
const open = async (type: 'edit' | 'add', row: FsGoodsLabel) => {
	form.name = '';
	if (type === 'edit') {
		title.value = '编辑';
		delete row.createAt;
		Object.assign(form, row);
	} else {
		title.value = '新增';
	}
	isShow.value = true;
};

const $form = ref();

//确定
const commit = async () => {
	await $form.value.validate();
	if (title.value === '新增') {
		commitNewCate();
	} else {
		commitCate();
	}
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

//提交新增的分类
const commitNewCate = async () => {
	const { code, msg } = await postLabel({ name: form.name });
	if (code !== 200) return;
	isShow.value = false;
	ElMessage.success(msg);
	emits('success');
};

//提交修改的分类
const commitCate = async () => {
	// const { code, msg } = await postCate(form);
	// if (code !== 200) return;
	// isShow.value = false;
	// ElMessage.success(msg);
	// emits('success');
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

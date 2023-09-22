<!--  -->
<template>
	<el-dialog v-model="isShow" title="新增轮播图" width="769px" destroy-on-close>
		<el-form :model="form" ref="$form" label-width="90px" :rules="rule">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="排序: " prop="sort">
						<el-input-number
							value-on-clear=" "
							v-model="form.sort"
							:controls="false"
							style="width: 100%"
							placeholder="请填写排序号"
							:min="0"
							:max="999"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="启用: " prop="status">
						<el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="类型: " prop="type">
						<el-radio-group v-model="form.type">
							<el-radio :label="0">应用</el-radio>
							<el-radio :label="1">外链</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="地址: " prop="url">
						<el-input v-model="form.url" placeholder="请输入网页地址/外链"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="图片: " prop="image">
						<el-upload
							class="avatar-uploader"
							action="http://freshshop.ppjun.cn/api/admin/swiper"
							:show-file-list="false"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="form.image" :src="form.image" class="avatar" style="max-width: 150px; max-height: 150px" />
							<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
						</el-upload>
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
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { postFile } from '/@/api/file';
import { postSwiper, putSwiper } from '/@/api/swiper';
import { Plus } from '@element-plus/icons-vue';
import { FsSwiper } from '/@/common/models';

const isShow = ref(false);
const form = reactive<FsSwiper>({
	sort: 0,
	image: '',
	status: 1,
	type: 0,
	url: '',
});
const rule = {
	sort: [
		{
			required: true,
			message: '请输入排序',
			trigger: 'blur',
			type: 'number',
		},
	],
	image: [
		{
			required: true,
			message: '请选择图片',
			trigger: 'blur',
			type: 'string',
		},
	],
	status: [
		{
			required: true,
			message: '请选择状态',
			trigger: 'blur',
			type: 'number',
		},
	],
};

//页面类型 add为新增 edit为编辑
let type = 'add';
const open = (row: FsSwiper, t: string = 'add') => {
	if (t === 'add') {
		Object.assign(form, {
			sort: 0,
			image: '',
			status: 1,
			type: 0,
			url: '',
		});
	} else {
		Object.assign(form, row);
	}
	type = t;
	isShow.value = true;
};
const emits = defineEmits<{
	(e: 'success'): void;
}>();

//确定按钮点击
const commit = async () => {
	await $form.value.validate();
	if (type === 'add') {
		addSwiper();
	} else {
		modifySwiper();
	}
};

//新增轮播图
const addSwiper = async () => {
	if (form.id) delete form.id;

	const { code, msg } = await postSwiper(form);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

const modifySwiper = async () => {
	const { code, msg } = await putSwiper(form);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

const $form = ref();
//商品图片获取
const beforeAvatarUpload = async (rawFile: File) => {
	const data = await commitPicture(rawFile);
	if (data?.length > 0) {
		form.image = data[0];
		$form.value.clearValidate('image');
	}
	return false;
};

//提交图片
const commitPicture = async (img: File) => {
	const { code, data } = await postFile({ file: img });
	if (code !== 200) return Promise.reject();
	return data;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss">
.avatar-uploader {
	:deep() {
		.el-upload {
			border: 1px dashed var(--el-border-color);
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			transition: var(--el-transition-duration-fast);
		}
		.el-upload:hover {
			border-color: var(--el-color-primary);
		}

		.el-icon.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			text-align: center;
		}
	}
}
</style>

<!-- 商品分类管理 新增修改弹窗 -->
<template>
	<el-dialog v-model="isShow" :title="`${title}分类`" width="769px">
		<el-form :model="form" ref="$form" label-width="90px" :rules="rule">
			<el-row :gutter="35">
				<el-col :span="24" class="mb20">
					<el-form-item label="父级分类: " prop="pid">
						<el-select :disabled="title === '修改'" v-model="form.pid" placeholder="请选择父级分类" style="width: 100%">
							<el-option v-for="item in cateDic" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="分类名称: " prop="name">
						<el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="图标: " prop="icon">
						<el-upload
							class="avatar-uploader"
							action="http://freshshop.ppjun.cn/api/admin/swiper"
							:show-file-list="false"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="form.icon" :src="form.icon" class="avatar" style="max-width: 150px; max-height: 150px" />
							<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
						</el-upload>
					</el-form-item>
				</el-col>
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
					<el-form-item label="APP显示: " prop="isShow">
						<el-switch v-model="form.isShow" :active-value="true" :inactive-value="false"></el-switch>
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
import { ElLoading, ElMessage } from 'element-plus';
import { dictModel } from '/@/common/models/dictionary';
import { getCate, postCate } from '/@/api/cate';
import { FsGoodsCate } from '/@/common/models/fs-goods-cate';
import { postFile } from '/@/api/file';
import { Plus } from '@element-plus/icons-vue';

const title = ref('新增');

const isShow = shallowRef(false);

const form = reactive({
	pid: 0,
	name: '',
	icon: '',
	sort: 0,
	isShow: true,
	id: null,
});

const rule = {
	name: [
		{
			required: true,
			message: '请输入分类名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	icon: [
		{
			required: true,
			message: '请输入图标地址',
			trigger: 'blur',
			type: 'string',
		},
	],
};

//打开页面
const open = async (type: 'edit' | 'add', row: FsGoodsCate) => {
	Object.assign(form, {
		pid: null,
		name: '',
		icon: '',
		sort: 0,
		isShow: true,
		id: 0,
	});
	if (type === 'edit') {
		title.value = '编辑';
		delete row.createAt;
		delete row.updateAt;
		if (row.icon === ' ') row.icon = '';
		Object.assign(form, row);
	} else {
		title.value = '新增';
	}
	const Loading = ElLoading.service({
		lock: true,
		text: '查询下拉数据中',
	});
	await getCateList().finally(() => Loading.close());
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
	const queryForm: FsGoodsCate = {
		...form,
	};
	delete queryForm.id;
	const { code, msg } = await postCate(queryForm);
	if (code !== 200) return;
	isShow.value = false;
	ElMessage.success(msg);
	emits('success');
};

//提交修改的分类
const commitCate = async () => {
	const { code, msg } = await postCate(form);
	if (code !== 200) return;
	isShow.value = false;
	ElMessage.success(msg);
	emits('success');
};

//分类字典
const cateDic = ref<dictModel[]>([]);
//获取分类字典
const getCateList = async () => {
	const { code, data } = await getCate();
	if (code !== 200) return Promise.reject();
	cateDic.value = data.map((item) => {
		return {
			name: item.name,
			id: item.id as number,
		};
	});
	return Promise.resolve();
};

//商品图片获取
const beforeAvatarUpload = async (rawFile: File) => {
	const data = await commitPicture(rawFile);
	if (data?.length > 0) {
		form.icon = data[0];
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
			width: 100px;
			height: 100px;
			text-align: center;
		}
	}
}
</style>

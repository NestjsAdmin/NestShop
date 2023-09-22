<!-- 新增文件 -->
<template>
	<el-dialog v-model="isShow" title="新增文件">
		<div>
			<el-upload
				v-model:file-list="fileList"
				class="avatar-uploader"
				action="http://freshshop.ppjun.cn/api/admin/swiper"
				:limit="5"
				multiple
				:auto-upload="false"
				:on-change="onChange"
			>
				<el-button type="primary">点击上传</el-button>
				<span style="color: red">&emsp; (一次最多上传5个文件)</span>
			</el-upload>
		</div>

		<template #footer>
			<el-button type="primary" @click="commit">确定</el-button>
			<el-button @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElLoading, ElMessage, UploadFile } from 'element-plus';
import { ref } from 'vue';
import { postFiles } from '/@/api/file';
const isShow = ref(false);
const fileList = ref([]);
let upFileLIst: UploadFile[] = [];
let hasTimeout: number = 0;

const open = () => {
	fileList.value = [];
	upFileLIst = [];
	isShow.value = true;
};

const onChange = (file: UploadFile) => {
	ElLoading.service({
		lock: true,
		text: '提交中',
	});
	upFileLIst.push(file);
	hasTimeout && clearTimeout(hasTimeout);
	hasTimeout = setTimeout(() => {
		commit();
	}, 1000);
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

const commit = async () => {
	const formData = new FormData();
	upFileLIst.forEach((item) => {
		console.log(item);
		formData.append('file', item.raw as File);
	});
	const { code, msg } = await postFiles(formData);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

defineExpose({ open });
</script>
<style scoped lang="scss"></style>

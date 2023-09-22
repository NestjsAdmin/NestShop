<!-- 商品标签编辑 -->
<template>
	<el-dialog v-model="isShow" title="商品标签">
		<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
		<el-checkbox-group v-model="label" @change="handleCheckedCitiesChange">
			<el-checkbox v-for="item in lableDictionary" :key="item.id + 'check'" :label="item.id"> {{ item.name }}</el-checkbox>
		</el-checkbox-group>
		<template #footer>
			<el-button type="primary" @click="updataLabel">确定</el-button>
			<el-button type="warning" @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElLoading, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { getGoodsLabel, putGoodsLabel } from '/@/api/goods';
import { getLabel } from '/@/api/menu/label';
import { FsGoodsLabel } from '/@/common/models/fs-goods-label';

const isShow = ref(false);
let goodsId = 0;

const checkAll = ref(false);
const isIndeterminate = ref(true);

const handleCheckAllChange = (val: boolean) => {
	label.value = val ? labels.value : [];
	isIndeterminate.value = false;
};

//已选标签
const label = ref<number[]>([]);

//标签字典
const lableDictionary = ref<FsGoodsLabel[]>([]);

//标签字典(id)
const labels = ref<number[]>([]);

//查询标签字典
const getDictionary = async () => {
	const { code, data } = await getLabel({
		page: 1,
		pageSize: 999,
		keyword: '',
	});
	if (code !== 200) return Promise.reject();
	lableDictionary.value = data;
	labels.value = data.map((item) => item.id as number);
	console.log(data);
	return Promise.resolve();
};

//查询商品已有标签
const alreadyCheck = async (id: number) => {
	const { code, data } = await getGoodsLabel(id);
	if (code !== 200) return Promise.reject();
	label.value = data.map((item) => item.labelId as number);
	return Promise.resolve();
};

//处理全选框变化
const handleCheckedCitiesChange = (value: string[]) => {
	const checkedCount = value.length;
	checkAll.value = checkedCount === labels.value.length;
	isIndeterminate.value = checkedCount > 0 && checkedCount < labels.value.length;
};

//保存标签
const updataLabel = async () => {
	const { code, msg } = await putGoodsLabel({
		ids: label.value,
		goodsId: goodsId,
	});
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	isShow.value = false;
	return Promise.resolve();
};

const open = async (id: number) => {
	label.value = [];
	labels.value = [];
	lableDictionary.value = [];
	goodsId = id;
	const Loading = ElLoading.service({
		lock: true,
		text: '查询中...',
	});
	await Promise.all([getDictionary(), alreadyCheck(id)]).finally(() => Loading.close());
	isShow.value = true;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

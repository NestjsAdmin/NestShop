<!-- 进货/出货 -->
<template>
	<el-dialog v-model="isShow" title="新增库存" width="500px">
		<el-form :model="form" label-width="90px" ref="$form">
			<el-row>
				<el-col :span="24" class="mb20">
					<el-form-item label="所属店铺">
						<el-select v-model="storeId" placeholder="请选择店铺" style="width: 100%">
							<el-option v-for="item in props.storeList" :key="item.id + 'storelist2'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item
						label="商品选择"
						prop="goodsId"
						:rules="[
							{
								required: true,
								message: `请选择商品`,
								trigger: 'blur',
							},
						]"
					>
						<el-select v-model="form.goodsId" placeholder="请选择商品" style="width: 100%" filterable>
							<el-option v-for="item in goodList" :key="item.id + 'goods'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="条码" label-width="50">
						<el-input v-model="barcode" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col> -->
				<el-col :span="24">
					<el-form-item
						label="进货数量"
						:rules="[
							{
								required: true,
								message: `请输入进货数量`,
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
import { ref, reactive, defineExpose, watchEffect } from 'vue';
import { postStock } from '/@/api/stock';
import { FsGoods } from '/@/common/models';
import { dictModel } from '/@/common/models/dictionary';
import { getGoods } from '/@/api/goods';

const props = defineProps<{
	storeList: dictModel[];
}>();
const form = reactive({
	goodsId: undefined as unknown as number,
	number: undefined as unknown as number,
	type: 0,
	remark: '',
});
const storeId = ref(undefined as undefined | number);

const isShow = ref(false);
const goodList = ref<Array<FsGoods>>([]);
const getGoodsList = async () => {
	const { code, data } = await getGoods({
		page: 1,
		pageSize: 999999,
		storeId: storeId.value,
		keyword: '',
		status: null,
		sellOut: null,
	}).finally();
	if (code !== 200) return;
	goodList.value = data;
};

watchEffect(() => {
	form.goodsId = undefined as unknown as number;
	if (storeId.value) {
		getGoodsList();
	} else {
		goodList.value = [];
	}
});

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
	ElMessage.success(`保存成功!`);
	emits('success');
	isShow.value = false;
	return Promise.resolve();
};

const open = () => {
	Object.assign(form, {
		goodsId: undefined as unknown as number,
		number: undefined as unknown as number,
		type: 0,
		remark: '',
	});
	isShow.value = true;
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

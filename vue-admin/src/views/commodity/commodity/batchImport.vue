<!--  -->
<template>
	<el-dialog v-model="isShow" title="批量导入" width="500" destroy-on-close :close-on-click-modal="false">
		<el-row>
			<!-- <el-col :span="24">
				<el-select v-model="storeId" placeholder="请选择门店" style="width: 100%">
					<el-option v-for="item in props.storeList" :key="item.id + 'storelist2'" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-col> -->
			<el-col :span="24" class="mt10">
				<el-upload ref="upload" class="upload-demo" action :limit="1" :before-upload="getExcel">
					<template #trigger>
						<el-button type="primary">选择文件</el-button>
					</template>

					<template #tip>
						<div class="el-upload__tip text-red">仅支持excel文件</div>
					</template>
				</el-upload>
			</el-col>
			<el-col :span="24" style="text-align: center">
				<span style="color: red" v-if="batchArr.length === 0">请选择excel文件!</span>
				<span style="color: green" v-else>已解析excel文件!</span>
			</el-col>
		</el-row>
		<template #footer>
			<el-button class="ml10" type="success" @click="submitUpload">提交</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UploadRawFile, ElMessage } from 'element-plus';
import * as XLSX from 'xlsx';
import { postManyGoods } from '/@/api/goods';
import { dictModel } from '/@/common/models/dictionary';
import { getCate } from '/@/api/cate';
import { CateVo } from '/@/common/models';

const props = defineProps<{
	storeList: dictModel[];
}>();

const isShow = ref(false);

const cateList = ref<dictModel[]>([]);

const getCateList = async () => {
	const { data, code } = await getCate(true);
	if (code !== 200) return Promise.reject();
	cateList.value = handlerCateDic(data);
	return Promise.resolve();
};

//处理分类字典
const handlerCateDic = (data: CateVo[]) => {
	const arr: Array<{
		name: string;
		id: number;
	}> = [];
	for (let i = 0; i < data.length; i++) {
		arr.push({
			name: data[i].name,
			id: data[i].id as number,
		});
		if (data[i].children?.length > 0) {
			for (let x = 0; x < data[i].children.length; x++) {
				arr.push({
					name: data[i].children[x].name,
					id: data[i].children[x].id as number,
				});
			}
		}
	}
	return arr;
};

//解析的Excel数组
const batchArr = ref<any[]>([]);
const getExcel = async (file: UploadRawFile) => {
	batchArr.value = [];
	const size = file.size / 1024 / 1024;
	if (!file.name.includes('.xls')) {
		ElMessage.warning('只能上传excel的文件');
		return Promise.reject();
	}
	if (size > 10) {
		ElMessage.warning('文件大小不得超过10M');
		return Promise.reject();
	}
	const result: any = await readXLSX(file);
	console.log(result);
	const jsonData = XLSX.utils.sheet_to_json(result.Sheets[result.SheetNames[0]]);
	batchArr.value = jsonData.map((item: any) => ({
		type: item.商品类型 === '普通商品' ? 0 : 1,
		originPrice: item.市场价格,
		exp: item.保质期,
		name: item.商品名称,
		introduction: item.商品简介,
		price: item.价格,
		stock: item.库存,
		isLimitTime: item.是否限时 === '是' ? 1 : 0,
		barcode: item.条码,
		status: item.状态 === '上架' ? 1 : 2,
		unit: item.规格,
		sort: 1,
		sales: item.销量,
		description: item.商品详情,
		browse: 0,
		cateId: cateList.value.find((item2) => item2.name === item.分类)?.id,
		backIntegral: item.返回积分,
		image: item.商品图片,
		swiper: item.轮播图,
		pd: item.生产日期,
		storeId: props.storeList.find((item2) => item2.name === item.所属门店)?.id,
	}));
	return Promise.reject();
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

//提交后端
const submitUpload = async () => {
	if (batchArr.value.length === 0) {
		ElMessage.warning('请提交文件');
		return Promise.reject();
	}
	const commitArr = batchArr.value.map((item) => ({
		...item,
	}));
	const { code, msg } = await postManyGoods(commitArr);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	isShow.value = false;
	emits('success');
};

//读取excel
const readXLSX = (file: File) => {
	return new Promise((resolve) => {
		let reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = (evt: any) => {
			let data = evt.target.result; // 读到的数据
			let workbook = XLSX.read(data, { type: 'binary' });
			resolve(workbook);
		};
	});
};

const open = async () => {
	await getCateList();
	isShow.value = true;
	batchArr.value = [];
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

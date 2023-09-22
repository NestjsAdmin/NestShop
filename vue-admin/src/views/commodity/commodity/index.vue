<!-- 商品管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-form :model="form" class="mb15">
				<el-container>
					<el-aside width="180px">
						<el-form-item>
							<el-select v-model="form.storeId" placeholder="请选择店铺" clearable filterable>
								<el-option v-for="item in storeList" :key="item.id + 'store'" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-aside>
					<el-aside width="160px" class="ml10">
						<el-form-item>
							<el-select v-model="form.cateId" placeholder="请选择分类" style="width: 100%" filterable clearable>
								<el-option v-for="item in cateList" :key="item.id + 'storelist2'" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-aside>
					<el-aside width="160px" class="ml10">
						<el-form-item>
							<el-input v-model="form.keyword" size="default" placeholder="请输入商品名称" style="max-width: 180px" @keyup.enter="searchTableData">
							</el-input>
						</el-form-item>
					</el-aside>
					<el-aside width="200px" class="ml10">
						<el-form-item label="是否售罄: ">
							<el-radio-group v-model="form.sellOut" label="是否售罄">
								<el-radio :label="true">是</el-radio>
								<el-radio :label="false">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-aside>
					<el-aside width="300px" class="ml10">
						<el-form-item label="状态: ">
							<el-radio-group v-model="form.status">
								<el-radio :label="null">全部</el-radio>
								<el-radio :label="1">上架</el-radio>
								<el-radio :label="2">下架</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-aside>
					<el-main class="ml10">
						<el-button @click="searchTableData" size="default" type="primary">
							<el-icon>
								<ele-Search />
							</el-icon>
							查询
						</el-button>
						<el-button size="default" type="success" @click="onOpenAddGoods('add')">
							<el-icon>
								<ele-FolderAdd />
							</el-icon>
							新增商品
						</el-button>
						<el-button type="primary" @click="exportExcel">导出</el-button>
						<el-button type="primary" @click="openBatchImport">批量导入</el-button>
						<el-button type="primary" @click="shopUpOffShelf(2)">下架</el-button>
						<el-button type="primary" @click="shopUpOffShelf(1)">上架</el-button>
					</el-main>
				</el-container>
			</el-form>
			<el-table :data="table" v-loading="tableLoading" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column prop="id" label="商品id" width="70" />
				<el-table-column prop="storeId" label="所属门店" width="160" :formatter="formatStoreId" show-overflow-tooltip />
				<el-table-column prop="name" label="商品名称" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="status" label="状态" show-overflow-tooltip min-width="100px">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status === 1">上架</el-tag>
						<el-tag type="info" v-else>下架</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="cateId" label="分类" show-overflow-tooltip min-width="120px" :formatter="formatCate"></el-table-column>
				<el-table-column prop="barcode" label="条码" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="image" label="图片" show-overflow-tooltip width="130px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.image" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="introduction" label="商品简介" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="unit" label="规格" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip min-width="100px">
					<template #default="scope"> {{ scope.row.price }}元 </template>
				</el-table-column>
				<el-table-column prop="originPrice" label="市场价格" show-overflow-tooltip min-width="100px">
					<template #default="scope"> {{ scope.row.originPrice }}元 </template>
				</el-table-column>
				<el-table-column prop="type" label="商品类型" show-overflow-tooltip width="100px">
					<template #default="scope"> {{ scope.row.type === 0 ? '普通商品' : '积分商品' }} </template>
				</el-table-column>
				<el-table-column prop="pd" label="生产日期" show-overflow-tooltip width="120px" :formatter="ftDate"></el-table-column>
				<el-table-column prop="exp" label="保质期" show-overflow-tooltip width="100px"></el-table-column>
				<el-table-column prop="sales" label="销量" show-overflow-tooltip width="100px"></el-table-column>
				<el-table-column prop="stock" label="库存" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="storage" label="储存方式" show-overflow-tooltip min-width="180px"></el-table-column>
				<el-table-column prop="browse" label="浏览量" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="description" label="是否限时" show-overflow-tooltip width="120px">
					<template #default="{ row }">
						<el-switch v-model="row.isLimitTime" disabled :active-value="1" :inactive-value="0"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="limitStartTime" label="限时开始时间" show-overflow-tooltip width="160px"></el-table-column>
				<el-table-column prop="limitEndTime" label="限时结束时间" show-overflow-tooltip width="160px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="primary" @click="openLabel(row)">查看标签</el-button>
						<el-button size="small" text type="primary" @click="onOpenAddGoods('edit', row)">修改</el-button>
						<el-button size="small" text type="danger" @click="deGoods(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="getTableData"
				@current-change="getTableData"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="form.page"
				background
				v-model:page-size="form.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
		<CommodityDialog ref="$CommodityDialog" @success="getTableData" />
		<lableCheckBox ref="$lableCheckBox" />
		<batchImport ref="$batchImport" :storeList="storeList" :cateList="cateList" @success="getTableData" />
	</div>
</template>

<script setup lang="ts">
import { ElLoading, ElMessage, dayjs } from 'element-plus';
import { defineAsyncComponent, onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import { deleteGoods, getGoods, upperLowerShelvesGoods } from '/@/api/goods';
import { FsGoods } from '/@/common/models/fs-goods';
import { formatDate, formatTime } from '/@/utils/dateFormatter';
import lableCheckBox from '/@/views/commodity/commodity/labelCheckBox.vue';
import { getStore } from '/@/api/store';
import { dictModel } from '/@/common/models/dictionary';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CateVo } from '/@/common/models/cate-vo';
import { getCate } from '/@/api/cate';

const batchImport = defineAsyncComponent(() => import('/@/views/commodity/commodity/batchImport.vue'));

//引入组件
const CommodityDialog = defineAsyncComponent(() => import('/@/views/commodity/commodity/dialog.vue'));

const form = reactive({
	page: 1,
	pageSize: 10,
	keyword: '',
	sellOut: false,
	status: null,
	storeId: undefined,
	cateId: undefined,
	barcode: '',
});

const barcodeForm = reactive({
	page: 1,
	pageSize: 10,
	sellOut: false,
	barcode: '',
});
const total = ref(0);
const tableLoading = ref(false);

const table = ref<FsGoods[]>([]);

const searchTableData = () => {
	form.page = 1;
	getTableData();
};

//获取商品列表
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data, totalCount } = await getGoods(form).finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	table.value = data;
	total.value = totalCount;
};

//删除商品
const deGoods = async (row: FsGoods) => {
	const { code, msg } = await deleteGoods(row.id as number);
	if (code !== 200) return;
	ElMessage.success(msg);
	getTableData();
};

const $CommodityDialog = ref();
//打开修改或新增商品页面
const onOpenAddGoods = (type: string, row?: FsGoods) => {
	console.log("11111",type)
	if (row) $CommodityDialog.value.open(type, JSON.parse(JSON.stringify(row)));
	else $CommodityDialog.value.open(type);
};

const $lableCheckBox = ref();
//打开商品标签页面
const openLabel = (row: FsGoods) => {
	$lableCheckBox.value.open(row.id);
};

//门店字典
const storeList = ref<dictModel[]>([]);
const getStoreList = async () => {
	const { code, data } = await getStore({
		page: 1,
		pageSize: 9999,
		keyword: '',
	});
	if (code !== 200) return Promise.reject();
	storeList.value = data.map((item) => ({
		id: item.id as number,
		name: item.name,
	}));
};

const formatStoreId = (row: FsGoods) => {
	return storeList.value.find((item) => item.id === row.storeId)?.name;
};

const cateList = ref<dictModel[]>([]);

const getCateList = async () => {
	const { data, code } = await getCate();
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

const formattercreateAt = (row: FsGoods) => {
	return formatTime(row.createAt);
};

const ftDate = (row: FsGoods) => {
	return formatDate(row.pd);
};

//导出excel
const exportExcel = async () => {
	const queryFrom = {
		...form,
		page: 1,
		pageSize: 999999999,
	};
	const loading = ElLoading.service({
		lock: true,
		text: '查询中数据中...',
	});
	const { code, data } = await getGoods(queryFrom).finally(() => {
		loading.close();
	});
	if (code !== 200) return;
	const arr = data.map((item) => ({
		商品id: item.id,
		所属门店: formatStoreId(item),
		商品名称: item.name,
		状态: item.status === 1 ? '上架' : '下架',
		条码: item.barcode,
		商品简介: item.introduction,
		规格: item.unit,
		价格: item.price,
		市场价格: item.originPrice,
		商品类型: item.type === 0 ? '普通商品' : '积分商品',
		生产日期: item.pd,
		保质期: item.exp,
		销量: item.sales,
		库存: item.stock,
		储存方式: item.storage,
		浏览量: item.browse,
		是否限时: item.isLimitTime ? '是' : '否',
		限时开始时间: item.limitStartTime,
		限时结束时间: item.limitEndTime,
		创建时间: item.createAt,
	}));
	const excelData = XLSX.utils.json_to_sheet(arr);
	var wb = XLSX.utils.book_new();
	/* get binary string as output */
	XLSX.utils.book_append_sheet(wb, excelData, '订单数据');
	var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });

	try {
		FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `商品截止${dayjs().format('YYYY-MM-DD HH点mm分ss秒')}.xlsx`);
	} catch (e) {
		if (typeof console !== 'undefined') console.log(e, wbout);
	}
	return wbout;
};

//格式化分类
const formatCate = (row: FsGoods) => {
	return cateList.value.find((item) => item.id === row.cateId)?.name;
};

const $batchImport = ref();

const openBatchImport = () => {
	$batchImport.value.open();
};

const multipleSelection = ref([]);
//表格多选按钮
const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};
//批量删除
const shopUpOffShelf = async (state: number) => {
	const ids: Array<number> = [];
	if (multipleSelection.value.length === 0) {
		ElMessage({
			type: 'warning',
			message: '请选择要操作的数据',
		});
		return;
	}
	multipleSelection.value.map((item: any) => {
		ids.push(item.id);
	});
	console.log('id数据', ids);
	let parameter: any = {
		ids,
		status: state,
	};
	const { code, data } = await upperLowerShelvesGoods(parameter);

	if (code == 200 && state == 1) {
		ElMessage({
			message: '上架成功',
			type: 'success',
		});
	} else if (code == 200 && state == 2) {
		ElMessage({
			message: '下架成功',
			type: 'success',
		});
	} else {
		ElMessage.error('上架失败');
	}
	getTableData();
};
const getBarcodeTableData = async () => {
	const { code, data, totalCount } = await getGoods(barcodeForm).finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	if(data.length==0){
		return
	}
	$CommodityDialog.value.open('edit', JSON.parse(JSON.stringify(data[0])));
};
let tempKey = '';
const keyEvent = ({ key }: { key: string }) => {
	if (key.includes('Enter')) {
		// console.log('条形码、二维码：', tempKey);
		barcodeForm.barcode = tempKey;
		if(tempKey){
			getBarcodeTableData();
		}
		barcodeForm.barcode = '';
		tempKey = '';
	} else tempKey += key;
};
onMounted(() => {
	getStoreList();
	getCateList();
	getTableData();
	document.addEventListener('keydown', keyEvent);
});
onBeforeUnmount(() => {
	document.removeEventListener('keydown', keyEvent);
});
</script>
<style scoped lang="scss">
.system-role-container {
	:deep() {
		.el-main {
			padding: 0;
		}
	}
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>

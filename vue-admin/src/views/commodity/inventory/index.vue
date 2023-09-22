<!-- 库存管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-form :model="form" class="mb15">
				<el-container>
					<el-aside width="180px">
						<el-form-item>
							<el-select v-model="form.storeId" placeholder="请选择店铺" clearable>
								<el-option v-for="item in storeList" :key="item.id + 'store'" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-aside>
					<el-aside width="180px" class="ml10">
						<el-form-item>
							<el-input v-model="form.keyword" size="default" placeholder="请输入商品名称" style="max-width: 180px" @keyup.enter="searchTableData">
							</el-input>
						</el-form-item>
					</el-aside>
					<el-main class="ml10">
						<el-button @click="searchTableData" size="default" type="primary">
							<el-icon>
								<ele-Search />
							</el-icon>
							查询
						</el-button>
						<el-button type="success" @click="oepnNewStock">新增库存</el-button>
					</el-main>
				</el-container>
			</el-form>
			<el-table :data="table" v-loading="tableLoading" style="width: 100%">
				<el-table-column prop="id" label="商品id" width="70" />
				<el-table-column prop="storeId" label="所属门店" width="160" :formatter="formatStoreId" show-overflow-tooltip />
				<el-table-column prop="name" label="商品名称" show-overflow-tooltip min-width="150px"></el-table-column>
				<el-table-column prop="stock" label="当前库存" width="120" />
				<el-table-column prop="status" label="状态" show-overflow-tooltip min-width="100px">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status === 1">上架</el-tag>
						<el-tag type="info" v-else>下架</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="image" label="图片" show-overflow-tooltip width="130px">
					<template #default="{ row }">
						<el-image style="width: 100px; height: 100px" :src="row.image" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="unit" label="规格" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip min-width="100px">
					<template #default="scope"> {{ scope.row.price }}元 </template>
				</el-table-column>
				<el-table-column prop="pd" label="生产日期" show-overflow-tooltip width="120px" :formatter="ftDate"></el-table-column>
				<el-table-column prop="exp" label="保质期" show-overflow-tooltip width="100px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template #default="{ row }">
						<el-button size="small" text type="primary" @click="inStock(row)">进货</el-button>
						<el-button size="small" text type="warning" @click="outStock(row)">出货</el-button>
						<el-button size="small" text @click="openRecord(row)">记录</el-button>
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
				:total="form.total"
			>
			</el-pagination>
			<modifyStock ref="$modifyStock" @success="getTableData" />
			<record ref="$record" />
			<addNewStock ref="$addNewStock" :storeList="storeList" @success="getTableData" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, defineAsyncComponent,onBeforeUnmount } from 'vue';
import { getGoods } from '/@/api/goods';
import { FsGoods } from '/@/common/models';
import { formatDate, formatTime } from '/@/utils/dateFormatter';
import modifyStock from './modifyStock.vue';
import record from './record.vue';
import { getStore } from '/@/api/store';
import { dictModel } from '/@/common/models/dictionary';

const addNewStock = defineAsyncComponent(() => import('/@/views/commodity/inventory/addNewStock.vue'));

const form = reactive({
	keyword: '',
	page: 1,
	pageSize: 10,
	total: 0,
	storeId: undefined,
});

const barcodeForm = reactive({
	page: 1,
	pageSize: 10,
	sellOut: false,
	barcode: '',
});

const tableLoading = ref(false);
const table = ref<FsGoods[]>([]);

//搜索商品数据
const searchTableData = () => {
	form.page = 1;
	getTableData();
};

//获取商品数据
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data, totalCount } = await getGoods({
		keyword: form.keyword,
		page: form.page,
		pageSize: form.pageSize,
		sellOut: null,
		status: null,
		storeId: form.storeId || undefined,
	}).finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	table.value = data;
	form.total = totalCount;
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

const $modifyStock = ref();
//进货
const inStock = (row: FsGoods) => {
	$modifyStock.value.open(row, 'add');
};
//出货
const outStock = (row: FsGoods) => {
	$modifyStock.value.open(row, 'substrck');
};

const $record = ref();
//记录
const openRecord = (row: FsGoods) => {
	$record.value.open(row);
};

const formattercreateAt = (row: FsGoods) => {
	return formatTime(row.createAt);
};

const ftDate = (row: FsGoods) => {
	return formatDate(row.pd);
};
const formatStoreId = (row: FsGoods) => {
	return storeList.value.find((item) => item.id === row.storeId)?.name;
};

const $addNewStock = ref();
const oepnNewStock = () => {
	$addNewStock.value.open();
};
//扫码
const getBarcodeTableData = async () => {
	const { code, data, totalCount } = await getGoods(barcodeForm).finally(() => (tableLoading.value = false));
	if (code !== 200) return;
	if(data.length==0){
		return
	}
	$modifyStock.value.open(data[0], 'add');
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

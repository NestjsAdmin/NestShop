<!-- 商品管理 新增修改弹窗 -->
<template>
	<el-dialog v-model="isShow" :title="`${title}商品`" width="769px">
		<el-form :model="form" ref="$form" label-width="90px" :rules="rule">
			<el-row :gutter="35">
				<el-col :span="24" class="mb20">
					<el-form-item label="所属门店: " prop="storeId">
						<el-select v-model="form.storeId" placeholder="请选择所属门店" style="width: 100%">
							<el-option v-for="item in storeDcitonary" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品分类: " prop="cateId">
						<el-select v-model="form.cateId" placeholder="请选择商品分类" style="width: 100%" filterable>
							<el-option v-for="item in cateDic" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品名称: " prop="name">
						<el-input v-model="form.name" placeholder="请填写商品名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品简介: " prop="introduction">
						<el-input v-model="form.introduction" placeholder="请填写商品简介"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="规格名称: " prop="unit">
						<el-input v-model="form.unit" placeholder="请填写规格名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="排序: ">
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
					<el-form-item label="生产日期: " prop="pd">
						<el-date-picker v-model="form.pd" type="date" style="width: 100%" placeholder="请选择生产日期" value-format="YYYY-MM-DD"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="存储方式: " prop="storage">
						<el-input v-model="form.storage" placeholder="请填写存储方式"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="保质期(天): " prop="exp">
						<el-input-number
							value-on-clear=" "
							v-model="form.exp"
							:controls="false"
							style="width: 100%"
							placeholder="请填写保质期(天)"
							:min="0"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品价格: " prop="price">
						<el-input-number
							value-on-clear=" "
							v-model="form.price"
							:controls="false"
							:precision="2"
							style="width: 100%"
							placeholder="请填写商品价格(元)"
							:min="0"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="市场价格: " prop="originPrice">
						<el-input-number
							value-on-clear=" "
							v-model="form.originPrice"
							:controls="false"
							style="width: 100%"
							placeholder="请填写市场价格(元)"
							:min="0"
							:precision="2"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品类型: ">
						<el-radio-group v-model="form.type">
							<el-radio :label="0">普通商品</el-radio>
							<el-radio :label="1">积分商品</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col v-if="form.type === 0" :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="返还积分: " prop="backIntegral">
						<el-input-number
							:controls="false"
							style="width: 100%"
							v-model="form.backIntegral"
							placeholder="请填写返还积分"
							:min="0"
							:max="9999"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col v-else :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="所需积分: " prop="needIntegral">
						<el-input-number
							:controls="false"
							style="width: 100%"
							v-model="form.needIntegral"
							placeholder="请填写所需积分"
							:min="0"
							:max="9999"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否限时: ">
						<el-radio-group v-model="form.isLimitTime">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col v-if="form.isLimitTime" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label="限时范围: " prop="limitTime">
						<el-date-picker
							v-model="form.limitTime"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="条码: ">
						<el-input v-model="form.barcode" placeholder="请填写条码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="商品详情: ">
						<Editor v-model:get-html="editor.htmlVal" v-model:get-text="editor.textVal" :disable="false" :img-func="imgFunc" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="商品图片: " prop="image">
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
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="状态: ">
						<el-radio-group v-model="form.status">
							<el-radio :label="1">上架</el-radio>
							<el-radio :label="2">下架</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="轮播图: " prop="orginSwiper">
						<el-upload
							accept="image/*"
							v-model:file-list="form.orginSwiper"
							class="avatar-uploader"
							action="http://freshshop.ppjun.cn/api/admin/swiper"
							list-type="picture-card"
							:before-upload="beforeSwiper"
							:limit="5"
							multiple
						>
							<el-icon><Plus /></el-icon>
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
import { defineAsyncComponent, reactive, ref, shallowRef } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElLoading, ElMessage } from 'element-plus';
import { postFile } from '/@/api/file';
import { getStore } from '/@/api/store';
import { dictModel } from '/@/common/models/dictionary';
import { getCate } from '/@/api/cate';
import { FsGoods } from '/@/common/models/fs-goods';
import { postGoods, putGoods } from '/@/api/goods';
import { CateVo } from '/@/common/models/cate-vo';

const Editor = defineAsyncComponent(() => import('/@/components/editor/index.vue'));

const editor = reactive({
	htmlVal: '',
	textVal: '',
});

const title = ref('新增');

const isShow = shallowRef(false);

const form = reactive({
	storeId: null as null | number,
	cateId: null as null | number,
	keyword: '',
	name: '',
	image: '',
	swiper: '',
	sort: 0,
	price: '',
	originPrice: '',
	sales: 0,
	stock: 0,
	status: 1,
	description: '',
	browse: 0,
	exp: 0,
	pd: '',
	introduction: '',
	unit: '',
	barcode: '',
	backIntegral: 0,
	type: 0,
	needIntegral: 0,
	storage: null,
	cost: null,
	orginSwiper: [] as swiperModel[],
	isLimitTime: 0,
	limitStartTime: null,
	limitEndTime: null,
	limitTime: [] as any,
});

const rule = {
	storeId: [
		{
			required: true,
			message: '请选择所属门店',
			trigger: 'blur',
			type: 'number',
		},
	],
	cateId: [
		{
			required: true,
			message: '请选择商品分类',
			trigger: 'blur',
			type: 'number',
		},
	],
	name: [
		{
			required: true,
			message: '请填写商品名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	introduction: [
		{
			required: true,
			message: '请填写商品简介',
			trigger: 'blur',
			type: 'string',
		},
	],
	unit: [
		{
			required: true,
			message: '请填写规格名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	price: [
		{
			required: true,
			message: '请填写商品价格',
			trigger: 'blur',
		},
	],
	originPrice: [
		{
			required: true,
			message: '请填写市场价格',
			trigger: 'blur',
		},
	],
	description: [
		{
			required: true,
			message: '请填写商品详情',
			trigger: 'blur',
			type: 'string',
		},
	],
	image: [
		{
			required: true,
			message: '请上传商品图片',
			trigger: 'blur',
			type: 'string',
		},
	],
	orginSwiper: [
		{
			required: true,
			message: '请上传商轮播图',
			trigger: 'blur',
			type: 'array',
		},
	],
	limitTime: [
		{
			required: true,
			message: '请选择限时范围',
			trigger: 'blur',
			type: 'array',
		},
	],
};

interface swiperModel {
	name: string;
	url: string;
}

//打开页面
const open = async (type: string, row: FsGoods) => {
	editor.htmlVal = '';
	editor.textVal = '';
	Object.assign(form, {
		storeId: null as null | number,
		cateId: null as null | number,
		name: '',
		image: '',
		swiper: '',
		sort: 0,
		price: '',
		originPrice: '',
		sales: 0,
		stock: 0,
		status: 1,
		description: '',
		browse: 0,
		exp: 0,
		pd: '',
		introduction: '',
		unit: '',
		barcode: '',
		backIntegral: 0,
		storage: null,
		type: 0,
		needIntegral: 0,
		cost: null,
		orginSwiper: [] as swiperModel[],
		isLimitTime: 0,
		limitStartTime: '',
		limitEndTime: '',
	});
	if (type === 'edit') {
		title.value = '编辑';
		delete row.createAt;
		delete row.updateAt;
		Object.assign(form, row);
		form.orginSwiper = row.swiper.split(',').map((item, index) => {
			return {
				name: index + '.png',
				url: item,
			};
		});
		form.limitTime = [row.limitStartTime, row.limitEndTime];
		editor.htmlVal = row.description;
	} else {
		title.value = '新增';
	}
	const Loading = ElLoading.service({
		lock: true,
		text: '查询下拉数据中',
	});
	await Promise.all([getStoreList(), getCateList()]).finally(() => Loading.close());
	isShow.value = true;
};

//商品图片获取
const beforeAvatarUpload = async (rawFile: File) => {
	const data = await commitPicture(rawFile);
	if (data?.length > 0) {
		form.image = data[0];
		$form.value.clearValidate('image');
	}
	return false;
};

//轮播图获取
const beforeSwiper = async (rawFile: File) => {
	const data = await commitPicture(rawFile);
	if (data?.length > 0) {
		form.orginSwiper.push({
			name: form.orginSwiper.length + '.png',
			url: data[0],
		});
	}
	return false;
};

//提交图片
const commitPicture = async (img: File) => {
	const { code, data } = await postFile({ file: img });
	if (code !== 200) return Promise.reject();
	return data;
};

//富文本上传图片
const imgFunc = async (file: File, inserfn: any) => {
	const data = await commitPicture(file);
	inserfn(data[0]);
};

const $form = ref();

const commit = async () => {
	await $form.value.validate();
	form.description = editor.htmlVal;
	if (title.value === '新增') {
		commitNewGood();
	} else {
		commitOldGood();
	}
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

interface FsGoods2 extends FsGoods {
	orginSwiper?: swiperModel[];
	limitTime?: any[];
}

//新增商品
const commitNewGood = async () => {
	const commitForm: FsGoods2 = {
		...JSON.parse(JSON.stringify(form)),
		storeId: form.storeId as number,
		cateId: form.cateId as number,
	};
	if (form.limitTime.length === 2) {
		commitForm.limitStartTime = form.limitTime[0];
		commitForm.limitEndTime = form.limitTime[1];
	}
	if (!form.isLimitTime) {
		commitForm.limitStartTime = null;
		commitForm.limitEndTime = null;
	}
	commitForm.swiper = form.orginSwiper.map((itme) => itme.url).join(',');
	delete commitForm.orginSwiper;
	delete commitForm.limitTime;
	if (commitForm.id) {
		delete commitForm.id;
	}
	if (form.type === 0) {
		form.needIntegral = 0;
	} else {
		form.backIntegral = 0;
	}
	const { code, msg } = await postGoods(commitForm);
	if (code !== 200) return;
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

//修改商品
const commitOldGood = async () => {
	const commitForm: FsGoods2 = {
		...JSON.parse(JSON.stringify(form)),
		storeId: form.storeId as number,
		cateId: form.cateId as number,
	};
	if (form.limitTime.length === 2) {
		commitForm.limitStartTime = form.limitTime[0];
		commitForm.limitEndTime = form.limitTime[1];
	}
	if (!form.isLimitTime) {
		commitForm.limitStartTime = null;
		commitForm.limitEndTime = null;
	}
	commitForm.swiper = form.orginSwiper.map((itme) => itme.url).join(',');
	delete commitForm.orginSwiper;
	delete commitForm.limitTime;
	if (form.type === 0) {
		form.needIntegral = 0;
	} else {
		form.backIntegral = 0;
	}
	const { code, msg } = await putGoods(commitForm);
	if (code !== 200) return;
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

//门店字典
const storeDcitonary = ref<dictModel[]>([]);
//获取门店字典
const getStoreList = async () => {
	const { code, data } = await getStore({ page: 1, pageSize: 999, keyword: '' });
	if (code !== 200) return Promise.reject();
	storeDcitonary.value = data.map((item) => {
		return {
			name: item.name,
			id: item.id as number,
		};
	});
	if (form.storeId === null && storeDcitonary.value.length > 0) {
		form.storeId = storeDcitonary.value[0].id as number;
	}
};

//分类字典
const cateDic = ref<dictModel[]>([]);
//获取分类字典
const getCateList = async () => {
	const { code, data } = await getCate();
	if (code !== 200) return Promise.reject();
	cateDic.value = handlerCateDic(data);
	if (form.cateId === null && cateDic.value.length > 0) {
		form.cateId = cateDic.value[0].id as number;
	}
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

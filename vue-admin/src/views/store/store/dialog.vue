<!--  -->
<template>
	<el-dialog v-model="isShow" :title="`${title}门店`" width="769px" destroy-on-close>
		<el-form :model="form" ref="$form" label-width="90px" :rules="rule">
			<el-row :gutter="35">
				<el-col :span="24" class="mb20">
					<el-form-item label="门店名称: " prop="name">
						<el-input v-model="form.name" placeholder="请输入门店名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="店长: " prop="userId">
						<el-select v-model="form.userId" placeholder="请选择店长" style="width: 100%">
							<el-option v-for="item in props.userList" :key="item.id + 'userId'" :label="item.nickname" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="手机: " prop="phone">
						<el-input v-model="form.phone" placeholder="请输入手机"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="省市区: " prop="address">
						<el-input v-model="form.address" placeholder="请输入省市区"> </el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="详细地址: " prop="addressDetail">
						<el-input v-model="form.addressDetail" placeholder="请输入详细地址"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="经度" prop="longitude">
						<el-input v-model="form.longitude" placeholder="请选择经度" readonly>
							<template #append>
								<el-button type="primary" @click="selectLoca">选择经纬度</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="纬度" prop="latitude">
						<el-input v-model="form.latitude" placeholder="请选择纬度" readonly>
							<template #append>
								<el-button type="primary" @click="selectLoca">选择经纬度</el-button>
							</template>
						</el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="营业时间: " prop="dayTimeStart">
						<el-time-picker
							v-model="dayTimeRange"
							placeholder="请选择营业时间"
							is-range
							:clearable="false"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="HH:mm:ss"
							@change="timeChange"
						></el-time-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="营业日: " prop="dayWeek">
						<el-select v-model="dayWeeks" placeholder="请选择营业日" multiple collapse-tags collapse-tags-tooltip style="width: 100%">
							<el-option v-for="item in weeks" :key="item.id + 'week'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="社区名称: " prop="communityName">
						<el-input v-model="form.communityName" placeholder="请输入社区名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="配送方式: " prop="distributionWay">
						<el-select v-model="distributionWay" placeholder="请选择配送方式" multiple collapse-tags collapse-tags-tooltip style="width: 100%">
							<el-option v-for="item in wayDictionary" :key="item.id + 'way'" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="简介: " prop="introduction">
						<el-input
							v-model="form.introduction"
							placeholder="请输入店铺简介"
							type="textarea"
							:rows="3"
							:autosize="{ minRows: 3, maxRows: 3 }"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" class="mb20">
					<el-form-item label="店铺图片: " prop="image">
						<el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload">
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
		<selectLoactioan ref="$defineAsyncComponent" @select="setLoacation" />
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { postFile } from '/@/api/file';
import { dictModel } from '/@/common/models/dictionary';
import { FsStore } from '/@/common/models/fs-store';
import { Plus } from '@element-plus/icons-vue';
import { AdUser } from '/@/common/models/ad-user';
import { ElMessage } from 'element-plus';
import { postStore, putStore } from '/@/api/store';

const selectLoactioan = defineAsyncComponent(() => import('/@/views/store/store/selectLocation.vue'));

const props = defineProps<{
	userList: AdUser[];
}>();

const weeks = ref<dictModel[]>([
	{
		id: 1,
		name: '星期一',
	},
	{
		id: 2,
		name: '星期二',
	},
	{
		id: 3,
		name: '星期三',
	},
	{
		id: 4,
		name: '星期四',
	},
	{
		id: 5,
		name: '星期五',
	},
	{
		id: 6,
		name: '星期六',
	},
	{
		id: 0,
		name: '星期天',
	},
]);

const wayDictionary = ref<dictModel[]>([
	{
		id: 1,
		name: '门店配送',
	},
	{
		id: 2,
		name: '自提',
	},
	{
		id: 3,
		name: '第三方配送',
	},
]);

const isShow = ref(false);

const title = ref('新增');

const form = ref<FsStore>({
	userId: null as unknown as number,
	name: '',
	introduction: '',
	phone: '',
	address: '',
	addressDetail: '',
	image: '',
	latitude: '',
	longitude: '',
	communityName: '',
	dayWeek: '',
	isShow: false,
	dayTimeEnd: '',
	dayTimeStart: '',
	distributionWay: '',
	id: 0 as undefined | number,
});

const rule = {
	name: [
		{
			required: true,
			message: '请输入店铺名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	userId: [
		{
			required: true,
			message: '请选择店长',
			trigger: 'blur',
			type: 'number',
		},
	],
	phone: [
		{
			required: true,
			message: '请输入手机',
			trigger: 'blur',
			type: 'string',
		},
	],
	address: [
		{
			required: true,
			message: '请输入省市区',
			trigger: 'blur',
			type: 'string',
		},
	],
	addressDetail: [
		{
			required: true,
			message: '请输入详细地址',
			trigger: 'blur',
			type: 'string',
		},
	],
	dayTimeStart: [
		{
			required: true,
			message: '请选择营业时间',
			trigger: 'blur',
			type: 'string',
		},
	],
	dayWeek: [
		{
			required: true,
			message: '请选择营业日',
			trigger: 'blur',
			type: 'string',
		},
	],
	communityName: [
		{
			required: true,
			message: '请输入社区名称',
			trigger: 'blur',
			type: 'string',
		},
	],
	distributionWay: [
		{
			required: true,
			message: '请选择配送方式',
			trigger: 'blur',
			type: 'string',
		},
	],
	introduction: [
		{
			required: true,
			message: '请输入店铺简介',
			trigger: 'blur',
			type: 'string',
		},
	],
	image: [
		{
			required: true,
			message: '请上传店铺图片',
			trigger: 'blur',
			type: 'string',
		},
	],
	latitude: [
		{
			required: true,
			message: '请选择纬度',
			trigger: 'change',
			type: 'string',
		},
	],
	longitude: [
		{
			required: true,
			message: '请选择经度',
			trigger: 'change',
			type: 'string',
		},
	],
};

const dayTimeRange = ref<string[]>([]);
const dayWeeks = ref<number[]>([]);
const distributionWay = ref<number[]>([]);

const $defineAsyncComponent = ref();

const selectLoca = () => {
	$defineAsyncComponent.value.open();
};

const timeChange = (time: string[]) => {
	form.value.dayTimeStart = time[0];
	form.value.dayTimeEnd = time[1];
};

const commit = () => {
	if (dayTimeRange.value && dayTimeRange.value.length > 0) {
		form.value.dayTimeStart = dayTimeRange.value[0];
		form.value.dayTimeEnd = dayTimeRange.value[1];
	} else {
		form.value.dayTimeStart = '';
		form.value.dayTimeEnd = '';
	}
	form.value.dayWeek = dayWeeks.value.join();
	form.value.distributionWay = distributionWay.value.join();
	if (!form.value.latitude || !form.value.longitude) {
		ElMessage.error('请选择地址获取经纬度!');
		return;
	}
	$form.value.validate().then(() => {
		if (title.value === '新增') {
			commitNew();
		} else {
			commitEdit();
		}
	});
};

//新增提交
const commitNew = async () => {
	const { code, msg } = await postStore(form.value);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

//修改提交
const commitEdit = async () => {
	const { code, msg } = await putStore(form.value);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	emits('success');
	isShow.value = false;
};

const emits = defineEmits<{
	(e: 'success'): void;
}>();

//打开页面
const open = async (type: string, row: FsStore) => {
	dayTimeRange.value = [];
	dayWeeks.value = [];
	distributionWay.value = [];
	if (type === 'edit') {
		row = JSON.parse(JSON.stringify(row));
		title.value = '编辑';
		delete row.createAt;
		delete row.updateAt;
		setSelect(row);
		form.value = row;
	} else {
		form.value = {
			userId: null as unknown as number,
			name: '',
			introduction: '',
			phone: '',
			address: '',
			addressDetail: '',
			image: '',
			latitude: '',
			longitude: '',
			communityName: '',
			dayWeek: '',
			isShow: false,
			dayTimeEnd: '',
			dayTimeStart: '',
			distributionWay: '',
			id: 0 as undefined | number,
		};
		title.value = '新增';
	}
	isShow.value = true;
};

//设置已选数据
const setSelect = (row: FsStore) => {
	console.log(row);

	if (row.dayTimeStart && row.dayTimeEnd) {
		// dayTimeRange.value = [row.dayTimeStart, row.dayTimeEnd];
		dayTimeRange.value[0] = row.dayTimeStart;
		dayTimeRange.value[1] = row.dayTimeEnd;
	}

	if (row.dayWeek) {
		dayWeeks.value = row.dayWeek.split(',').map((item) => parseInt(item));
	}
	if (row.distributionWay) {
		distributionWay.value = row.distributionWay.split(',').map((item) => parseInt(item));
	}
};

const $form = ref();
//商品图片获取
const beforeAvatarUpload = async (rawFile: File) => {
	const data = await commitPicture(rawFile);
	if (data?.length > 0) {
		form.value.image = data[0];
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

//选择位置后
const setLoacation = async (loc: any) => {
	form.value.longitude = loc.latlng.lng.toString();
	form.value.latitude = loc.latlng.lat.toString();
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

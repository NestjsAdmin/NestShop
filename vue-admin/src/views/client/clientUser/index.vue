<!-- 门店管理 -->
<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<el-space wrap class="mb15" size="normal">
				<el-input v-model="form.keyword" size="default" placeholder="请输入关键词" @keyup.enter="getTableData"></el-input>
				<div>
					<el-button @click="getTableData" size="default" type="primary">
						<el-icon>
							<ele-Search />
						</el-icon>
						查询
					</el-button>
				</div>
			</el-space>

			<el-table :data="table" v-loading="tableLoading" style="width: 100%" :row-class-name="getRowClassName">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="openid" label="openid" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="appid" label="appid" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="nickName" label="昵称" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="avatarUrl" label="头像" show-overflow-tooltip width="80px">
					<template #default="{ row }">
						<el-image style="width: 40px; height: 40px" :src="row.avatarUrl" fit="contain" />
					</template>
				</el-table-column>
				<el-table-column prop="phoneNumber" label="手机号码" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="gender" label="性别" show-overflow-tooltip min-width="100px">
					<template #default="{ row }">
						{{ row.gender === 1 ? '男' : row.gender === 2 ? '女' : '保密' }}
					</template>
				</el-table-column>
				<el-table-column prop="integral" label="积分" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="balance" label="余额" show-overflow-tooltip min-width="100px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" show-overflow-tooltip :formatter="formattercreateAt" width="160px"></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template #default="{ row }">
						<el-button v-if="row.status === 2" size="small" text type="success" @click="open(row)">启用</el-button>
						<el-button v-else size="small" text type="danger" @click="close(row)">禁用</el-button>
						<el-button size="small" text type="primary" @click="giveGiftClick(row)">赠送积分</el-button>
						<el-button size="small" text @click="giftRecordClick(row)">赠送记录</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="getTableData"
				@current-change="getTableData"
				class="mt15"
				:pager-count="5"
				:page-sizes="[15, 20, 30]"
				v-model:current-page="form.page"
				background
				v-model:page-size="form.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
			<giveGift ref="$giveGift" @success="getTableData" />
			<giftRecord ref="$giftRecord" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { formatTime } from '/@/utils/dateFormatter';
// import { ElMessage } from 'element-plus';
import { FsUser } from '/@/common/models/fs-user';
import { getFsuser, putFsuser } from '/@/api/fsUser';
import { ElMessage } from 'element-plus';
import giveGift from './giveGift.vue';
import giftRecord from './giftRecord.vue';

const tableLoading = ref(false);

const form = reactive({
	page: 1,
	pageSize: 15,
	keyword: '',
});
const total = ref(0);

const table = ref<FsUser[]>([]);

//获取用户列表
const getTableData = async () => {
	tableLoading.value = true;
	const { code, data, totalCount } = await getFsuser(form).finally(() => (tableLoading.value = false));
	if (code !== 200) return Promise.reject();
	table.value = data;
	total.value = totalCount;
};

//禁用
const close = async (row: FsUser) => {
	const row2 = JSON.parse(JSON.stringify(row));
	delete row2.createAt;
	delete row2.updateAt;
	row2.status = 2;
	console.log(row2);
	const { code, msg } = await putFsuser(row2);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	getTableData();
};

//启用
const open = async (row: FsUser) => {
	const row2 = JSON.parse(JSON.stringify(row));
	delete row2.createAt;
	delete row2.updateAt;
	row2.status = 1;
	console.log(row2);
	const { code, msg } = await putFsuser(row2);
	if (code !== 200) return Promise.reject();
	ElMessage.success(msg);
	getTableData();
};

const $giveGift = ref();
//赠送积分
const giveGiftClick = (row: FsUser) => {
	$giveGift.value.open(row);
};

const $giftRecord = ref();
//查看赠送记录
const giftRecordClick = (row: FsUser) => {
	$giftRecord.value.open(row);
};

const getRowClassName = ({ row }: { row: FsUser }) => {
	if (row.status === 2) return 'textRed';
	else return '';
};

const formattercreateAt = (row: FsUser) => {
	return formatTime(row.createAt);
};

onMounted(() => {
	getTableData();
});
</script>
<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		:deep() {
			.textRed {
				.cell {
					color: red;
				}
			}
		}
		.el-table {
			flex: 1;
		}
	}
}
</style>

<!--  -->
<template>
	<el-dialog v-model="isShow" title="选择店铺位置" destroy-on-close>
		<div style="height: 700px">
			<iframe
				id="mapPage"
				width="100%"
				height="100%"
				frameborder="0"
				src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=7EZBZ-CTOCD-V6P4O-P2EO3-P2FKE-6YBO4&referer=myapp"
			>
			</iframe>
		</div>
		<template #footer>
			<el-button type="primary" @click="commit">确定</el-button>
			<el-button type="warning" @click="isShow = false">取消</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { nextTick, ref } from 'vue';

const isShow = ref(false);

const location = ref({
	cityname: '',
	latlng: { lat: 23.130061, lng: 113.264499 },
	module: '',
	poiaddress: '',
	poiname: '',
});

const locationChange = () => {
	window.addEventListener(
		'message',
		function (event) {
			// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
			var loc = event.data;
			if (loc && loc.module == 'locationPicker') {
				//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
				console.log('location', loc);
				location.value = loc;
			}
		},
		false
	);
};

const emits = defineEmits<{
	(e: 'select', loc: any): void;
}>();
const commit = () => {
	if (!location.value.cityname && !location.value.poiaddress) {
		ElMessage.warning('请选择一个位置');
	} else {
		emits('select', location.value);
		isShow.value = false;
	}
};

const open = () => {
	location.value = {
		cityname: '',
		latlng: { lat: 23.130061, lng: 113.264499 },
		module: '',
		poiaddress: '',
		poiname: '',
	};
	isShow.value = true;
	nextTick(() => {
		locationChange();
	});
};

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>

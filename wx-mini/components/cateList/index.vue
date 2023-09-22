<template>
	<scroll-view scroll-y class="cateList">
		<view class="item" :class="currentItem.id === item.id? 'currentItem': ''" v-for="item in props.data"
			:key="item.id+'cate'" @click="click(item)">
			{{item.name}}
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import {
		defineProps,
		watch,
		withDefaults,
		reactive
	} from 'vue'
	import {
		FsDictionary
	} from '@/models/fsDictionary'

	interface Props {
		data: FsDictionary[]
	}

	const currentItem = reactive < FsDictionary > ({
		id: -1,
		name: '',
	})

	const props = withDefaults(defineProps < Props > (), {
		data: () => []
	})

	watch(() => props.data, (newValue) => {
		if (newValue.length > 0) {
			Object.assign(currentItem, newValue[0])
		}
	}, {
		immediate: true,
	})

	const emits = defineEmits < {
		(e: 'item-click', row: number): void
	} > ()
	const click = (item: FsDictionary) => {
		currentItem.id = item.id
		emits('item-click', item.id as number)
	}
</script>

<style scoped lang="scss">
	.item {
		font-size: 28rpx;
		line-height: 110rpx;
		text-align: center;
		background-color: #f8f9fa;
	}

	.currentItem {
		background-color: #fff;
		color: $theme-color;
		font-weight: 500;
	}

	.cateList {
		height: 100%;
	}
</style>

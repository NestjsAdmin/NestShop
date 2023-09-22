<template>
	<view class="tabs">
		<view class="tabs-item" v-for="(item, index) in props.data" :key="index" @click.stop="tabsClick(item,index)">
			<view class="tabs-item-name" :class="tabsIndex === index ? 'active-name' : ''">
				{{ item.name }}
			</view>
			<view>
				<text class="tabs-item-desc" :class="tabsIndex === index ? 'active-bg' : ''">
					{{ item.desc }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		defineProps,
		ref
	} from 'vue'

	const tabsIndex = ref(0)

	interface Props {
		data: [{
			name: string,
			desc: string
		}]
	}

	const props = defineProps < Props > ()

	const emits = defineEmits < {
		(e: 'tabsChange', item: {
			name: string,
			desc: string
		}): void
	} > ()

	const tabsClick = (item: {
		name: string,
		desc: string
	}, index: number) => {
		tabsIndex.value = index
		emits('tabsChange', item)
	}

	const setTabs = (id: number) => {
		tabsIndex.value = id
	}

	defineExpose({
		setTabs
	})
</script>

<style lang="scss" scoped>
	.tabs {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.active-name {
			color: $theme-color;
		}

		.active-bg {
			background-color: $theme-color;
			color: white !important;
		}

		.tabs-item {
			display: flex;
			flex-direction: column;
			text-align: center;
			position: relative;
			flex: 1;

			&::before {
				position: absolute;
				content: '';
				right: 0;
				top: 50%;
				transform: translate(0, -50%);
				width: 1px;
				height: 36rpx;
				background-color: #ECECEC;
			}

			&:last-child {
				&::before {
					display: none;
				}
			}

			.tabs-item-name {
				font-size: 30rpx;
			}

			.tabs-item-desc {
				color: #999999;
				font-size: 22rpx;
				border-radius: 20rpx;
				padding: 2rpx 10rpx 2rpx 10rpx;
			}
		}
	}
</style>

<template>
	<navigator class="flex-between" style="align-items: flex-start;" @click="navClick" hover-class="none">
		<view>
			<u-icon name="map" size="48" color="rgb(64, 174, 54)" />
		</view>
		<view class="ml-20" style="flex: 1;">
			<view style="font-size: 30rpx;">{{props.address}}</view>
			<view class="mt-10" style="font-size: 24rpx; color: #999999;">{{props.name}}
				{{props.phone}}
			</view>
		</view>
		<view class="ml-20" style="align-self: center;">
			<u-icon name="arrow-right" size="26" color="#999999" />
		</view>
	</navigator>
</template>

<script setup lang="ts">
	import {
		defineProps,
		defineEmits
	} from 'vue'

	const props = defineProps < {
		address: string;
		name: string;
		phone: string
	} > ()
	
	const eimts = defineEmits < {
		(e: 'navClick')
	} > ()
	const navClick = () => {
		eimts('navClick')
	}
</script>

<style lang="scss" scoped>
</style>

<template>
	<web-view :src="src"></web-view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const src = ref('')

	onLoad(({ url }) => {
		src.value = url
	})
</script>

<style scoped>
</style>
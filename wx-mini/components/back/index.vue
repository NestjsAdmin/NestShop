<template>
  <navigator class="back pl-10" :style="`top: ${useSystem().statusBarHeight + 15}px;`" open-type="navigateBack"
    hover-class="none">
    <u-icon name="arrow-left" size="40rpx" />
  </navigator>
</template>

<script setup lang="ts">
  import {
    useSystem
  } from '@/stores/system'
</script>

<style lang="scss" scoped>
  .back {
    position: fixed;
    left: 0;
    top: 0;
    color: white;
  }
</style>

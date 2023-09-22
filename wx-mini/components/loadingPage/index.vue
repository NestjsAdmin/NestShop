<template>
  <view class="loading-page" v-if="props.show">
    <view class="loading">
      <u-loading color="rgb(64, 174, 54)" size="70" />
      <text class="loading-text">加载中</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {
    watch,
    defineProps,
    ref
  } from 'vue'

  const isTabbarPage = ref(true)

  const props = defineProps({
    show: Boolean
  })

  uni.hideTabBar({
    fail: () => {
      isTabbarPage.value = false
    }
  })

  watch(() => props.show, (value: boolean) => {
    if (!isTabbarPage.value) return
    if (value) uni.hideTabBar()
    else uni.showTabBar()
  })
</script>

<style lang="scss" scoped>
  .loading-page {
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999;
    background-color: white;

    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .loading-text {
        color: $theme-color;
        margin-top: 15rpx;
        font-weight: bold;
        font-size: 30rpx;
      }
    }
  }
</style>

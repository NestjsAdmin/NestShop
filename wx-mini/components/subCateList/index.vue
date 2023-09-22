<template>
  <view>
    <view class="label">
      <view class="label-left">
        <scroll-view scroll-x="true" class="label-left-scroll">
          <view v-for="item in props.list" :class="selectItem.id === item.id? 'selectItem': ''" :key="item.id +'cro'"
            class="item" @click="itemClick(item)">
            {{item.name}}
          </view>
        </scroll-view>
      </view>
      <view class="label-right" @click="show = true">
        <u-icon v-if="show === false" name="arrow-down"></u-icon>
        <u-icon v-else name="arrow-up" color="#4cb342" size="28"></u-icon>
      </view>
    </view>

    <u-popup v-model="show" mode="top">
      <view class="popupView">
        <view v-for="item in props.list" :class="selectItem.id === item.id? 'selectItem': ''" :key="item.id + 'pop'"
          class="item2" @click="itemClick(item),show = false">
          <text>{{item.name}}</text>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
  import {
    ref,
    watch,
    defineProps
  } from 'vue'
  import {
    FsDictionary
  } from '@/models/fsDictionary'

  const show = ref(false)

  const props = defineProps < {
    list: FsDictionary[]
  } > ()
  const emits = defineEmits < {
    (e: 'select', item: FsDictionary)
  } > ()

  const itemClick = (item: FsDictionary) => {
    if (item.id !== selectItem.value.id) {
      selectItem.value = item
      emits('select', item)
    }
  }
  const selectItem = ref < FsDictionary > ({
    name: '',
    id: -1
  })

  watch(() => props.list, (newValue) => {
    if (newValue && newValue.length > 0) {
      itemClick(newValue[0])
    }
  }, {
    immediate: true
  })

  const getSelectValue = (): FsDictionary | null => {
    if (selectItem.value.name === '') return null
    else return selectItem.value
  }

  defineExpose({
    getSelectValue
  })
</script>

<style scoped lang="scss">
  .selectItem {
    background-color: #d9efd7 !important;
    color: black !important;
    font-weight: 500;
  }



  .item {
    margin-left: 20rpx;
    padding: 10rpx;
    background-color: #edeff2;
    border-radius: 5rpx;
    display: inline-block;
    font-size: 24rpx;
  }

  .label {
    display: flex;
    padding: 20rpx 0;
    box-sizing: border-box;
    color: #666666;
  }

  .label-left {
    flex-grow: 1;
    width: 100px;

    .label-left-scroll {
      width: 100%;
      white-space: nowrap;
    }
  }

  .label-right {
    width: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popupView {
    padding: 50rpx 10rpx 20rpx 15rpx;
    display: flex;
    flex-wrap: wrap;

    .item2 {
      text-align: center;
      padding: 20rpx 0;
      width: 23%;
      margin-right: 2%;
      flex-shrink: 0;
      flex-grow: 0;
      background-color: #edeff2;
      border-radius: 10rpx;
      margin-bottom: 20rpx;
      font-size: 28rpx;

      text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 90%;
        display: inline-block;
      }
    }
  }
</style>

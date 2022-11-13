<template>
  <div class="bottom-content">
    <template v-for="(item, index) in panelItems" :key="item">
      <div :class="['item', `panel${item.id}`]">
        <div class="pan-left">
          <div class="title">{{ item.title }}</div>
          <!-- 数据动画 -->
          <span :id="`total-num-${item.id}`" class="number">{{ item.totalNum }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="pan-right">
          <span :class="['triangle', item.isUp ? 'up-triangle' : 'down-triangle']"></span>
          <!-- 数据动画 -->
          <span :id="`percentage-num-${item.id}`" class="percentage">{{ item.percentage }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { CountUp, type CountUpOptions } from 'countup.js'
import type { ChargingPilePanel } from '@/types/home'

const props = withDefaults(
  defineProps<{
    panelItems: ChargingPilePanel[]
  }>(),
  {
    panelItems: () => []
  }
)

watch(
  () => props.panelItems,
  (newVal) => {
    // * 在下一次dom更新完成之后会回调
    nextTick(() => {
      startAnimation(newVal)
    })
  }
)

const startAnimation = (panelItems: ChargingPilePanel[]) => {
  const options1: CountUpOptions = {
    decimalPlaces: 1, // 一位小数
    duration: 2, // 4秒
    useGrouping: false // 1,000=>1000
  }

  const options2: CountUpOptions = {
    decimalPlaces: 1, // 一位小数
    duration: 2, // 4秒
    useGrouping: false, // 1,000=>1000
    suffix: '%'
  }

  // 等dom更新完成之后再执行
  panelItems.forEach((item) => {
    new CountUp(`total-num-${item.id}`, item.totalNum, options1).start()
    new CountUp(`percentage-num-${item.id}`, item.percentage, options2).start()
  })
}
</script>

<style scoped lang="scss">
.bottom-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding-top: 40px; */
}

.bottom-content .item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;

  flex: 1;
  height: 100%;
  padding: 0 10px 0 25px;
  /* border: 1px solid red; */
}

.bottom-content .pan-left {
  font-size: 16px;
  color: #ffffff;
  opacity: 0.8;
}
.bottom-content .pan-left .title {
  color: white;
}
.bottom-content .pan-left .number {
  font-size: 36px;
  font-weight: bold;
  color: #23aeff;
  line-height: 60px;
}

.bottom-content .pan-left .unit {
  font-size: 18px;
  color: #23aeff;
}

.bottom-content .pan-right {
  margin-top: 35px;
}

.bottom-content .panel1 .pan-right .up-triangle {
  display: inline-block;
  margin-bottom: 4px;
  width: 0;
  height: 0;
  border-bottom: 8px solid #c70013;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.bottom .panel1 .pan-right .percentage {
  color: #c70013;
}
.bottom .panel2 .pan-right .up-triangle {
  display: inline-block;
  margin-bottom: 4px;
  width: 0;
  height: 0;
  border-bottom: 8px solid #c70013;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.bottom-content .panel2 .pan-right .percentage {
  color: #c70013;
}

.bottom-content .panel3 .pan-right .down-triangle {
  display: inline-block;
  margin-bottom: 1px;
  width: 0;
  height: 0;
  border-top: 8px solid #37a73f;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.bottom-content .panel3 .pan-right .percentage {
  color: #37a73f;
}
</style>
